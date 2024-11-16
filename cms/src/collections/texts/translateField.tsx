import { UIField } from "payload/types";
import React, { useState } from "react";
import { Button } from "payload/components/elements";
import { useDocumentInfo, useLocale } from "payload/components/utilities";
import { useTranslation } from "react-i18next";
import { useFormModified } from "payload/components/forms";
import { Slide, toast, ToastContainer } from "react-toastify";

export const translateField: UIField = {
  type: "ui",
  name: "translations",
  admin: {
    components: { Field },
  },
};

function Field() {
  const [isTranslating, setIsTranslating] = useState(false);
  const { id } = useDocumentInfo();
  const { t } = useTranslation();
  const locale = useLocale();
  const isModified = useFormModified();
  return (
    <>
      <Button
        disabled={isTranslating || isModified}
        onClick={async () => {
          if (!window.confirm(t("custom:texts.confirmTranslateToAllLocales"))) {
            return;
          }

          setIsTranslating(true);

          try {
            await fetch(`/api/texts/${id}/translate?locale=${locale}`, {
              method: "POST",
              credentials: "include",
            });

            toast.success(
              t("custom:texts.translatedToAllLocalesSuccessfully"),
              { autoClose: 3000 },
            );
          } finally {
            setIsTranslating(false);
          }
        }}
      >
        {isTranslating
          ? t("custom:texts.translatingToAllLocales")
          : t("custom:texts.translateToAllLocales")}
      </Button>
      {/* For some reason, the Root toast container doesn't work – just working around as we soon upgrade to Payload 3 anyway */}
      <ToastContainer
        icon={false}
        position="bottom-center"
        transition={Slide}
      />
      {isModified && (
        <p className="field-description">
          {t("custom:texts.pleaseSaveYourChangesToEnableTranslation")}
        </p>
      )}
    </>
  );
}
