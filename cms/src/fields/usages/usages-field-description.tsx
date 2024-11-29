"use client";

import { Usage } from ".";
import { FieldDescription, useField, useTranslation } from "@payloadcms/ui";
import { JSONFieldDescriptionClientComponent } from "payload";
import { TranslationsKey, TranslationsObject } from "@/translations";

export const UsagesFieldDescription: JSONFieldDescriptionClientComponent =
  function UsageCountField({ path }) {
    const field = useField({ path });
    const { t } = useTranslation<TranslationsObject, TranslationsKey>();
    return (
      <FieldDescription
        path={path}
        description={t("custom:texts:numberOfUsages", {
          count: (field.value as Usage[]).length,
        })}
        marginPlacement="top"
      />
    );
  };
