/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FBFBFF",
        bg2: "#F3F4FC",
        surface: "#FFFFFF",
        ink: "#0B0B1A",
        muted: "#5E5E7A",
        line: "rgba(12,12,40,0.08)",
        plasma: "#6C47FF",
        arc: "#00B4D8",
        violet: "#8B5CF6",
        ember: "#FF4D6D",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
