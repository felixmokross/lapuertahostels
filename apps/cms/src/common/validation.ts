import { text } from "payload/shared";

export function validateUrl(val: string | undefined | null, args: any) {
  if (val && !isValidHttpUrl(val)) {
    return args.t
      ? args.t("custom:validation.mustBeValidUrl")
      : "Must be a valid URL";
  }

  return text(val, args);
}

function isValidHttpUrl(input: string) {
  let url: URL;

  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
