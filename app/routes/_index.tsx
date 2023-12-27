import type { MetaFunction } from "@remix-run/node";
import { Link, useRouteLoaderData } from "@remix-run/react";
import { Carousel } from "~/components/carousel";
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
              src={`${imagekitBaseUrl}/lapuertahostels-logo-simple.png?updatedAt=1703612701386&tr=h-80`}
              alt=""
              width={40}
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

        <div className="mt-24 bg-puerta-500">
          <div className="mx-auto max-w-4xl py-16">
            <h2 className="font-serif text-5xl tracking-tight text-white">
              Your Homebase in Santa Marta
            </h2>
            <p className="mt-6 hyphens-auto text-justify text-xl leading-relaxed text-white">
              Choose from our three accommodation offerings in Santa Marta.
            </p>
            <div className="mt-6 flex gap-x-6">
              <div className="flex flex-col items-center">
                Puerta Aqua
                <div className="h-96 w-full overflow-hidden rounded-lg">
                  <img
                    src={`${imagekitBaseUrl}/315892183_204830145296159_6921746397470758374_n.jpg?updatedAt=1703702313633&tr=ar-3-4,w-600`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
              <div className="flex flex-col items-center">
                Puerta Azul
                <div className="h-96 w-full overflow-hidden rounded-lg">
                  <img
                    src={`${imagekitBaseUrl}/358685842_17937739007690648_2983057103105632929_n.jpg?updatedAt=1703702151179&tr=ar-3-4,w-600`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
              <div className="flex flex-col items-center">
                Apartments
                <div className="h-96 w-full overflow-hidden rounded-lg">
                  <img
                    src={`${imagekitBaseUrl}/oscar-ivan-esquivel-arteaga-floNFI99j4g-unsplash.jpg?updatedAt=1703468598274&tr=ar-3-4,w-600`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
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
