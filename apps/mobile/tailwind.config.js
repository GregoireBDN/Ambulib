/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // ajoute d'autres dossiers si besoin
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#5856D6",
        background: "#F2F2F7",
        card: "#FFFFFF",
        text: "#000000",
        border: "#C6C6C8",
        notification: "#FF3B30",
      },
    },
  },
  plugins: [],
};
