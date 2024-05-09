import { MetaFunction } from "@remix-run/node";
import { Page } from "./page";

export const meta: MetaFunction = () => {
  return [
    { title: "LA PUERTA AZUL" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Route() {
  return <Page />;
}
