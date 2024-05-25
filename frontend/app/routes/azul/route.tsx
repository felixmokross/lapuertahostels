import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Page } from "./page";
import i18next from "~/i18next.server";
import { useLoaderData } from "@remix-run/react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { getAzul } from "~/common/cms-data";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA AZUL" },
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
    content: await getAzul(locale),
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
