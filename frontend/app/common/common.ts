import { useRouteLoaderData } from "@remix-run/react";
import { type loader as rootLoader } from "~/root";
import { SerializeFromLoader } from "./types";

export type Common = SerializeFromLoader<typeof rootLoader>["common"];

export function useCommon() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { common } = rootLoaderData;

  return common;
}
