import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Carousel } from "~/components/carousel";
import { cn } from "~/components/cn";
import { loader as rootLoader } from "~/root";
import { useTranslation } from "react-i18next";
import { Image } from "~/components/image";
import { Heading, HeadingHighlight } from "~/components/heading";
import { Paragraph, ParagraphHighlight } from "~/components/paragraph";
import i18next from "~/i18next.server";
import { Home } from "~/payload-types";
import { Fragment } from "react/jsx-runtime";
import { useLivePreview } from "@payloadcms/live-preview-react";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA HOSTELS" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }

  const locale = await i18next.getLocale(request);
  // TODO provide an function for this
  return {
    payloadCmsBaseUrl: process.env.PAYLOAD_CMS_BASE_URL,
    homeData: (await (
      await fetch(
        `${process.env.PAYLOAD_CMS_BASE_URL}/api/globals/home?locale=${locale}`,
      )
    ).json()) as Home,
  };
}

export default function Route() {
  const { t } = useTranslation();
  const { homeData, payloadCmsBaseUrl } = useLoaderData<typeof loader>();
  const { data: homeData2 } = useLivePreview({
    initialData: homeData,
    serverURL: payloadCmsBaseUrl,
  });
  return (
    <>
      <Carousel
        items={homeData2.slides.map((slide) => ({
          src: slide.imageUrl,
          alt: slide.imageAlt,
          title: {
            text: (
              <>
                {slide.title.map((line, index, allLines) => (
                  <Fragment key={index}>
                    {(line.children as Record<string, unknown>[]).map(
                      (c, j) => (
                        <Fragment key={j}>
                          {c.bold ? (
                            <HeadingHighlight>
                              {c.text as string}
                            </HeadingHighlight>
                          ) : (
                            (c.text as string)
                          )}
                        </Fragment>
                      ),
                    )}
                    {index < allLines.length - 1 && <br />}
                  </Fragment>
                ))}
              </>
            ),
            position: slide.titlePosition || undefined,
            cta: { text: homeData2.slideCta, to: slide.ctaUrl },
          },
        }))}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 1600,
        }}
      />

      <div className="mx-auto mt-12 max-w-4xl px-8 md:mt-24 lg:px-0">
        <Heading as="h1" size="medium">
          {homeData2.intro.heading}
        </Heading>
        <Paragraph justify size="extra-large" className="mt-4 md:mt-6">
          {homeData2.intro.text.map((line, index, allLines) => (
            <Fragment key={index}>
              {(line.children as Record<string, unknown>[]).map((c, j) => (
                <Fragment key={j}>
                  {c.bold ? (
                    <ParagraphHighlight>{c.text as string}</ParagraphHighlight>
                  ) : (
                    (c.text as string)
                  )}
                </Fragment>
              ))}
              {index < allLines.length - 1 && <br />}
            </Fragment>
          ))}
        </Paragraph>
      </div>

      <div className="relative mt-14 md:mt-36">
        <div className="absolute inset-0 -z-10 h-[23rem] bg-gradient-to-br from-puerta-700 to-puerta-600"></div>
        <div className="py-8 md:py-16">
          <div className="lg-px-0 mx-auto max-w-4xl px-8">
            <Heading as="h2" size="large" variant="white">
              {homeData2.accommodations.heading}
            </Heading>
            <Paragraph
              className="mt-4 md:mt-6"
              justify
              size="large"
              variant="white"
            >
              {homeData2.accommodations.text.map((line, index, allLines) => (
                <Fragment key={index}>
                  {(line.children as Record<string, unknown>[]).map((c, j) => (
                    <Fragment key={j}>
                      {c.bold ? (
                        <ParagraphHighlight>
                          {c.text as string}
                        </ParagraphHighlight>
                      ) : (
                        (c.text as string)
                      )}
                    </Fragment>
                  ))}
                  {index < allLines.length - 1 && <br />}
                </Fragment>
              ))}
            </Paragraph>
          </div>
          <div className="mx-auto mt-8 grid max-w-7xl grid-rows-2 gap-6 px-0 md:mt-14 md:grid-cols-2 md:grid-rows-none md:gap-8 md:px-8">
            {homeData2.accommodations.cards.map((card) => (
              <AccommodationCard
                key={card.id}
                name={card.name}
                to={card.to}
                color={card.color}
                image={{
                  src: card.imageUrl,
                  alt: card.imageAlt,
                }}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="relative mx-auto mt-14 lg:mt-32 lg:max-w-4xl"
        id="santa-marta"
      >
        <div className="h-[32rem] overflow-hidden shadow-md lg:rounded-lg">
          <Image
            src="/oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg?updatedAt=1703778785707"
            alt="View of Santa Marta"
            className="h-full w-full object-cover"
            transformation={{
              width: 1000,
              aspectRatio: { width: 16, height: 9 },
              cropStrategy: "maintain_ratio",
              focus: "auto",
            }}
          />
          <div className="absolute inset-0 flex bg-gradient-to-t from-transparent to-black/40 px-6 py-4 md:px-8 md:py-6 lg:rounded-lg">
            <Heading as="h3" size="extra-large" variant="white" textShadow>
              Do You Know <HeadingHighlight>Santa Marta?</HeadingHighlight>
            </Heading>
          </div>
        </div>
        <div className="lg:absolute lg:inset-0 lg:flex lg:items-end lg:justify-end">
          <div className="bg-gradient-to-bl from-puerta-100 to-puerta-300 px-8 py-6 shadow-lg md:mx-auto md:max-w-lg md:-translate-y-32 md:rounded-md md:px-6 md:py-4 lg:mx-0 lg:translate-x-12 lg:translate-y-20">
            <Paragraph variant="puerta" justify>
              Santa Marta, nestled{" "}
              <strong>
                between the Caribbean Sea and the Sierra Nevada mountains,
              </strong>{" "}
              beckons tourists with its captivating blend of{" "}
              <strong>natural beauty</strong> and{" "}
              <strong>rich cultural heritage</strong>. Boasting pristine
              beaches, lush national parks, and a historic city center, Santa
              Marta offers an <strong>enchanting escape</strong> for travelers
              seeking a perfect balance of{" "}
              <strong>sun-soaked relaxation</strong> and{" "}
              <strong>
                exploration of Colombia&rsquo;s diverse landscapes.
              </strong>
            </Paragraph>
          </div>
        </div>
      </div>

      <div
        id="about-us"
        className="mx-auto mb-20 mt-24 max-w-4xl lg:mt-72 lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-16"
      >
        <div className="px-8 lg:order-last lg:px-0">
          <Heading as="h3" size="medium">
            {t("aboutUs")}
          </Heading>
          <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
            <Paragraph justify>
              Step into our <strong>Santa Marta haven,</strong> where the{" "}
              <strong>Caribbean breeze whispers tales of adventure,</strong> and
              the Sierra Nevada mountains cradle our dreams. Three years ago, a
              passionate soul embarked on a journey to craft more than just a
              hostel—a place where every traveler feels the warmth of connection
              and the embrace of a second home.
            </Paragraph>
            <Paragraph justify>
              We didn&rsquo;t just paint walls; we painted stories. Our founder,
              driven by a <strong>deep love for Santa Marta,</strong> worked
              tirelessly to create a space that resonates with the city&rsquo;s
              soul. From vibrant murals that speak of local tales to cozy
              corners designed for shared laughter, every inch is a canvas of
              our commitment to authentic experiences.
            </Paragraph>
            <Paragraph justify>
              Collaborating with skilled local artisans, we&rsquo;ve woven the
              spirit of Santa Marta into the very fabric of our hostel. The past
              three years have seen our space evolve into a{" "}
              <strong>
                sanctuary for adventurers, a haven for backpackers, and a
                tapestry of shared memories
              </strong>{" "}
              for those exploring Santa Marta&rsquo;s wonders.
            </Paragraph>
            <Paragraph justify>
              Join us in this heartfelt journey—where stories come to life,
              friendships find a common thread, and the enchantment of Santa
              Marta unfolds at our intimately personal hostel.
            </Paragraph>
          </div>
        </div>
        <div className="mx-auto mt-32 aspect-[3/4] max-w-xs -rotate-6 overflow-hidden rounded-md shadow-lg lg:-ml-10 lg:mr-12 lg:mt-0 lg:max-w-none">
          <Image
            src="/351429301_1381427532589680_2319248312954498147_n.jpg?updatedAt=1703702171449"
            alt=""
            className="h-full w-full object-cover"
            transformation={{
              aspectRatio: { width: 3, height: 4 },
              width: 1600,
              enhancement: "grayscale",
            }}
          />
        </div>
      </div>
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
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
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
        <img
          src={`${imagekitBaseUrl}/${image.src}&tr=ar-16-9,w-1200,fo-custom`}
          // fo-custom is not needed on all images
          alt=""
          className="h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-75"
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
