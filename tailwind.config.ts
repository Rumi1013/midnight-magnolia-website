import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./client/index.html",
		"./client/src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				// ═══════════════════════════════════════════════════════════════
				// Midnight Magnolia Brand Colors (from Business Plan)
				// ═══════════════════════════════════════════════════════════════
				"midnight-blue": "#0A192F",
				"midnight-navy": "#0A192F",
				"magnolia-white": "#FAF3E0",
				"sage-green": "#A3B18A",
				"sage-moss": "#A3B18A",
				"gold": "#D4AF37",
				"southern-gold": "#D4AF37",
				"warm-gray": "#D4B99F",
				"magnolia-blush": "#F5E6E0",
				"copper-brown": "#B87333",
				"plum-violet": "#56334E",
				"deep-plum": "#56334E",
				"indigo-blue": "#3D5A80",
				"forest-moss": "#5E6B4E",
				"parchment-cream": "#F8F4E8",

				// Extended palette
				"iron": "#1E1E1E",
				"taupe": "#BFAEA0",
				"glow": "#EEE3CF",
				"mist": "#889696",
				"laurel": "#7DA27E",
				"amber": "#D9A441",
				"rose": "#9C3F3F",
				"river": "#4C6D9C",

				// Shadcn UI semantic colors
				"background": "hsl(var(--background))",
				"foreground": "hsl(var(--foreground))",
				"card": {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				"popover": {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				"primary": {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				"secondary": {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				"muted": {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				"accent": {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				"destructive": {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				"border": "hsl(var(--border))",
				"input": "hsl(var(--input))",
				"ring": "hsl(var(--ring))",
			},
			fontFamily: {
				// Brand fonts
				playfair: ["var(--font-playfair)", "serif"],
				lora: ["var(--font-lora)", "serif"],
				montserrat: ["var(--font-montserrat)", "sans-serif"],
				cormorant: ["var(--font-cormorant)", "serif"],
				merriweather: ["var(--font-merriweather)", "serif"],
				poppins: ["var(--font-poppins)", "sans-serif"],
				// Semantic fonts
				display: ["var(--font-cormorant)", "var(--font-playfair)", "serif"],
				body: ["var(--font-merriweather)", "var(--font-lora)", "serif"],
				accent: ["var(--font-poppins)", "var(--font-montserrat)", "sans-serif"],
				sans: ["var(--font-poppins)", "sans-serif"],
				serif: ["var(--font-cormorant)", "serif"],
				mono: ["var(--font-mono)", "monospace"],
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				"float-gentle": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"zodiac-drift": {
					"0%, 100%": {
						transform: "translateX(0) translateY(0) rotate(0deg)",
						opacity: "0.3",
					},
					"25%": {
						transform: "translateX(20px) translateY(-15px) rotate(5deg)",
						opacity: "0.5",
					},
					"50%": {
						transform: "translateX(-10px) translateY(10px) rotate(-3deg)",
						opacity: "0.25",
					},
					"75%": {
						transform: "translateX(15px) translateY(-5px) rotate(4deg)",
						opacity: "0.4",
					},
				},
				"glow-pulse": {
					"0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" },
					"50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)" },
				},
				"shimmer": {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"float-gentle": "float-gentle 4s ease-in-out infinite",
				"zodiac-drift": "zodiac-drift 20s ease-in-out infinite",
				"glow-pulse": "glow-pulse 3s ease-in-out infinite",
				"shimmer": "shimmer 3s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
