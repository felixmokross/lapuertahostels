import { Page } from "@lapuertahostels/shared";
import { MediaImage } from "~/common/media";
import { PageLink } from "~/common/page-link";
import { OverlayTextBox } from "./common/overlay-text-box";
import { isObject } from "~/common/utils";

export type WideImageBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "WideImage";
};

export function WideImageBlock({ image, overlayTextBox }: WideImageBlockProps) {
  return (
    <div className="my-44 flex flex-col-reverse gap-4 lg:relative lg:h-[35rem]">
      <MediaImage
        media={image}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 800,
        }}
        className="h-[35rem] w-full object-cover lg:h-full"
        layout="responsive"
        srcMultiplier={6}
        sizes="100vw"
      />
      {overlayTextBox?.show && (
        <OverlayTextBox
          heading={overlayTextBox.heading}
          text={overlayTextBox.text}
          position={overlayTextBox.position}
          cta={
            overlayTextBox.cta?.show && isObject(overlayTextBox.cta.label)
              ? {
                  as: PageLink,
                  link: overlayTextBox.cta.link,
                  label: overlayTextBox.cta.label,
                  variant: "secondary",
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
