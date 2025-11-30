"use client";

import { forwardRef, ReactNode, HTMLAttributes } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fadeInUp, liftOnHover, scaleOnHover } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type CardVariant = "base" | "glass" | "product" | "feature" | "blog";

interface BaseCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
	/** Card variant style */
	variant?: CardVariant;
	/** Whether to animate on scroll */
	animate?: boolean;
	/** Whether to show hover effects */
	hoverable?: boolean;
	/** Children content */
	children: ReactNode;
	/** Additional class names */
	className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const baseStyles = `
  relative
  transition-all duration-500
  overflow-hidden
`;

const variantStyles: Record<CardVariant, string> = {
	base: `
    bg-magnolia-white
    rounded-2xl
    p-8
    shadow-soft
    border-2 border-transparent
    hover:shadow-elevated hover:border-southern-gold/30
  `,
	glass: `
    bg-midnight-navy/[0.68]
    border border-sage-moss/20
    shadow-glass
    backdrop-blur-[16px]
    rounded-[1.125rem]
    hover:border-southern-gold/40
    hover:shadow-[0_28px_70px_rgba(10,25,47,0.25)]
  `,
	product: `
    bg-magnolia-white
    rounded-3xl
    p-8
    shadow-[0_10px_40px_rgba(163,177,138,0.15)]
    border-2 border-transparent
    hover:shadow-elevated hover:border-southern-gold/30
  `,
	feature: `
    bg-white
    rounded-2xl
    p-6
    border-2 border-warm-gray/20
    shadow-card
    hover:border-southern-gold/40 hover:shadow-card-hover
  `,
	blog: `
    bg-magnolia-white
    rounded-xl
    shadow-soft
    hover:shadow-elevated
  `,
};

// ═══════════════════════════════════════════════════════════════════════════
// BASE CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Card = forwardRef<HTMLDivElement, BaseCardProps>(
	(
		{
			variant = "base",
			animate = true,
			hoverable = true,
			children,
			className,
			...props
		},
		ref
	) => {
		const prefersReducedMotion = useReducedMotion();

		const motionProps = prefersReducedMotion
			? {}
			: {
					initial: animate ? "hidden" : undefined,
					whileInView: animate ? "visible" : undefined,
					viewport: { once: true, margin: "-50px" },
					variants: animate ? fadeInUp : undefined,
					whileHover: hoverable ? liftOnHover : undefined,
			  };

		return (
			<motion.div
				ref={ref}
				className={cn(baseStyles, variantStyles[variant], className)}
				{...motionProps}
				{...props}>
				{children}
			</motion.div>
		);
	}
);

Card.displayName = "Card";

export default Card;

// ═══════════════════════════════════════════════════════════════════════════
// GLASS CARD
// ═══════════════════════════════════════════════════════════════════════════

interface GlassCardProps extends Omit<BaseCardProps, "variant"> {
	/** Blur intensity */
	blur?: "sm" | "md" | "lg";
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
	({ blur = "md", className, children, ...props }, ref) => {
		const blurStyles: Record<string, string> = {
			sm: "backdrop-blur-sm",
			md: "backdrop-blur-[16px]",
			lg: "backdrop-blur-[24px]",
		};

		return (
			<Card
				ref={ref}
				variant="glass"
				className={cn(blurStyles[blur], className)}
				{...props}>
				{children}
			</Card>
		);
	}
);

GlassCard.displayName = "GlassCard";

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════════════════════════════════════════

interface ProductCardProps extends Omit<BaseCardProps, "variant" | "children"> {
	/** Product title */
	title: string;
	/** Product description */
	description?: string;
	/** Product image URL */
	image?: string;
	/** Product category */
	category?: string;
	/** Price display */
	price?: string;
	/** Whether the product is coming soon */
	comingSoon?: boolean;
	/** Status badge text */
	status?: string;
	/** Icon or emoji for the product */
	icon?: ReactNode;
	/** Click handler */
	onClick?: () => void;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
	(
		{
			title,
			description,
			image,
			category,
			price,
			comingSoon = false,
			status,
			icon,
			onClick,
			className,
			...props
		},
		ref
	) => {
		const prefersReducedMotion = useReducedMotion();

		return (
			<Card
				ref={ref}
				variant="product"
				className={cn("cursor-pointer group", className)}
				onClick={onClick}
				{...props}>
				{/* Coming Soon Ribbon */}
				{comingSoon && (
					<div className="badge-coming-soon z-10">Coming Soon</div>
				)}

				{/* Status Badge */}
				{status && !comingSoon && (
					<div className="absolute top-4 right-4 badge-status z-10">
						{status}
					</div>
				)}

				{/* Image or Icon */}
				{image ? (
					<div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className={cn(
								"object-cover transition-transform duration-500",
								!prefersReducedMotion && "group-hover:scale-110"
							)}
						/>
					</div>
				) : icon ? (
					<div className="text-5xl mb-6 text-center">{icon}</div>
				) : null}

				{/* Category */}
				{category && (
					<span className="badge-category mb-3 inline-block">{category}</span>
				)}

				{/* Title */}
				<h3 className="font-hero text-xl font-semibold text-midnight-navy mb-2">
					{title}
				</h3>

				{/* Description */}
				{description && (
					<p className="font-body text-midnight-navy/70 text-sm mb-4 line-clamp-2">
						{description}
					</p>
				)}

				{/* Price */}
				{price && (
					<div className="font-accent font-bold text-sage-moss text-lg">
						{price}
					</div>
				)}
			</Card>
		);
	}
);

ProductCard.displayName = "ProductCard";

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE CARD
// ═══════════════════════════════════════════════════════════════════════════

interface FeatureCardProps extends Omit<BaseCardProps, "variant" | "children"> {
	/** Feature title */
	title: string;
	/** Feature description */
	description: string;
	/** Icon or emoji */
	icon: ReactNode;
	/** Whether to highlight the border on hover */
	highlightBorder?: boolean;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
	(
		{ title, description, icon, highlightBorder = true, className, ...props },
		ref
	) => {
		return (
			<Card
				ref={ref}
				variant="feature"
				className={cn(
					highlightBorder && "hover:border-southern-gold/40",
					className
				)}
				{...props}>
				{/* Icon */}
				<div className="text-4xl mb-4">{icon}</div>

				{/* Title */}
				<h4 className="font-hero text-lg font-semibold text-midnight-navy mb-2">
					{title}
				</h4>

				{/* Description */}
				<p className="font-body text-midnight-navy/70 text-sm">{description}</p>
			</Card>
		);
	}
);

FeatureCard.displayName = "FeatureCard";

// ═══════════════════════════════════════════════════════════════════════════
// BLOG CARD
// ═══════════════════════════════════════════════════════════════════════════

interface BlogCardProps extends Omit<BaseCardProps, "variant" | "children"> {
	/** Blog post title */
	title: string;
	/** Blog post excerpt */
	excerpt?: string;
	/** Featured image URL */
	image?: string;
	/** Category */
	category?: string;
	/** Publication date */
	date?: string;
	/** Read time */
	readTime?: string;
	/** Author name */
	author?: string;
	/** Link href */
	href?: string;
}

export const BlogCard = forwardRef<HTMLDivElement, BlogCardProps>(
	(
		{
			title,
			excerpt,
			image,
			category,
			date,
			readTime,
			author,
			href,
			className,
			...props
		},
		ref
	) => {
		const prefersReducedMotion = useReducedMotion();

		const content = (
			<Card
				ref={ref}
				variant="blog"
				className={cn("group", className)}
				{...props}>
				{/* Image */}
				{image && (
					<div className="relative w-full h-48 overflow-hidden">
						<Image
							src={image}
							alt={title}
							fill
							className={cn(
								"object-cover transition-transform duration-500",
								!prefersReducedMotion && "group-hover:scale-105"
							)}
						/>
						{/* Category overlay */}
						{category && (
							<div className="absolute top-4 left-4">
								<span className="badge-category">{category}</span>
							</div>
						)}
					</div>
				)}

				{/* Content */}
				<div className="p-6">
					{/* Meta info */}
					{(date || readTime) && (
						<div className="flex items-center gap-3 text-xs text-mist mb-3 font-accent">
							{date && <span>{date}</span>}
							{date && readTime && <span>•</span>}
							{readTime && <span>{readTime}</span>}
						</div>
					)}

					{/* Title */}
					<h3 className="font-hero text-lg font-semibold text-midnight-navy mb-2 group-hover:text-sage-moss transition-colors">
						{title}
					</h3>

					{/* Excerpt */}
					{excerpt && (
						<p className="font-body text-midnight-navy/70 text-sm line-clamp-2 mb-4">
							{excerpt}
						</p>
					)}

					{/* Author */}
					{author && (
						<div className="text-xs text-mist font-accent">By {author}</div>
					)}
				</div>
			</Card>
		);

		if (href) {
			return (
				<a
					href={href}
					className="block">
					{content}
				</a>
			);
		}

		return content;
	}
);

BlogCard.displayName = "BlogCard";

// ═══════════════════════════════════════════════════════════════════════════
// CARD GRID
// ═══════════════════════════════════════════════════════════════════════════

interface CardGridProps {
	children: ReactNode;
	className?: string;
	/** Number of columns */
	columns?: 1 | 2 | 3 | 4;
	/** Gap between cards */
	gap?: "sm" | "md" | "lg";
}

export function CardGrid({
	children,
	className,
	columns = 3,
	gap = "md",
}: CardGridProps) {
	const columnStyles: Record<number, string> = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	};

	const gapStyles: Record<string, string> = {
		sm: "gap-4",
		md: "gap-6",
		lg: "gap-8",
	};

	return (
		<div
			className={cn("grid", columnStyles[columns], gapStyles[gap], className)}>
			{children}
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD HEADER / CONTENT / FOOTER
// ═══════════════════════════════════════════════════════════════════════════

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export function CardHeader({
	children,
	className,
	...props
}: CardSectionProps) {
	return (
		<div
			className={cn("mb-4", className)}
			{...props}>
			{children}
		</div>
	);
}

export function CardContent({
	children,
	className,
	...props
}: CardSectionProps) {
	return (
		<div
			className={cn("", className)}
			{...props}>
			{children}
		</div>
	);
}

export function CardFooter({
	children,
	className,
	...props
}: CardSectionProps) {
	return (
		<div
			className={cn("mt-4 pt-4 border-t border-warm-gray/20", className)}
			{...props}>
			{children}
		</div>
	);
}
