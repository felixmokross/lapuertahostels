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
import { Text } from "~/payload-types";
import { SerializeFromLoader } from "~/common/types";
import { type loader as rootLoader } from "~/root";
import { toImagekitTransformationString } from "~/common/image";
import { getAltFromMedia } from "~/common/media";

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  if (!data) throw new Error("No loader data");

  const rootLoaderData = matches.find((m) => m.id === "root")
    ?.data as SerializeFromLoader<typeof rootLoader>;
  if (!rootLoaderData) throw new Error("No root loader data");

  const parentMeta = matches.flatMap((match) => match.meta ?? []);

  const description = data.content.seo?.description
    ? (data.content.seo?.description as Text).text
    : "";
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
      rel: "canonical",
      href: data?.canonicalUrl,
    },
    { title: getPageTitle(data.content) },
    {
      name: "description",
      content: description,
    },
    {
      name: "og:title",
      content: getPageTitle(data.content),
    },
    {
      name: "og:description",
      content: description,
    },
    {
      name: "og:locale",
      content: rootLoaderData.locale,
    },
    ...i18n.supportedLngs
      .filter((lng) => lng !== rootLoaderData.locale)
      .map((lng) => ({
        name: "og:locale:alternate",
        content: lng,
      })),
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:site_name",
      content: rootLoaderData.brand.name,
    },
    {
      name: "og:url",
      content: data.canonicalUrl,
    },
    ...getOpenGraphImageMeta(data, rootLoaderData),
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: getPageTitle(data.content),
    },
    {
      name: "twitter:description",
      content: description,
    },
    ...getTwitterCardImageMeta(data, rootLoaderData),
  ];
};

function getTwitterCardImageMeta(
  data: SerializeFromLoader<typeof loader>,
  rootLoaderData: SerializeFromLoader<typeof rootLoader>,
): { name: string; content: string }[] {
  const image = data.content.seo?.image;
  if (!image) {
    return [];
  }

  if (typeof image !== "object") {
    throw new Error("Invalid image");
  }

  return [
    {
      name: "twitter:image",
      content: getSocialImageUrl(data, rootLoaderData, 2400, 1200),
    },
    {
      name: "twitter:image:alt",
      content: getAltFromMedia(image) ?? "",
    },
  ];
}

function getOpenGraphImageMeta(
  data: SerializeFromLoader<typeof loader>,
  rootLoaderData: SerializeFromLoader<typeof rootLoader>,
): { name: string; content: string }[] {
  const image = data.content.seo?.image;
  if (!image) {
    return [];
  }

  if (typeof image !== "object") {
    throw new Error("Invalid image");
  }

  const width = 1200;
  const height = 630;

  return [
    {
      name: "og:image",
      content: getSocialImageUrl(data, rootLoaderData, width, height),
    },
    {
      name: "og:image:alt",
      content: getAltFromMedia(image) ?? "",
    },
    { name: "og:image:type", content: image.mimeType ?? "" },
    { name: "og:image:width", content: width.toString() },
    { name: "og:image:height", content: height.toString() },
  ];
}

function getSocialImageUrl(
  data: SerializeFromLoader<typeof loader>,
  rootLoaderData: SerializeFromLoader<typeof rootLoader>,
  width: number,
  height: number,
) {
  const image = data.content.seo?.image;
  if (typeof image !== "object") {
    throw new Error("Invalid image");
  }

  if (!image) return "";

  return `${rootLoaderData.environment.imagekitBaseUrl.toString()}/${toImagekitTransformationString({ width, height })}/${image.filename}`;
}

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
