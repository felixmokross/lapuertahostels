import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { localeCookie } from "~/i18next.server";
import i18nConfig from "~/i18n";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(
      { message: "Method not allowed" },
      { status: 405, statusText: "Method Not Allowed" },
    );
  }

  const form = await request.formData();
  const locale = form.get("locale") as string;
  const redirectTo = form.get("redirectTo") as string;

  if (!locale || !redirectTo) {
    return json(
      { message: "'locale' and 'redirectTo' must be provided" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  if (!i18nConfig.supportedLngs.includes(locale)) {
    return json(
      { message: `Unsupported locale: ${locale}` },
      { status: 400, statusText: "Bad Request" },
    );
  }

  if (!redirectTo.startsWith("/")) {
    return json(
      { message: "Invalid redirect URL" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  return redirect(redirectTo, {
    headers: { "Set-Cookie": await localeCookie.serialize(locale) },
  });
}
