import { GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { cn } from "./classnames";
import { useTranslation } from "react-i18next";
import { Image } from "./image";
import { Link } from "./link";
import { Link as RemixLink, useMatch } from "@remix-run/react";

export function Header() {
  const { t } = useTranslation();
  return (
    <header className="grid grid-cols-3 items-center px-4 py-4">
      <Link to="/">
        <h1 className="flex items-center gap-4 font-serif text-2xl uppercase tracking-wide text-neutral-900">
          <Image
            src="logos/logo-puerta-simple.png?updatedAt=1703906701749&tr=h-80"
            alt="La Puerta Hostels Logo"
            width={33}
            height={40}
          />
          <>La Puerta Hostels</>
        </h1>
      </Link>
      <div className="space-x-10 justify-self-center text-nowrap text-sm font-bold text-neutral-500">
        <Link to="aqua" className={cn("hover:text-neutral-900")}>
          Puerta Aqua
        </Link>
        <Link to="azul" className={cn("hover:text-neutral-900")}>
          La Puerta Azul
        </Link>
        <Link to=".#santa-marta" className={cn("hover:text-neutral-900")}>
          Santa Marta
        </Link>
        <Link to=".#about-us" className={cn("hover:text-neutral-900")}>
          {t("aboutUs")}
        </Link>
        <Link to="" className={cn("hover:text-neutral-900")}>
          {t("contact")}
        </Link>
      </div>
      <div className="group flex items-center justify-end gap-2 text-sm font-bold text-neutral-500">
        <GlobeAmericasIcon className="h-4" />
        <LocaleLink locale="en">English</LocaleLink>
        <LocaleLink locale="es">Español</LocaleLink>
        <LocaleLink locale="de">Deutsch</LocaleLink>
        <LocaleLink locale="fr">Français</LocaleLink>
      </div>
    </header>
  );
}

type LocaleLinkProps = {
  locale: string;
  children: string;
};

function LocaleLink({ children, locale }: LocaleLinkProps) {
  const { i18n } = useTranslation();
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
      {children}
    </RemixLink>
  );
}
