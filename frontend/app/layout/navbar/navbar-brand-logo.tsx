import { Transition } from "@headlessui/react";
import { ReactNode } from "react";
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
  function getComponent(children: ReactNode) {
    return brand.homeLink ? (
      <PageLink link={brand.homeLink}>{children}</PageLink>
    ) : (
      <div>{children}</div>
    );
  }
  return (
    <h1 className={cn("h-7 sm:h-10", className)}>
      {getComponent(
        allBrands.map((b) => (
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
              className="hidden sm:flex"
            />
            <BrandLogo
              size="small"
              type="with-wordmark"
              brand={brand}
              className="sm:hidden"
            />
          </Transition>
        )),
      )}
    </h1>
  );
}
