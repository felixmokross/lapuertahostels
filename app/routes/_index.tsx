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
        <h1 className="flex items-center gap-6 font-serif text-xl tracking-tight">
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

        <div className="mx-auto max-w-5xl">
          <h3>Some heading text</h3>
          <p>This is something more</p>
        </div>

        <h2>Your Homebase in Santa Marta</h2>
        <p>Text</p>

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
