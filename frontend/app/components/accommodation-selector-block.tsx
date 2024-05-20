import { Link } from "@remix-run/react";
import { RichTextObject, RichTextParagraph } from "~/common/rich-text";
import { Brand } from "~/payload-types";
import { cn } from "./cn";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { Image } from "~/components/image";

export type AccommodationSelectorBlockProps = {
  heading: string;
  text: RichTextObject;
  accommodationCards: {
    brand: Brand;
    image: {
      src: string;
      alt: string;
    };
    description: string;
    id: string;
  }[];
  id?: string;
  className?: string;
};

export function AccommodationSelectorBlock({
  heading,
  text,
  accommodationCards,
  id,
  className,
}: AccommodationSelectorBlockProps) {
  return (
    <div id={id} className={cn("relative", className)}>
      <div className="absolute inset-0 -z-10 h-[23rem] bg-gradient-to-br from-puerta-700 to-puerta-600"></div>
      <div className="py-8 md:py-16">
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
            {text}
          </RichTextParagraph>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl grid-rows-2 gap-6 px-0 md:mt-14 md:grid-cols-2 md:grid-rows-none md:gap-8 md:px-8">
          {accommodationCards.map((card) => (
            <AccommodationCard
              key={card.id}
              name={card.brand.name}
              to={card.brand.homeLinkUrl}
              color={card.brand.id as "aqua" | "azul"}
              image={card.image}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type AccommodationCardProps = {
  name: string;
  to: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
  color: "aqua" | "azul";
};

function AccommodationCard({
  name,
  to,
  image,
  description,
  color,
}: AccommodationCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex flex-col overflow-hidden shadow-lg hover:shadow-md md:rounded-xl",
        {
          "bg-aqua-600 hover:bg-aqua-200": color === "aqua",
          "bg-azul-600 hover:bg-azul-200": color === "azul",
        },
      )}
    >
      <div className="relative aspect-[16/9] bg-white">
        <Image
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-75"
          transformation={{
            aspectRatio: { width: 16, height: 9 },
            width: 1200,
            focus: "custom",
          }}
        />
      </div>
      <div
        className={cn(
          "space-y-1 px-8 py-6 text-white md:space-y-2 md:px-6 md:py-4",
          {
            "group-hover:text-azul-800": color === "azul",
            "group-hover:text-aqua-800": color === "aqua",
          },
        )}
      >
        <Heading as="h4" variant="inherit" size="small">
          {name}
        </Heading>
        <Paragraph variant="inherit" justify>
          {description}
        </Paragraph>
      </div>
    </Link>
  );
}
