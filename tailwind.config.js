/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography"
import forms from "@tailwindcss/forms"
import aspectRatio from "@tailwindcss/aspect-ratio"

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
        gray1: "#252221",
        gray2: "#2B2B2B",
        gray3: "#3F3E3E",

        logo_green: "#69C34B",
        logo_white: "#FAFEFF",
        outline_green: "#4AF511"
      }
    }
  },
  plugins: [typography, forms, aspectRatio]
}
