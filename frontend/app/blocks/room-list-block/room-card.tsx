import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { ImageViewer } from "~/common/image-viewer/image-viewer";
import { ImageViewerImage } from "~/common/image-viewer/types";
import { Paragraph } from "~/common/paragraph";

export type RoomCardProps = {
  title: string;
  description: string;
  images: ImageViewerImage[];
};

export function RoomCard({ title, description, images }: RoomCardProps) {
  return (
    <div className="flex w-[35rem] flex-col items-center gap-8">
      <Heading as="h4" size="medium">
        {title}
      </Heading>
      <ImageViewer images={images} />
      <Paragraph>{description}</Paragraph>
      <Button>Reserve Now</Button>
    </div>
  );
}
