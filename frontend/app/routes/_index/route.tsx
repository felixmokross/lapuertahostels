import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import i18next from "~/i18next.server";
import { Page } from "./page";
import { getHome } from "~/common/cms-data";
import { OptInLivePreview } from "~/components/live-preview";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA HOSTELS" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return {
    data: await getHome(locale),
  };
}

export default function Route() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <OptInLivePreview path="pages/home" data={data}>
      {(data) => <Page content={data} />}
    </OptInLivePreview>
  );
}
