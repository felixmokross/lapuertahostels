import { useMatch } from "@remix-run/react";

export function useTheme() {
  return (
    (useMatch("/:locale/:accommodation/*")?.params.accommodation as
      | "azul"
      | "aqua"
      | undefined) || "puerta"
  );
}

export type Theme = ReturnType<typeof useTheme>;
