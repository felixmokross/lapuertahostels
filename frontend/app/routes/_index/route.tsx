import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "~/i18next.server";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { Page } from "./page";
import { getHome } from "~/common/cms-data";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA HOSTELS" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }

  const locale = await i18next.getLocale(request);
  return {
    payloadCmsBaseUrl: process.env.PAYLOAD_CMS_BASE_URL,
    homeData: await getHome(locale),
  };
}

export default function Route() {
  const { homeData, payloadCmsBaseUrl } = useLoaderData<typeof loader>();
  const { data: homeData2 } = useLivePreview({
    initialData: homeData,
    serverURL: payloadCmsBaseUrl,
  });
  return <Page content={homeData2} />;
}
