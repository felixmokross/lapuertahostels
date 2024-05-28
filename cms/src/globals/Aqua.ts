import { GlobalConfig } from "payload/types";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";

export const Aqua: GlobalConfig = {
  slug: "aqua",
  label: {
    en: "Aqua",
    es: "Aqua",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [makeCachePurgeHook("globals/aqua", "/aqua")],
  },
  fields: [heroField, layoutField],
  custom: {
    route: "/aqua",
  },
};
