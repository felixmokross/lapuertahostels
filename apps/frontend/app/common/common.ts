import { useRouteLoaderData } from "react-router";
import { type loader as rootLoader } from "~/root";

export function useSettings() {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { settings } = rootLoaderData;

  return settings;
}
