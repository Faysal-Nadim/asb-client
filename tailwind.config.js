/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        black: "#222222", // Main color for text and icons
        secondary: "#2F5651", // Main color for watch cards
        secondarylight: "#393534", // Main color for watch cards

        primary: "#ffffff", // Footer background and navbar
        primarylight: "#e4e2dd", // Footer background and navbar

        oldblue: "#0297B2", // Old blue

        accent: "#FF6F61", // Accent color (coral) for buttons or highlights
        neutral: "#B0BEC5", // Neutral gray for borders or backgrounds
        lightGray: "#EAEAEA", // Light gray for card backgrounds
        darkGray: "#37474F", // Dark gray for text or secondary elements
        success: "#4CAF50", // Green for success messages
        warning: "#FFC107", // Yellow for warning messages
        error: "#F44336", // Red for error messages
        info: "#2196F3", // Blue for informational messages
      },
    },
    screens: {
      sm: "360px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
