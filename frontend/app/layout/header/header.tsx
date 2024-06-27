import { cn } from "~/common/cn";
import { useTranslation } from "react-i18next";
import { HeaderBrandLogo } from "./header-brand-logo";
import { LocaleSwitcher } from "./locale-switcher";
import { Disclosure } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Brand } from "~/payload-types";
import { Link, LinkProps } from "~/common/link";
import { getLocaleLabel } from "~/i18n";
import { MobileLocaleSwitcher } from "./mobile-locale-switcher";

export type HeaderProps = {
  brand: Brand;
  allBrands: Brand[];
};

export function Header({ brand, allBrands }: HeaderProps) {
  const { i18n } = useTranslation();
  const [localeSwitcherOpen, setLocaleSwitcherOpen] = useState(false);

  return (
    <header>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <HeaderBrandLogo brand={brand} allBrands={allBrands} />
              <div className="hidden space-x-4 justify-self-center text-nowrap text-sm font-bold text-neutral-500 sm:block md:space-y-6 xl:space-x-8">
                {brand.navLinks?.map((navLink) => (
                  <NavLink key={navLink.id} to={navLink.url}>
                    {navLink.label}
                  </NavLink>
                ))}
              </div>
              <div className="hidden items-center justify-end sm:flex">
                <LocaleSwitcher currentLocale={i18n.language} />
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="focus:ring-indigo-500 relative inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {brand.navLinks?.map((navLink) => (
                  // current: block border-l-4 border-puerta-500 bg-puerta-50 py-2 pl-3 pr-4 text-base font-bold text-puerta-700
                  <Disclosure.Button
                    key={navLink.id}
                    as={Link}
                    to={navLink.url}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-bold text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700"
                  >
                    {navLink.label}
                  </Disclosure.Button>
                ))}
              </div>

              <div className="border-t border-neutral-200 pb-3 pt-4">
                <div className="space-y-1">
                  <Disclosure.Button
                    as="button"
                    onClick={() => setLocaleSwitcherOpen(true)}
                    className="flex w-full items-center gap-1.5 border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-bold text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700"
                  >
                    <GlobeAmericasIcon className="h-5" />
                    {getLocaleLabel(i18n.language)}
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
            <MobileLocaleSwitcher
              currentLocale={i18n.language}
              onClose={() => setLocaleSwitcherOpen(false)}
              open={localeSwitcherOpen}
            />
          </>
        )}
      </Disclosure>
    </header>
  );
}

type NavLinkProps = LinkProps;

function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <Link className={cn("hover:text-neutral-900", className)} {...props} />
  );
}
