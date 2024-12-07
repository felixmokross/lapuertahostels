import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { ImageViewer } from "~/common/image-viewer/image-viewer";
import { Room } from "./types";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";
import { getSrcFromMedia } from "~/common/media";
import { PageLink } from "~/common/page-link";
import { Text } from "~/payload-types";

export type RoomCardProps = Room;

export function RoomCard({ heading, text, images, cta }: RoomCardProps) {
  if (typeof heading !== "object") {
    throw new Error("Invalid heading");
  }

  if (typeof text !== "object") {
    throw new Error("Invalid text");
  }

  if (typeof cta.label !== "object") {
    throw new Error("Invalid cta label");
  }

  return (
    <div className="flex max-w-[35rem] flex-col items-center gap-8">
      <Heading as="h3" size="medium" className="px-6 text-center sm:px-0">
        {heading.text}
      </Heading>
      <ImageViewer
        images={images.map((image) => {
          if (typeof image.image !== "object") {
            throw new Error("Invalid image");
          }

          if (image.caption && typeof image.caption !== "object") {
            throw new Error("Invalid caption");
          }
          return {
            src: getSrcFromMedia(image.image),
            alt: image.image.alt ?? undefined,
            caption:
              (image.caption as Text | null | undefined)?.text ?? undefined,
            aspectRatio: image.image.width! / image.image.height!,
          };
        })}
      />
      {text && (
        <RichTextParagraph justify={true} className="px-6 sm:px-0">
          {text.richText as unknown as RichTextObject}
        </RichTextParagraph>
      )}
      <Button as={PageLink} link={cta.link} variant={cta.variant || undefined}>
        {cta.label.text}
      </Button>
    </div>
  );
}
