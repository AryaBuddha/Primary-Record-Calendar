module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      colors: {
        'custom-blue': '#06327D',
      },
      screens: {
        '2xl': "1550px",
      },
      fontSize: {
        'smmd': '0.9rem',
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffffff",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ]
  },
}