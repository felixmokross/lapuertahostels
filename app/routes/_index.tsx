import type { MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
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
      <header className="flex px-4 py-4">
        <h1 className="flex items-center gap-4 font-serif text-2xl tracking-tight text-puerta-700">
          <img
            src={`${imagekitBaseUrl}/lapuertahostels-logo-simple.png?updatedAt=1703612701386&tr=h-80`}
            alt=""
            width={40}
            height={40}
          />
          <>La Puerta Hostels</>
        </h1>
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
                    Discover the Streets
                    <br />
                    of <span className="text-puerta-200">Santa Marta</span>
                  </>
                ),
                position: "bottom-right",
              },
            },
          ]}
        />

        <div className="mx-auto mt-8 max-w-5xl">
          <h3 className="font-serif text-3xl tracking-tight text-puerta-600">
            Discover the Colombian Costa Caribe
          </h3>
          <p className="mt-4 text-lg leading-relaxed">
            Hike through the breath-taking beauty of{" "}
            <strong className="text-puerta-600">Tayrona National Park</strong>,
            discover the mysterious{" "}
            <strong className="text-puerta-600">Lost City</strong>, or refresh
            yourself in the river of{" "}
            <strong className="text-puerta-600">Minca</strong>.
          </p>
        </div>

        <hr className="mx-auto mt-16 max-w-5xl text-puerta-400" />

        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="text-3xl tracking-tight">
            Your Homebase in Santa Marta
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex justify-around">
          <div className="flex w-52 flex-col items-center">
            Puerta Aqua
            <div className="h-52 w-full rounded-md bg-aqua-500"></div>
            <div className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
          <div className="flex w-52 flex-col items-center">
            Puerta Azul
            <div className="h-52 w-full rounded-md bg-azul-600"></div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          </div>
          <div className="flex w-52 flex-col items-center">
            Apartments
            <div className="h-52 w-full rounded-md bg-puerta-600"></div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          </div>
        </div>
        <div>
          <h3>Do you know Santa Marta?</h3>

          <p>Some text about Santa Marta</p>
        </div>

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
