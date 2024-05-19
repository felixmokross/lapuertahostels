import { Transition } from "@headlessui/react";
import { BrandLogo } from "../brand-logo";
import { Link } from "@remix-run/react";
import { Brand } from "~/payload-types";

export type HeaderBrandLogoProps = {
  brand: Brand;
  allBrands: Brand[];
};

export function HeaderBrandLogo({ allBrands, brand }: HeaderBrandLogoProps) {
  return (
    <h1 className="h-10 lg:h-7 xl:h-10">
      <Link to={brand.homeLinkUrl}>
        {allBrands.map((b) => (
          <Transition
            key={b.id}
            as="span"
            className="block"
            show={b.id === brand.id}
            enter="transition ease-out duration-500"
            enterFrom="-translate-x-3/4 opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="hidden"
          >
            <BrandLogo
              size="large"
              type="with-wordmark"
              brand={brand}
              className="flex sm:hidden xl:flex"
            />
            <BrandLogo
              size="small"
              type="with-wordmark"
              brand={brand}
              className="hidden lg:flex xl:hidden"
            />
            <BrandLogo
              size="large"
              type="simple"
              brand={brand}
              className="hidden sm:flex lg:hidden"
            />
          </Transition>
        ))}
      </Link>
    </h1>
  );
}
