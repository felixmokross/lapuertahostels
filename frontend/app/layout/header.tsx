import { Brand, Common } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar, NavbarProps } from "./navbar/navbar";
import { useLayoutEffect, useState } from "react";

type HeaderProps = {
  banner: Common["banner"];
  brand: Brand;
  allBrands: Brand[];
} & Pick<NavbarProps, "onHeightChanged">;

export function Header({
  banner,
  brand,
  allBrands,
  onHeightChanged,
}: HeaderProps) {
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const isScrolled = useIsScrolled();
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
      <Navbar
        brand={brand}
        allBrands={allBrands}
        onHeightChanged={onHeightChanged}
        isScrolled={isScrolled}
      />
    </header>
  );
}

function useIsScrolled(): boolean {
  const [scrollY, setScrollY] = useState(0);
  useLayoutEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (typeof window === "undefined" || scrollY === 0) return false;

  return true;
}
