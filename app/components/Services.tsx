"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
	{
		icon: "🌸",
		title: "Healing Journals",
		description:
			"Beautifully designed journals for sobriety, self-discovery, and gentle productivity. Physical and digital formats available.",
	},
	{
		icon: "🔮",
		title: "Tarot & Divination",
		description:
			"Stunning tarot decks featuring Black icons with Southern Gothic elegance and ancestral wisdom.",
	},
	{
		icon: "📱",
		title: "Digital Tools",
		description:
			"ADHD-friendly planners, Notion templates, and productivity systems designed for neurodivergent minds.",
	},
	{
		icon: "✨",
		title: "Business Mentorship",
		description:
			"Guidance for building your digital empire with passive income strategies and KDP publishing.",
	},
];

export default function Services() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section
			ref={ref}
			className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-blue">
			<div className="container mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16">
					<p className="text-sage-green font-montserrat text-sm tracking-wider uppercase mb-4">
						What We Offer
					</p>
					<h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">
						Sacred Services
					</h2>
					<p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
						Tools and guidance crafted with intention for your healing journey.
					</p>
				</motion.div>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, index) => (
						<motion.div
							key={service.title}
							className="bg-magnolia-white/10 backdrop-blur-sm p-8 rounded-3xl border border-sage-green/20 hover:border-gold/40 hover:bg-magnolia-white/15 transition-all duration-300 hover:scale-105 group"
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
							transition={{ duration: 0.8, delay: index * 0.15 }}>
							<div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
								{service.icon}
							</div>
							<h3 className="font-playfair text-xl font-bold mb-3 text-magnolia-white group-hover:text-gold transition-colors duration-300">
								{service.title}
							</h3>
							<p className="font-lora text-magnolia-white/70 leading-relaxed">
								{service.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
