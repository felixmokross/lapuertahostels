import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Banner() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const { t } = useTranslation();
  if (!bannerVisible) return null;
  return (
    <div className="flex items-center gap-x-6 bg-puerta-800 px-6 py-2.5 text-sm text-white sm:px-3.5 sm:before:flex-1">
      <div className="flex gap-2 leading-6">
        <p>{t("bannerMessage")}</p>
        <Link to="/" className="font-bold hover:underline">
          <strong>{t("bannerCta")} &rarr;</strong>
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
