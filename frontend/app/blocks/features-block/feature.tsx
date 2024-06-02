import { PropsWithChildren } from "react";
import { cn } from "../../components/cn";
import { Image } from "../../components/image";
import { RichTextParagraph } from "~/common/rich-text";
import { type Feature } from "./types";
import { Heading } from "~/components/heading";
import { Button } from "~/components/button";
import { Link } from "~/components/link";

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
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-16 md:gap-10 lg:flex-row lg:gap-20 xl:gap-32",
        orientation === "image-left" && "lg:flex-row-reverse",
      )}
    >
      <div className="px-16 text-center md:px-0">
        <Heading size="medium" variant="brand" as="h4" className="-mt-4">
          {heading}
        </Heading>
        <RichTextParagraph size="large" className="mt-2">
          {text}
        </RichTextParagraph>
        {cta?.show && (
          <Button className="mt-6" size="large" as={Link} to={cta.url || "#"}>
            {cta.text}
          </Button>
        )}
      </div>
      <div className="shrink-0 overflow-hidden sm:max-w-md sm:rounded-md sm:shadow-lg">
        <Image
          alt={image.alt}
          src={image.url}
          transformation={{
            width: 1000,
            aspectRatio: { width: 4, height: 3 },
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
