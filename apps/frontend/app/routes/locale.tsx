import { ActionFunctionArgs, data } from "react-router";
import { localeCookie } from "~/i18next.server";
import i18nConfig from "~/i18n";
import { toUrl } from "~/common/routing";
import { redirectToLocalizedRoute } from "~/common/routing.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data(
      { message: "Method not allowed" },
      { status: 405, statusText: "Method Not Allowed" },
    );
  }

  const form = await request.formData();
  const locale = form.get("locale") as string;
  const redirectTo = form.get("redirectTo") as string;

  if (!locale) {
    return data(
      { message: "'locale' must be provided" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  if (!i18nConfig.supportedLngs.includes(locale)) {
    return data(
      { message: `Unsupported locale: ${locale}` },
      { status: 400, statusText: "Bad Request" },
    );
  }

  return await redirectToLocalizedRoute(request, toUrl(redirectTo), locale, {
    "Set-Cookie": await localeCookie.serialize(locale),
  });
}
