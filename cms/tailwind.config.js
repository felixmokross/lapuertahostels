/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-mode="dark"]', ".dark"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      spacing: {
        base: "var(--base)",
      },
      colors: {
        "theme-bg": "var(--theme-bg)",
        "theme-elevation": {
          0: "var(--theme-elevation-0)",
          50: "var(--theme-elevation-50)",
          100: "var(--theme-elevation-100)",
          200: "var(--theme-elevation-200)",
          300: "var(--theme-elevation-300)",
          400: "var(--theme-elevation-400)",
          500: "var(--theme-elevation-500)",
          600: "var(--theme-elevation-600)",
          700: "var(--theme-elevation-700)",
          800: "var(--theme-elevation-800)",
          900: "var(--theme-elevation-900)",
          1000: "var(--theme-elevation-1000)",
        },
      },
    },
  },
};
