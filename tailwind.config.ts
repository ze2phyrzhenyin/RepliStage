import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: {
          950: "#050816",
          900: "#0b1123",
          800: "#121b34",
          700: "#192545",
          gold: "#f1c27d",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 18px 40px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "stage-radial":
          "radial-gradient(circle at top, rgba(241,194,125,0.18), transparent 34%), linear-gradient(180deg, rgba(7,11,25,0.98), rgba(3,6,17,1))",
      },
    },
  },
  plugins: [],
};

export default config;
