import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070b",
        panel: "#0c111d",
        line: "rgba(148, 163, 184, 0.16)",
        electric: "#21d4fd",
        cobalt: "#2563eb"
      },
      boxShadow: {
        glow: "0 0 70px rgba(33, 212, 253, 0.16)",
        card: "0 24px 80px rgba(0, 0, 0, 0.32)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: [
          "var(--font-inter-tight)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
