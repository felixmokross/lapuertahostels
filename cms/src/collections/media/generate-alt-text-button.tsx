"use client";

import { SparklesIcon } from "@/common/icons";
import { TranslationsKey, TranslationsObject } from "@/translations";
import {
  Button,
  toast,
  useDocumentInfo,
  useForm,
  useFormModified,
  useLocale,
  useTranslation,
} from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function GenerateAltTextButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const locale = useLocale();
  const { id } = useDocumentInfo();
  const { getData } = useForm();
  const router = useRouter();
  const isModified = useFormModified();
  const { t } = useTranslation<TranslationsObject, TranslationsKey>();

  const { mimeType } = getData();
  if (!mimeType || !mimeType.includes("image/")) {
    return null;
  }

  if (typeof id !== "string") throw new Error("Expected id to be a string");
  return (
    <>
      <Button
        size="medium"
        icon={<SparklesIcon />}
        buttonStyle="secondary"
        onClick={async () => {
          if (
            !window.confirm(
              "This will send the image to OpenAI to generate an alternative text. The text will be translated into all locales using DeepL.\n\nThe existing alternative text will be overwritten. Do you want to continue?",
            )
          ) {
            return;
          }

          setIsGenerating(true);

          try {
            const result = await fetch(
              `/api/media/${id}/update-alt-text?locale=${locale.code}`,
              {
                method: "post",
                credentials: "include",
              },
            );

            if (!result.ok) {
              toast.error(t("custom:media:generate:failure"), {
                duration: 3000,
              });
              return;
            }

            router.refresh();
            toast.success(t("custom:media:generate:success"), {
              duration: 3000,
            });
          } finally {
            setIsGenerating(false);
          }
        }}
        disabled={isGenerating || isModified}
      >
        {isGenerating
          ? t("custom:media:generate:generating")
          : t("custom:media:generate:generate")}
      </Button>
      {isModified && (
        <p className="field-description -tw-mt-4 tw-mb-8">
          {t("custom:media:generate:pleaseSaveYourChangesToGenerateAltText")}
        </p>
      )}
    </>
  );
}
