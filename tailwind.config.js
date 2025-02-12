/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["38px", "50px"],
      "4xl": ["48px", "58px"],
      "6xl": ["70px", "90px"],
      "8xl": ["106px", "126px"],
    },
    extend: {
      fontFamily: {
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        Montagu: ["Montagu Slab"],
      },
      colors: {
        green: "#0a1704",
        yellow: "#e1b62f",
        "coral-red": "#FF6452",
        "gray": "#b7b4c7",
        "pale-blue": "#F5F6FF",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        xs: "344px",
        ms:"390px",
        sm: "430px",
        md: "768px",
        lg: "1280px",
        xl: "2100px",
        "2xl": "1536px",
      },

      backgroundImage: {
        "custom-gradient":
        "radial-gradient(circle at 10% 20%, rgb(85, 149, 27) 0.1%, rgb(183, 219, 87) 90%)",
        "HomeLg-bg": "url('/background-desktop.png')",
        "HomeMd-bg": "url('/background-tablet.png')",
        "HomeSm-bg": "url('/background-mobile.png')",
        "ticket-bg": "url('/pattern-ticket.svg')",
        "tf-gradient": "linear-gradient(75.7deg, rgb(34, 126, 34) 3.8%, rgb(99, 162, 17) 87.1%)",
      },
    },
  },
  plugins: [],
};
