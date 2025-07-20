import { LanguageIcon } from "@heroicons/react/16/solid";
import { cn } from "~/common/cn";
import { Dropdown, DropdownButton, DropdownItem } from "~/common/dropdown";
import { getLocaleLabel, supportedLngs } from "~/i18n";

export type LocaleSwitcherProps = {
  currentLocale: string;
  redirectTo: string;
  className?: string;
};

export function LocaleSwitcher({
  currentLocale,
  redirectTo,
  className,
}: LocaleSwitcherProps) {
  return (
    <Dropdown
      button={
        <DropdownButton
          className={cn(
            "flex items-center gap-1.5 text-sm font-bold text-neutral-500 hover:text-neutral-900",
            className,
          )}
        >
          <LanguageIcon className="h-4" />
          {getLocaleLabel(currentLocale)}
        </DropdownButton>
      }
      menuPosition="right"
      manual
    >
      {supportedLngs
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
            <DropdownItem as="button" type="submit">
              {getLocaleLabel(locale)}
            </DropdownItem>
          </form>
        ))}
    </Dropdown>
  );
}
