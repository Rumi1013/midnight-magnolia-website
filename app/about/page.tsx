import type { Metadata } from "next";
import FloatingMoon from "@/app/components/FloatingMoon";
import FloatingZodiac from "@/app/components/FloatingZodiac";
import { JsonLdServer } from "@/app/components/JsonLd";
import {
	generateAboutPageSchema,
	generateBreadcrumbSchema,
	generateOrganizationSchema,
	siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = {
	title: "About Us | A Southern Gothic Sanctuary for Rest, Revenue & Ritual",
	description:
		"Learn about Midnight Magnolia, a Rumi-Nations LLC studio founded by Latisha Vincent-Waters. We merge poetic storytelling, trauma-informed technology, and ancestral care for recovering creatives.",
	alternates: {
		canonical: "/about",
	},
	openGraph: {
		title: "About Midnight Magnolia | Southern Gothic Sanctuary",
		description:
			"A Rumi-Nations LLC studio merging poetic storytelling, trauma-informed technology, and ancestral care for recovering creatives.",
		url: `${siteConfig.url}/about`,
		type: "website",
	},
	keywords: [
		"about Midnight Magnolia",
		"Latisha Vincent-Waters",
		"Rumi-Nations LLC",
		"Southern Gothic",
		"trauma-informed design",
		"recovering creatives",
		"BIPOC wellness",
		"neurodivergent support",
	],
};

const impactMetrics = [
	{
		label: "Rest Rituals Shared",
		value: "12k+",
		description:
			"Weekly letters, audio meditations, and journal prompts offered to our community.",
	},
	{
		label: "Members in Circle",
		value: "5k",
		description:
			"BIPOC femmes, queer creatives, and co-conspirators healing together across time zones.",
	},
	{
		label: "Accessibility Audits",
		value: "90%",
		description:
			"Interfaces that pass manual review for contrast, motion, and screen-reader flow.",
	},
];

const missionPillars = [
	{
		title: "Mission",
		copy: "Fuse creativity, technology, and recovery into sustainable income streams and gentle autonomy for every member who enters our sanctuary.",
	},
	{
		title: "Vision",
		copy: "A rooted network of healing artists who earn with ease, share resilient stories, and extend rest-forward tools throughout the South and beyond.",
	},
	{
		title: "Values",
		copy: "Soft power, ritual, transparency, cultural honor, accessibility, interdependence, and becoming guide every interface we craft.",
	},
];

const devotionHighlights = [
	"Ancestral wisdom interwoven with Southern Gothic aesthetics to honor lineage and future dreams.",
	"Trauma-informed design that welcomes neurodivergent minds, chronic illness warriors, and creatives in recovery.",
	"Automations that lighten administrative labor so rest, art, and revenue can bloom together.",
];

const offerSuite = [
	{
		title: "Digital Products",
		details:
			"Recovery journals, mood-ring audio affirmations, Shopify-ready creative kits, and Notion dashboards that keep business and healing in rhythm.",
	},
	{
		title: "Services",
		details:
			"Creative sobriety coaching, ritual design labs, launch audits, and group healing salons that honor the pace of your body.",
	},
	{
		title: "Membership",
		details:
			"Stripe-powered tiers—Calm, Soft Power, and Rooted—unlock Recovery Grove forums, guided workshops, and Magnolia Radio sessions.",
	},
	{
		title: "Partnerships",
		details:
			"White-label dashboards for sober living collectives, Wise.com payout support, and collaborative drops with fellow artisans.",
	},
];

const timeline = [
	{
		phase: "Foundational Build",
		timeframe: "Months 1–2",
		description:
			"Launch the dark-mode experience, finalize our brand guide, and weave the Healing Codex UI throughout the public site and creator dashboard.",
	},
	{
		phase: "Community Activation",
		timeframe: "Months 3–4",
		description:
			"Open the membership waitlist, release Recovery Grove beta spaces, and automate daily affirmation deliveries via Make.com.",
	},
	{
		phase: "Revenue Bloom",
		timeframe: "Months 5–6",
		description:
			"Introduce Shopify bundles, Printify merch, and Wise payouts so collaborators can earn alongside us with ease.",
	},
	{
		phase: "Licensing Horizon",
		timeframe: "Month 7+",
		description:
			"Offer white-label dashboards to HBCU counseling centers and public libraries while expanding ritual curricula to partner communities.",
	},
];

const accessibilityCommitments = [
	"WCAG AA+ contrast, dyslexia-friendly typography, and 70ch max line length for effortless reading.",
	"Keyboard-first navigation, skip links, and focus states glowing in Southern Gold or Sage Moss.",
	"No flashing animations—only slow, gentle motion honoring motion-sensitive nervous systems.",
	"Alt text with sensory grounding and transcripts for Magnolia Radio, meditations, and workshops.",
];

export default function AboutPage() {
	// Generate structured data
	const aboutPageSchema = generateAboutPageSchema();
	const organizationSchema = generateOrganizationSchema();
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: "Home", url: "/" },
		{ name: "About" },
	]);

	return (
		<main className="relative min-h-screen bg-midnight-blue text-magnolia-white">
			{/* Structured Data */}
			<JsonLdServer
				data={[aboutPageSchema, organizationSchema, breadcrumbSchema]}
			/>

			<FloatingMoon />
			<FloatingZodiac />

			<section className="relative overflow-hidden pt-28 pb-24">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_55%)]" />
				<div className="relative container mx-auto px-6 flex flex-col gap-12 lg:flex-row lg:items-center">
					<div className="max-w-2xl space-y-6">
						<span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-4 py-1 font-montserrat text-xs tracking-[0.3em] uppercase text-gold">
							About Midnight Magnolia
						</span>
						<h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl leading-tight">
							A Southern Gothic sanctuary for rest, revenue, and ritual
						</h1>
						<p className="font-lora text-lg leading-relaxed text-magnolia-white/80">
							Midnight Magnolia is a Rumi-Nations LLC studio founded by Latisha
							Vincent-Waters. We merge poetic storytelling, trauma-informed
							technology, and ancestral care so recovering creatives can build
							income with gentleness. Rest is strategy. Creation is power.
						</p>
						<p className="font-lora text-lg leading-relaxed text-magnolia-white/80">
							Every product, workshop, and automation is crafted to lighten the
							load for BIPOC femmes, queer kin, and neurodivergent folks
							navigating sobriety, chronic illness, or transition. We design
							digital sanctuaries that feel like a handwritten letter under
							moonlight.
						</p>
					</div>
					<div className="grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
						{impactMetrics.map((metric) => (
							<div
								key={metric.label}
								className="rounded-3xl border border-gold/30 bg-magnolia-white/5 p-6 text-center shadow-lg shadow-midnight-blue/40">
								<p className="font-playfair text-3xl font-semibold text-gold">
									{metric.value}
								</p>
								<p className="font-montserrat text-sm uppercase tracking-wide text-magnolia-white/70">
									{metric.label}
								</p>
								<p className="mt-3 font-lora text-sm leading-relaxed text-magnolia-white/70">
									{metric.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="border-y border-magnolia-white/10 bg-[#0F223C] py-20">
				<div className="container mx-auto grid gap-10 px-6 lg:grid-cols-3">
					{missionPillars.map((pillar) => (
						<div
							key={pillar.title}
							className="flex flex-col gap-4 rounded-3xl border border-magnolia-white/10 bg-magnolia-white/5 p-8">
							<h2 className="font-playfair text-2xl text-gold">
								{pillar.title}
							</h2>
							<p className="font-lora text-base leading-relaxed text-magnolia-white/80">
								{pillar.copy}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto flex flex-col gap-12 px-6 lg:flex-row lg:items-start">
					<div className="max-w-xl space-y-6">
						<h2 className="font-playfair text-4xl">Essence & Promise</h2>
						<p className="font-lora text-lg leading-relaxed text-magnolia-white/80">
							We translate recovery wisdom into interfaces that feel like a hush
							of magnolia petals. The brand voice is tender mentor and soft
							power—inviting you to experiment, rest, and bloom without urgency
							marketing or hustle tropes.
						</p>
						<ul className="space-y-4">
							{devotionHighlights.map((highlight) => (
								<li
									key={highlight}
									className="flex gap-3 font-lora text-base leading-relaxed text-magnolia-white/80">
									<span
										className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gold"
										aria-hidden="true"
									/>
									{highlight}
								</li>
							))}
						</ul>
					</div>
					<div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
						{offerSuite.map((offer) => (
							<article
								key={offer.title}
								className="rounded-3xl border border-magnolia-white/10 bg-magnolia-white/5 p-6">
								<h3 className="font-playfair text-2xl text-gold">
									{offer.title}
								</h3>
								<p className="mt-4 font-lora text-base leading-relaxed text-magnolia-white/80">
									{offer.details}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="border-t border-magnolia-white/10 bg-[#0F223C] py-20">
				<div className="container mx-auto px-6">
					<h2 className="font-playfair text-4xl">Roadmap of Becoming</h2>
					<p className="mt-4 max-w-2xl font-lora text-lg leading-relaxed text-magnolia-white/80">
						Our roadmap honors seasonal pacing. Each phase deepens relationship,
						expands access, and keeps automation in service of human care.
					</p>
					<div className="mt-12 grid gap-8 lg:grid-cols-2">
						{timeline.map((entry) => (
							<div
								key={entry.phase}
								className="rounded-3xl border border-gold/20 bg-magnolia-white/5 p-8">
								<p className="font-montserrat text-xs uppercase tracking-[0.3em] text-gold/80">
									{entry.timeframe}
								</p>
								<h3 className="mt-3 font-playfair text-2xl text-gold">
									{entry.phase}
								</h3>
								<p className="mt-4 font-lora text-base leading-relaxed text-magnolia-white/80">
									{entry.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-6">
					<div className="grid gap-10 lg:grid-cols-2">
						<div className="space-y-6">
							<h2 className="font-playfair text-4xl">
								Accessibility & Care Rituals
							</h2>
							<p className="font-lora text-lg leading-relaxed text-magnolia-white/80">
								Healing interfaces must be safe to inhabit. We design with
								accessibility-first defaults so every member can linger without
								friction or sensory overwhelm.
							</p>
							<ul className="space-y-3">
								{accessibilityCommitments.map((item) => (
									<li
										key={item}
										className="flex gap-3 font-lora text-base leading-relaxed text-magnolia-white/80">
										<span
											className="mt-2 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sage-green"
											aria-hidden="true"
										/>
										{item}
									</li>
								))}
							</ul>
						</div>
						<div className="flex flex-col gap-6 rounded-3xl border border-magnolia-white/10 bg-magnolia-white/5 p-8">
							<h3 className="font-playfair text-2xl text-gold">
								Stewardship Practices
							</h3>
							<p className="font-lora text-base leading-relaxed text-magnolia-white/80">
								We rotate keys quarterly, encrypt sensitive data, and provide
								export-ready reflections upon request. Automations are
								documented in Notion and audited monthly alongside our Make.com
								scenarios.
							</p>
							<p className="font-lora text-base leading-relaxed text-magnolia-white/80">
								Operations run on gentle rhythms: Plausible analytics, Stripe
								reporting, and Wise multi-currency payouts keep finances
								transparent while fueling rest stipends for the community.
							</p>
							<p className="font-lora text-base leading-relaxed text-magnolia-white/80">
								When issues surface, we move them through our Notion Kanban
								ritual—Backlog → Ritualize → Ready → Blooming—so nothing sacred
								slips through the cracks.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="relative overflow-hidden border-t border-magnolia-white/10 bg-[#0F223C] py-20">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(163,177,138,0.15),_transparent_60%)]" />
				<div className="relative container mx-auto flex flex-col items-center gap-6 px-6 text-center">
					<h2 className="font-playfair text-4xl">Join the Recovery Grove</h2>
					<p className="max-w-2xl font-lora text-lg leading-relaxed text-magnolia-white/80">
						Step into a sanctuary that honors your nervous system and your
						ambition. Whether you crave a guided journal, an automated launch
						ritual, or a circle that remembers your name, Midnight Magnolia is
						ready to welcome you home.
					</p>
					<div className="flex flex-col gap-4 sm:flex-row">
						<a
							href="/community"
							className="rounded-full bg-sage-green px-8 py-3 font-montserrat text-sm uppercase tracking-[0.3em] text-midnight-blue transition hover:bg-sage-green/90">
							Join Our Community
						</a>
						<a
							href="/shop"
							className="rounded-full border border-gold/60 px-8 py-3 font-montserrat text-sm uppercase tracking-[0.3em] text-gold transition hover:bg-gold/10">
							Explore the Shop
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
