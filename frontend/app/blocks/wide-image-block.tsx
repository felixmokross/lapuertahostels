import { Page } from "~/payload-types";
import { MediaImage } from "~/common/media";
import { PageLink } from "~/common/page-link";
import { OverlayTextBox } from "./common/overlay-text-box";

export type WideImageBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "WideImage";
};

export function WideImageBlock({ image, overlayTextBox }: WideImageBlockProps) {
  if (typeof image !== "object") {
    throw new Error("Invalid image");
  }

  if (overlayTextBox?.show && typeof overlayTextBox.heading !== "object") {
    throw new Error("Invalid overlayTextBox.heading");
  }

  if (overlayTextBox?.show && typeof overlayTextBox.text !== "object") {
    throw new Error("Invalid overlayTextBox.text");
  }

  if (
    overlayTextBox?.cta?.show &&
    typeof overlayTextBox.cta.label !== "object"
  ) {
    throw new Error("Invalid overlayTextBox.cta.label");
  }

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
      {overlayTextBox?.show &&
        overlayTextBox.heading &&
        typeof overlayTextBox.heading === "object" &&
        overlayTextBox.text &&
        typeof overlayTextBox.text === "object" && (
          <OverlayTextBox
            heading={overlayTextBox.heading}
            text={overlayTextBox.text}
            position={overlayTextBox.position}
            cta={
              overlayTextBox.cta?.show &&
              overlayTextBox.cta.label &&
              typeof overlayTextBox.cta.label === "object"
                ? {
                    as: PageLink,
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
