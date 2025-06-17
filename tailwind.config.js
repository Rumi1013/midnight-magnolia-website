const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Midnight Magnolia Brand Colors
        "midnight-blue": "#0A192F", // Primary/Backgrounds
        "midnight-blue-darker": "#071323", // For slightly darker shades of midnight blue
        "magnolia-white": "#FAF3E0", // Text/Light Elements
        "sage-green": "#A3B18A", // CTAs/Links/Success
        "warm-gray": "#D4B99F", // Subtle Elements/Borders
        "rich-gold": "#D4AF37", // Premium/Special Emphasis (Changed from 'gold' for clarity)
        "soft-red": "#D4A574", // For errors, as per component variations

        // Shadcn UI default colors (can be kept or overridden)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // Typically #0A192F for dark mode
        foreground: "hsl(var(--foreground))", // Typically #FAF3E0 for dark mode
        primary: {
          DEFAULT: "hsl(var(--primary))", // Should map to sage-green
          foreground: "hsl(var(--primary-foreground))", // Text on primary, likely midnight-blue or magnolia-white
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Should map to warm-gray or a subtle blue
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Should map to soft-red
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Should map to rich-gold
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Typically midnight-blue or midnight-blue-darker
          foreground: "hsl(var(--card-foreground))", // Typically magnolia-white
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", ...fontFamily.sans],
        serif: ["var(--font-lora)", ...fontFamily.serif],
        playfair: ["var(--font-playfair)", ...fontFamily.serif],
        lora: ["var(--font-lora)", ...fontFamily.serif],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.02)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-gentle": "pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      boxShadow: {
        gentle: "0 4px 15px rgba(212, 175, 55, 0.1)", // Soft gold shadow
        subtle: "0 2px 8px rgba(10, 25, 47, 0.2)", // Subtle midnight blue shadow
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
