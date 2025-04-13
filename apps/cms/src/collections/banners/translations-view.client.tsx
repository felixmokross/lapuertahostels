"use client";

import { Button, Pill, toast, useTranslation } from "@payloadcms/ui";
import { CollectionSlug, Locale } from "payload";
import { saveTranslations } from "./save-translations";
import { getLabelText } from "@/common/labels";
import { useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { SparklesIcon } from "@/common/icons";
import { autoTranslate } from "./auto-translate";
import { CheckboxInput } from "../texts/translations-field";
import { TranslationsKey, TranslationsObject } from "@/translations";
import { deepMerge } from "@/common/records";

export function TranslationsViewClient({
  documentId,
  fieldPaths,
  locales,
  docWithTranslations,
  locale,
  collection,
}: {
  documentId: string;
  fieldPaths: string[];
  locales: Locale[];
  docWithTranslations: object;
  locale: Locale | undefined;
  collection: CollectionSlug;
}) {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLocales, setSelectedLocales] = useState<string[]>(
    locales.map((l) => l.code),
  );
  const [texts, setTexts] = useState<Record<string, Record<string, string>>>(
    Object.fromEntries(
      fieldPaths.map((p) => [
        p,
        getValue(docWithTranslations, p) as unknown as Record<string, string>,
      ]),
    ),
  );
  const [isDirty, setIsDirty] = useState(false);
  const { t, i18n } = useTranslation<TranslationsObject, TranslationsKey>();
  const [isPending, startTransition] = useTransition();
  return (
    <form
      className="tw:contents"
      action={async (formData) => {
        setIsDirty(false);
        await saveTranslations(formData);

        toast.success(t("custom:banners:translationsSaved"), {
          duration: 3000,
        });
      }}
    >
      <input type="hidden" name="id" value={documentId} />
      <input type="hidden" name="collection" value={collection} />
      <div className="gutter--left gutter--right tw:gap-4 tw:flex tw:justify-end tw:h-[var(--doc-controls-height)] tw:items-center">
        <Button
          disabled={
            isPending ||
            selectedFields.length === 0 ||
            selectedLocales.length === 0
          }
          type="button"
          buttonStyle="secondary"
          size="medium"
          icon={<SparklesIcon />}
          onClick={async () => {
            startTransition(async () => {
              const result = await autoTranslate({
                fromLocale: locale!.code,
                toLocales: selectedLocales,
                texts: Object.fromEntries(
                  Object.entries(texts)
                    .filter(([fieldPath]) => selectedFields.includes(fieldPath))
                    .map(([fieldPath, textsByLocale]) => [
                      fieldPath,
                      textsByLocale[locale!.code],
                    ]),
                ),
              });

              setTexts(
                (prev) =>
                  deepMerge(prev, result) as Record<
                    string,
                    Record<string, string>
                  >,
              );
              setIsDirty(true);

              toast.success(t("custom:banners:autoTranslationFinished"), {
                duration: 3000,
              });
            });
          }}
        >
          {isPending
            ? t("custom:banners:autoTranslating")
            : t("custom:banners:autoTranslate")}
        </Button>
        <SubmitButton isFormDirty={isDirty} />
      </div>
      <div className="tw:pb-4 tw:overflow-x-auto">
        <table
          cellPadding="0"
          cellSpacing="0"
          className="tw:table-fixed tw:w-full tw:relative"
        >
          <colgroup>
            <col className="tw:w-[150px]"></col>
            {locales.map((l) => (
              <col key={l.code} className="tw:w-[200px]"></col>
            ))}
          </colgroup>
          <thead>
            <tr className="tw:bg-theme-elevation-50">
              <th className="tw:sticky tw:left-0 tw:py-2 tw:px-[17px] tw:text-theme-elevation-400 tw:text-left tw:font-normal tw:bg-theme-elevation-50 tw:z-10 tw:border-b tw:border-r tw:border-theme-elevation-100">
                <CheckboxInput
                  checked={selectedFields.length === fieldPaths.length}
                  setChecked={() =>
                    setSelectedFields((v) =>
                      v.length === fieldPaths.length ? [] : fieldPaths,
                    )
                  }
                  label={t("custom:banners:field")}
                />
              </th>
              <th className="tw:py-2 tw:px-[17px] tw:text-left tw:text-theme-elevation-400 tw:font-normal tw:border-b tw:border-r tw:border-theme-elevation-100">
                {getLabelText(locale!.label, i18n)}{" "}
                <Pill rounded={true}>{t("custom:banners:currentLocale")}</Pill>
              </th>
              {locales
                .filter((l) => l.code !== locale?.code)
                .map((l) => (
                  <th
                    key={l.code}
                    className="tw:py-2 tw:px-[17px] tw:text-left tw:text-theme-elevation-400 tw:font-normal tw:border-b tw:border-r tw:border-theme-elevation-100"
                  >
                    <CheckboxInput
                      checked={selectedLocales.includes(l.code)}
                      setChecked={() => {
                        setSelectedLocales((v) =>
                          v.includes(l.code)
                            ? v.filter((x) => x !== l.code)
                            : [...v, l.code],
                        );
                      }}
                      label={getLabelText(l.label, i18n)}
                    />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {fieldPaths.map((p) => (
              <tr key={p}>
                <th className="tw:sticky tw:text-theme-elevation-400 tw:text-left tw:font-normal tw:left-0 tw:py-2 tw:px-[17px] tw:bg-theme-elevation-50 tw:z-10 tw:border-b tw:border-r tw:border-theme-elevation-100">
                  <CheckboxInput
                    checked={selectedFields.includes(p)}
                    setChecked={() => {
                      setSelectedFields((v) =>
                        v.includes(p) ? v.filter((x) => x !== p) : [...v, p],
                      );
                    }}
                    label={p}
                  />
                </th>
                <td className="tw:py-2 tw:px-[17px] tw:border-b tw:border-r tw:border-theme-elevation-100">
                  <Editor
                    value={texts[p] ? texts[p][locale!.code] : ""}
                    onChange={(value) => {
                      setTexts({
                        ...texts,
                        [p]: { ...texts[p], [locale!.code]: value },
                      });

                      setIsDirty(true);
                    }}
                  />
                  <input
                    type="hidden"
                    name={`${p}.${locale!.code}`}
                    value={texts[p] ? texts[p][locale!.code] : ""}
                  />
                </td>
                {locales
                  .filter((l) => l.code !== locale?.code)
                  .map((locale) => (
                    <td
                      key={locale.code}
                      className="tw:py-2 tw:px-[17px] tw:border-b tw:border-r tw:border-theme-elevation-100"
                    >
                      <Editor
                        value={texts[p] ? texts[p][locale.code] : ""}
                        onChange={(value) => {
                          setTexts({
                            ...texts,
                            [p]: { ...texts[p], [locale.code]: value },
                          });

                          setIsDirty(true);
                        }}
                      />
                      <input
                        type="hidden"
                        name={`${p}.${locale.code}`}
                        value={texts[p] ? texts[p][locale.code] : ""}
                      />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}

function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing && ref.current) {
      ref.current.focus();
    }
  }, [isEditing]);
  return (
    <>
      {isEditing ? (
        <div className="field-type text tw:-mx-[16px] tw:my-[calc(var(--tw-spacing)_*_-2_-_2px)]">
          <input
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={() => {
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                setIsEditing(false);
              }

              if (e.key === "Escape") {
                setIsEditing(false);
              }
            }}
            ref={ref}
          />
        </div>
      ) : (
        <div
          role="button"
          className="tw:focus:outline-1"
          tabIndex={0}
          onClick={() => setIsEditing(true)}
          onFocus={() => setIsEditing(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              (e.currentTarget as HTMLDivElement).click();
            }
          }}
        >
          {value}
        </div>
      )}
    </>
  );
}

function getValue(doc: object, fieldPath: string) {
  const fieldPathParts = fieldPath.split(".");
  let value = doc;
  for (const part of fieldPathParts) {
    if (value && typeof value === "object") {
      // @ts-expect-error
      value = value[part];
    } else {
      return undefined;
    }
  }

  return value;
}

function SubmitButton({ isFormDirty }: { isFormDirty: boolean }) {
  const { pending } = useFormStatus();
  const { t } = useTranslation<TranslationsObject, TranslationsKey>();
  return (
    <Button
      disabled={pending || !isFormDirty}
      size="medium"
      buttonStyle="primary"
      className="tw:my-0"
      type="submit"
    >
      {pending ? t("custom:banners:saving") : t("custom:banners:save")}
    </Button>
  );
}
