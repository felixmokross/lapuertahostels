import { Brand } from "~/payload-types";
import { Banner } from "./banner";
import { Navbar, NavbarProps } from "./navbar/navbar";
import { RefObject, useEffect, useRef, useState } from "react";

type HeaderProps = {
  hasSession?: boolean;
  brand: Brand;
  allBrands: Brand[];
} & Pick<NavbarProps, "onHeightChanged">;

export function Header({ brand, allBrands, onHeightChanged }: HeaderProps) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const isScrolled = useIsScrolled(navbarRef);

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
        ref={navbarRef}
      />
    </header>
  );
}

function useIsScrolled(ref: RefObject<HTMLElement>): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      setIsScrolled(ref.current.getBoundingClientRect().top === 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return isScrolled;
}
