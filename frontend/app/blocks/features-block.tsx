import { ReactNode } from "react";
import { ImageWithTextSection } from "../components/image-with-text-section";
import { Heading } from "../components/heading";
import { Paragraph } from "../components/paragraph";

export type FeaturesBlockProps = {
  items: Feature[];
  id?: string;
  className?: string;
};

type Feature = {
  image: { src: string; alt: string };
  title: string;
  paragraphContent: ReactNode;
};

export function FeaturesBlock({ id, items }: FeaturesBlockProps) {
  return (
    <div
      id={id}
      className="mx-auto my-36 max-w-6xl space-y-36 sm:px-16 lg:my-32 lg:space-y-24 lg:px-8"
    >
      {items?.map((item, i) => (
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
