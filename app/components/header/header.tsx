import { GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { cn } from "../classnames";
import { useTranslation } from "react-i18next";
import { Link, LinkProps } from "../link";
import { Link as RemixLink, useMatch } from "@remix-run/react";
import { useTheme } from "../../common";
import { ThemeLogo } from "./theme-logo";

export function Header() {
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <header className="grid grid-cols-3 items-center px-4 py-4">
      <ThemeLogo theme={theme} />
      <div className="space-x-10 justify-self-center text-nowrap text-sm font-bold text-neutral-500">
        <NavLink to="aqua">Puerta Aqua</NavLink>
        <NavLink to="azul">La Puerta Azul</NavLink>
        <NavLink to=".#santa-marta">Santa Marta</NavLink>
        <NavLink to=".#about-us">{t("aboutUs")}</NavLink>
        <NavLink to="">{t("contact")}</NavLink>
      </div>
      <div className="group flex items-center justify-end gap-2 text-sm font-bold text-neutral-500">
        <GlobeAmericasIcon className="h-4" />
        <LocaleLink locale="en" />
        <LocaleLink locale="es" />
        <LocaleLink locale="de" />
        <LocaleLink locale="fr" />
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

type LocaleLinkProps = {
  locale: string;
};

function LocaleLink({ locale }: LocaleLinkProps) {
  const { i18n, t } = useTranslation();
  const match = useMatch("/:locale/*");
  const splat = match?.params["*"];
  return (
    <RemixLink
      to={`/${locale}${splat ? `/${splat}` : ""}`}
      reloadDocument
      className={cn(
        "hover:text-neutral-900",
        i18n.language === locale
          ? "text-neutral-900"
          : "hidden group-hover:inline",
      )}
    >
      {t(`languages.${locale}`)}
    </RemixLink>
  );
}
