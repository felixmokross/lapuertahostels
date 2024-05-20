import {
  RichText,
  RichTextParagraph,
  RichTextHeading,
} from "~/common/rich-text";
import { Carousel } from "~/components/carousel";
import { HeadingHighlight, Heading } from "~/components/heading";
import { StoryBlock } from "~/components/story-block";
import { Brand, Home } from "~/payload-types";
import { Image } from "~/components/image";
import { Link } from "@remix-run/react";
import { cn } from "~/components/cn";
import { Paragraph } from "~/components/paragraph";

export type PageProps = {
  content: Home;
};

export function Page({ content }: PageProps) {
  return (
    <>
      <Carousel
        items={content.slides.map((slide) => ({
          src: slide.imageUrl,
          alt: slide.imageAlt,
          title: {
            text: (
              <RichText HighlightComponent={HeadingHighlight}>
                {slide.title}
              </RichText>
            ),
            position: slide.titlePosition || undefined,
            cta: { text: content.slideCta, to: slide.ctaUrl },
            imageOverlay: slide.imageOverlay || undefined,
          },
        }))}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 1600,
        }}
      />

      <div className="mx-auto mt-12 max-w-4xl px-8 md:mt-24 lg:px-0">
        <Heading as="h1" size="medium">
          {content.intro.heading}
        </Heading>
        <RichTextParagraph justify size="extra-large" className="mt-4 md:mt-6">
          {content.intro.text}
        </RichTextParagraph>
      </div>

      <div className="relative mt-14 md:mt-36">
        <div className="absolute inset-0 -z-10 h-[23rem] bg-gradient-to-br from-puerta-700 to-puerta-600"></div>
        <div className="py-8 md:py-16">
          <div className="lg-px-0 mx-auto max-w-4xl px-8">
            <Heading as="h2" size="large" variant="white">
              {content.accommodations.heading}
            </Heading>
            <RichTextParagraph
              className="mt-4 md:mt-6"
              justify
              size="large"
              variant="white"
            >
              {content.accommodations.text}
            </RichTextParagraph>
          </div>
          <div className="mx-auto mt-8 grid max-w-7xl grid-rows-2 gap-6 px-0 md:mt-14 md:grid-cols-2 md:grid-rows-none md:gap-8 md:px-8">
            {content.accommodations.cards.map((card) => {
              const cardBrand = card.brand as Brand;
              return (
                <AccommodationCard
                  key={card.id}
                  name={cardBrand.name}
                  to={cardBrand.homeLinkUrl}
                  color={cardBrand.id as "aqua" | "azul"}
                  image={{
                    src: card.imageUrl,
                    alt: card.imageAlt,
                  }}
                  description={card.description}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="relative mx-auto mt-14 lg:mt-32 lg:max-w-4xl"
        id="santa-marta"
      >
        <div className="h-[32rem] overflow-hidden shadow-md lg:rounded-lg">
          <Image
            src={content.aboutSantaMarta.imageUrl}
            alt={content.aboutSantaMarta.imageAlt}
            className="h-full w-full object-cover"
            transformation={{
              width: 1000,
              aspectRatio: { width: 16, height: 9 },
              cropStrategy: "maintain_ratio",
              focus: "auto",
            }}
          />
          <div className="absolute inset-0 flex bg-gradient-to-t from-transparent to-black/40 px-6 py-4 md:px-8 md:py-6 lg:rounded-lg">
            <RichTextHeading
              as="h3"
              size="extra-large"
              variant="white"
              textShadow
            >
              {content.aboutSantaMarta.heading}
            </RichTextHeading>
          </div>
        </div>
        <div className="lg:absolute lg:inset-0 lg:flex lg:items-end lg:justify-end">
          <div className="bg-gradient-to-bl from-puerta-100 to-puerta-300 px-8 py-6 shadow-lg md:mx-auto md:max-w-lg md:-translate-y-32 md:rounded-md md:px-6 md:py-4 lg:mx-0 lg:translate-x-12 lg:translate-y-20">
            <RichTextParagraph variant="puerta" justify>
              {content.aboutSantaMarta.text}
            </RichTextParagraph>
          </div>
        </div>
      </div>

      <StoryBlock
        className="mb-20 mt-24 lg:mt-72"
        id="about-us"
        heading={content.aboutUs.heading}
        text={content.aboutUs.text}
        image={{
          src: content.aboutUs.imageUrl,
          alt: content.aboutUs.imageAlt,
          grayscale: content.aboutUs.grayscale || false,
        }}
      />
    </>
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
