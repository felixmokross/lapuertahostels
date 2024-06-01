import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { OptInLivePreview } from "~/components/live-preview";
import i18next from "~/i18next.server";
import { getPage } from "~/common/cms-data";
import { Page } from "../components/page";

export const meta: MetaFunction = () => {
  return [
    { title: "Dynamic Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const pageId = ":";
  const dataPath = `pages/${pageId}`;
  const locale = await i18next.getLocale(request);
  return {
    dataPath,
    data: await getPage(pageId, locale),
  };
}

export default function Route() {
  const { dataPath, data } = useLoaderData<typeof loader>();

  return (
    <OptInLivePreview path={dataPath} data={data}>
      {(data) => <Page content={data} />}
    </OptInLivePreview>
  );
}
