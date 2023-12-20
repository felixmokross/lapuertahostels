import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t("greeting")}</h1>
      <div className="flex h-[30rem] items-center justify-center bg-puerta-100">
        Hero section
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
    </main>
  );
}
