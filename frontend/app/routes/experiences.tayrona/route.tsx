import { MetaFunction } from "@remix-run/react";
import { Page } from "./page";

export const meta: MetaFunction = () => {
  return [
    { title: "Tayrona National Park" },
    { name: "description", content: "TODO" },
  ];
};

export default function Route() {
  return <Page />;
}
