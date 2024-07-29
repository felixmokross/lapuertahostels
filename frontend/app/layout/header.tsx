import { Brand, Common } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar } from "./navbar/navbar";
import { RefObject, useEffect, useRef, useState } from "react";
import { cn } from "~/common/cn";

type HeaderProps = {
  banner: Common["banner"];
  brand: Brand;
  allBrands: Brand[];
  onHeightChanged: (height: number) => void;
};

export function Header({
  banner,
  brand,
  allBrands,
  onHeightChanged,
}: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useElementHeightObserver(headerRef, onHeightChanged);
  const isScrolled = useIsScrolled();

  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  return (
    <header className="contents">
      {banner?.show && (
        <Banner
          cta={banner.cta?.show ? `${banner.cta.text} →` : undefined}
          ctaTo={banner.cta?.show ? banner.cta.url! : undefined}
          isDismissed={isBannerDismissed}
          onDismiss={() => setIsBannerDismissed(true)}
        >
          {banner.message!}
        </Banner>
      )}
      <div
        className={cn(
          "sticky inset-0 z-20 bg-white shadow-lg backdrop-blur-sm transition-colors duration-1000",
          isScrolled ? "bg-opacity-80" : "bg-opacity-100",
        )}
        ref={headerRef}
      >
        <Navbar brand={brand} allBrands={allBrands} />
      </div>
    </header>
  );
}

function useElementHeightObserver(
  ref: RefObject<HTMLElement>,
  onHeightChanged: (height: number) => void,
) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        onHeightChanged(entry.borderBoxSize[0].blockSize);
      }
    });
    observer.observe(ref.current, { box: "border-box" });

    return () => observer.disconnect();
  }, [onHeightChanged, ref]);
}

const SCROLL_THRESHOULD = 0.3;

function useIsScrolled() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    typeof window !== "undefined" &&
    SCROLL_THRESHOULD * window.innerHeight < scrollY
  );
}
