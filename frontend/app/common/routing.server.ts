import { redirect } from "@remix-run/node";
import { Params } from "@remix-run/react";
import i18next from "~/i18next.server";
import { getLocaleAndPagePath } from "./routing";

export async function processPath(request: Request, params: Params<"*">) {
  if (!params["*"]) throw new Error("No splat provided.");

  const { locale, pagePath } = getLocaleAndPagePath(`/${params["*"]}`);
  if (!locale) {
    const locale = await i18next.getLocale(request);
    throw redirect(`/${locale}${pagePath}`);
  }

  return { locale, pagePath };
}
