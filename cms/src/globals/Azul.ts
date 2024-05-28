import { GlobalConfig } from "payload/types";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";

export const Azul: GlobalConfig = {
  slug: "azul",
  label: {
    en: "Azul",
    es: "Azul",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [makeCachePurgeHook("globals/azul", "/azul")],
  },
  fields: [heroField, layoutField],
  custom: {
    route: "/azul",
  },
};
