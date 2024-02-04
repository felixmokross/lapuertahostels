import { GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { Dropdown } from "../dropdown";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18n";
import { useMatch, Link as RemixLink } from "@remix-run/react";

export type LocaleSwitcherProps = {
  currentLocale: string;
};

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const { t } = useTranslation();
  const match = useMatch("/:locale/*");
  const splat = match?.params["*"];
  return (
    <Dropdown
      button={
        <Dropdown.Button className="flex items-center gap-1.5 text-sm font-bold text-neutral-500 hover:text-neutral-900">
          <GlobeAmericasIcon className="h-4" />
          {t(`languages.${currentLocale}`)}
        </Dropdown.Button>
      }
      menuPosition="right"
      manual
    >
      {i18nConfig.supportedLngs
        .filter((locale) => locale !== currentLocale)
        .map((locale) => (
          <Dropdown.Item
            key={locale}
            as={RemixLink}
            to={`/${locale}${splat ? `/${splat}` : ""}`}
            reloadDocument
          >
            {t(`languages.${locale}`)}
          </Dropdown.Item>
        ))}
    </Dropdown>
  );
}
