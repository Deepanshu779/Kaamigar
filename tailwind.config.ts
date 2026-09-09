import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080C16",
        foreground: "#F8FAFC",
        brand: {
          dark: "#050811",
          navy: "#0A1022",
          card: "#0F172A",
          border: "#1E293B",
          blue: "#2563EB",
          cyan: "#06B6D4",
          orange: "#FF6B2B",
          orangeHover: "#FF550D",
          amber: "#F59E0B",
          emerald: "#10B981",
        },
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(255, 107, 43, 0.45)',
        'glow-blue': '0 0 35px -5px rgba(37, 99, 235, 0.45)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.15), transparent 70%), radial-gradient(circle at 80% 20%, rgba(255, 107, 43, 0.12), transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radar 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
