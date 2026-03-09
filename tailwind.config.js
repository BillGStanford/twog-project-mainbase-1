/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sky:        "#1a7abf",
        "sky-light":"#d6eaf8",
        "sky-mid":  "#5baade",
        "sky-dark": "#0f5a8a",
        gold:       "#f0b429",
        "gold-dark":"#c8861a",
        "gold-light":"#fef3cd",
        ink:        "#0d1b2a",
        "ink-mid":  "#2c4a6e",
        "ink-muted":"#5a7a9a",
        border:     "#c2d9ee",
        "off-white":"#f7f9fc",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        serif:   ["'Source Serif 4'", "Georgia", "serif"],
        body:    ["'Inter'", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp .4s ease forwards",
      },
    },
  },
  plugins: [],
};
