import { Brand, Locale } from "@lapuertahostels/payload-types";
import { Banner } from "./banner";
import { Navbar, NavbarProps } from "./navbar/navbar";
import { isObject } from "~/common/utils";
import { LoadingBar } from "./loading-bar";

type HeaderProps = {
  hasSession?: boolean;
  brand: Brand;
  allBrands: Brand[];
  publishedLocales: Pick<Locale, "locale" | "displayLabel">[];
} & Pick<NavbarProps, "onHeightChanged">;

export function Header({
  brand,
  allBrands,
  publishedLocales,
  onHeightChanged,
}: HeaderProps) {
  return (
    <header className="contents">
      {isObject(brand.banner) && (
        <Banner key={brand.banner.id} {...brand.banner} />
      )}
      <Navbar
        brand={brand}
        allBrands={allBrands}
        publishedLocales={publishedLocales}
        onHeightChanged={onHeightChanged}
      />
      <LoadingBar />
    </header>
  );
}
