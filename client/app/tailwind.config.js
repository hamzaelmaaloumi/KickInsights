/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-up-down": "bounceUpDown 3s infinite ease-in-out",
      },
      keyframes: {
        bounceUpDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
};
