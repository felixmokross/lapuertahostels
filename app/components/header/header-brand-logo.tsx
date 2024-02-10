import { Transition } from "@headlessui/react";
import { BrandLogo } from "../brand-logo";
import { brands, useBrand } from "../../brands";
import { Link } from "@remix-run/react";

export function HeaderBrandLogo() {
  const brand = useBrand();
  return (
    <h1>
      <Link to={brand.homeLinkUrl}>
        {(Object.keys(brands) as (keyof typeof brands)[]).map((b) => (
          <Transition
            key={b}
            as="span"
            className="block"
            show={b === brand.key}
            enter="transition ease-out duration-500"
            enterFrom="-translate-x-3/4 opacity-0"
            enterTo="translate-x-0 opacity-100"
          >
            <BrandLogo
              size="large"
              type="with-wordmark"
              brand={b}
              className="flex sm:hidden xl:flex"
            />
            <BrandLogo
              size="small"
              type="with-wordmark"
              brand={b}
              className="hidden lg:flex xl:hidden"
            />
            <BrandLogo
              size="large"
              type="simple"
              brand={b}
              className="hidden sm:flex lg:hidden"
            />
          </Transition>
        ))}
      </Link>
    </h1>
  );
}
