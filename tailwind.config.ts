import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bg: "hsl(var(--background))",
        surface: "hsl(var(--card))",
        "surface-alt": "hsl(var(--accent))",
        text: "hsl(var(--foreground))",
        "text-muted": "hsl(var(--muted-foreground))",
        brand: "hsl(var(--primary))",
        "brand-strong": "hsl(var(--secondary))",
        accent: "hsl(var(--tertiary))",
        danger: "hsl(var(--destructive))",
        warning: "hsl(var(--warning))",
        success: "hsl(var(--success))",
      },
      borderRadius: {
        card: "var(--radius)",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
