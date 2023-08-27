import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        roboto_mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        "color-background": "var(--color-background)",
        "color-text": "var(--color-text)",
        "color-table": "var(--color-table)",
      },
    },
  },
  plugins: [],
};
export default config;
