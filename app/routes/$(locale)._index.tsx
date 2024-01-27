import type { MetaFunction } from "@remix-run/node";
import { Link, useRouteLoaderData } from "@remix-run/react";
import { Carousel } from "~/components/carousel";
import { cn } from "~/components/classnames";
import { XMarkIcon, GlobeAmericasIcon } from "@heroicons/react/20/solid";
import { SVGProps, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { loader as rootLoader } from "~/root";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA HOSTELS" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const footerNavigation = {
  hotel: [
    { name: "About", href: "#" },
    { name: "Puerta Aqua", href: "#" },
    { name: "La Puerta Azul", href: "#" },
    { name: "Contact", href: "#" },
  ],
  experiences: [
    { name: "Santa Marta", href: "#" },
    { name: "Lost City", href: "#" },
    { name: "Tayrona Park", href: "#" },
    { name: "Minca", href: "#" },
  ],
  legal: [
    { name: "Terms", href: "#" },
    { name: "Cancelation", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/lapuertahostels",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Index() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const [bannerVisible, setBannerVisible] = useState(true);
  const { imagekitBaseUrl, locale } = rootLoaderData;
  return (
    <>
      {bannerVisible && (
        <div className="flex items-center gap-x-6 bg-puerta-800 px-6 py-2.5 text-sm text-white sm:px-3.5 sm:before:flex-1">
          <div className="flex gap-2 leading-6">
            <p>Travel before 20 September and get 20% off!</p>
            <Link to="/" className="font-bold hover:underline">
              <strong>Book now &rarr;</strong>
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              onClick={() => setBannerVisible(false)}
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      <header className="grid grid-cols-3 items-center px-4 py-4">
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
        <div className="space-x-10 justify-self-center text-nowrap text-sm font-bold text-neutral-500">
          <Link to="" className={cn("hover:text-neutral-900")}>
            Puerta Aqua
          </Link>
          <Link to="" className={cn("hover:text-neutral-900")}>
            La Puerta Azul
          </Link>
          <Link to="#santa-marta" className={cn("hover:text-neutral-900")}>
            Santa Marta
          </Link>
          <Link to="#about-us" className={cn("hover:text-neutral-900")}>
            About Us
          </Link>
          <Link to="" className={cn("hover:text-neutral-900")}>
            Contact
          </Link>
        </div>
        <div className="group flex items-center justify-end gap-2 text-sm font-bold text-neutral-500">
          <GlobeAmericasIcon className="h-4" />
          <Link
            to="/en"
            reloadDocument
            className={cn(
              "hover:text-neutral-900",
              locale === "en"
                ? "text-neutral-900"
                : "hidden group-hover:inline",
            )}
          >
            English
          </Link>
          <Link
            to="/es"
            reloadDocument
            className={cn(
              "hover:text-neutral-900",
              locale === "es"
                ? "text-neutral-900"
                : "hidden group-hover:inline",
            )}
          >
            Español
          </Link>
          <Link
            to="/de"
            reloadDocument
            className={cn(
              "hover:text-neutral-900",
              locale === "de"
                ? "text-neutral-900"
                : "hidden group-hover:inline",
            )}
          >
            Deutsch
          </Link>
          <Link
            to="/fr"
            reloadDocument
            className={cn(
              "hover:text-neutral-900",
              locale === "fr"
                ? "text-neutral-900"
                : "hidden group-hover:inline",
            )}
          >
            Français
          </Link>
        </div>
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
            <strong className="text-neutral-900">
              your perfect home base.
            </strong>
          </p>
        </div>

        <div className="relative mt-36">
          <div className="absolute inset-0 -z-10 h-[23rem] bg-gradient-to-br from-puerta-700 to-puerta-600"></div>
          <div className="py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-5xl tracking-tight text-white">
                Your Home Base for a Perfect Trip
              </h2>
              <p className="mt-6 hyphens-auto text-justify text-lg leading-relaxed text-white">
                Choose between our <strong>two accommodations</strong> in Santa
                Marta.
              </p>
            </div>
            <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-x-8 px-8">
              <AccommodationCard
                name="Puerta Aqua"
                color="aqua"
                image={{
                  src: "315892183_204830145296159_6921746397470758374_n.jpg?updatedAt=1703702313633",
                  alt: "Puerta Aqua",
                }}
                description="Stay at our lively hostel in the heart of Santa Marta and meet travelers from all over the world. Our rooftop bar is perfect for a get-together at night."
              />
              <AccommodationCard
                name="La Puerta Azul"
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
            <img
              src={`${imagekitBaseUrl}/oscar-ivan-esquivel-arteaga-DZVY-1I2peQ-unsplash.jpg?updatedAt=1703778785707&tr=w-1000,ar-16-9,c-maintain_ratio,fo-auto`}
              alt="View of Santa Marta"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex rounded-lg bg-gradient-to-t from-transparent to-black/40 px-8 py-4">
              <h3
                className="font-serif text-6xl leading-relaxed tracking-tight text-white"
                style={{ textShadow: "0 0 50px black" }}
              >
                Do You Know{" "}
                <span className="text-puerta-200">Santa Marta?</span>
              </h3>
            </div>
          </div>
          <div className="absolute inset-0 flex items-end justify-end">
            <div className="max-w-lg translate-x-12 translate-y-20 space-y-4 rounded-md bg-gradient-to-bl from-puerta-100 to-puerta-300 px-6 py-4 shadow-lg">
              <p className="hyphens-auto text-justify text-base leading-relaxed text-puerta-800">
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
              </p>
            </div>
          </div>
        </div>

        <div
          id="about-us"
          className="mx-auto mb-20 mt-72 grid max-w-4xl grid-cols-2 items-center justify-center gap-16"
        >
          <div className="-ml-10 mr-12 mt-4 aspect-[3/4] -rotate-6 overflow-hidden rounded-md shadow-lg">
            <img
              src={`${imagekitBaseUrl}/351429301_1381427532589680_2319248312954498147_n.jpg?updatedAt=1703702171449&tr=ar-3-4,w-1600,e-grayscale`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="">
            <h3 className="font-serif text-4xl tracking-tight text-puerta-600">
              About Us
            </h3>
            <div className="mt-6 space-y-4 hyphens-auto text-justify text-base leading-relaxed">
              <p>
                Step into our <strong>Santa Marta haven,</strong> where the{" "}
                <strong>Caribbean breeze whispers tales of adventure,</strong>{" "}
                and the Sierra Nevada mountains cradle our dreams. Three years
                ago, a passionate soul embarked on a journey to craft more than
                just a hostel—a place where every traveler feels the warmth of
                connection and the embrace of a second home.
              </p>
              <p>
                We didn&rsquo;t just paint walls; we painted stories. Our
                founder, driven by a <strong>deep love for Santa Marta,</strong>{" "}
                worked tirelessly to create a space that resonates with the
                city&rsquo;s soul. From vibrant murals that speak of local tales
                to cozy corners designed for shared laughter, every inch is a
                canvas of our commitment to authentic experiences.
              </p>
              <p>
                Collaborating with skilled local artisans, we&rsquo;ve woven the
                spirit of Santa Marta into the very fabric of our hostel. The
                past three years have seen our space evolve into a{" "}
                <strong>
                  sanctuary for adventurers, a haven for backpackers, and a
                  tapestry of shared memories
                </strong>{" "}
                for those exploring Santa Marta&rsquo;s wonders.
              </p>
              <p>
                Join us in this heartfelt journey—where stories come to life,
                friendships find a common thread, and the enchantment of Santa
                Marta unfolds at our intimately personal hostel.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-40 bg-puerta-100" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <h6 className="mt-2 flex items-center gap-2 font-serif text-base uppercase tracking-wider text-neutral-900">
                <img
                  className="h-7"
                  src={`${imagekitBaseUrl}/logos/logo-puerta-simple.png?updatedAt=1703906701749&tr=h-56`}
                  alt="La Puerta Hostels Logo"
                />
                La Puerta Hostels
              </h6>
              <p className="text-sm leading-6 text-neutral-600">
                La Puerta Hostels S.A.S.
                <br />
                Calle 18 #5-66
                <br />
                Santa Marta 470004
                <br /> Colombia
              </p>
              <div className="flex space-x-6">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-neutral-400 hover:text-neutral-500"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                  Hotel
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerNavigation.hotel.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                  Experiences
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerNavigation.experiences.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                  Legal
                </h3>
                <ul className="mt-6 space-y-4">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-neutral-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-neutral-900">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Don&rsquo;t miss out on new experiences, discounts, or any other
                news from us!
              </p>
            </div>
            <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-puerta-600 sm:w-56 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex h-full w-full items-center justify-center rounded-md bg-puerta-500 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm hover:bg-puerta-200 hover:text-puerta-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-puerta-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="mt-8 border-t border-neutral-900/10 pt-8 sm:mt-10 lg:mt-12">
            <p className="text-xs leading-5 text-neutral-500">
              &copy; 2024 La Puerta Hostels S.A.S. All rights reserved.
            </p>
          </div>
        </div>
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
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
  return (
    <Link
      to="."
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-md",
        {
          "bg-aqua-600 hover:bg-aqua-200": color === "aqua",
          "bg-azul-600 hover:bg-azul-200": color === "azul",
          "bg-apartments-500 hover:bg-apartments-200": color === "appartments",
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
          "group-hover:text-apartments-800": color === "appartments",
        })}
      >
        <h4 className="text-sm font-bold uppercase tracking-wider">{name}</h4>
        <p className="leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
