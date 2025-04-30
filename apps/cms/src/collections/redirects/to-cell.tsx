"use client";

import { TranslationsKey, TranslationsObject } from "@/translations";
import { usePayloadAPI, useTranslation } from "@payloadcms/ui";
import { DefaultCellComponentProps } from "payload";

export function ToCell({ cellData }: DefaultCellComponentProps) {
  const [{ data: page, isLoading, isError }] = usePayloadAPI(
    `/api/pages/${encodeURIComponent(cellData.page)}`,
  );
  const { t } = useTranslation<TranslationsObject, TranslationsKey>();

  if (isLoading) return <div>{t("general:loading")}…</div>;
  if (isError) {
    return <div>{t("error:loadingDocument", { id: cellData.page })}</div>;
  }

  return `${t("custom:pages:name")}: ${page.pathname}${cellData.queryString ? `?${cellData.queryString}` : ""}${cellData.fragment ? `#${cellData.fragment}` : ""}`;
}
