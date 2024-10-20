import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import i18next from "~/i18next.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return redirect(`/${locale}`);
}
