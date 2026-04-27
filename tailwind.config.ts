import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#f1f8f5",
          100: "#dcefe5",
          200: "#bcdfcd",
          300: "#8fc7ad",
          400: "#5fa888",
          500: "#3f8a6c",
          600: "#2d6e56",
          700: "#235847",
          800: "#1c463a",
          900: "#0f4c3a",
          950: "#0a3328",
        },
        coral: {
          50: "#fdf5f1",
          100: "#fae6dc",
          200: "#f5cdb9",
          300: "#eeac8c",
          400: "#e5895d",
          500: "#e07856",
          600: "#cf5a35",
          700: "#ad4528",
          800: "#8c3a25",
          900: "#723221",
        },
        cream: {
          50: "#fefdfb",
          100: "#faf7f2",
          200: "#f3eee2",
          300: "#e8dfca",
          400: "#d6c7a3",
          500: "#c2ad7b",
        },
        ink: {
          50: "#f6f7f8",
          100: "#e6e9eb",
          200: "#cdd3d7",
          300: "#a6b0b6",
          400: "#6e7a82",
          500: "#4a565d",
          600: "#333d44",
          700: "#252e34",
          800: "#1f2a30",
          900: "#141a1e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
      boxShadow: {
        soft: "0 6px 24px -10px rgba(15, 76, 58, 0.18)",
        card: "0 2px 12px -4px rgba(31, 42, 48, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
