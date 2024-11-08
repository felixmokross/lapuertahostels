import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { ImageViewer } from "~/common/image-viewer/image-viewer";
import { Room } from "./types";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";
import { Media } from "~/payload-types";
import { getSrcFromMedia } from "~/common/media";
import { PageLink } from "~/common/page-link";

export type RoomCardProps = Room;

export function RoomCard({ heading, text, images, cta }: RoomCardProps) {
  return (
    <div className="flex max-w-[35rem] flex-col items-center gap-8">
      <Heading as="h4" size="medium" className="px-6 text-center sm:px-0">
        {heading}
      </Heading>
      <ImageViewer
        images={images.map((image) => {
          const imageMedia = image.image as Media;
          return {
            src: getSrcFromMedia(imageMedia),
            alt: imageMedia.alt ?? undefined,
            caption: image.caption!,
            aspectRatio: imageMedia.width! / imageMedia.height!,
          };
        })}
      />
      {text && (
        <RichTextParagraph justify={true} className="px-6 sm:px-0">
          {text as RichTextObject}
        </RichTextParagraph>
      )}
      <Button as={PageLink} link={cta.link} variant={cta.variant || undefined}>
        {cta.link?.label}
      </Button>
    </div>
  );
}
