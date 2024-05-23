import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "~/i18next.server";
import { Home } from "~/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { Page } from "./page";
import fs from "fs/promises";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA HOSTELS" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

async function loadHomeDataFromDbAndCache(locale: string) {
  const result = await loadHomeDataFromDb(locale);

  // store to cache
  await fs.writeFile(
    `./.cms-cache/home-${locale}.json`,
    JSON.stringify(result),
  );

  return result;
}

async function getHomeData(locale: string) {
  try {
    const cache = await fs.readFile(`./.cms-cache/home-${locale}.json`, "utf8");

    queueMicrotask(() => loadHomeDataFromDbAndCache(locale));

    return JSON.parse(cache) as Home;
  } catch (e) {
    return await loadHomeDataFromDbAndCache(locale);
  }
}

async function loadHomeDataFromDb(locale: string) {
  return (await (
    await fetch(
      `${process.env.PAYLOAD_CMS_BASE_URL}/api/globals/home?locale=${locale}`,
    )
  ).json()) as Home;
}

export async function loader({ request }: LoaderFunctionArgs) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }

  const locale = await i18next.getLocale(request);
  // TODO provide an function for this
  return {
    payloadCmsBaseUrl: process.env.PAYLOAD_CMS_BASE_URL,
    homeData: await getHomeData(locale),
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
