import { cn } from "~/common/cn";
import { useTranslation } from "react-i18next";
import { NavbarBrandLogo } from "./navbar-brand-logo";
import { LocaleSwitcher } from "./locale-switcher";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { CalendarDateRangeIcon, LanguageIcon } from "@heroicons/react/20/solid";
import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { Brand } from "~/payload-types";
import { getLocaleLabel } from "~/i18n";
import { MobileLocaleSwitcher } from "./mobile-locale-switcher";
import { PageLink, PageLinkProps } from "~/common/page-link";
import { useLocation } from "react-router";
import {
  buildLocalizedRelativeUrl,
  getLocaleAndPageUrl,
  toRelativeUrl,
} from "~/common/routing";
import { Button, ButtonProps } from "~/common/button";
import { mergeRefs, gracefully } from "~/common/utils";

export type NavbarProps = {
  className?: string;
  brand: Brand;
  allBrands: Brand[];
  onHeightChanged?: (height: number) => void;
};

const HIDE_NAVBAR_THRESHOLD = 100;

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar(
  { brand, allBrands, onHeightChanged },
  ref,
) {
  const { i18n } = useTranslation();
  const [localeSwitcherOpen, setLocaleSwitcherOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();
  const scrollY = useScrollY();
  const isScrolled = useIsScrolled(navbarRef);

  useElementHeightObserver(navbarRef, onHeightChanged || (() => {}));

  const navLinks = allBrands.find((b) => b.id === brand.id)?.navLinks;

  const location = useLocation();
  const { pageUrl } = getLocaleAndPageUrl(toRelativeUrl(location));
  const localeSwitcherRedirectTo = buildLocalizedRelativeUrl(null, pageUrl);

  return (
    <>
      <Menu
        as="nav"
        className={cn(
          "sticky inset-0 z-40 bg-white ",
          isScrolled
            ? cn(
                "shadow-md transition-transform duration-500 ease-in-out",
                scrollDirection === "down" && scrollY > HIDE_NAVBAR_THRESHOLD
                  ? "-translate-y-full sm:translate-y-0"
                  : "translate-y-0",
              )
            : "shadow-none transition-shadow duration-1000 ease-in-out",
        )}
        ref={mergeRefs(navbarRef, ref)}
      >
        {({ open }) => (
          <>
            <div className="flex items-center justify-between gap-4 px-4 py-4 xl:grid xl:grid-cols-3">
              <NavbarBrandLogo
                className="shrink-0"
                brand={brand}
                allBrands={allBrands}
              />
              <div className="z-50 hidden max-w-[40rem] space-x-12 justify-self-center overflow-hidden text-nowrap text-sm font-bold text-neutral-500 xl:block">
                {navLinks?.map((navLink) => {
                  return (
                    <NavLink key={navLink.id} link={navLink.link}>
                      {gracefully(navLink.label, "text")}
                    </NavLink>
                  );
                })}
              </div>
              <div className="flex shrink-0 items-center justify-end gap-4">
                <div className="hidden items-center justify-center gap-4 sm:flex xl:gap-8">
                  <div className="hidden leading-none sm:inline-block">
                    <LocaleSwitcher
                      currentLocale={i18n.language}
                      redirectTo={localeSwitcherRedirectTo}
                    />
                  </div>
                  {brand.bookCta?.show ? (
                    <>
                      <div className="h-8 border-l border-l-neutral-300" />
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
                  return (
                    <MenuItem
                      key={navLink.id}
                      as={PageLink}
                      link={navLink.link}
                      className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-bold text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700"
                    >
                      {gracefully(navLink.label, "text")}
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
      {brand.bookCta?.show ? (
        <BookButton
          cta={brand.bookCta}
          size="floating-action-button"
          className="fixed bottom-6 right-6 z-50 sm:hidden"
        />
      ) : null}
    </>
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
    return (
      <Button
        {...props}
        as={PageLink}
        icon={CalendarDateRangeIcon}
        link={cta.link!}
        variant="primary"
        ref={ref}
      >
        {gracefully(cta.label, "text")}
      </Button>
    );
  },
);

type ScrollDirection = "up" | "down";

function useScrollDirection(): ScrollDirection | undefined {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>();
  const isNavigating = useRef(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    function onScroll() {
      try {
        if (isNavigating.current) return;

        if (window.scrollY > lastScrollY) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      } finally {
        lastScrollY = window.scrollY;
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When detecting navigation, reset scroll direction and block scroll events for a short time to avoid
  // confusing scroll direction changes due to scroll events upon navigation (e.g. when navigating to a fragment link)
  const location = useLocation();
  const timeoutRef = useRef<number>();
  useEffect(() => {
    setScrollDirection(undefined);
    isNavigating.current = true;

    cleanup();
    timeoutRef.current = window.setTimeout(
      () => (isNavigating.current = false),
      100,
    );

    return () => cleanup();

    function cleanup() {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current);
      }
    }
  }, [location.key]);

  return scrollDirection;
}

function useScrollY(): number {
  const [scrollY, setScrollY] = useState(
    typeof window !== "undefined" ? window.scrollY : 0,
  );
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

function useIsScrolled(ref: RefObject<HTMLElement>): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      // Using a threshold as these might not match exactly when scroll bounces
      const THRESHOLD_IN_PX = 1;
      setIsScrolled(
        window.scrollY > THRESHOLD_IN_PX &&
          Math.abs(window.scrollY - ref.current.offsetTop) <= THRESHOLD_IN_PX,
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return isScrolled;
}
