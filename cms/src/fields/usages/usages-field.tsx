"use client";

import { useField, Pill, FieldLabel, useTranslation } from "@payloadcms/ui";
import { Usage } from "@/fields/usages";
import { JSONFieldClientComponent, LabelFunction } from "payload";
import { TranslationsKey, TranslationsObject } from "@/translations";
import Link from "next/link";
import { Label } from "@/common/labels";

export const UsagesField: JSONFieldClientComponent = function UsagesField({
  path,
  field,
}) {
  const { t } = useTranslation<TranslationsObject, TranslationsKey>();
  const { value } = useField<Usage[] | undefined>({ path });
  return (
    <>
      <div className="tw-mb-base tw-flex tw-items-center tw-justify-between">
        <FieldLabel
          label={field.label}
          localized={field.localized}
          path={path}
        />

        <span className="tw-text-theme-elevation-400">
          {t("custom:usages:numberOfUsages", {
            count: value?.length ?? 0,
          })}
        </span>
      </div>
      <div
        className={["table", "table--appearance-condensed"]
          .filter(Boolean)
          .join(" ")}
      >
        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>{t("custom:usages:type")}</th>
              <th>{t("custom:usages:name")}</th>
              <th>{t("custom:usages:fieldPath")}</th>
            </tr>
          </thead>
          <tbody>
            {value && value.length > 0 ? (
              value.map((usage, index) => (
                <tr key={index}>
                  <td>
                    <Pill>
                      {usage.type === "collection" ? (
                        <Label>{usage.collection}</Label>
                      ) : (
                        t("custom:usages:global")
                      )}
                    </Pill>
                  </td>
                  <td>
                    {usage.type === "collection" ? (
                      <Link
                        href={`/admin/collections/${usage.collection}/${usage.id}`}
                      >
                        {usage.title ?? usage.id}
                      </Link>
                    ) : (
                      <Link href={`/admin/globals/${usage.global}`}>
                        <Label>{usage.label}</Label>
                      </Link>
                    )}
                  </td>
                  <td>{usage.fieldPath}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="tw-py-base tw-text-center">
                  <span className="tw-text-theme-elevation-400">
                    {t("custom:usages:noUsages")}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
