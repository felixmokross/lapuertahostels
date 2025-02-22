import { Feature } from "./feature";
import { type FeaturesBlock } from "./types";

export type FeaturesBlockProps = FeaturesBlock;

export function FeaturesBlock({
  elementId,
  items,
  orientation,
}: FeaturesBlockProps) {
  return (
    <div
      id={elementId || undefined}
      className="mx-auto my-36 max-w-6xl space-y-36 sm:px-16 lg:my-32 lg:space-y-24 lg:px-8"
    >
      {items?.map((item, i) => (
        <Feature
          key={i}
          image={item.image}
          orientation={getFeatureOrientation(i)}
          heading={item.heading}
          text={item.text}
          cta={item.cta}
        />
      ))}
    </div>
  );

  function getFeatureOrientation(index: number) {
    if (orientation === "first-image-right") {
      return index % 2 === 1 ? "image-left" : "image-right";
    }

    return index % 2 === 0 ? "image-left" : "image-right";
  }
}
