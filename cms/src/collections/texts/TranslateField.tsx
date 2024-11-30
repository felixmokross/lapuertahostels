"use client";

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Button,
  useFormModified,
  useDocumentInfo,
  useLocale,
  useTranslation,
  toast,
  formatDrawerSlug,
  Drawer,
  useModal,
} from "@payloadcms/ui";
import { TranslationsKey, TranslationsObject } from "@/translations";
import { Locale } from "payload";
import { Label } from "@/common/labels";
import Link from "next/link";

export const TranslateField: FunctionComponent<{ locales: Locale[] }> =
  function TranslateField({ locales }) {
    const { id } = useDocumentInfo();
    const { t } = useTranslation<TranslationsObject, TranslationsKey>();
    const locale = useLocale();
    const isModified = useFormModified();
    const { openModal, isModalOpen, closeModal } = useModal();

    const modalSlug = formatDrawerSlug({
      slug: `translations-${locale.code}`,
      depth: 0,
    });
    return (
      <>
        <Drawer slug={modalSlug}>
          {isModalOpen(modalSlug) && (
            <DrawerContent
              id={id as string}
              currentLocale={locale}
              locales={locales}
            />
          )}
        </Drawer>
        <Button disabled={isModified} onClick={() => openModal(modalSlug)}>
          {t("custom:texts:translateToAllLocales")}
        </Button>
        {isModified && (
          <p className="field-description">
            {t("custom:texts:pleaseSaveYourChangesToEnableTranslation")}
          </p>
        )}
      </>
    );
  };

function DrawerContent({
  id,
  currentLocale,
  locales,
}: {
  id: string;
  currentLocale: Locale;
  locales: Locale[];
}) {
  const [data, setData] = useState<Partial<any> | null>(null);

  const updateData = useCallback(
    async function updateData() {
      const result = await fetch(`/api/texts/${id}?locale=all`, {
        credentials: "include",
      });

      if (result.ok) {
        setData(await result.json());
      } else {
        setData(null);
      }
    },
    [id],
  );

  useEffect(() => {
    (async function () {
      await updateData();
    })();
  }, [updateData]);

  const { t } = useTranslation<TranslationsObject, TranslationsKey>();
  const [isTranslating, setIsTranslating] = useState(false);
  const otherLocales = locales.filter(
    (locale) => locale.code !== currentLocale.code,
  );

  if (!data) return <p>Loading…</p>;

  return (
    <div
      className={["table", false && "table--appearance-condensed"]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 10rem)",
        }}
      >
        <table cellPadding="0" cellSpacing="0" style={{ tableLayout: "fixed" }}>
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "var(--theme-bg)",
            }}
          >
            <tr>
              <th
                style={{
                  backgroundColor: "var(--theme-elevation-50)",
                  color: "var(--theme-elevation-700",
                  padding: "12px 3rem",
                }}
              >
                <Label>{currentLocale.label}</Label>
              </th>
              {otherLocales.map((locale) => (
                <th
                  key={locale.code}
                  style={{
                    padding: "12px 3rem",
                  }}
                >
                  <Label>{locale.label}</Label>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  minWidth: "40rem",
                  padding: "3rem",
                  backgroundColor: "var(--theme-elevation-100)",
                }}
              >
                <div style={{}}>
                  {data.type === "plainText" &&
                    data.text &&
                    data.text[currentLocale.code]}
                  {data.type === "richText" && data.richText_html && (
                    <div
                      lang={currentLocale.code}
                      dangerouslySetInnerHTML={{
                        __html: data.richText_html[currentLocale.code],
                      }}
                      style={{
                        pointerEvents: "none",
                        textAlign: "justify",
                        hyphens: "auto",
                      }}
                    />
                  )}
                </div>
              </td>
              {otherLocales.map((locale) => (
                <td
                  key={locale.code}
                  style={{
                    minWidth: "40rem",
                    padding: "3rem",
                  }}
                >
                  <div style={{}}>
                    {data.type === "plainText" &&
                      data.text &&
                      data.text[locale.code]}
                    {data.type === "richText" && data.richText_html && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.richText_html[locale.code],
                        }}
                        lang={locale.code}
                        style={{
                          pointerEvents: "none",
                          textAlign: "justify",
                          hyphens: "auto",
                        }}
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
          <tfoot
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "var(--theme-bg)",
            }}
          >
            <tr>
              <td
                style={{
                  backgroundColor: "var(--theme-elevation-50)",
                  padding: "12px 3rem",
                }}
              >
                <Button
                  size="medium"
                  buttonStyle="primary"
                  onClick={async () => {
                    if (
                      !window.confirm(
                        t("custom:texts:confirmTranslateToAllLocales"),
                      )
                    ) {
                      return;
                    }
                    setIsTranslating(true);
                    try {
                      const response = await fetch(
                        `/api/texts/${id}/translate?locale=${currentLocale.code}`,
                        {
                          method: "POST",
                          credentials: "include",
                        },
                      );
                      if (response.ok) {
                        await updateData();
                        console.info(
                          t("custom:texts:translatedToAllLocalesSuccessfully"),
                        );
                        toast.success(
                          t("custom:texts:translatedToAllLocalesSuccessfully"),
                          { duration: 3000 },
                        );
                      } else {
                        console.error(
                          t("custom:texts:failedToTranslateToAllLocales"),
                        );
                        toast.error(
                          t("custom:texts:failedToTranslateToAllLocales"),
                          {
                            duration: 3000,
                          },
                        );
                      }
                    } finally {
                      setIsTranslating(false);
                    }
                  }}
                  disabled={isTranslating}
                  icon={<SparklesIcon />}
                >
                  {isTranslating ? "Auto-translating…" : "Auto-translate"}
                </Button>
              </td>
              {otherLocales.map((locale) => (
                <td
                  key={locale.code}
                  style={{
                    padding: "12px 3rem",
                  }}
                >
                  <Button
                    el="link"
                    Link={Link}
                    to={`/admin/collections/texts/${id}?locale=${locale.code}`}
                    size="medium"
                    buttonStyle="secondary"
                    icon="edit"
                    disabled={isTranslating}
                  >
                    Edit
                  </Button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  );
}
