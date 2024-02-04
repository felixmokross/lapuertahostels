import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "./link";
import { cn } from "./classnames";
import { Transition } from "@headlessui/react";
import { Brand, brands } from "../brands";

export type BannerProps = {
  children: string;
  cta: string;
  ctaTo: string;
  brand: Brand;
};

export function Banner({ children, cta, ctaTo, brand }: BannerProps) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const { t } = useTranslation();

  return (
    <Transition
      show={bannerVisible}
      className={cn(
        "flex items-center gap-x-6 px-6 py-2.5 text-sm text-white transition-colors duration-500 ease-linear sm:px-3.5 sm:before:flex-1",
        brands[brand].bannerBackgroundColor,
      )}
      leave="transition-transform ease-in duration-500"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-full"
    >
      <div className="flex gap-2 leading-6">
        <p>{children}</p>
        <Link to={ctaTo} className="font-bold hover:underline">
          <strong>{cta} &rarr;</strong>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          onClick={() => setBannerVisible(false)}
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
