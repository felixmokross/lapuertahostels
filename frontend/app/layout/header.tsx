import { Brand } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar, NavbarProps } from "./navbar/navbar";

type HeaderProps = {
  hasSession?: boolean;
  brand: Brand;
  allBrands: Brand[];
} & Pick<NavbarProps, "onHeightChanged">;

export function Header({ brand, allBrands, onHeightChanged }: HeaderProps) {
  if (brand.banner != null && typeof brand.banner !== "object") {
    throw new Error("Brand banner is not an object");
  }
  return (
    <header className="contents">
      {brand.banner && <Banner key={brand.banner.id} {...brand.banner} />}
      <Navbar
        brand={brand}
        allBrands={allBrands}
        onHeightChanged={onHeightChanged}
      />
    </header>
  );
}
