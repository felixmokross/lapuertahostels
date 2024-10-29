import { PropsWithChildren } from "react";
import { cn } from "../../common/cn";
import { RichTextParagraph } from "~/common/paragraph";
import { type Feature } from "./types";
import { Heading } from "~/common/heading";
import { Button } from "~/common/button";
import { Image } from "~/common/image";
import { RichTextObject } from "~/common/rich-text";
import { getSrcFromMedia } from "~/common/media";
import { Media } from "~/payload-types";
import { PageLink } from "~/common/page-link";

export type FeatureProps = PropsWithChildren<{
  orientation?: "image-left" | "image-right";
}> &
  Feature;

export function Feature({
  orientation = "image-left",
  image,
  heading,
  text,
  cta,
}: FeatureProps) {
  const imageMedia = image as Media;
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-16 md:gap-10 lg:flex-row lg:gap-20 xl:gap-32",
        orientation === "image-left" && "lg:flex-row-reverse",
      )}
    >
      <div className="px-8 text-center sm:px-16 md:px-0">
        <Heading size="medium" variant="brand" as="h4" className="-mt-4">
          {heading}
        </Heading>
        <RichTextParagraph size="large" className="mt-2">
          {text as RichTextObject}
        </RichTextParagraph>
        {cta?.show && (
          <Button
            className="mt-6"
            size="medium"
            variant={cta.variant || undefined}
            as={PageLink}
            link={cta.link!}
          />
        )}
      </div>
      <div className="shrink-0 overflow-hidden sm:max-w-md sm:rounded-md sm:shadow-lg">
        <Image
          src={getSrcFromMedia(imageMedia)}
          alt={imageMedia.alt ?? undefined}
          transformation={{
            width: 448,
            aspectRatio: { width: 4, height: 3 },
          }}
          loading="lazy"
          layout="responsive"
          sizes="(min-width: 640px) 448px, 100vw"
          srcMultiplier={4}
        />
      </div>
    </div>
  );
}
