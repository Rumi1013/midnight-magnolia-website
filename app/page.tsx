import type { Metadata } from "next";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import ShopSection from "./components/ShopSection";
import ShopifySection from "./components/ShopifySection";
import BlogSection from "./components/BlogSection";
import JusticeSection from "./components/JusticeSection";
import FloatingZodiac from "./components/FloatingZodiac";
import { JsonLdServer } from "./components/JsonLd";
import {
	generateOrganizationSchema,
	generateWebSiteSchema,
	siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = {
	title: "Midnight Magnolia | Digital Sanctuary for Healing & Transformation",
	description:
		"Digital sanctuary for healing & transformation. Blending ancestral wisdom, Southern Gothic grace, and neurodivergent-friendly tools for those seeking healing, sobriety support, and gentle productivity.",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Midnight Magnolia | Digital Sanctuary for Healing & Transformation",
		description:
			"Digital sanctuary for healing & transformation. Blending ancestral wisdom, Southern Gothic grace, and neurodivergent-friendly tools.",
		url: siteConfig.url,
		type: "website",
	},
};

export default function Home() {
	// Generate structured data for homepage
	const organizationSchema = generateOrganizationSchema();
	const webSiteSchema = generateWebSiteSchema();

	return (
		<>
			{/* Structured Data */}
			<JsonLdServer data={[organizationSchema, webSiteSchema]} />

			{/* Floating zodiac elements in background */}
			<FloatingZodiac />

			{/* Main content sections */}
			<section aria-label="Hero">
				<Hero />
			</section>
			<section aria-label="About Midnight Magnolia">
				<AboutSection />
			</section>
			<section aria-label="Our Products">
				<ProductsSection />
			</section>
			<section aria-label="Shop">
				<ShopSection />
			</section>
			<section aria-label="Shopify Products">
				<ShopifySection />
			</section>
			<section aria-label="Blog & Insights">
				<BlogSection />
			</section>
			<section aria-label="Justice & Advocacy">
				<JusticeSection />
			</section>
		</>
	);
}
