"use client";

import { cn } from "@/common/cn";
import { SparklesIcon } from "@/common/icons";
import { getLabelText } from "@/common/labels";
import { Label } from "@/common/labels.client";
import { TranslationsKey, TranslationsObject } from "@/translations";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import {
  Button,
  CheckIcon,
  Drawer,
  FieldLabel,
  Pill,
  toast,
  Translation,
  useConfig,
  useDocumentInfo,
  useFormModified,
  useLocale,
  useModal,
  useTranslation,
} from "@payloadcms/ui";
import {
  formatDrawerSlug,
  useDrawerDepth,
} from "@payloadcms/ui/elements/Drawer";
import {
  CollectionSlug,
  FieldLabelClientProps,
  GlobalSlug,
  Locale,
  RichTextFieldClient,
  TextareaFieldClient,
  TextFieldClient,
} from "payload";
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export function TranslationsFieldLabel({
  field,
  path,
}: FieldLabelClientProps<
  TextFieldClient | TextareaFieldClient | RichTextFieldClient
>) {
  const { openModal, isModalOpen, closeModal } = useModal();

  const { id, collectionSlug, globalSlug } = useDocumentInfo();
  const locale = useLocale();
  const isModified = useFormModified();

  const { t, i18n } = useTranslation<TranslationsObject, TranslationsKey>();
  const depth = useDrawerDepth();
  const modalSlug = formatDrawerSlug({
    slug: `translations-${path}`,
    depth,
  });

  const { config } = useConfig();

  if (!config.localization) throw new Error("Localization must be enabled");
  if (typeof id === "number") throw new Error("number ids are not supported");

  const translationsDisabled = (collectionSlug && !id) || isModified;

  const label = field?.label ? getLabelText(field.label, i18n) : undefined;
  //  The Label is also rendered in the List view, here without path, see https://payloadcms.com/docs/fields/overview#label
  if (!path) {
    return <FieldLabel label={label} unstyled={true} />;
  }

  return (
    <div className="tw:flex tw:justify-between tw:items-baseline tw:gap-4">
      <FieldLabel
        label={label}
        path={path}
        localized={true}
        required={field?.required}
      />
      {path && (
        <>
          <div
            title={
              translationsDisabled
                ? t(
                    "custom:translations:pleaseSaveYourChangesToEnableAutoTranslate",
                  )
                : undefined
            }
          >
            <button
              disabled={translationsDisabled}
              type="button"
              className="tw:disabled:opacity-50 tw:disabled:cursor-not-allowed tw:disabled:hover:text-theme-elevation-800 tw:bg-transparent tw:underline tw:hover:text-theme-elevation-1000 tw:cursor-pointer tw:border-none tw:p-0 tw:text-theme-elevation-800"
              onClick={() => openModal(modalSlug)}
            >
              {i18n.t("custom:translations:translationsButtonLabel")}
            </button>
          </div>
          <Drawer
            slug={modalSlug}
            title={t("custom:translations:translationsTitle")}
          >
            {isModalOpen(modalSlug) && (
              <DrawerContent
                id={id}
                currentLocale={locale}
                locales={config.localization.locales}
                collectionSlug={collectionSlug}
                globalSlug={globalSlug}
                fieldPath={path}
                onClose={() => closeModal(modalSlug)}
              />
            )}
          </Drawer>
        </>
      )}
    </div>
  );
}

function DrawerContent({
  id,
  collectionSlug,
  globalSlug,
  currentLocale,
  locales,
  fieldPath,
  onClose,
}: {
  id?: string;
  collectionSlug?: CollectionSlug;
  globalSlug?: GlobalSlug;
  currentLocale: Locale;
  locales: Locale[];
  fieldPath: string;
  onClose: () => void;
}) {
  const [data, setData] = useState<AllLocalesText | null>(null);

  const updateData = useCallback(
    async function updateData() {
      const searchParams = new URLSearchParams();
      if (collectionSlug) {
        searchParams.set("collection", collectionSlug);
      }
      if (globalSlug) {
        searchParams.set("global", globalSlug);
      }
      if (id) {
        searchParams.set("id", id);
      }
      searchParams.set("fieldPath", fieldPath);
      const result = await fetch(
        `/api/translations?${searchParams.toString()}`,
        {
          credentials: "include",
        },
      );

      if (result.ok) {
        setData(await result.json());
      } else {
        setData(null);
      }
    },
    [id, collectionSlug, fieldPath, globalSlug],
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
        title={t("custom:translations:selectLocales")}
      >
        <div className="tw:mt-8 tw:space-y-4">
          <p>
            <Translation
              // @ts-expect-error types don't match
              t={t}
              // @ts-expect-error types don't match
              i18nKey="custom:translations:selectLocalesDescription"
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
            i18nKey="custom:translations:selectLocalesNote"
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
                const searchParams = new URLSearchParams();
                if (collectionSlug) {
                  searchParams.set("collection", collectionSlug);
                }
                if (id) {
                  searchParams.set("id", id);
                }
                if (globalSlug) {
                  searchParams.set("global", globalSlug);
                }
                searchParams.set("fieldPath", fieldPath);
                searchParams.set("locale", currentLocale.code);
                const response = await fetch(
                  `/api/auto-translate?${searchParams.toString()}`,
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
                  console.info(
                    t("custom:translations:autoTranslatedSuccessfully"),
                  );
                  toast.success(
                    t("custom:translations:autoTranslatedSuccessfully"),
                    {
                      duration: 3000,
                    },
                  );
                } else {
                  console.error(t("custom:translations:failedToAutoTranslate"));
                  toast.error(t("custom:translations:failedToAutoTranslate"), {
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
              ? t("custom:translations:translating")
              : t("custom:translations:translateToSelectedLocales")}
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
                  <Pill rounded={true}>
                    {t("custom:translations:currentLocale")}
                  </Pill>
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
                    {t("custom:translations:autoTranslate")}
                  </Button>
                </TableHeaderFooterCell>
                {otherLocales.map((locale) => (
                  <TableHeaderFooterCell
                    key={locale.code}
                    isStickyBottom={true}
                  >
                    <Button
                      el="link"
                      to={`?locale=${encodeURIComponent(locale.code)}`}
                      onClick={async () => onClose()}
                      size="medium"
                      buttonStyle="secondary"
                      icon="edit"
                      disabled={isTranslating}
                    >
                      {t("custom:translations:goToTranslation")}
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
            isStickyTop && "tw:top-0 tw:shadow-sm tw:z-20",
            isStickyBottom && "tw:bottom-0",
          ),
        isStickyTop && isStickyLeft && "tw:z-30",
        isStickyBottom && isStickyLeft && "tw:z-20",
      )}
    >
      <div className="tw:flex tw:gap-4 tw:items-center">{children}</div>
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
        isStickyLeft && "tw:sticky tw:left-0 tw:z-10",
      )}
    >
      {children}
    </td>
  );
}

type AllLocalesText = {
  value: Record<string, SerializedEditorState | string> | undefined | null;
};

type AllLocalesTextRendererProps = {
  data: AllLocalesText;
  localeCode: string;
};

function AllLocalesTextRenderer({
  data,
  localeCode,
}: AllLocalesTextRendererProps) {
  if (!data.value) return null;

  const text = data.value[localeCode];
  return (
    <>
      {typeof text === "string" ? (
        text
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: convertLexicalToHTML({
              data: text,
            }),
          }}
          lang={localeCode}
          className="rich-text-html tw:prose-xl tw:pointer-events-none tw:hyphens-auto tw:font-serif"
        />
      )}
    </>
  );
}

function isLongContent(data: AllLocalesText, localeCode: string) {
  if (!data.value) return false;

  const text = data.value[localeCode];

  const plainText =
    typeof text === "string"
      ? text
      : convertLexicalToPlaintext({
          data: text,
        });
  return !!plainText && plainText.length > 200;
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
