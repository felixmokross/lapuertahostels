import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "~/i18next.server";
import { Page } from "./page";
import { getAqua } from "~/common/cms-data";
import { OptInLivePreview } from "~/components/live-preview";

export const meta: MetaFunction = () => {
  return [
    { title: "PUERTA AQUA" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return {
    data: await getAqua(locale),
  };
}

export default function Route() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <OptInLivePreview path="pages/aqua" data={data}>
      {(data) => <Page content={data} />}
    </OptInLivePreview>
  );
}
