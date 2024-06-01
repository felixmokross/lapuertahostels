import { LoaderFunctionArgs, SerializeFrom } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { OptInLivePreview } from "~/components/live-preview";
import i18next from "~/i18next.server";
import { Page } from "../components/page";
import { getPage } from "~/common/cms-data";
import { type loader as rootLoader } from "~/root";
import { getPageTitle } from "~/common/meta";

export const meta: MetaFunction<typeof loader> = ({ matches, data }) => {
  if (!data) throw new Error("No loader data");

  const rootMatch = matches.find((match) => match.id === "root");
  if (!rootMatch) throw new Error("No root match");

  const { brand } = rootMatch.data as SerializeFrom<typeof rootLoader>;
  return [
    { title: getPageTitle(data.content, brand) },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!params["*"]) throw new Error("No splat provided.");

  const pageId = `:${urlToId(params["*"])}`;
  const dataPath = `pages/${pageId}`;
  const locale = await i18next.getLocale(request);
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
  return url.replace("/", ":");
}
