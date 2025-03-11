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
      animation: {
        slideIn: "slideIn 0.3s ease-out forwards",
        bounceSlow: "bounce 2s infinite"
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(-20px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" }
        }
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
