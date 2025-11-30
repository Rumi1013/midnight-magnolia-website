import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

/**
 * Dynamic sitemap generation for Midnight Magnolia
 * This file generates a sitemap.xml at build time and on-demand
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = siteConfig.url;
	const currentDate = new Date().toISOString();

	// Static pages with their priorities and change frequencies
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/shop`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/community`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/justice`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/journal`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.6,
		},
	];

	// In a production environment, you would fetch dynamic content here
	// For example, blog posts from a CMS or products from Shopify
	// const blogPosts = await fetchBlogPosts();
	// const products = await fetchProducts();

	// Example of how to add dynamic blog posts:
	// const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
	//   url: `${baseUrl}/blog/${post.slug}`,
	//   lastModified: post.updatedAt,
	//   changeFrequency: "monthly",
	//   priority: 0.6,
	// }));

	// Example of how to add dynamic products:
	// const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
	//   url: `${baseUrl}/shop/${product.slug}`,
	//   lastModified: product.updatedAt,
	//   changeFrequency: "weekly",
	//   priority: 0.7,
	// }));

	return [
		...staticPages,
		// ...blogPostUrls,
		// ...productUrls,
	];
}
