import type { MetaFunction } from "@remix-run/node";
import tayronaImage from "../assets/tayrona.jpg";
import logo from "../assets/logo-lapuertahostels.jpg";

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
        <div className="relative h-[30rem] bg-puerta-100">
          <img
            src={tayronaImage}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* <div className="bg-black absolute top-0 h-full w-full opacity-0"></div> */}
          <h3
            className="absolute left-8 top-1/3 -translate-y-1/2 text-6xl font-light tracking-tighter text-white"
            style={{ textShadow: "0 0 50px black" }}
          >
            Parque Tayrona
          </h3>
        </div>

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
