"use client";

import React, { useState } from "react";
import {
  Button,
  useFormModified,
  useDocumentInfo,
  useLocale,
  useTranslation,
} from "@payloadcms/ui";
import { TranslationsKeys, TranslationsObject } from "@/translations";

export function TranslateField() {
  const [isTranslating, setIsTranslating] = useState(false);
  const { id } = useDocumentInfo();
  const { t } = useTranslation<TranslationsObject, TranslationsKeys>();
  const locale = useLocale();
  const isModified = useFormModified();
  return (
    <>
      <Button
        disabled={isTranslating || isModified}
        onClick={async () => {
          if (!window.confirm(t("custom:texts:confirmTranslateToAllLocales"))) {
            return;
          }

          setIsTranslating(true);

          try {
            const response = await fetch(
              `/api/texts/${id}/translate?locale=${locale}`,
              {
                method: "POST",
                credentials: "include",
              },
            );

            // TODO how can we send toasts in Payload 3?
            // if (response.ok) {
            //   toast.success(
            //     t("custom:texts.translatedToAllLocalesSuccessfully"),
            //     { autoClose: 3000 },
            //   );
            // } else {
            //   toast.error(t("custom:texts.failedToTranslateToAllLocales"), {
            //     autoClose: 3000,
            //   });
            // }
          } finally {
            setIsTranslating(false);
          }
        }}
      >
        {isTranslating
          ? t("custom:texts:translatingToAllLocales")
          : t("custom:texts:translateToAllLocales")}
      </Button>
      {/* TODO how can we send toasts in Payload 3? */}
      {/* For some reason, the Root toast container doesn't work – just working around as we soon upgrade to Payload 3 anyway */}
      {/* <ToastContainer
        icon={false}
        position="bottom-center"
        transition={Slide}
      /> */}
      {isModified && (
        <p className="field-description">
          {t("custom:texts:pleaseSaveYourChangesToEnableTranslation")}
        </p>
      )}
    </>
  );
}
