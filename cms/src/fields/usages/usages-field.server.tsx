import { Payload, UIFieldClient } from "payload";
import { findUsages } from ".";
import { UsagesConfig } from "./types";
import { I18nClient } from "@payloadcms/translations";
import { TranslationsKey, TranslationsObject } from "@/translations";
import { Pill, FieldLabel } from "@payloadcms/ui";
import { Label } from "@/common/labels";
import Link from "next/link";

export async function UsagesField({
  config,
  data,
  payload,
  i18n,
  clientField,
  path,
}: {
  config: UsagesConfig;
  data: any;
  payload: Payload;
  i18n: I18nClient<TranslationsObject, TranslationsKey>;
  clientField: UIFieldClient;
  path: string;
}) {
  const value = await findUsages(config, data.id, payload);
  const { t } = i18n;
  return (
    <>
      <div className="tw-mb-base tw-flex tw-items-center tw-justify-between">
        <FieldLabel
          label={clientField.label}
          localized={clientField.localized}
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
                        <Label>{usage.label}</Label>
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
}