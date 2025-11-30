import type { Metadata } from "next";

// Site configuration
export const siteConfig = {
	name: "Midnight Magnolia",
	description:
		"Digital sanctuary for healing & transformation. Blending ancestral wisdom, Southern Gothic grace, and neurodivergent-friendly tools for those seeking healing, sobriety support, and gentle productivity.",
	url: process.env.NEXT_PUBLIC_SITE_URL || "https://midnight-magnolia.com",
	ogImage: "/images/og-image.jpg",
	founder: "Latisha Vincent-Waters",
	parentCompany: "Rumi-Nations LLC",
	email: "latisha@midnight-magnolia.com",
	social: {
		twitter: "@bgconscious",
		instagram: "@noirmagnoliasc",
		facebook: "https://www.facebook.com/midnightmagnoliasc/",
		linkedin: "https://www.linkedin.com/in/latishavwaters/",
		patreon: "https://www.patreon.com/MidnightMagnoliaSC",
		tumblr: "https://www.tumblr.com/blog/midnight-magnoliasc",
		youtube: "https://youtube.com/@poetrygirl1013",
		github: "https://github.com/Rumi1013",
		tiktok: "https://www.tiktok.com/@latishaimara6",
	},
	keywords: [
		"healing journals",
		"tarot",
		"digital planners",
		"ancestral wisdom",
		"Southern Gothic",
		"neurodivergent",
		"ADHD-friendly",
		"sobriety support",
		"chronic illness",
		"wellness",
		"self-care",
		"recovery",
		"Black women",
		"BIPOC",
		"trauma-informed",
		"digital sanctuary",
	],
};

// Helper to get safe URL
export function getSafeUrl(path: string = ""): string {
	const baseUrl = siteConfig.url.replace(/\/$/, "");
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	return `${baseUrl}${cleanPath}`;
}

// Generate canonical URL
export function getCanonicalUrl(path: string = ""): string {
	return getSafeUrl(path);
}

// Generate Open Graph image URL
export function getOgImageUrl(title?: string, description?: string): string {
	// If using a dynamic OG image service, construct URL here
	// For now, return the default OG image
	if (title || description) {
		// Could integrate with Vercel OG or similar service
		const params = new URLSearchParams();
		if (title) params.set("title", title);
		if (description) params.set("description", description);
		// return `${siteConfig.url}/api/og?${params.toString()}`;
	}
	return getSafeUrl(siteConfig.ogImage);
}

// Generate page-specific metadata
interface GenerateMetadataOptions {
	title: string;
	description: string;
	path?: string;
	image?: string;
	type?: "website" | "article";
	publishedTime?: string;
	modifiedTime?: string;
	authors?: string[];
	keywords?: string[];
	noIndex?: boolean;
}

export function generateMetadata({
	title,
	description,
	path = "",
	image,
	type = "website",
	publishedTime,
	modifiedTime,
	authors,
	keywords = [],
	noIndex = false,
}: GenerateMetadataOptions): Metadata {
	const url = getCanonicalUrl(path);
	const ogImage = image || getOgImageUrl(title, description);
	const allKeywords = [...siteConfig.keywords, ...keywords];

	return {
		title,
		description,
		keywords: allKeywords,
		authors: authors?.map((name) => ({ name })) || [{ name: siteConfig.name }],
		creator: siteConfig.name,
		publisher: siteConfig.parentCompany,
		metadataBase: new URL(siteConfig.url),
		alternates: {
			canonical: path || "/",
		},
		openGraph: {
			type,
			locale: "en_US",
			url,
			title,
			description,
			siteName: siteConfig.name,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
			...(authors && { authors }),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
			creator: siteConfig.social.twitter,
		},
		robots: noIndex
			? { index: false, follow: false }
			: {
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
	};
}

// Structured Data Types
export interface OrganizationSchema {
	"@context": "https://schema.org";
	"@type": "Organization";
	"name": string;
	"alternateName"?: string;
	"url": string;
	"logo": string;
	"description": string;
	"founder": {
		"@type": "Person";
		"name": string;
	};
	"parentOrganization"?: {
		"@type": "Organization";
		"name": string;
	};
	"sameAs"?: string[];
	"contactPoint"?: {
		"@type": "ContactPoint";
		"contactType": string;
		"email": string;
	};
}

export interface WebSiteSchema {
	"@context": "https://schema.org";
	"@type": "WebSite";
	"name": string;
	"url": string;
	"description": string;
	"publisher": {
		"@type": "Organization";
		"name": string;
	};
	"potentialAction"?: {
		"@type": "SearchAction";
		"target": {
			"@type": "EntryPoint";
			"urlTemplate": string;
		};
		"query-input": string;
	};
}

export interface ProductSchema {
	"@context": "https://schema.org";
	"@type": "Product";
	"name": string;
	"description": string;
	"image": string | string[];
	"url": string;
	"brand": {
		"@type": "Brand";
		"name": string;
	};
	"offers"?: {
		"@type": "Offer";
		"price": string | number;
		"priceCurrency": string;
		"availability": string;
		"url": string;
	};
	"aggregateRating"?: {
		"@type": "AggregateRating";
		"ratingValue": string | number;
		"reviewCount": string | number;
	};
}

export interface ArticleSchema {
	"@context": "https://schema.org";
	"@type": "Article" | "BlogPosting";
	"headline": string;
	"description": string;
	"image": string | string[];
	"url": string;
	"datePublished": string;
	"dateModified"?: string;
	"author": {
		"@type": "Person" | "Organization";
		"name": string;
		"url"?: string;
	};
	"publisher": {
		"@type": "Organization";
		"name": string;
		"logo": {
			"@type": "ImageObject";
			"url": string;
		};
	};
	"mainEntityOfPage": {
		"@type": "WebPage";
		"@id": string;
	};
}

export interface BreadcrumbSchema {
	"@context": "https://schema.org";
	"@type": "BreadcrumbList";
	"itemListElement": Array<{
		"@type": "ListItem";
		"position": number;
		"name": string;
		"item"?: string;
	}>;
}

export interface AboutPageSchema {
	"@context": "https://schema.org";
	"@type": "AboutPage";
	"name": string;
	"description": string;
	"url": string;
	"mainEntity": {
		"@type": "Organization";
		"name": string;
		"description": string;
	};
}

export interface ContactPageSchema {
	"@context": "https://schema.org";
	"@type": "ContactPage";
	"name": string;
	"description": string;
	"url": string;
	"mainEntity": {
		"@type": "Organization";
		"name": string;
		"email": string;
		"contactPoint": {
			"@type": "ContactPoint";
			"contactType": string;
			"email": string;
		};
	};
}

export interface CollectionPageSchema {
	"@context": "https://schema.org";
	"@type": "CollectionPage";
	"name": string;
	"description": string;
	"url": string;
	"mainEntity"?: {
		"@type": "ItemList";
		"itemListElement": Array<{
			"@type": "ListItem";
			"position": number;
			"item": {
				"@type": string;
				"name": string;
				"url": string;
			};
		}>;
	};
}

export interface BlogSchema {
	"@context": "https://schema.org";
	"@type": "Blog";
	"name": string;
	"description": string;
	"url": string;
	"publisher": {
		"@type": "Organization";
		"name": string;
		"logo": {
			"@type": "ImageObject";
			"url": string;
		};
	};
	"blogPost"?: ArticleSchema[];
}

// Structured Data Generators
export function generateOrganizationSchema(): OrganizationSchema {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": siteConfig.name,
		"alternateName": "Midnight Magnolia Digital Sanctuary",
		"url": siteConfig.url,
		"logo": getSafeUrl("/images/logo.png"),
		"description": siteConfig.description,
		"founder": {
			"@type": "Person",
			"name": siteConfig.founder,
		},
		"parentOrganization": {
			"@type": "Organization",
			"name": siteConfig.parentCompany,
		},
		"sameAs": [
			`https://twitter.com/${siteConfig.social.twitter.replace("@", "")}`,
			`https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`,
			siteConfig.social.facebook,
			siteConfig.social.linkedin,
			siteConfig.social.patreon,
			siteConfig.social.tumblr,
			siteConfig.social.youtube,
			siteConfig.social.github,
			siteConfig.social.tiktok,
		],
		"contactPoint": {
			"@type": "ContactPoint",
			"contactType": "customer service",
			"email": siteConfig.email,
		},
	};
}

export function generateWebSiteSchema(): WebSiteSchema {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": siteConfig.name,
		"url": siteConfig.url,
		"description": siteConfig.description,
		"publisher": {
			"@type": "Organization",
			"name": siteConfig.name,
		},
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": `${siteConfig.url}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

export function generateProductSchema(product: {
	name: string;
	description: string;
	image: string | string[];
	url: string;
	price?: number;
	currency?: string;
	availability?: "InStock" | "OutOfStock" | "PreOrder";
	rating?: number;
	reviewCount?: number;
}): ProductSchema {
	const schema: ProductSchema = {
		"@context": "https://schema.org",
		"@type": "Product",
		"name": product.name,
		"description": product.description,
		"image": product.image,
		"url": getSafeUrl(product.url),
		"brand": {
			"@type": "Brand",
			"name": siteConfig.name,
		},
	};

	if (product.price !== undefined) {
		schema.offers = {
			"@type": "Offer",
			"price": product.price,
			"priceCurrency": product.currency || "USD",
			"availability": `https://schema.org/${product.availability || "InStock"}`,
			"url": getSafeUrl(product.url),
		};
	}

	if (product.rating !== undefined && product.reviewCount !== undefined) {
		schema.aggregateRating = {
			"@type": "AggregateRating",
			"ratingValue": product.rating,
			"reviewCount": product.reviewCount,
		};
	}

	return schema;
}

export function generateArticleSchema(article: {
	title: string;
	description: string;
	image: string | string[];
	url: string;
	datePublished: string;
	dateModified?: string;
	author?: string;
	type?: "Article" | "BlogPosting";
}): ArticleSchema {
	return {
		"@context": "https://schema.org",
		"@type": article.type || "BlogPosting",
		"headline": article.title,
		"description": article.description,
		"image": article.image,
		"url": getSafeUrl(article.url),
		"datePublished": article.datePublished,
		"dateModified": article.dateModified || article.datePublished,
		"author": {
			"@type": "Organization",
			"name": article.author || siteConfig.name,
			"url": siteConfig.url,
		},
		"publisher": {
			"@type": "Organization",
			"name": siteConfig.name,
			"logo": {
				"@type": "ImageObject",
				"url": getSafeUrl("/images/logo.png"),
			},
		},
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": getSafeUrl(article.url),
		},
	};
}

export function generateBreadcrumbSchema(
	items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": items.map((item, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": item.name,
			...(item.url && { item: getSafeUrl(item.url) }),
		})),
	};
}

export function generateAboutPageSchema(): AboutPageSchema {
	return {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		"name": `About ${siteConfig.name}`,
		"description": `Learn about ${siteConfig.name}, a digital sanctuary for healing and transformation founded by ${siteConfig.founder}.`,
		"url": getSafeUrl("/about"),
		"mainEntity": {
			"@type": "Organization",
			"name": siteConfig.name,
			"description": siteConfig.description,
		},
	};
}

export function generateContactPageSchema(): ContactPageSchema {
	return {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		"name": `Contact ${siteConfig.name}`,
		"description": `Get in touch with ${siteConfig.name} for support, inquiries, or to begin your healing journey.`,
		"url": getSafeUrl("/contact"),
		"mainEntity": {
			"@type": "Organization",
			"name": siteConfig.name,
			"email": siteConfig.email,
			"contactPoint": {
				"@type": "ContactPoint",
				"contactType": "customer service",
				"email": siteConfig.email,
			},
		},
	};
}

export function generateCollectionPageSchema(
	name: string,
	description: string,
	url: string,
	items?: Array<{ type: string; name: string; url: string }>
): CollectionPageSchema {
	const schema: CollectionPageSchema = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name,
		description,
		"url": getSafeUrl(url),
	};

	if (items && items.length > 0) {
		schema.mainEntity = {
			"@type": "ItemList",
			"itemListElement": items.map((item, index) => ({
				"@type": "ListItem",
				"position": index + 1,
				"item": {
					"@type": item.type,
					"name": item.name,
					"url": getSafeUrl(item.url),
				},
			})),
		};
	}

	return schema;
}

export function generateBlogSchema(
	posts?: Array<{
		title: string;
		description: string;
		image: string;
		url: string;
		datePublished: string;
	}>
): BlogSchema {
	const schema: BlogSchema = {
		"@context": "https://schema.org",
		"@type": "Blog",
		"name": `${siteConfig.name} Blog - Midnight Musings`,
		"description":
			"Explore healing wisdom, ancestral stories, and gentle practices for your wellness journey.",
		"url": getSafeUrl("/blog"),
		"publisher": {
			"@type": "Organization",
			"name": siteConfig.name,
			"logo": {
				"@type": "ImageObject",
				"url": getSafeUrl("/images/logo.png"),
			},
		},
	};

	if (posts && posts.length > 0) {
		schema.blogPost = posts.map((post) =>
			generateArticleSchema({
				title: post.title,
				description: post.description,
				image: post.image,
				url: post.url,
				datePublished: post.datePublished,
				type: "BlogPosting",
			})
		);
	}

	return schema;
}

// Helper to combine multiple schemas
export function combineSchemas(
	...schemas: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
	return schemas;
}
