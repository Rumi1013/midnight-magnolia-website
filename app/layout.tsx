import type React from "react";
import type { Metadata, Viewport } from "next";
import {
	Inter,
	Playfair_Display,
	Lora,
	Montserrat,
	Cormorant_Garamond,
	Merriweather,
	Poppins,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/seo";

const CustomCursor = dynamic(() => import("./components/CustomCursor"), {
	ssr: false,
});

// Font configurations - Midnight Magnolia Brand Fonts
const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
	display: "swap",
});
const lora = Lora({
	subsets: ["latin"],
	variable: "--font-lora",
	display: "swap",
});
const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
});
const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	style: ["normal", "italic"],
	variable: "--font-cormorant",
	display: "swap",
});
const merriweather = Merriweather({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-merriweather",
	display: "swap",
});
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

// Safe URL helper function
function getSafeUrl(
	envVar: string | undefined,
	fallback = "https://midnight-magnolia.com"
): string {
	if (!envVar) return fallback;

	// Clean the environment variable in case it includes the variable name
	const cleanUrl = envVar.replace(/^NEXT_PUBLIC_SITE_URL=/, "").trim();

	try {
		// Validate URL format
		new URL(cleanUrl);
		return cleanUrl;
	} catch {
		console.warn(
			`Invalid URL in environment variable: ${envVar}, using fallback: ${fallback}`
		);
		return fallback;
	}
}

// Get site URL safely
const siteUrl = getSafeUrl(process.env.NEXT_PUBLIC_SITE_URL);

// Viewport configuration (separated from metadata in Next.js 14+)
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#0A192F" },
		{ media: "(prefers-color-scheme: dark)", color: "#0A192F" },
	],
	colorScheme: "dark",
};

export const metadata: Metadata = {
	title: {
		default: "Midnight Magnolia | Digital Sanctuary for Healing & Transformation",
		template: "%s | Midnight Magnolia",
	},
	description:
		"Digital sanctuary for healing & transformation. Blending ancestral wisdom, Southern Gothic grace, and neurodivergent-friendly tools for those seeking healing, sobriety support, and gentle productivity.",
	keywords: siteConfig.keywords,
	authors: [
		{ name: siteConfig.founder },
		{ name: siteConfig.name },
	],
	creator: siteConfig.founder,
	publisher: siteConfig.parentCompany,
	metadataBase: new URL(siteUrl),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		title: "Midnight Magnolia | Digital Sanctuary for Healing & Transformation",
		description:
			"Digital sanctuary for healing & transformation. Blending ancestral wisdom, Southern Gothic grace, and neurodivergent-friendly tools for healing, sobriety support, and gentle productivity.",
		siteName: siteConfig.name,
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Midnight Magnolia - Digital Sanctuary for Healing & Transformation",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Midnight Magnolia | Digital Sanctuary for Healing & Transformation",
		description:
			"Digital sanctuary for healing & transformation. Blending ancestral wisdom, Southern Gothic grace, and neurodivergent-friendly tools.",
		images: ["/images/og-image.jpg"],
		creator: siteConfig.social.twitter,
		site: siteConfig.social.twitter,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			"index": true,
			"follow": true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
	},
	category: "wellness",
	classification: "Digital Wellness & Healing Tools",
	referrer: "origin-when-cross-origin",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	manifest: "/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: siteConfig.name,
	},
	applicationName: siteConfig.name,
	generator: "Next.js",
	other: {
		"msapplication-TileColor": "#0A192F",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${playfair.variable} ${lora.variable} ${montserrat.variable} ${cormorant.variable} ${merriweather.variable} ${poppins.variable}`}>
			<head>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link
					rel="manifest"
					href="/site.webmanifest"
				/>
				<meta
					name="theme-color"
					content="#0A192F"
				/>
				<meta
					name="msapplication-TileColor"
					content="#0A192F"
				/>
			</head>
			<body className="antialiased bg-midnight-blue text-magnolia-white">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem>
					<div className="flex min-h-screen flex-col">
						<CustomCursor />
						<Header />
						<main className="flex-1 pt-20">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
