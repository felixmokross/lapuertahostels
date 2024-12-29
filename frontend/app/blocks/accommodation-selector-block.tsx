import { Brand, Page } from "~/payload-types";
import { cn } from "../common/cn";
import { Heading } from "../common/heading";
import { RichTextParagraph } from "../common/paragraph";
import { BrandId } from "~/brands";
import { RichTextObject } from "~/common/rich-text";
import { MediaImage } from "~/common/media";
import { PageLink } from "~/common/page-link";
import { ReactNode } from "react";

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
  if (typeof heading !== "object") {
    throw new Error("Invalid heading");
  }

  if (typeof text !== "object") {
    throw new Error("Invalid text");
  }
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 h-[23rem] bg-gradient-to-br from-puerta-700 to-puerta-600"></div>
      <div className="pb-12 pt-8 md:pb-20 md:pt-16">
        <div className="lg-px-0 mx-auto max-w-4xl px-8">
          <Heading
            as="h3"
            size="large"
            variant="white"
            id={elementId || undefined}
          >
            {heading.text}
          </Heading>
          <RichTextParagraph
            className="mt-4 md:mt-6"
            justify
            size="large"
            variant="white"
          >
            {text.richText as unknown as RichTextObject}
          </RichTextParagraph>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl grid-rows-2 gap-16 px-0 md:mt-14 md:grid-cols-2 md:grid-rows-none md:gap-8 md:px-8">
          {cards.map((card) => (
            <AccommodationCard
              key={card.id}
              {...card}
              brand={card.brand as Brand}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type AccommodationCardProps = Omit<
  AccommodationSelectorBlockProps["cards"][number],
  "brand"
> & { brand: Brand };

function AccommodationCard({
  brand,
  description,
  image,
}: AccommodationCardProps) {
  const brandId = brand.id as BrandId;

  if (typeof image !== "object") {
    throw new Error("Invalid image");
  }

  if (typeof brand.homeLink !== "object") {
    throw new Error("Invalid homeLink");
  }

  if (typeof description !== "object") {
    throw new Error("Invalid description");
  }

  const componentClassName = cn(
    "group flex flex-col overflow-hidden shadow-lg hover:shadow-md md:rounded-xl",
    {
      "bg-aqua-600 hover:bg-aqua-200": brandId === "aqua",
      "bg-azul-600 hover:bg-azul-200": brandId === "azul",
    },
  );

  function getComponent(children: ReactNode) {
    return brand.homeLink ? (
      <PageLink link={brand.homeLink} className={componentClassName}>
        {children}
      </PageLink>
    ) : (
      <div className={componentClassName}>{children}</div>
    );
  }

  return getComponent(
    <>
      <div className="relative aspect-[1/1] overflow-hidden bg-white sm:aspect-[4/3] md:aspect-[1/1] lg:aspect-[4/3] xl:aspect-[16/9]">
        <MediaImage
          media={image}
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
        <RichTextParagraph variant="inherit" justify>
          {description.richText as unknown as RichTextObject}
        </RichTextParagraph>
      </div>
    </>,
  );
}
