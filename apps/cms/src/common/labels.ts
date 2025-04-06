"use client";

import { LabelFunction } from "payload";
import { useTranslation } from "@payloadcms/ui";
import { I18nClient } from "@payloadcms/translations";

type LabelData = LabelFunction | string | Record<string, string>;

export function Label({ children }: { children: LabelData }) {
  const { i18n } = useTranslation();
  return getLabelText(children, i18n);
}

export function getLabelText(data: LabelData, i18n: I18nClient) {
  if (typeof data === "string") {
    return data;
  }

  if (typeof data === "object") {
    return data[i18n.language];
  }

  if (typeof data === "function") {
    return data({ t: i18n.t as Parameters<LabelFunction>[0]["t"], i18n });
  }

  throw new Error("Invalid label type");
}
