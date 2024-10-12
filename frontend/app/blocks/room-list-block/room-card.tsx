import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { ImageViewer } from "~/common/image-viewer/image-viewer";
import { Room, RoomListBlock } from "./types";
import { RichTextParagraph } from "~/common/paragraph";
import { Link } from "~/common/link";
import { RichTextObject } from "~/common/rich-text";

export type RoomCardProps = Room & Pick<RoomListBlock, "ctaTemplate">;

export function RoomCard({
  heading,
  text,
  images,
  ctaUrl,
  ctaTemplate,
}: RoomCardProps) {
  return (
    <div className="flex max-w-[35rem] flex-col items-center gap-8">
      <Heading as="h4" size="medium" className="px-6 text-center sm:px-0">
        {heading}
      </Heading>
      <ImageViewer
        images={images.map((image) => ({
          src: image.image.url,
          alt: image.image.alt || undefined,
          caption: image.caption!,
          aspectRatio: image.image.aspectRatio!,
        }))}
      />
      {text && (
        <RichTextParagraph justify={true} className="px-6 sm:px-0">
          {text as RichTextObject}
        </RichTextParagraph>
      )}
      {ctaTemplate?.show && (
        <Button
          as={Link}
          to={ctaUrl || "#"}
          variant={ctaTemplate.variant || undefined}
        >
          {ctaTemplate.text}
        </Button>
      )}
    </div>
  );
}
