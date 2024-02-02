import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, useRouteLoaderData } from "@remix-run/react";
import { Carousel } from "~/components/carousel";
import { cn } from "~/components/classnames";
import { loader as rootLoader } from "~/root";
import { Trans, useTranslation } from "react-i18next";
import { Image } from "~/components/image";
import { Link } from "~/components/link";
import i18n from "~/i18n";
import i18next from "~/i18next.server";
import { Heading, HeadingHighlight } from "~/components/heading";
import { Paragraph, ParagraphHighlight } from "~/components/paragraph";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA HOSTELS" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  if (params.locale && !i18n.supportedLngs.includes(params.locale)) {
    // if the 'locale' param is not a supported language, redirect to that path under the auto-detected locale
    const autoDetectedLocale = await i18next.getLocale(request);
    return redirect(`/${autoDetectedLocale}/${params.locale}`);
  }

  return null;
}

export default function Route() {
  const { t } = useTranslation();
  return (
    <>
      <Carousel
        items={[
          {
            src: "datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843&tr=ar-4-3,w-1600",
            alt: "Lost City",
            title: {
              text: (
                <Trans i18nKey="carousel.lostCity.title">
                  Find the Lost City
                  <br />
                  <span className="text-puerta-200">Lost City</span>
                </Trans>
              ),
              position: "top-right",
            },
          },
          {
            src: "azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717&tr=ar-4-3,w-1600",
            alt: "Parque Tayrona",
            title: {
              text: (
                <Trans i18nKey="carousel.parqueTayrona.title">
                  Hike Through
                  <br />
                  the <span className="text-puerta-200">Tayrona Park</span>
                </Trans>
              ),
              position: "top-left",
            },
          },
          {
            src: "denise-leisner-8eVV287ST0E-unsplash.jpg?updatedAt=1703369612704&tr=ar-4-3,w-1600",
            alt: "Minca",
            title: {
              text: (
                <Trans i18nKey="carousel.minca.title">
                  Follow the <br />{" "}
                  <span className="text-puerta-200">Minca River</span>
                </Trans>
              ),
              position: "bottom-left",
            },
          },
          {
            src: "david-hertle-3YCkAhD--Ic-unsplash.jpg?updatedAt=1703468865964&tr=ar-4-3,w-1600",
            alt: "Santa Marta",
            title: {
              text: (
                <Trans i18nKey="carousel.santaMarta.title">
                  Explore the Streets
                  <br />
                  of <span className="text-puerta-200">Santa Marta</span>
                </Trans>
              ),
              position: "bottom-right",
            },
          },
        ]}
      />

      <div className="mx-auto mt-24 max-w-4xl">
        <Heading as="h1" size="medium">
          {t("intro.heading")}
        </Heading>
        <Paragraph size="extra-large" className="mt-6">
          <Trans i18nKey="intro.text">
            Hike through the breath-taking beauty of{" "}
            <ParagraphHighlight>Tayrona National Park</ParagraphHighlight>,
            discover the mysterious{" "}
            <ParagraphHighlight>Lost City</ParagraphHighlight>, or refresh
            yourself in the river of{" "}
            <ParagraphHighlight>Minca</ParagraphHighlight>. Our variety of
            heartful accommodations in the city of Santa Marta are{" "}
            <ParagraphHighlight>your perfect home base.</ParagraphHighlight>
          </Trans>
        </Paragraph>
      </div>

      <div className="relative mt-36">
        <div className="absolute inset-0 -z-10 h-[23rem] bg-gradient-to-br from-puerta-700 to-puerta-600"></div>
        <div className="py-16">
          <div className="mx-auto max-w-4xl">
            <Heading as="h2" size="large" variant="white">
              Your Home Base for a Perfect Trip
            </Heading>
            <Paragraph className="mt-6" size="large" variant="white">
              Choose between our <strong>two accommodations</strong> in Santa
              Marta.
            </Paragraph>
          </div>
          <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-x-8 px-8">
            <AccommodationCard
              name="Puerta Aqua"
              to="/aqua"
              color="aqua"
              image={{
                src: "315892183_204830145296159_6921746397470758374_n.jpg?updatedAt=1703702313633",
                alt: "Puerta Aqua",
              }}
              description="Stay at our lively hostel in the heart of Santa Marta and meet travelers from all over the world. Our rooftop bar is perfect for a get-together at night."
            />
            <AccommodationCard
              name="La Puerta Azul"
              to="/azul"
              color="azul"
              image={{
                src: "358685842_17937739007690648_2983057103105632929_n.jpg?updatedAt=1703702151179",
                alt: "La Puerta Azul",
              }}
              description="Being one of the oldest houses in Santa Marta, La Puerta Azul is filled with beauty and history. It can also be booked completely as a private six-room villa."
            />
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-32 max-w-4xl" id="santa-marta">
        <div className="h-[32rem] overflow-hidden rounded-lg shadow-md">
          <Image
            src="/oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg?updatedAt=1703778785707&tr=w-1000,ar-16-9,c-maintain_ratio,fo-auto"
            alt="View of Santa Marta"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex rounded-lg bg-gradient-to-t from-transparent to-black/40 px-8 py-4">
            <Heading as="h3" size="extra-large" variant="white" textShadow>
              Do You Know <HeadingHighlight>Santa Marta?</HeadingHighlight>
            </Heading>
          </div>
        </div>
        <div className="absolute inset-0 flex items-end justify-end">
          <div className="max-w-lg translate-x-12 translate-y-20 space-y-4 rounded-md bg-gradient-to-bl from-puerta-100 to-puerta-300 px-6 py-4 shadow-lg">
            <Paragraph variant="puerta">
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
        className="mx-auto mb-20 mt-72 grid max-w-4xl grid-cols-2 items-center justify-center gap-16"
      >
        <div className="-ml-10 mr-12 mt-4 aspect-[3/4] -rotate-6 overflow-hidden rounded-md shadow-lg">
          <Image
            src="/351429301_1381427532589680_2319248312954498147_n.jpg?updatedAt=1703702171449&tr=ar-3-4,w-1600,e-grayscale"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="">
          <Heading as="h3" size="medium">
            {t("aboutUs")}
          </Heading>
          <div className="mt-6 space-y-4">
            <Paragraph>
              Step into our <strong>Santa Marta haven,</strong> where the{" "}
              <strong>Caribbean breeze whispers tales of adventure,</strong> and
              the Sierra Nevada mountains cradle our dreams. Three years ago, a
              passionate soul embarked on a journey to craft more than just a
              hostel—a place where every traveler feels the warmth of connection
              and the embrace of a second home.
            </Paragraph>
            <Paragraph>
              We didn&rsquo;t just paint walls; we painted stories. Our founder,
              driven by a <strong>deep love for Santa Marta,</strong> worked
              tirelessly to create a space that resonates with the city&rsquo;s
              soul. From vibrant murals that speak of local tales to cozy
              corners designed for shared laughter, every inch is a canvas of
              our commitment to authentic experiences.
            </Paragraph>
            <Paragraph>
              Collaborating with skilled local artisans, we&rsquo;ve woven the
              spirit of Santa Marta into the very fabric of our hostel. The past
              three years have seen our space evolve into a{" "}
              <strong>
                sanctuary for adventurers, a haven for backpackers, and a
                tapestry of shared memories
              </strong>{" "}
              for those exploring Santa Marta&rsquo;s wonders.
            </Paragraph>
            <Paragraph>
              Join us in this heartfelt journey—where stories come to life,
              friendships find a common thread, and the enchantment of Santa
              Marta unfolds at our intimately personal hostel.
            </Paragraph>
          </div>
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
        "group flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-md",
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
        className={cn("space-y-2 px-6 py-4 text-base text-white", {
          "group-hover:text-azul-800": color === "azul",
          "group-hover:text-aqua-800": color === "aqua",
        })}
      >
        <h4 className="text-sm font-bold uppercase tracking-wider">{name}</h4>
        <p className="leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
