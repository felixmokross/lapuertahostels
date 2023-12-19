import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      white: colors.white,
      puerta: colors.stone,
      azul: colors.blue,
      aqua: colors.teal,
      neutral: colors.gray,
      "accent-neutral": colors.amber,
      "accent-positive": colors.green,
      "accent-negative": colors.red,
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
