import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { OptInLivePreview } from "~/common/live-preview";
import { Page } from "../layout/page";
import { tryGetPage } from "~/cms-data";
import { getPageTitle } from "~/common/meta";
import { handleIncomingRequest } from "~/common/routing.server";
import i18n from "~/i18n";
import {
  buildLocalizedRelativeUrl,
  getRequestUrl,
  toUrl,
} from "~/common/routing";

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  if (!data) throw new Error("No loader data");

  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  return [
    ...parentMeta,
    ...i18n.supportedLngs.map((lng) => ({
      tagName: "link",
      rel: "alternate",
      href: toUrl(
        buildLocalizedRelativeUrl(lng, data.pageUrl),
        data.origin,
      ).toString(),
      hrefLang: lng,
    })),
    {
      tagName: "link",
      rel: "alternate",
      href: toUrl(
        buildLocalizedRelativeUrl(null, data.pageUrl),
        data.origin,
      ).toString(),
      hrefLang: "x-default",
    },
    {
      tagName: "link",
      name: "canonical",
      href: data?.canonicalUrl,
    },
    { title: getPageTitle(data.content) },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { pageUrl, locale } = await handleIncomingRequest(request);

  const requestUrl = getRequestUrl(request);
  const content = await tryGetPage(toUrl(pageUrl).pathname, locale);
  if (!content) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }
  const dataPath = `new-pages/${content.id}`;

  return {
    origin: requestUrl.origin,
    canonicalUrl: requestUrl.toString(),
    pageUrl,
    dataPath,
    content,
  };
}

export default function Route() {
  const { dataPath, content } = useLoaderData<typeof loader>();

  return (
    <OptInLivePreview path={dataPath} data={content}>
      {(data) => <Page content={data} />}
    </OptInLivePreview>
  );
}
