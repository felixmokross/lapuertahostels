import { Transition } from "@headlessui/react";
import { BrandLogo } from "~/common/brand-logo";
import { cn } from "~/common/cn";
import { PageLink } from "~/common/page-link";
import { Brand } from "~/payload-types";

export type NavbarBrandLogoProps = {
  brand: Brand;
  allBrands: Brand[];
  className?: string;
};

export function NavbarBrandLogo({
  allBrands,
  brand,
  className,
}: NavbarBrandLogoProps) {
  return (
    <h1 className={cn("h-10", className)}>
      <PageLink link={brand.homeLink}>
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
              className="flex lg:hidden xl:flex"
            />
            <BrandLogo
              size="large"
              type="simple"
              brand={brand}
              className="hidden lg:flex xl:hidden"
            />
          </Transition>
        ))}
      </PageLink>
    </h1>
  );
}
