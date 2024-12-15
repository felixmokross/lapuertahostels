import { Brand } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar } from "./navbar/navbar";

type HeaderProps = {
  hasSession?: boolean;
  brand: Brand;
  allBrands: Brand[];
};

export function Header({ brand, allBrands }: HeaderProps) {
  if (brand.banner != null && typeof brand.banner !== "object") {
    throw new Error("Brand banner is not an object");
  }
  return (
    <header className="contents">
      {brand.banner && <Banner key={brand.banner.id} {...brand.banner} />}
      <Navbar brand={brand} allBrands={allBrands} />
    </header>
  );
}
