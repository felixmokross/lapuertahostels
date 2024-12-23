import { cn } from "~/common/cn";
import { useTranslation } from "react-i18next";
import { NavbarBrandLogo } from "./navbar-brand-logo";
import { LocaleSwitcher } from "./locale-switcher";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { CalendarDateRangeIcon, LanguageIcon } from "@heroicons/react/20/solid";
import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { Brand, Text } from "~/payload-types";
import { getLocaleLabel } from "~/i18n";
import { MobileLocaleSwitcher } from "./mobile-locale-switcher";
import { PageLink, PageLinkProps } from "~/common/page-link";
import { useLocation } from "@remix-run/react";
import {
  buildLocalizedRelativeUrl,
  getLocaleAndPageUrl,
  toRelativeUrl,
} from "~/common/routing";
import { Button, ButtonProps } from "~/common/button";
import { mergeRefs } from "~/common/utils";

export type NavbarProps = {
  className?: string;
  brand: Brand;
  allBrands: Brand[];
  isScrolled?: boolean;
  onHeightChanged?: (height: number) => void;
};

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  { brand, allBrands, isScrolled = false, onHeightChanged },
  ref,
) {
  const { i18n } = useTranslation();
  const [localeSwitcherOpen, setLocaleSwitcherOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  useElementHeightObserver(navbarRef, onHeightChanged || (() => {}));

  const navLinks = allBrands.find((b) => b.id === brand.id)?.navLinks;

  const location = useLocation();
  const { pageUrl } = getLocaleAndPageUrl(toRelativeUrl(location));
  const localeSwitcherRedirectTo = buildLocalizedRelativeUrl(null, pageUrl);

  return (
    <Menu
      as="nav"
      className={cn(
        "sticky inset-0 z-40 bg-white",
        isScrolled
          ? "shadow-md"
          : "transition-shadow duration-1000 ease-in-out",
      )}
      ref={mergeRefs(navbarRef, ref)}
    >
      {({ open }) => (
        <>
          <div className="flex items-center justify-between gap-4 px-4 py-2 sm:py-4 xl:grid xl:grid-cols-3">
            <NavbarBrandLogo
              className="shrink-0"
              brand={brand}
              allBrands={allBrands}
            />
            <div className="z-50 hidden max-w-[40rem] space-x-12 justify-self-center overflow-hidden text-nowrap text-sm font-bold text-neutral-500 xl:block">
              {navLinks?.map((navLink) => {
                if (typeof navLink !== "object") {
                  throw new Error("Invalid nav link");
                }

                if (typeof navLink.label !== "object") {
                  throw new Error("Invalid nav link label");
                }

                return (
                  <NavLink key={navLink.id} link={navLink.link}>
                    {navLink.label.text}
                  </NavLink>
                );
              })}
            </div>
            <div className="flex shrink-0 items-center justify-end gap-4">
              <div className="flex items-center justify-center gap-4 xl:gap-8">
                <div className="hidden leading-none sm:inline-block">
                  <LocaleSwitcher
                    currentLocale={i18n.language}
                    redirectTo={localeSwitcherRedirectTo}
                  />
                </div>
                {brand.bookCta?.show ? (
                  <>
                    <div className="hidden h-8 border-l border-l-neutral-300 sm:block" />
                    <BookButton cta={brand.bookCta} size="medium" />
                  </>
                ) : null}
              </div>
              <div className="-mr-2 flex items-center xl:hidden">
                <MenuButton className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </MenuButton>
              </div>
            </div>
          </div>

          <MenuItems className="absolute z-10 w-full bg-white shadow-md xl:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navLinks?.map((navLink) => {
                if (typeof navLink !== "object") {
                  throw new Error("Invalid nav link");
                }

                if (typeof navLink.label !== "object") {
                  throw new Error("Invalid nav link label");
                }
                return (
                  <MenuItem
                    key={navLink.id}
                    as={PageLink}
                    link={navLink.link}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-bold text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700"
                  >
                    {navLink.label.text}
                  </MenuItem>
                );
              })}
            </div>
            <div className="border-t border-neutral-200 pb-3 pt-4 sm:hidden">
              <div className="space-y-1">
                <MenuItem
                  as="button"
                  onClick={() => setLocaleSwitcherOpen(true)}
                  className="flex w-full items-center gap-1.5 border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-bold text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700"
                >
                  <LanguageIcon className="h-5" />
                  {getLocaleLabel(i18n.language)}
                </MenuItem>
              </div>
            </div>
          </MenuItems>
          <MobileLocaleSwitcher
            currentLocale={i18n.language}
            onClose={() => setLocaleSwitcherOpen(false)}
            open={localeSwitcherOpen}
            redirectTo={localeSwitcherRedirectTo}
          />
        </>
      )}
    </Menu>
  );
});

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

type BookButtonProps = {
  cta: NonNullable<Brand["bookCta"]>;
} & Omit<ButtonProps, "children" | "variant" | "icon" | "as">;

const BookButton = forwardRef<HTMLAnchorElement, BookButtonProps>(
  function BookButton({ cta, ...props }, ref) {
    function renderButton({ withIcon }: { withIcon: boolean }) {
      return (
        <Button
          {...props}
          as={PageLink}
          icon={withIcon ? CalendarDateRangeIcon : undefined}
          link={cta.link!}
          variant="primary"
          ref={ref}
        >
          {(cta.label as Text)?.text}
        </Button>
      );
    }

    return (
      <>
        <span className="sm:hidden">{renderButton({ withIcon: false })}</span>
        <span className="hidden sm:inline">
          {renderButton({ withIcon: true })}
        </span>
      </>
    );
  },
);
