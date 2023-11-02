/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // See: https://tailwindcss.com/docs/guides/vite#vue
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // See: https://daisyui.com/docs/install/
  ],
  daisyui: {
    themes: ["dark"],
  },
}
