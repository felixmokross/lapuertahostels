import { LanguageIcon } from "@heroicons/react/16/solid";
import { Locale } from "@lapuertahostels/payload-types";
import { cn } from "~/common/cn";
import { Dropdown, DropdownButton, DropdownItem } from "~/common/dropdown";

export type LocaleSwitcherProps = {
  currentLocale: string;
  redirectTo: string;
  className?: string;
  publishedLocales: Pick<Locale, "locale" | "displayLabel">[];
};

export function LocaleSwitcher({
  currentLocale,
  redirectTo,
  className,
  publishedLocales,
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
          {
            publishedLocales.find((l) => l.locale === currentLocale)
              ?.displayLabel
          }
        </DropdownButton>
      }
      menuPosition="right"
      manual
    >
      {publishedLocales
        .filter((locale) => locale.locale !== currentLocale)
        .map((locale) => (
          <form
            key={locale.locale}
            method="post"
            action="/locale"
            className="contents"
          >
            <input type="hidden" name="locale" value={locale.locale} />
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <DropdownItem as="button" type="submit">
              {locale.displayLabel}
            </DropdownItem>
          </form>
        ))}
    </Dropdown>
  );
}
