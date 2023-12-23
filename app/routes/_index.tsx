import type { MetaFunction } from "@remix-run/node";
import logo from "../assets/logo-lapuertahostels.jpg";
import { Carousel } from "~/components/carousel";

export const meta: MetaFunction = () => {
  return [
    { title: "La Puerta Hostels" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="flex px-2 py-4">
        <h1 className="flex items-center gap-6 font-serif text-xl tracking-tight text-puerta-700">
          <img src={logo} alt="" width={50} height={50} />
          <>La Puerta Hostels</>
        </h1>
      </header>
      <main>
        <Carousel
          items={[
            {
              src: "datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843&tr=ar-4-3,w-1600",
              alt: "Lost City",
              title: { text: "Lost City", position: "top-right" },
            },
            {
              src: "azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717&tr=ar-4-3,w-1600",
              alt: "Parque Tayrona",
              title: { text: "Parque Tayrona", position: "top-left" },
            },
          ]}
        />

        <div className="mx-auto mt-8 max-w-5xl">
          <h3 className="text-3xl tracking-tight text-puerta-600">
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
