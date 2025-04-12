"use client";

import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
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
  Pill,
  CheckIcon,
} from "@payloadcms/ui";
import { TranslationsKey, TranslationsObject } from "@/translations";
import { Locale } from "payload";
import { getLabelText, Label } from "@/common/labels";
import { LanguagesIcon, SparklesIcon } from "@/common/icons";
import { cn } from "@/common/cn";
import { Text } from "@/payload-types";
import { useDrawerDepth } from "@payloadcms/ui/elements/Drawer";
import { Translation } from "@payloadcms/ui";

export const TranslationsField: FunctionComponent<{ locales: Locale[] }> =
  function TranslateField({ locales }) {
    const { id } = useDocumentInfo();
    const { t } = useTranslation<TranslationsObject, TranslationsKey>();
    const locale = useLocale();
    const isModified = useFormModified();
    const { openModal, isModalOpen } = useModal();

    const depth = useDrawerDepth();
    const modalSlug = formatDrawerSlug({
      slug: `translations-${locale.code}`,
      depth,
    });

    const translationsDisabled = !id || isModified;
    return (
      <>
        <Drawer slug={modalSlug} title={t("custom:texts:translationsTitle")}>
          {isModalOpen(modalSlug) && (
            <DrawerContent
              id={id as string}
              currentLocale={locale}
              locales={locales}
            />
          )}
        </Drawer>
        <Button
          disabled={translationsDisabled}
          onClick={() => openModal(modalSlug)}
          size="large"
          buttonStyle="secondary"
          icon={<LanguagesIcon />}
        >
          {t("custom:texts:translationsButtonLabel")}
        </Button>
        {translationsDisabled && (
          <p className="field-description tw:-mt-4 tw:mb-8">
            {t("custom:texts:pleaseSaveYourChangesToEnableAutoTranslate")}
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

  const { openModal, closeModal } = useModal();
  const drawerDepth = useDrawerDepth();

  useEffect(() => {
    (async function () {
      await updateData();
    })();
  }, [updateData]);

  const { t, i18n } = useTranslation<TranslationsObject, TranslationsKey>();
  const [isTranslating, setIsTranslating] = useState(false);
  const otherLocales = locales.filter(
    (locale) => locale.code !== currentLocale.code,
  );
  const [selectedLocaleCodes, setSelectedLocaleCodes] = useState(
    otherLocales.map((locale) => locale.code),
  );

  if (!data) {
    return (
      <div className="tw:flex tw:h-[calc(100vh-10rem)] tw:items-center tw:justify-center tw:text-2xl tw:text-theme-elevation-600">
        {t("custom:common:loading")}
      </div>
    );
  }
  const showWideColumns = isLongContent(data, currentLocale.code);

  const selectLocalesModalSlug = formatDrawerSlug({
    slug: `auto-translate-confirmation`,
    depth: drawerDepth,
  });

  return (
    <>
      <Drawer
        slug={selectLocalesModalSlug}
        title={t("custom:texts:selectLocales")}
      >
        <div className="tw:mt-8 tw:space-y-4">
          <p>
            <Translation
              // @ts-expect-error types don't match
              t={t}
              // @ts-expect-error types don't match
              i18nKey="custom:texts:selectLocalesDescription"
              variables={{
                sourceLocale: getLabelText(currentLocale.label, i18n),
              }}
              elements={{
                a: ({ children }) => (
                  <a
                    href="https://www.deepl.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </p>
        </div>
        <div className="tw:mt-8 tw:space-y-4">
          {otherLocales.map((locale) => (
            <div key={locale.code}>
              <CheckboxInput
                label={<Label>{locale.label}</Label>}
                name={`locale-${locale.code}`}
                checked={selectedLocaleCodes.includes(locale.code)}
                setChecked={(checked) =>
                  setSelectedLocaleCodes((slc) =>
                    checked
                      ? [...slc, locale.code]
                      : slc.filter((lc) => lc !== locale.code),
                  )
                }
              />
            </div>
          ))}
        </div>

        <p className="tw:mt-8">
          <Translation
            // @ts-expect-error types don't match
            t={t}
            // @ts-expect-error types don't match
            i18nKey="custom:texts:selectLocalesNote"
            elements={{ s: ({ children }) => <strong>{children}</strong> }}
          />
        </p>
        <div className="tw:mt-1">
          <Button
            type="submit"
            size="large"
            onClick={async () => {
              setIsTranslating(true);
              try {
                const response = await fetch(
                  `/api/texts/${id}/translate?locale=${currentLocale.code}`,
                  {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                      targetLocaleCodes: selectedLocaleCodes,
                    }),
                  },
                );
                if (response.ok) {
                  await updateData();
                  closeModal(selectLocalesModalSlug);
                  console.info(t("custom:texts:autoTranslatedSuccessfully"));
                  toast.success(t("custom:texts:autoTranslatedSuccessfully"), {
                    duration: 3000,
                  });
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
            disabled={isTranslating || selectedLocaleCodes.length === 0}
          >
            {isTranslating
              ? t("custom:texts:translating")
              : t("custom:texts:translateToSelectedLocales")}
          </Button>
        </div>
      </Drawer>
      <div className="table">
        <div className="tw:max-h-[calc(100vh-10rem)] tw:overflow-y-auto">
          <table
            className="tw:min-w-[unset] tw:table-fixed"
            cellPadding="0"
            cellSpacing="0"
          >
            <thead className="tw:bg-theme-bg">
              <tr>
                <TableHeaderFooterCell
                  isHighlighted={true}
                  isStickyLeft={true}
                  isStickyTop={true}
                >
                  <Label>{currentLocale.label}</Label>
                  <Pill rounded={true}>{t("custom:texts:currentLocale")}</Pill>
                </TableHeaderFooterCell>
                {otherLocales.map((locale) => (
                  <TableHeaderFooterCell key={locale.code} isStickyTop={true}>
                    <Label>{locale.label}</Label>
                  </TableHeaderFooterCell>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableContentCell
                  isWide={showWideColumns}
                  isHighlighted={true}
                  isStickyLeft={true}
                >
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
            <tfoot className="tw:bg-theme-bg">
              <tr>
                <TableHeaderFooterCell
                  isHighlighted={true}
                  isStickyLeft={true}
                  isStickyBottom={true}
                >
                  <Button
                    size="medium"
                    buttonStyle="primary"
                    onClick={() => openModal(selectLocalesModalSlug)}
                    disabled={isTranslating}
                    icon={<SparklesIcon />}
                  >
                    {t("custom:texts:autoTranslate")}
                  </Button>
                </TableHeaderFooterCell>
                {otherLocales.map((locale) => (
                  <TableHeaderFooterCell
                    key={locale.code}
                    isStickyBottom={true}
                  >
                    <Button
                      el="link"
                      to={`/admin/collections/texts/${id}?locale=${locale.code}`}
                      size="medium"
                      buttonStyle="secondary"
                      icon="edit"
                      disabled={isTranslating}
                    >
                      {t("custom:texts:goToTranslation")}
                    </Button>
                  </TableHeaderFooterCell>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

type TableHeaderCellProps = PropsWithChildren<{
  isHighlighted?: boolean;
  isStickyTop?: boolean;
  isStickyLeft?: boolean;
  isStickyBottom?: boolean;
}>;

function TableHeaderFooterCell({
  children,
  isHighlighted = false,
  isStickyTop = false,
  isStickyLeft = false,
  isStickyBottom = false,
}: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        "tw:px-12 tw:py-3",
        isHighlighted
          ? "tw:bg-theme-elevation-50 tw:text-theme-elevation-700"
          : "tw:bg-theme-bg",
        (isStickyTop || isStickyLeft || isStickyBottom) &&
          cn(
            "tw:sticky",
            isStickyLeft && "tw:left-0",
            isStickyTop && "tw:top-0 tw:shadow-sm",
            isStickyBottom && "tw:bottom-0",
          ),
        isStickyTop && isStickyLeft && "tw:z-10",
        isStickyBottom && isStickyLeft && "tw:z-10",
      )}
    >
      <div className="tw:flex tw:gap-4">{children}</div>
    </th>
  );
}

type TableContentCellProps = PropsWithChildren<{
  isWide?: boolean;
  isHighlighted?: boolean;
  isStickyLeft?: boolean;
}>;

function TableContentCell({
  isWide,
  isHighlighted = false,
  isStickyLeft = false,
  children,
}: TableContentCellProps) {
  return (
    <td
      className={cn(
        isWide
          ? "tw:w-[40rem] tw:min-w-[40rem]"
          : "tw:w-[24rem] tw:min-w-[24rem]",
        "tw:p-12",
        isHighlighted
          ? "tw:bg-theme-elevation-100"
          : "tw:bg-theme-elevation-50",
        isStickyLeft && "tw:sticky tw:left-0",
      )}
    >
      {children}
    </td>
  );
}

type AllLocalesText = Pick<Text, "type"> & {
  text?: Record<string, string | undefined>;
  richText_html?: Record<string, string | undefined>;
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
            __html: data.richText_html[localeCode] ?? "",
          }}
          lang={localeCode}
          className="rich-text-html tw:prose-xl tw:pointer-events-none tw:hyphens-auto tw:font-serif"
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
  return !!fullText && fullText.length > 200;
}

type CheckboxInputProps = {
  name?: string;
  defaultChecked?: boolean;
  readOnly?: boolean;
  label: ReactNode;
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

export function CheckboxInput({
  name,
  label,
  readOnly = false,
  checked,
  setChecked,
}: CheckboxInputProps) {
  const inputBaseClass = "checkbox-input";
  const ref = useRef<HTMLInputElement>(null);
  const id = `checkbox-input-${useId()}`;

  return (
    <div
      className={[
        inputBaseClass,
        checked && `${inputBaseClass}--checked`,
        readOnly && `${inputBaseClass}--read-only`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={`${inputBaseClass}__input`}>
        <input
          aria-label=""
          checked={checked}
          disabled={readOnly}
          type="checkbox"
          ref={ref}
          id={id}
          onChange={(e) => setChecked(e.target.checked)}
          name={name}
        />
        <span
          className={[`${inputBaseClass}__icon`, !checked ? "partial" : "check"]
            .filter(Boolean)
            .join(" ")}
        >
          {checked && <CheckIcon />}
        </span>
      </div>
      <label htmlFor={id} className={`${inputBaseClass}__label`}>
        {label}
      </label>
    </div>
  );
}
