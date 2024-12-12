import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#fff",
        secondary: "#10a37f",
        // gray: "#f4f4f4",
        gray: "#E8E6E1",
      },
      colors: {
        primary: "#000",
        primaryLight: "#2d333a",
        secondary: "#10a37f",
        secondaryLight: "#f7724e",
        secondaryDark: "#08916e",
        gray500: "#647380",
        gray400: "#b2bbc2",
        white: "#fff",
      },
    },
  },
  plugins: [],
};

export default config;
