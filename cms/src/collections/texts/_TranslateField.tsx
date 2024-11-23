"use client";

import React, { useState } from "react";
import {
  Button,
  useFormModified,
  useDocumentInfo,
  useLocale,
  useTranslation,
  toast,
} from "@payloadcms/ui";
import { TranslationsKey, TranslationsObject } from "@/translations";

export function TranslateField() {
  const [isTranslating, setIsTranslating] = useState(false);
  const { id } = useDocumentInfo();
  const { t } = useTranslation<TranslationsObject, TranslationsKey>();
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
              `/api/texts/${id}/translate?locale=${locale.code}`,
              {
                method: "POST",
                credentials: "include",
              },
            );

            if (response.ok) {
              console.info(
                t("custom:texts:translatedToAllLocalesSuccessfully"),
              );
              toast.success(
                t("custom:texts:translatedToAllLocalesSuccessfully"),
                { duration: 3000 },
              );
            } else {
              console.error(t("custom:texts:failedToTranslateToAllLocales"));
              toast.error(t("custom:texts:failedToTranslateToAllLocales"), {
                duration: 3000,
              });
            }
          } finally {
            setIsTranslating(false);
          }
        }}
      >
        {isTranslating
          ? t("custom:texts:translatingToAllLocales")
          : t("custom:texts:translateToAllLocales")}
      </Button>
      {isModified && (
        <p className="field-description">
          {t("custom:texts:pleaseSaveYourChangesToEnableTranslation")}
        </p>
      )}
    </>
  );
}
