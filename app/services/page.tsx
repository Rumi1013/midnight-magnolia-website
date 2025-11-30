"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function ServicesPage() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const services = [
		{
			category: "AI-Powered Services",
			icon: "🤖",
			description:
				"Technology as liberation — automated tools that do the heavy lifting so you can rest.",
			offerings: [
				{
					title: "AI Document Builder",
					description:
						"Resumes, parole packets, grant letters, and professional correspondence generated with care and precision.",
					price: "Starting at $25",
					features: [
						"Resume optimization",
						"Cover letters",
						"Grant applications",
						"Professional bios",
					],
				},
				{
					title: "AI Journal Generation",
					description:
						"Personalized healing journal prompts, affirmations, and daily reflections tailored to your journey.",
					price: "Included with Patreon",
					features: [
						"Daily prompts",
						"Custom affirmations",
						"Sobriety support",
						"ADHD-friendly formats",
					],
				},
			],
		},
		{
			category: "Creative & Design Services",
			icon: "🎨",
			description: "Southern Gothic artistry meets modern digital craft.",
			offerings: [
				{
					title: "Web Design & Shopify Setup",
					description:
						"Beautiful, brand-aligned websites and storefronts that reflect your unique vision.",
					price: "Starting at $500",
					features: [
						"Custom design",
						"Shopify setup",
						"Mobile-responsive",
						"SEO optimization",
					],
				},
				{
					title: "Brand Identity Design",
					description:
						"Complete visual identity systems rooted in your story and aesthetic.",
					price: "Starting at $300",
					features: [
						"Logo design",
						"Color palette",
						"Typography",
						"Brand guidelines",
					],
				},
			],
		},
		{
			category: "Research & Genealogy",
			icon: "🔍",
			description:
				"Honoring the strength and knowledge passed down through generations.",
			offerings: [
				{
					title: "Genealogy Research",
					description:
						"Ancestral research services to help you discover and document your family history.",
					price: "Starting at $75/hour",
					features: [
						"Family tree building",
						"Document research",
						"DNA analysis support",
						"Heritage reports",
					],
				},
				{
					title: "Historical Research",
					description:
						"Deep-dive research for writers, historians, and curious souls.",
					price: "Starting at $50/hour",
					features: [
						"Archive research",
						"Citation support",
						"Fact verification",
						"Source compilation",
					],
				},
			],
		},
		{
			category: "Local Services (Memphis Area)",
			icon: "🚗",
			description: "Community support that extends beyond the digital realm.",
			offerings: [
				{
					title: "Courier & Delivery",
					description:
						"Reliable local courier services for documents, packages, and special deliveries.",
					price: "Starting at $20",
					features: [
						"Same-day delivery",
						"Document courier",
						"Package pickup",
						"Scheduled routes",
					],
				},
				{
					title: "Personal Assistant",
					description:
						"Administrative support and errand running for those who need an extra hand.",
					price: "Starting at $25/hour",
					features: [
						"Errand running",
						"Appointment scheduling",
						"Shopping assistance",
						"Organization help",
					],
				},
			],
		},
	];

	return (
		<div className="min-h-screen bg-midnight-blue">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<div className="absolute inset-0 hero-pattern opacity-50" />
				<div className="container mx-auto px-6 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto">
						<p className="text-sage-green font-montserrat text-sm tracking-[0.25em] uppercase mb-4">
							Services & Support
						</p>
						<h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6 italic">
							How We Can <span className="text-gold">Serve You</span>
						</h1>
						<p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
							From AI-powered document creation to local courier services, we
							offer a range of support designed to help you thrive — with
							energy-aware pricing and gentle timelines.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Services Grid */}
			<section
				ref={ref}
				className="py-16">
				<div className="container mx-auto px-6">
					{services.map((category, categoryIndex) => (
						<motion.div
							key={category.category}
							initial={{ opacity: 0, y: 50 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
							transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
							className="mb-16">
							{/* Category Header */}
							<div className="flex items-center gap-4 mb-8">
								<span className="text-4xl">{category.icon}</span>
								<div>
									<h2 className="font-playfair text-3xl font-bold text-magnolia-white">
										{category.category}
									</h2>
									<p className="font-lora text-magnolia-white/70">
										{category.description}
									</p>
								</div>
							</div>

							{/* Offerings Grid */}
							<div className="grid md:grid-cols-2 gap-6">
								{category.offerings.map((offering, offeringIndex) => (
									<motion.div
										key={offering.title}
										initial={{ opacity: 0, y: 20 }}
										animate={
											isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
										}
										transition={{
											duration: 0.6,
											delay: categoryIndex * 0.2 + offeringIndex * 0.1,
										}}
										className="bg-magnolia-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
										<h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-3 group-hover:text-gold transition-colors">
											{offering.title}
										</h3>
										<p className="font-lora text-gray-700 mb-4 leading-relaxed">
											{offering.description}
										</p>
										<div className="flex items-center justify-between mb-6">
											<span className="font-montserrat font-semibold text-gold text-lg">
												{offering.price}
											</span>
										</div>
										<ul className="space-y-2 mb-6">
											{offering.features.map((feature, idx) => (
												<li
													key={idx}
													className="flex items-center gap-3 font-lora text-gray-600 text-sm">
													<div className="w-2 h-2 bg-sage-green rounded-full flex-shrink-0" />
													{feature}
												</li>
											))}
										</ul>
										<button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300">
											Inquire Now
										</button>
									</motion.div>
								))}
							</div>

							{/* Divider */}
							{categoryIndex < services.length - 1 && (
								<div className="h-px bg-gradient-to-r from-transparent via-sage-green/30 to-transparent mt-16" />
							)}
						</motion.div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-magnolia-white">
				<div className="container mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}>
						<h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">
							Not Sure Where to Start?
						</h2>
						<p className="font-lora text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
							Book a free 15-minute consultation call. We'll discuss your needs
							and find the right path forward — no pressure, just gentle
							guidance.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/contact"
								className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-block">
								Book a Consultation
							</Link>
							<Link
								href="/community"
								className="border-2 border-midnight-blue hover:bg-midnight-blue hover:text-magnolia-white text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-block">
								Join Our Patreon
							</Link>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
