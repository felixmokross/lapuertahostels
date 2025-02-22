"use client";

import { Text } from "@/payload-types";
import { TranslationsKey, TranslationsObject } from "@/translations";
import { usePayloadAPI, useRowLabel, useTranslation } from "@payloadcms/ui";

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

  const textId = getValueByPath(data, textProp) as string | { value: string };
  if (!textId) {
    return fallbackLabel;
  }

  return (
    <RowLabelWithDefinedText
      textId={typeof textId === "object" ? textId.value : textId}
      fallbackLabel={fallbackLabel}
    />
  );
}

type RowLabelWithDefinedTextProps = {
  textId: string;
  fallbackLabel: string;
};

function RowLabelWithDefinedText({
  textId,
  fallbackLabel,
}: RowLabelWithDefinedTextProps) {
  const [{ data, isError }] = usePayloadAPI(`/api/texts/${textId}`);
  const text = data as Text;

  return text?.title ?? fallbackLabel;
}

function getValueByPath(data: Record<string, any>, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], data);
}
