import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { ImageViewer } from "~/common/image-viewer/image-viewer";
import { Room, RoomListBlock } from "./types";
import { RichTextParagraph } from "~/common/rich-text";
import { Link } from "~/common/link";

export type RoomCardProps = Room & Pick<RoomListBlock, "ctaTemplate">;

export function RoomCard({
  heading,
  text,
  images,
  ctaUrl,
  ctaTemplate,
}: RoomCardProps) {
  return (
    <div className="flex w-[35rem] flex-col items-center gap-8">
      <Heading as="h4" size="medium">
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
      {text && <RichTextParagraph>{text}</RichTextParagraph>}
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
