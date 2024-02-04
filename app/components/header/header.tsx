import { cn } from "../classnames";
import { useTranslation } from "react-i18next";
import { Link, LinkProps } from "../link";
import { HeaderBrandLogo } from "./header-brand-logo";
import { useBrand } from "../../brands";
import { LocaleSwitcher } from "./locale-switcher";

export function Header() {
  const { t, i18n } = useTranslation();
  const brand = useBrand();

  return (
    <header className="grid grid-cols-3 items-center px-4 py-4">
      <HeaderBrandLogo />
      <div className="space-x-10 justify-self-center text-nowrap text-sm font-bold text-neutral-500">
        {brand.navLinks.map((navLink, index) => (
          <NavLink key={index} to={navLink.url}>
            {t(navLink.labelKey)}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center justify-end">
        <LocaleSwitcher currentLocale={i18n.language} />
      </div>
    </header>
  );
}

type NavLinkProps = LinkProps;

function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <Link className={cn("hover:text-neutral-900", className)} {...props} />
  );
}
