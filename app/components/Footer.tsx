import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-midnight-blue border-t border-magnolia-white/10">
			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
					{/* Brand */}
					<div className="md:col-span-2">
						<div className="flex items-center gap-3 mb-4">
							<div className="text-3xl">🌸</div>
							<div>
								<div className="font-playfair text-2xl font-bold text-magnolia-white">
									Midnight Magnolia
								</div>
								<div className="font-montserrat text-sm text-sage-green tracking-wider">
									ROOTED IN MYSTERY. BLOOMING IN TRUTH.
								</div>
							</div>
						</div>
						<p className="font-lora text-magnolia-white/70 leading-relaxed max-w-md mb-4">
							A Southern Gothic digital sanctuary where art, ancestry,
							automation, and healing coexist. Created by Latisha Vincent-Waters
							for Black women, neurodivergent creators, and anyone seeking
							softer ways to thrive.
						</p>
						<p className="font-montserrat text-xs text-magnolia-white/50 mb-6">
							A Rumi-Nations LLC Brand
						</p>
						<div className="flex gap-4">
							{["🌙", "✨", "🌿", "🔮", "🦋"].map((emoji, index) => (
								<div
									key={index}
									className="text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
									{emoji}
								</div>
							))}
						</div>
					</div>

					{/* Shop Collections */}
					<div>
						<h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">
							Shop
						</h3>
						<ul className="space-y-3">
							{[
								{ name: "Digital Products", href: "/shop/digital" },
								{ name: "Journals & Stationery", href: "/shop/journals" },
								{ name: "Tarot & Spiritual Tools", href: "/shop/tarot" },
								{ name: "Art & Apparel", href: "/shop/art" },
								{ name: "KDP Books", href: "/shop/books" },
							].map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-300">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services & Community */}
					<div>
						<h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">
							Services
						</h3>
						<ul className="space-y-3">
							{[
								{ name: "AI Document Builder", href: "/services/ai-tools" },
								{ name: "Genealogy Research", href: "/services/genealogy" },
								{ name: "Web Design", href: "/services/web-design" },
								{
									name: "Patreon Community",
									href: "https://patreon.com/midnightmagnolia",
								},
								{ name: "Contact Us", href: "/contact" },
							].map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-300">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Ironwork Divider */}
				<div className="h-px bg-gradient-to-r from-transparent via-sage-green/40 to-transparent mb-8" />

				{/* Bottom section */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="font-lora text-magnolia-white/60 text-sm text-center md:text-left">
						© 2025 Midnight Magnolia by Rumi-Nations LLC. Crafted with love and
						intention.
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						<Link
							href="/privacy"
							className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
							Privacy
						</Link>
						<Link
							href="/terms"
							className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
							Terms
						</Link>
						<Link
							href="/accessibility"
							className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
							Accessibility
						</Link>
						<Link
							href="/affiliate"
							className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
							Affiliates
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
