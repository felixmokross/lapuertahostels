import { GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { Dropdown } from "../dropdown";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18n";
import { useLocation } from "@remix-run/react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "../cn";
import { useBrand } from "~/brands";

export type LocaleSwitcherProps = {
  currentLocale: string;
};

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <Dropdown
      button={
        <Dropdown.Button className="flex items-center gap-1.5 text-sm font-bold text-neutral-500 hover:text-neutral-900">
          <GlobeAmericasIcon className="hidden h-4 md:inline" />
          <span className="hidden md:inline">
            {t(`languages.${currentLocale}`)}
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
            <input
              type="hidden"
              name="redirectTo"
              value={`${location.pathname}${location.search}${location.hash}`}
            />
            <Dropdown.Item as="button" type="submit">
              {t(`languages.${locale}`)}
            </Dropdown.Item>
          </form>
        ))}
    </Dropdown>
  );
}
export type MobileLocaleSwitcherProps = {
  currentLocale: string;
  open: boolean;
  onClose: () => void;
};

export function MobileLocaleSwitcher({
  currentLocale,
  open,
  onClose,
}: MobileLocaleSwitcherProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const brand = useBrand();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-sm transform overflow-hidden rounded-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all sm:my-8">
                {i18nConfig.supportedLngs.map((locale) => (
                  <form
                    key={locale}
                    method="post"
                    action="/locale"
                    className="contents"
                  >
                    <input type="hidden" name="locale" value={locale} />
                    <input
                      type="hidden"
                      name="redirectTo"
                      value={`${location.pathname}${location.search}${location.hash}`}
                    />
                    <button
                      type="submit"
                      className={cn(
                        "flex w-full items-center gap-1.5 border-l-4 py-2 pl-6 pr-8 text-base font-bold",
                        currentLocale !== locale
                          ? "border-transparent text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700"
                          : brand.navButtonClassName,
                      )}
                    >
                      {t(`languages.${locale}`)}
                    </button>
                  </form>
                ))}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
