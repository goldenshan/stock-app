/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ig: {
          orange: "#F58529",
          pink: "#DD2A7B",
          purple: "#8134AF",
          blue: "#515BD4",
        },
      },
      backgroundImage: {
        "ig-gradient": "linear-gradient(90deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
        cardHover: "0 6px 20px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};