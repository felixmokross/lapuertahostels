import { cn } from "~/common/cn";
import { useTranslation } from "react-i18next";
import { NavbarBrandLogo } from "./navbar-brand-logo";
import { LocaleSwitcher } from "./locale-switcher";
import { Disclosure } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { RefObject, useEffect, useRef, useState } from "react";
import { Brand } from "~/payload-types";
import { getLocaleLabel } from "~/i18n";
import { MobileLocaleSwitcher } from "./mobile-locale-switcher";
import { PageLink, PageLinkProps } from "~/common/page-link";
import { useLocation } from "@remix-run/react";
import {
  buildLocalizedRelativeUrl,
  getLocaleAndPageUrl,
  toRelativeUrl,
} from "~/common/routing";

export type NavbarProps = {
  className?: string;
  brand: Brand;
  allBrands: Brand[];
  isScrolled?: boolean;
  onHeightChanged: (height: number) => void;
};

export function Navbar({
  brand,
  allBrands,
  isScrolled = false,
  onHeightChanged,
}: NavbarProps) {
  const { i18n } = useTranslation();
  const [localeSwitcherOpen, setLocaleSwitcherOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  useElementHeightObserver(navbarRef, onHeightChanged);

  const navLinks = allBrands.find((b) => b.id === brand.id)?.navLinks;

  const location = useLocation();
  const { pageUrl } = getLocaleAndPageUrl(toRelativeUrl(location));
  const localeSwitcherRedirectTo = buildLocalizedRelativeUrl(null, pageUrl);

  return (
    <Disclosure
      as="nav"
      className={cn(
        "sticky inset-0 z-40 bg-white transition-shadow duration-1000 ease-in-out",
        isScrolled && "shadow-md",
      )}
      ref={navbarRef}
    >
      {({ open }) => (
        <>
          <div className="flex items-center justify-between px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
            <NavbarBrandLogo brand={brand} allBrands={allBrands} />
            <div className="z-50 hidden space-x-6 justify-self-center text-nowrap text-sm font-bold text-neutral-500 sm:block md:space-x-8 lg:space-x-12 xl:space-x-16">
              {navLinks?.map((navLink) => (
                <NavLink key={navLink.id} link={navLink} />
              ))}
            </div>
            <div className="hidden items-center justify-end sm:flex">
              <LocaleSwitcher
                currentLocale={i18n.language}
                redirectTo={localeSwitcherRedirectTo}
              />
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-500">
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
              {navLinks?.map((navLink) => (
                <Disclosure.Button
                  key={navLink.id}
                  as={PageLink}
                  link={navLink}
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-bold text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700"
                />
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
            redirectTo={localeSwitcherRedirectTo}
          />
        </>
      )}
    </Disclosure>
  );
}

type NavLinkProps = PageLinkProps;

function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <PageLink className={cn("hover:text-neutral-900", className)} {...props} />
  );
}

function useElementHeightObserver(
  ref: RefObject<HTMLElement>,
  onHeightChanged: (height: number) => void,
) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        onHeightChanged(entry.borderBoxSize[0].blockSize);
      }
    });
    observer.observe(ref.current, { box: "border-box" });

    return () => observer.disconnect();
  }, [onHeightChanged, ref]);
}
