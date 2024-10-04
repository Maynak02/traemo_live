/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ...colors,
        lightgray: "#F5F5F5",
        fontColor: "#525252",
        titleColor: "#F6F6F6",
        transparent: "transparent",
        gray33: "#333333",
        themeColor: "#FAB300",
        theme: "#FFC93C",
        green00: "#FAB300",
        blue19: "#1976D2",
        redEB: "#EB4335",
        black33: "#333333",
        grayAC: "#ACACAC",
        purpleF3: "#F3E8FF",
        pitchFF: "#FFE2E5",
        yellowFF: "#FFF4DE",
        greenDC: "#DCFCE7",
        subTextColor: "#9d9d9d",
        subTextColor: "#9d9d9d",
        serviceTextColor: "#98A2B3",
        grayE1: "#E1DFDF",
        borderbackground: "#D0D5DD",
        paidColor: "rgba(236, 253, 243, 1)",
        cancelColor: "rgba(254, 243, 242, 1)",
        refundColor: "rgba(242, 244, 247, 1)",
        grayText: "#667085",
      },
    },
    fontFamily: {
      inter: ["var(--font-inter)"],
      poppins: ["var(--font-poppins)"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1992px",
    },
  },
  plugins: [],
};
