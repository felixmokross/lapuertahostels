import { XMarkIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { cn } from "~/common/cn";
import { Transition } from "@headlessui/react";
import { useTheme } from "~/themes";
import { Common } from "~/payload-types";
import { PageLink } from "~/common/page-link";

export type BannerProps = {
  isDismissed?: boolean;
  onDismiss?: () => void;
} & Omit<NonNullable<Common["banner"]>, "show">;

export function Banner({ message, cta, isDismissed, onDismiss }: BannerProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Transition
      show={!isDismissed}
      className={cn(
        "flex items-center gap-x-6 px-6 py-2.5 text-sm text-white transition-colors duration-500 ease-linear sm:px-3.5 sm:before:flex-1",
        theme.bannerBackgroundColor,
      )}
      leave="transition-transform ease-out duration-500"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-full"
    >
      <div className="leading-6">
        {message}
        {cta?.show && (
          <>
            {" "}
            <span className="mx-1">&middot;</span>{" "}
            <PageLink
              link={cta.link!}
              className="text-nowrap font-bold after:content-['_→'] hover:underline"
            />
          </>
        )}
      </div>
      <div className="flex flex-1 justify-end">
        <button
          onClick={onDismiss}
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">{t("bannerDismiss")}</span>
          <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </Transition>
  );
}
