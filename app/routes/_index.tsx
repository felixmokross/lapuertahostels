import type { MetaFunction } from "@remix-run/node";
import { Link, useRouteLoaderData } from "@remix-run/react";
import { Carousel } from "~/components/carousel";
import { cn } from "~/components/classnames";
import { loader } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "La Puerta Hostels" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
  return (
    <>
      <header className="flex items-center justify-between px-4 py-4">
        <Link to="/">
          <h1 className="flex items-center gap-4 font-serif text-2xl uppercase tracking-wide text-neutral-900">
            <img
              src={`${imagekitBaseUrl}/logos/logo-puerta-simple.png?updatedAt=1703906701749&tr=h-80`}
              alt="La Puerta Hostels Logo"
              width={33}
              height={40}
            />
            <>La Puerta Hostels</>
          </h1>
        </Link>
      </header>
      <main>
        <Carousel
          items={[
            {
              src: "datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843&tr=ar-4-3,w-1600",
              alt: "Lost City",
              title: {
                text: (
                  <>
                    Find the
                    <br />
                    <span className="text-puerta-200">Lost City</span>
                  </>
                ),
                position: "top-right",
              },
            },
            {
              src: "azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717&tr=ar-4-3,w-1600",
              alt: "Parque Tayrona",
              title: {
                text: (
                  <>
                    Hike Through
                    <br />
                    the <span className="text-puerta-200">Tayrona Park</span>
                  </>
                ),
                position: "top-left",
              },
            },
            {
              src: "denise-leisner-8eVV287ST0E-unsplash.jpg?updatedAt=1703369612704&tr=ar-4-3,w-1600",
              alt: "Minca",
              title: {
                text: (
                  <>
                    Follow the
                    <br />
                    <span className="text-puerta-200">Minca River</span>
                  </>
                ),
                position: "bottom-left",
              },
            },
            {
              src: "david-hertle-3YCkAhD--Ic-unsplash.jpg?updatedAt=1703468865964&tr=ar-4-3,w-1600",
              alt: "Santa Marta",
              title: {
                text: (
                  <>
                    Explore the Streets
                    <br />
                    of <span className="text-puerta-200">Santa Marta</span>
                  </>
                ),
                position: "bottom-right",
              },
            },
          ]}
        />

        <div className="mx-auto mt-24 max-w-4xl">
          <h3 className="font-serif text-4xl tracking-tight text-puerta-600">
            Discover the Colombian Costa Caribe
          </h3>
          <p className="mt-6 hyphens-auto text-justify text-xl leading-relaxed">
            Hike through the breath-taking beauty of{" "}
            <strong className="text-neutral-900">Tayrona National Park</strong>,
            discover the mysterious{" "}
            <strong className="text-neutral-900">Lost City</strong>, or refresh
            yourself in the river of{" "}
            <strong className="text-neutral-900">Minca</strong>. Our variety of
            heartful accommodations in the city of Santa Marta are{" "}
            <strong className="text-neutral-900">your perfect homebase.</strong>
          </p>
        </div>

        <div className="relative mt-24">
          <div className="absolute inset-0 -z-10 h-2/3 bg-gradient-to-br from-puerta-400 to-puerta-600"></div>
          <div className="py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-5xl tracking-tight text-white">
                Your Homebase in Santa Marta
              </h2>
              <p className="mt-6 hyphens-auto text-justify text-xl leading-relaxed text-white">
                Choose from our three accommodation offerings in Santa Marta.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-x-8 px-8">
              <AccommodationCard
                name="Puerta Aqua"
                color="aqua"
                image={{
                  src: "315892183_204830145296159_6921746397470758374_n.jpg?updatedAt=1703702313633",
                  alt: "Puerta Aqua",
                }}
                description="Stay at our lively hostel in the heart of Santa Marta."
              />
              <AccommodationCard
                name="Puerta Azul"
                color="azul"
                image={{
                  src: "358685842_17937739007690648_2983057103105632929_n.jpg?updatedAt=1703702151179",
                  alt: "Puerta Azul",
                }}
                description="Our most beautiful house can be booked by room or completely as a private six-room villa."
              />
              <AccommodationCard
                name="Appartments"
                color="appartments"
                image={{
                  src: "oscar-ivan-esquivel-arteaga-floNFI99j4g-unsplash.jpg?updatedAt=1703468598274",
                  alt: "Appartments",
                }}
                description="Choose from our cozy private appartments across the city."
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Do you know Santa Marta?</h3>

          <p>Some text about Santa Marta</p>
        </div>

        {/* <hr className="mx-auto mt-20 max-w-4xl border-t-2 text-neutral-400" /> */}

        <div>
          <h3>About Us</h3>
          <p>Some text about us</p>
        </div>
      </main>
      <footer>
        <div>Footer</div>
      </footer>
    </>
  );
}

type AccommodationCardProps = {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
  color: "aqua" | "azul" | "appartments";
};

function AccommodationCard({
  name,
  image,
  description,
  color,
}: AccommodationCardProps) {
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
  return (
    <Link
      to="."
      className={cn(
        "group flex flex-col items-center overflow-hidden rounded-xl shadow-lg hover:shadow-md",
        {
          "bg-aqua-600 hover:bg-aqua-200": color === "aqua",
          "bg-azul-600 hover:bg-azul-200": color === "azul",
          "bg-apartments-500 hover:bg-apartments-200": color === "appartments",
        },
      )}
    >
      <div className="relative aspect-[16/9] bg-white">
        <img
          src={`${imagekitBaseUrl}/${image.src}&tr=ar-16-9,w-600`}
          alt=""
          className="h-full w-full object-cover group-hover:opacity-75"
        />
      </div>
      <div
        className={cn("space-y-1 px-6 py-4 text-base text-white", {
          "group-hover:text-azul-800": color === "azul",
          "group-hover:text-aqua-800": color === "aqua",
          "group-hover:text-apartments-800": color === "appartments",
        })}
      >
        <h4 className="text-sm font-bold uppercase tracking-wider">{name}</h4>
        <p className="">{description}</p>
      </div>
    </Link>
  );
}
