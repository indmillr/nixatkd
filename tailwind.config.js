/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
      colors: {
        primary: "#3B82F6",
        secondary: "#EF4444",
        dark: "#171717",
        darker: "#0a0a0a",
        light: "#e5e5e5",
        lighter: "#f5f5f5",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
