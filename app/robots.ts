import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

/**
 * Robots.txt configuration for Midnight Magnolia
 * This file generates a robots.txt at build time
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
	const baseUrl = siteConfig.url;

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/dashboard/", "/_next/", "/private/", "/*.json$"],
			},
			{
				// Specific rules for Googlebot
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/api/", "/dashboard/"],
			},
			{
				// Block AI training bots (optional - adjust based on preference)
				userAgent: "GPTBot",
				disallow: "/",
			},
			{
				userAgent: "ChatGPT-User",
				disallow: "/",
			},
			{
				userAgent: "CCBot",
				disallow: "/",
			},
			{
				userAgent: "anthropic-ai",
				disallow: "/",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
