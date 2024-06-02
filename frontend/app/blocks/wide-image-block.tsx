import { Page } from "~/payload-types";
import { Image } from "~/components/image";

export type WideImageBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "WideImage";
};

export function WideImageBlock({ image }: WideImageBlockProps) {
  return (
    <div className="my-44">
      <Image
        src={image.url}
        alt={image.alt}
        transformation={{
          aspectRatio: { width: 2, height: 1 },
          width: 1600,
        }}
      />
    </div>
  );
}
