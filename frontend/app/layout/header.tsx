import { Brand, Common } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar, NavbarProps } from "./navbar/navbar";
import { useState } from "react";

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
      />
    </header>
  );
}
