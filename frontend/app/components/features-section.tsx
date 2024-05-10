import { ReactNode } from "react";
import { ImageWithTextSection } from "./image-with-text-section";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";

export type FeaturesSectionProps = {
  items: FeaturesSectionItem[];
};

type FeaturesSectionItem = {
  image: { src: string; alt: string };
  title: string;
  paragraphContent: ReactNode;
};

export function FeaturesSection({ items }: FeaturesSectionProps) {
  return (
    <div className="space-y-24">
      {items.map((item, i) => (
        <ImageWithTextSection
          key={i}
          image={item.image}
          orientation={i % 2 === 0 ? "image-left" : "image-right"}
        >
          <Heading size="medium" variant="brand" as="h4" className="-mt-4">
            {item.title}
          </Heading>
          <Paragraph size="large" className="mt-2">
            {item.paragraphContent}
          </Paragraph>
        </ImageWithTextSection>
      ))}
    </div>
  );
}
