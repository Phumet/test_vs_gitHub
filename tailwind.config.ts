import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0366D6",
        secondary: "#28A745",
        accent: "#6F42C1",
        warning: "#FFC107",
        danger: "#DC3545",
        dark: "#24292E",
        light: "#F6F8FA",
      },
    },
  },
  plugins: [],
};

export default config;
