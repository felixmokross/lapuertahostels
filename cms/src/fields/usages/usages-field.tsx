"use client";

import { useField, Pill, FieldLabel, useTranslation } from "@payloadcms/ui";
import { Usage } from "@/fields/usages";
import { JSONFieldClientComponent, LabelFunction } from "payload";
import { TranslationsKey, TranslationsObject } from "@/translations";
import Link from "next/link";

export const UsagesField: JSONFieldClientComponent = function UsagesField({
  path,
  field,
}) {
  const { t, i18n } = useTranslation<TranslationsObject, TranslationsKey>();
  const { value } = useField<Usage[] | undefined>({ path });
  return (
    <>
      <div
        style={{
          marginBottom: "var(--base)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <FieldLabel
          label={field.label}
          localized={field.localized}
          path={path}
        />

        <span style={{ color: "var(--theme-elevation-400)" }}>
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
                      {usage.type === "collection"
                        ? renderLabel(usage.label)
                        : t("custom:usages:global")}
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
                        {renderLabel(usage.label)}
                      </Link>
                    )}
                  </td>
                  <td>{usage.fieldPath}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    paddingTop: "var(--base)",
                    paddingBottom: "var(--base)",
                  }}
                >
                  <span style={{ color: "var(--theme-elevation-400)" }}>
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

  function renderLabel(label: LabelFunction | string | Record<string, string>) {
    if (typeof label === "string") {
      return label;
    }

    if (typeof label === "object") {
      return label[i18n.language];
    }

    if (typeof label === "function") {
      return label({ t: t as Parameters<LabelFunction>[0]["t"] });
    }

    throw new Error("Invalid label type");
  }
};
