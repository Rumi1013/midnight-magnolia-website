import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { JsonLdServer } from "@/app/components/JsonLd";
import {
	generateBlogSchema,
	generateBreadcrumbSchema,
	siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = {
	title: "Midnight Musings | Healing Wisdom, Stories & Ancestral Insights",
	description:
		"Explore our collection of trauma-informed articles, ancestral wisdom, and gentle healing practices for your wellness journey. Stories for recovering creatives and neurodivergent souls.",
	alternates: {
		canonical: "/blog",
	},
	openGraph: {
		title: "Midnight Musings | Healing Wisdom & Stories",
		description:
			"Trauma-informed articles, ancestral wisdom, and gentle healing practices for your wellness journey.",
		url: `${siteConfig.url}/blog`,
		type: "website",
	},
	keywords: [
		"healing blog",
		"ancestral wisdom",
		"trauma-informed articles",
		"wellness stories",
		"recovery insights",
		"neurodivergent resources",
		"Southern Gothic stories",
		"sobriety support",
		"BIPOC wellness",
		"gentle healing",
	],
};

export default function BlogPage() {
	// Generate structured data
	const blogSchema = generateBlogSchema();
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: "Home", url: "/" },
		{ name: "Blog" },
	]);

	return (
		<>
			{/* Structured Data */}
			<JsonLdServer data={[blogSchema, breadcrumbSchema]} />

			<BlogPageClient />
		</>
	);
}
