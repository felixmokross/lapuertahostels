import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { OptInLivePreview } from "~/components/live-preview";
import i18next from "~/i18next.server";
import { getPage } from "~/common/cms-data";
import { Page } from "../components/page";
import { getPageTitle } from "~/common/meta";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) throw new Error("No loader data");

  return [
    { title: getPageTitle(data.content) },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const pageId = ":";
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
