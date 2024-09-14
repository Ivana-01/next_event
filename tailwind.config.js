/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-image': './public/bg.jpg',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        textLogo: '#ae5666',
      },
      textShadow: {
        'sm': '1px 1px 1px rgba(0, 0, 0)',
        'DEFAULT': '2px 2px 2px rgba(0, 0, 0)',
        'lg': '4px 4px 4px rgba(0, 0, 0)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};
