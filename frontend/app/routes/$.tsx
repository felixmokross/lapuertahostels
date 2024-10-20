import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { OptInLivePreview } from "~/common/live-preview";
import { Page } from "../layout/page";
import { getPage } from "~/cms-data";
import { getPageTitle } from "~/common/meta";
import { processPath } from "~/common/routing.server";
import i18n from "~/i18n";
import { buildPath } from "~/common/routing";

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  if (!data) throw new Error("No loader data");
  const parentMeta = matches.flatMap((match) => match.meta ?? []);

  return [
    ...parentMeta,
    ...i18n.supportedLngs
      .filter((lng) => lng !== data.locale)
      .map((lng) => ({
        tagName: "link",
        rel: "alternate",
        href: `${data.baseUrl}${buildPath(lng, data.pagePath)}`,
        hrefLang: lng,
      })),
    { title: getPageTitle(data.content) },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { pagePath, locale } = await processPath(request, params);

  const pageId = urlToId(pagePath);
  const dataPath = `pages/${pageId}`;
  return {
    baseUrl: new URL(request.url).origin,
    pagePath,
    locale,
    dataPath,
    content: await getPage(pageId, locale),
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

function urlToId(url: string) {
  return url.replaceAll("/", ":");
}
