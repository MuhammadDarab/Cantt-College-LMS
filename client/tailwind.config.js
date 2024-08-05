/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "small-img": "url('small-tiles-gradient.png')",
        "large-tiles": "url('large-tiles-gradient.png')",
        "none": "url('')",
      },
    },
  },
  plugins: [],
};
