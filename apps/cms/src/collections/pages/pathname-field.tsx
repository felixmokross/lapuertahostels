"use client";

import { TranslationsKey, TranslationsObject } from "@/translations";
import {
  FieldDescription,
  FieldLabel,
  TextInput,
  useField,
  useForm,
  useFormFields,
  useTranslation,
} from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";

export function PathnameField({ path, field }: TextFieldClientProps) {
  const { value, setValue, initialValue, showError } = useField<string>({
    path: path,
  });

  const { dispatchFields } = useForm();
  const isLocked = useFormFields(([fields]) => {
    return fields["pathname_locked"]?.value as boolean;
  });

  const { t } = useTranslation<TranslationsObject, TranslationsKey>();

  const isChanged = initialValue !== value;

  return (
    <div className="field-type">
      <div className="tw:flex tw:justify-between tw:items-baseline tw:gap-4">
        <FieldLabel
          path={path}
          label={field.label}
          required={field.required}
          localized={field.localized}
        />

        <button
          type="button"
          className="tw:disabled:opacity-50 tw:disabled:cursor-not-allowed tw:disabled:hover:text-theme-elevation-800 tw:bg-transparent tw:underline tw:hover:text-theme-elevation-1000 tw:cursor-pointer tw:border-none tw:p-0 tw:text-theme-elevation-800"
          onClick={() =>
            dispatchFields({
              type: "UPDATE",
              path: "pathname_locked",
              value: !isLocked,
            })
          }
        >
          {isLocked
            ? t("custom:pages:pathname:unlock")
            : t("custom:pages:pathname:lock")}
        </button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path}
        readOnly={isLocked}
        showError={showError}
        localized={field.localized}
        required={field.required}
        placeholder={
          field.admin?.placeholder as
            | string
            | Record<string, string>
            | undefined
        }
      />
      {isChanged && (
        <FieldDescription
          path={path}
          description={t("custom:pages:pathname:redirectWillBeAdded", {
            previousPathname: initialValue,
          })}
        />
      )}

      <FieldDescription path={path} description={field.admin?.description} />
    </div>
  );
}
