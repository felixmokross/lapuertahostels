import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "PUERTA AQUA" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Route() {
  return <p>Aqua</p>;
}
