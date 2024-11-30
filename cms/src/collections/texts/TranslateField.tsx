"use client";

import React, {
  FunctionComponent,
  PropsWithChildren,
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
import { LanguagesIcon, SparklesIcon } from "@/common/icons";
import { cn } from "@/common/cn";
import { Text } from "@/payload-types";

export const TranslateField: FunctionComponent<{ locales: Locale[] }> =
  function TranslateField({ locales }) {
    const { id } = useDocumentInfo();
    const { t } = useTranslation<TranslationsObject, TranslationsKey>();
    const locale = useLocale();
    const isModified = useFormModified();
    const { openModal, isModalOpen } = useModal();

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
        <Button
          disabled={isModified}
          onClick={() => openModal(modalSlug)}
          size="large"
          buttonStyle="secondary"
          icon={<LanguagesIcon />}
        >
          {t("custom:texts:translations")}
        </Button>
        {isModified && (
          <p className="field-description -tw-mt-4 tw-mb-8">
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
  const [data, setData] = useState<AllLocalesText | null>(null);

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

  if (!data) {
    return (
      <div className="tw-h-[calc(100vh-10rem)] tw-flex tw-justify-center tw-items-center tw-text-2xl tw-text-theme-elevation-600">
        {t("custom:common:loading")}
      </div>
    );
  }
  const showWideColumns = isLongContent(data, currentLocale.code);

  return (
    <div className="table">
      <div className="tw-max-h-[calc(100vh-10rem)] tw-overflow-y-auto">
        <table
          className="tw-min-w-[unset] tw-table-fixed"
          cellPadding="0"
          cellSpacing="0"
        >
          <thead className="tw-sticky tw-top-0 tw-bg-theme-bg">
            <tr>
              <TableHeaderFooterCell isHighlighted={true}>
                <Label>{currentLocale.label}</Label>
              </TableHeaderFooterCell>
              {otherLocales.map((locale) => (
                <TableHeaderFooterCell key={locale.code}>
                  <Label>{locale.label}</Label>
                </TableHeaderFooterCell>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableContentCell isWide={showWideColumns} isHighlighted={true}>
                <AllLocalesTextRenderer
                  data={data}
                  localeCode={currentLocale.code}
                />
              </TableContentCell>
              {otherLocales.map((locale) => (
                <TableContentCell key={locale.code} isWide={showWideColumns}>
                  <AllLocalesTextRenderer
                    data={data}
                    localeCode={locale.code}
                  />
                </TableContentCell>
              ))}
            </tr>
          </tbody>
          <tfoot className="tw-sticky tw-bottom-0 tw-bg-theme-bg">
            <tr>
              <TableHeaderFooterCell isHighlighted>
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
                          t("custom:texts:autoTranslatedSuccessfully"),
                        );
                        toast.success(
                          t("custom:texts:autoTranslatedSuccessfully"),
                          { duration: 3000 },
                        );
                      } else {
                        console.error(t("custom:texts:failedToAutoTranslate"));
                        toast.error(t("custom:texts:failedToAutoTranslate"), {
                          duration: 3000,
                        });
                      }
                    } finally {
                      setIsTranslating(false);
                    }
                  }}
                  disabled={isTranslating}
                  icon={<SparklesIcon />}
                >
                  {isTranslating
                    ? t("custom:texts:translating")
                    : t("custom:texts:autoTranslate")}
                </Button>
              </TableHeaderFooterCell>
              {otherLocales.map((locale) => (
                <TableHeaderFooterCell key={locale.code}>
                  <Button
                    el="link"
                    Link={Link}
                    to={`/admin/collections/texts/${id}?locale=${locale.code}`}
                    size="medium"
                    buttonStyle="secondary"
                    icon="edit"
                    disabled={isTranslating}
                  >
                    {t("custom:texts:editTranslation")}
                  </Button>
                </TableHeaderFooterCell>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

type TableHeaderCellProps = PropsWithChildren<{
  isHighlighted?: boolean;
}>;

function TableHeaderFooterCell({
  children,
  isHighlighted = false,
}: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        "tw-px-12 tw-py-3",
        isHighlighted && "tw-bg-theme-elevation-50 tw-text-theme-elevation-700",
      )}
    >
      {children}
    </th>
  );
}

type TableContentCellProps = PropsWithChildren<{
  isWide?: boolean;
  isHighlighted?: boolean;
}>;

function TableContentCell({
  isWide,
  isHighlighted = false,
  children,
}: TableContentCellProps) {
  return (
    <td
      className={cn(
        isWide
          ? "tw-w-[40rem] tw-min-w-[40rem]"
          : "tw-w-[24rem] tw-min-w-[24rem]",
        "tw-p-12",
        isHighlighted
          ? "tw-bg-theme-elevation-100"
          : "tw-bg-theme-elevation-50",
      )}
    >
      {children}
    </td>
  );
}

type AllLocalesText = Pick<Text, "type"> & {
  text?: Record<string, string>;
  richText_html?: Record<string, string>;
};

type AllLocalesTextRendererProps = {
  data: AllLocalesText;
  localeCode: string;
};

function AllLocalesTextRenderer({
  data,
  localeCode,
}: AllLocalesTextRendererProps) {
  return (
    <>
      {data.type === "plainText" && data.text && data.text[localeCode]}
      {data.type === "richText" && data.richText_html && (
        <div
          dangerouslySetInnerHTML={{
            __html: data.richText_html[localeCode],
          }}
          lang={localeCode}
          className="tw-pointer-events-none tw-text-justify tw-hyphens-auto"
        />
      )}
    </>
  );
}

function isLongContent(data: AllLocalesText, localeCode: string) {
  const fullText =
    data.type === "plainText"
      ? data.text
        ? data.text[localeCode]
        : ""
      : data.richText_html
        ? data.richText_html[localeCode]
        : "";
  return fullText.length > 200;
}
