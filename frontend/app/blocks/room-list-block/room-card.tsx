import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { ImageViewer } from "~/common/image-viewer/image-viewer";
import { Room } from "./types";
import { RichTextParagraph } from "~/common/rich-text";

export type RoomCardProps = Room;

export function RoomCard({ heading, text, images }: RoomCardProps) {
  return (
    <div className="flex w-[35rem] flex-col items-center gap-8">
      <Heading as="h4" size="medium">
        {heading}
      </Heading>
      <ImageViewer
        images={images.map((image) => ({
          src: image.image.url,
          alt: image.image.alt,
          caption: image.caption!,
        }))}
      />
      {text && <RichTextParagraph>{text}</RichTextParagraph>}
      <Button>Reserve Now</Button>
    </div>
  );
}
