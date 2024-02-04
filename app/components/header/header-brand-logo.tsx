import { brands, type Brand } from "../../brands";
import { Link } from "../link";
import { Transition } from "@headlessui/react";
import { BrandLogo } from "../brand-logo";

export type HeaderBrandLogoProps = {
  brand: Brand;
};

export function HeaderBrandLogo({ brand }: HeaderBrandLogoProps) {
  return (
    <h1 className="relative h-10 w-full">
      <Link to={brands[brand].homeLinkUrl}>
        {(Object.keys(brands) as (keyof typeof brands)[]).map((b) => (
          <Transition
            key={b}
            as="span"
            className="absolute inset-0 block"
            show={b === brand}
            enter="transition ease-out duration-500"
            enterFrom="-translate-x-3/4 opacity-0"
            enterTo="translate-x-0 opacity-100"
          >
            <BrandLogo size="large" brand={b} />
          </Transition>
        ))}
      </Link>
    </h1>
  );
}
