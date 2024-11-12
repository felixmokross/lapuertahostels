import { Brand } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar, NavbarProps } from "./navbar/navbar";
import { useEffect, useState } from "react";

type HeaderProps = {
  hasSession?: boolean;
  brand: Brand;
  allBrands: Brand[];
} & Pick<NavbarProps, "onHeightChanged">;

export function Header({ brand, allBrands, onHeightChanged }: HeaderProps) {
  const isScrolled = useIsScrolled();

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
        isScrolled={isScrolled}
      />
    </header>
  );
}

function useIsScrolled(): boolean {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (typeof window === "undefined" || scrollY === 0) return false;

  return true;
}
