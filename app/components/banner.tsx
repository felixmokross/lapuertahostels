import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "./link";
import { cn } from "./classnames";

export type BannerProps = {
  children: string;
  cta: string;
  ctaTo: string;
  variant: "puerta" | "aqua" | "azul";
};

export function Banner({ children, cta, ctaTo, variant }: BannerProps) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const { t } = useTranslation();
  if (!bannerVisible) return null;
  return (
    <div
      className={cn(
        "flex items-center gap-x-6  px-6 py-2.5 text-sm text-white sm:px-3.5 sm:before:flex-1",
        {
          "bg-puerta-800": variant === "puerta",
          "bg-azul-950": variant === "azul",
          "bg-aqua-600": variant === "aqua",
        },
      )}
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
    </div>
  );
}
