import { Brand, Common } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar } from "./navbar/navbar";
import { RefObject, useEffect, useRef, useState } from "react";

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
  const headerRef = useRef<HTMLElement>(null);

  useElementHeightObserver(headerRef, onHeightChanged);

  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  return (
    <header className="sticky inset-0 z-50 bg-white shadow-lg" ref={headerRef}>
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
      <Navbar brand={brand} allBrands={allBrands} />
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
