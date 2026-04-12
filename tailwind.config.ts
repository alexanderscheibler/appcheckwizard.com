import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        josefin: ["var(--font-josefin)", "sans-serif"],
        parchment: ["var(--font-parchment)", "Papyrus", "fantasy"],
      }
    },
  },
  plugins: [],
};
export default config;
