"use client";

import { TranslationsKey, TranslationsObject } from "@/translations";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { useRowLabel, useTranslation } from "@payloadcms/ui";

export type RowLabelProps = {
  textProp: string;
  fallbackLabelKey?: TranslationsKey;
};

export function RowLabel({ textProp, fallbackLabelKey }: RowLabelProps) {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>();
  const { t } = useTranslation<TranslationsObject, TranslationsKey>();

  fallbackLabelKey = fallbackLabelKey ?? "custom:rowLabel:item";

  // using this format to match the default behavior of the RowLabel component that is initially shown
  const fallbackLabel = t(fallbackLabelKey, {
    n: (rowNumber != null ? rowNumber + 1 : 0).toString().padStart(2, "0"),
  });

  const value = getValueByPath(data, textProp);

  return (
    (typeof value === "object"
      ? convertLexicalToPlaintext({ data: value })
      : value) || fallbackLabel
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValueByPath(data: Record<string, any>, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], data);
}
