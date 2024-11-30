import { LabelFunction } from "payload";
import { useTranslation } from "@payloadcms/ui";

export function Label({
  children,
}: {
  children: LabelFunction | string | Record<string, string>;
}) {
  const { t, i18n } = useTranslation();

  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "object") {
    return children[i18n.language];
  }

  if (typeof children === "function") {
    return children({ t: t as Parameters<LabelFunction>[0]["t"] });
  }

  throw new Error("Invalid label type");
}
