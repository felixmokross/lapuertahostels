import { useRouteLoaderData } from "@remix-run/react";
import { type loader as rootLoader } from "~/root";

export type HeroVideoProps = {
  src: string;
};

export function HeroVideo({ src }: HeroVideoProps) {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
  if (!imagekitBaseUrl) throw new Error("imagekitBaseUrl not available");

  if (!src.startsWith(imagekitBaseUrl)) {
    throw new Error(`Image URL must start with ${imagekitBaseUrl}`);
  }

  src = src?.slice(imagekitBaseUrl.length);

  const thumbnailSrc =
    src.split("?")[0] + "/ik-thumbnail.jpg" + "?" + src.split("?")[1];

  return (
    <div className="h-[30rem] bg-puerta-100 md:h-[40rem]">
      <video
        src={`${imagekitBaseUrl}/tr:w-1600,ar-4-3${src}`}
        autoPlay
        muted
        loop
        playsInline
        poster={`${imagekitBaseUrl}${thumbnailSrc}`}
        className="h-full w-full object-cover"
      ></video>
    </div>
  );
}
