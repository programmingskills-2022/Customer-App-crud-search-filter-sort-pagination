/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
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
