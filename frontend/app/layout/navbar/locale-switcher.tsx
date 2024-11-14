import { GlobeAmericasIcon } from "@heroicons/react/16/solid";
import { Dropdown } from "~/common/dropdown";
import i18nConfig, { getLocaleLabel } from "~/i18n";

export type LocaleSwitcherProps = {
  currentLocale: string;
  redirectTo: string;
};

export function LocaleSwitcher({
  currentLocale,
  redirectTo,
}: LocaleSwitcherProps) {
  return (
    <Dropdown
      button={
        <Dropdown.Button className="flex items-center gap-1.5 text-sm font-bold text-neutral-500 hover:text-neutral-900">
          <GlobeAmericasIcon className="hidden h-4 md:inline" />
          <span className="hidden md:inline">
            {getLocaleLabel(currentLocale)}
          </span>
          <span className="inline uppercase md:hidden">{currentLocale}</span>
        </Dropdown.Button>
      }
      menuPosition="right"
      manual
    >
      {i18nConfig.supportedLngs
        .filter((locale) => locale !== currentLocale)
        .map((locale) => (
          <form
            key={locale}
            method="post"
            action="/locale"
            className="contents"
          >
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Dropdown.Item as="button" type="submit">
              {getLocaleLabel(locale)}
            </Dropdown.Item>
          </form>
        ))}
    </Dropdown>
  );
}
