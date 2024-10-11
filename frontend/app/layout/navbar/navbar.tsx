import { cn } from "~/common/cn";
import { useTranslation } from "react-i18next";
import { NavbarBrandLogo } from "./navbar-brand-logo";
import { LocaleSwitcher } from "./locale-switcher";
import { Disclosure } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { RefObject, useEffect, useRef, useState } from "react";
import { Brand } from "~/payload-types";
import { Link, LinkProps } from "~/common/link";
import { getLocaleLabel } from "~/i18n";
import { MobileLocaleSwitcher } from "./mobile-locale-switcher";

export type NavbarProps = {
  className?: string;
  brand: Brand;
  allBrands: Brand[];
  onHeightChanged: (height: number) => void;
};

export function Navbar({ brand, allBrands, onHeightChanged }: NavbarProps) {
  const { i18n } = useTranslation();
  const [localeSwitcherOpen, setLocaleSwitcherOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  useElementHeightObserver(navbarRef, onHeightChanged);
  const isScrolled = useIsScrolled();

  return (
    <Disclosure
      as="nav"
      className={cn(
        "sticky inset-0 z-40 backdrop-blur-sm transition-all duration-1000",
        isScrolled
          ? "top-4 mx-4 rounded-lg bg-white bg-opacity-75 shadow-lg ring-1 ring-black ring-opacity-5"
          : "top-0 mx-0 rounded-none bg-white bg-opacity-100 ring-0 ring-white ring-opacity-0",
      )}
      ref={navbarRef}
    >
      {({ open }) => (
        <>
          <div className="flex items-center justify-between px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
            <NavbarBrandLogo brand={brand} allBrands={allBrands} />
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
  );
}

type NavLinkProps = LinkProps;

function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <Link className={cn("hover:text-neutral-900", className)} {...props} />
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

const SCROLL_THRESHOLD = 0.3;

function useIsScrolled() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    typeof window !== "undefined" &&
    SCROLL_THRESHOLD * window.innerHeight < scrollY
  );
}
