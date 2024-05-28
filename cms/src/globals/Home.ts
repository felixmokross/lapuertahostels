import { GlobalConfig } from "payload/types";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";

export const Home: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [makeCachePurgeHook("globals/home", "/")],
  },
  fields: [heroField, layoutField],
};
