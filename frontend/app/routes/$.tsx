import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { OptInLivePreview } from "~/common/live-preview";
import { Page } from "../layout/page";
import { getPage } from "~/cms-data";
import { getPageTitle } from "~/common/meta";
import { processPath } from "~/common/routing.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) throw new Error("No loader data");

  return [
    { title: getPageTitle(data.content) },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { pagePath, locale } = await processPath(request, params);

  const pageId = urlToId(pagePath);
  const dataPath = `pages/${pageId}`;
  return {
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
