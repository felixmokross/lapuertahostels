import { text } from "payload/dist/fields/validations";

export function validateUrl(val: string, args: any) {
  if (val && !isValidHttpUrl(val)) {
    return args.t("custom:validation.mustBeValidUrl");
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
