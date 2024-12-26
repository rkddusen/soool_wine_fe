/** @type {import('tailwindcss').Config} */

const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const z0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}`) };

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main": "#FF8080",
        "dark-main": "#EE6C6C",
        "light-main": "#FFDCDC",
        "lighter-main": "#FFF8F8",
        "f5-gray": "#F5F5F5",
        "f0-gray": "#F0F0F0",
        "e0-gray": "#E0E0E0",
        "c0-gray": "#C0C0C0",
        "bb-gray": "#BBBBBB",
        "78-gray": "#787878",
        "49-gray": "#494949",
        "red-wine": "#DF2121",
        "white-wine": "#B3B3B3",
        "rose-wine": "#FF9992",
        "sparkling-wine": "#F9DA37",
        "very-light-degree": "#FFD7D7",
        "light-degree": "#FFAFAF",
        "medium-degree": "#FF8787",
        "full-degree": "#FF5F5F",
        "very-full-degree": "#FF3737",
        "transparent": "#FFFFFFFF",
        "dark-memo": "#F8E5B6",
        "memo": "#FFEFC8",
        "light-memo": "#FFFBF1",
      },
      fontSize: px0_100,
      width: {
        ...px0_1000,
        1280: "1280px",
      },
      height: {
        ...px0_1000,
      },
      padding: px0_100,
      margin: px0_100,
      strokeWidth: {
        0.5: "0.5px",
        1.5: "1.5px",
      },
      spacing: {
        ...px0_1000,
        1280: "1280px",
      },
      borderWidth: {
        1: "1px",
        1.5: "1.5px",
        3: "3px",
      },
      borderRadius: {
        5: "5px",
        15: "15px",
        20: "20px",
        30: "30px",
      },
      zIndex: z0_100,
      keyframes: {
        btnOpen: {
          "0%": { width: "45px" },
          "100%": { width: "170px" },
        },
      },
      animation: {
        btnOpen: "btnOpen 1s ease-in-out forewards",
      },
      boxShadow: {
        "wine-box": "0 5px 10px rgba(0, 0, 0, 0.15)",
      },
      lineHeight: {
        1: "1",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".center-absolute": {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        },
        ".y-center-absolute": {
          top: "50%",
          transform: "translateY(-50%)",
        },
        ".x-center-absolute": {
          left: "50%",
          transform: "translateX(-50%)",
        },
      });
    },
  ],
};
