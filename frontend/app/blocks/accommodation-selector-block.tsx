import { Brand, Page } from "~/payload-types";
import { cn } from "../common/cn";
import { Heading } from "../common/heading";
import { Paragraph, RichTextParagraph } from "../common/paragraph";
import { Image } from "~/common/image";
import { Link } from "~/common/link";
import { BrandId } from "~/brands";
import { RichTextObject } from "~/common/rich-text";

export type AccommodationSelectorBlockProps = NonNullable<
  Page["layout"]
>[number] & {
  blockType: "AccommodationSelector";
};

export function AccommodationSelectorBlock({
  heading,
  text,
  cards,
  elementId,
}: AccommodationSelectorBlockProps) {
  return (
    <div id={elementId || undefined} className="relative">
      <div className="absolute inset-0 -z-10 h-[23rem] bg-gradient-to-br from-puerta-700 to-puerta-600"></div>
      <div className="pb-12 pt-8 md:pb-20 md:pt-16">
        <div className="lg-px-0 mx-auto max-w-4xl px-8">
          <Heading as="h2" size="large" variant="white">
            {heading}
          </Heading>
          <RichTextParagraph
            className="mt-4 md:mt-6"
            justify
            size="large"
            variant="white"
          >
            {text as RichTextObject}
          </RichTextParagraph>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl grid-rows-2 gap-16 px-0 md:mt-14 md:grid-cols-2 md:grid-rows-none md:gap-8 md:px-8">
          {cards.map((card) => (
            <AccommodationCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

type AccommodationCardProps = AccommodationSelectorBlockProps["cards"][number];

function AccommodationCard({
  brand,
  description,
  image,
}: AccommodationCardProps) {
  brand = brand as Brand;
  const brandId = brand.id as BrandId;

  return (
    <Link
      to={brand.homeLinkUrl}
      className={cn(
        "group flex flex-col overflow-hidden shadow-lg hover:shadow-md md:rounded-xl",
        {
          "bg-aqua-600 hover:bg-aqua-200": brandId === "aqua",
          "bg-azul-600 hover:bg-azul-200": brandId === "azul",
        },
      )}
    >
      <div className="relative aspect-[1/1] overflow-hidden bg-white sm:aspect-[4/3] md:aspect-[1/1] lg:aspect-[4/3] xl:aspect-[16/9]">
        <Image
          src={image.url}
          alt={image.alt || undefined}
          className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
          transformation={{
            aspectRatio: { width: 1, height: 1 },
            width: 592,
            focus: "custom",
          }}
          loading="lazy"
          layout="responsive"
          sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw"
          srcMultiplier={4}
        />
      </div>
      <div
        className={cn("space-y-1 px-8 py-4 text-white md:space-y-2 md:px-6", {
          "group-hover:text-azul-800": brandId === "azul",
          "group-hover:text-aqua-800": brandId === "aqua",
        })}
      >
        <Heading as="h4" variant="inherit" size="extra-small">
          {brand.name}
        </Heading>
        <Paragraph variant="inherit" justify>
          {description}
        </Paragraph>
      </div>
    </Link>
  );
}
