import { useRouteLoaderData } from "@remix-run/react";
import { type loader as rootLoader } from "~/root";
import { SerializeFromLoader } from "./common/types";

export type Environment = SerializeFromLoader<typeof rootLoader>["environment"];

export function useEnvironment() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { environment } = rootLoaderData;

  return environment;
}
