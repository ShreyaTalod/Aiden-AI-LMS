/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 🌌 Unified Greyish-Blue Theme Palette */
        primary: "var(--color-primary)",           // #5bc0be
        "primary-light": "var(--color-primary-light)", // #6fffe9
        "primary-dark": "var(--color-primary-dark)",   // #3a506b
        "bg-dark": "var(--color-bg-dark)",         // #0b132b
        "bg-card": "var(--color-bg-card)",         // #1c2541
        accent: "var(--color-accent)",             // #3a506b
        "text-muted": "var(--color-text-muted)",   // #a0aec0
      },
    },
  },
  plugins: [],
};




