import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black: colors.black,
      transparent: colors.transparent,
      current: colors.current,
      white: colors.white,
      puerta: {
        50: "#F8F5F1",
        100: "#EDE6DC",
        200: "#E2D0B6",
        300: "#CBA671",
        400: "#C48E4F",
        500: "#B37332",
        600: "#986634",
        700: "#754E27",
        800: "#603F1F",
        900: "#4D2E0F",
        950: "#43260A",
      },
      azul: colors.blue,
      aqua: colors.teal,
      apartments: colors.orange,
      neutral: colors.gray,
      "accent-neutral": colors.amber,
      "accent-positive": colors.green,
      "accent-negative": colors.red,
    },
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
        serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [formsPlugin],
} satisfies Config;
