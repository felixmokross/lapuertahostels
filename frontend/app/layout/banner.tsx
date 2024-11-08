import { XMarkIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { cn } from "~/common/cn";
import { Transition } from "@headlessui/react";
import { useTheme } from "~/themes";
import { Text, type Banner } from "~/payload-types";
import { PageLink } from "~/common/page-link";
import { useState } from "react";

export type BannerProps = Banner;

export function Banner({ message, cta }: BannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  if (message != null && typeof message !== "object") {
    throw new Error("Invalid message");
  }

  if (cta?.show && typeof cta.label !== "object") {
    throw new Error("Invalid CTA label");
  }
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
        {message?.text}
        {cta?.show && (
          <>
            {" "}
            <span className="mx-1">&middot;</span>{" "}
            <PageLink
              link={cta.link!}
              className="text-nowrap font-bold after:content-['_→'] hover:underline"
            >
              {(cta.label as Text).text}
            </PageLink>
          </>
        )}
      </div>
      <div className="flex flex-1 justify-end">
        <button
          onClick={() => setIsDismissed(true)}
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
