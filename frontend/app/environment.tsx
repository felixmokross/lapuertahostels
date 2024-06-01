import { SerializeFrom } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { type loader as rootLoader } from "~/root";

export type Environment = SerializeFrom<typeof rootLoader>["environment"];

export function useEnvironment() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { environment } = rootLoaderData;

  return environment;
}
