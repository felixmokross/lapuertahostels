import { useLivePreview } from "@payloadcms/live-preview-react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "~/i18next.server";
import { Page } from "./page";
import { getAqua } from "~/common/cms-data";

export const meta: MetaFunction = () => {
  return [
    { title: "PUERTA AQUA" },
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
    content: await getAqua(locale),
  };
}

export default function Route() {
  const { content, payloadCmsBaseUrl } = useLoaderData<typeof loader>();
  const { data: liveContent } = useLivePreview({
    initialData: content,
    serverURL: payloadCmsBaseUrl,
  });
  return <Page content={liveContent} />;
}
