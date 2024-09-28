/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,tsx,ts}"],
  theme: {
    extend: {
      keyframes: {
        "slide-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        },
        "slide-bottom": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" }
        }
      },
      animation: {
        "slide-right": "slide-right 0.5s ease-in-out",
        "slide-bottom": "slide-bottom 0.2s ease-in"
      }
    }
  },
  plugins: []
};
