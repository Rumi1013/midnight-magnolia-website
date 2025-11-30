"use client";

import { forwardRef, ReactNode, HTMLAttributes } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeIn, shimmer } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type BadgeVariant =
	| "section"
	| "category"
	| "status"
	| "comingSoon"
	| "outline";

export type BadgeSize = "sm" | "md" | "lg";

export type StatusType = "default" | "success" | "warning" | "error" | "info";

interface BadgeProps extends Omit<HTMLMotionProps<"span">, "children"> {
	/** Badge variant style */
	variant?: BadgeVariant;
	/** Badge size */
	size?: BadgeSize;
	/** Status type for status badges */
	status?: StatusType;
	/** Whether to show shimmer animation */
	shimmer?: boolean;
	/** Whether to animate on mount */
	animate?: boolean;
	/** Icon to display before text */
	icon?: ReactNode;
	/** Children content */
	children: ReactNode;
	/** Additional class names */
	className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const baseStyles = `
  inline-flex items-center justify-center
  font-accent font-bold
  text-xs
  tracking-wider
  uppercase
  rounded-full
  transition-all duration-300
`;

const variantStyles: Record<BadgeVariant, string> = {
	section: `
    bg-sage-moss
    text-magnolia-white
    tracking-widest
  `,
	category: `
    bg-midnight-navy
    text-magnolia-white
    tracking-wider
  `,
	status: `
    bg-warm-gray
    text-gray-600
    font-semibold
  `,
	comingSoon: `
    bg-gradient-to-r from-southern-gold via-sage-moss to-southern-gold
    text-midnight-navy
    shadow-[0_4px_12px_rgba(0,0,0,0.2)]
  `,
	outline: `
    bg-transparent
    border border-current
    text-magnolia-white
  `,
};

const sizeStyles: Record<BadgeSize, string> = {
	sm: "px-2 py-0.5 text-[0.65rem] gap-1",
	md: "px-3 py-1 text-xs gap-1.5",
	lg: "px-4 py-1.5 text-sm gap-2",
};

const statusStyles: Record<StatusType, string> = {
	default: "bg-warm-gray text-gray-600",
	success: "bg-success-light text-success-dark",
	warning: "bg-warning-light text-warning-dark",
	error: "bg-error-light text-error-dark",
	info: "bg-info-light text-info-dark",
};

// ═══════════════════════════════════════════════════════════════════════════
// BADGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{
			variant = "section",
			size = "md",
			status = "default",
			shimmer: showShimmer = false,
			animate = false,
			icon,
			children,
			className,
			...props
		},
		ref
	) => {
		const prefersReducedMotion = useReducedMotion();

		// Apply status styles if variant is status
		const statusClass = variant === "status" ? statusStyles[status] : "";

		// Animation props
		const motionProps =
			prefersReducedMotion || !animate
				? {}
				: {
						initial: "hidden",
						animate: "visible",
						variants: fadeIn,
				  };

		// Shimmer animation
		const shimmerClass =
			showShimmer && !prefersReducedMotion
				? "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer"
				: "";

		return (
			<motion.span
				ref={ref}
				className={cn(
					baseStyles,
					variantStyles[variant],
					sizeStyles[size],
					statusClass,
					shimmerClass,
					className
				)}
				{...motionProps}
				{...props}>
				{icon && (
					<span
						className="flex-shrink-0"
						aria-hidden="true">
						{icon}
					</span>
				)}
				{children}
			</motion.span>
		);
	}
);

Badge.displayName = "Badge";

export default Badge;

// ═══════════════════════════════════════════════════════════════════════════
// SECTION BADGE
// ═══════════════════════════════════════════════════════════════════════════

interface SectionBadgeProps extends Omit<BadgeProps, "variant"> {
	/** Whether to show shimmer effect */
	shimmer?: boolean;
}

export const SectionBadge = forwardRef<HTMLSpanElement, SectionBadgeProps>(
	({ shimmer = false, className, children, ...props }, ref) => {
		return (
			<Badge
				ref={ref}
				variant="section"
				size="md"
				shimmer={shimmer}
				className={cn("tracking-[0.1em]", className)}
				{...props}>
				{children}
			</Badge>
		);
	}
);

SectionBadge.displayName = "SectionBadge";

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY BADGE
// ═══════════════════════════════════════════════════════════════════════════

export const CategoryBadge = forwardRef<
	HTMLSpanElement,
	Omit<BadgeProps, "variant">
>(({ className, children, ...props }, ref) => {
	return (
		<Badge
			ref={ref}
			variant="category"
			size="md"
			className={className}
			{...props}>
			{children}
		</Badge>
	);
});

CategoryBadge.displayName = "CategoryBadge";

// ═══════════════════════════════════════════════════════════════════════════
// STATUS BADGE
// ═══════════════════════════════════════════════════════════════════════════

interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
	/** Status type */
	status?: StatusType;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
	({ status = "default", className, children, ...props }, ref) => {
		return (
			<Badge
				ref={ref}
				variant="status"
				status={status}
				size="sm"
				className={className}
				{...props}>
				{children}
			</Badge>
		);
	}
);

StatusBadge.displayName = "StatusBadge";

// ═══════════════════════════════════════════════════════════════════════════
// COMING SOON BADGE
// ═══════════════════════════════════════════════════════════════════════════

interface ComingSoonBadgeProps
	extends Omit<BadgeProps, "variant" | "children"> {
	/** Custom text (default: "Coming Soon") */
	text?: string;
	/** Whether to pulse */
	pulse?: boolean;
}

export const ComingSoonBadge = forwardRef<
	HTMLSpanElement,
	ComingSoonBadgeProps
>(({ text = "Coming Soon", pulse = true, className, ...props }, ref) => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<Badge
			ref={ref}
			variant="comingSoon"
			size="md"
			className={cn(
				pulse && !prefersReducedMotion && "animate-pulse",
				className
			)}
			{...props}>
			{text}
		</Badge>
	);
});

ComingSoonBadge.displayName = "ComingSoonBadge";

// ═══════════════════════════════════════════════════════════════════════════
// COMING SOON RIBBON (Positioned)
// ═══════════════════════════════════════════════════════════════════════════

interface ComingSoonRibbonProps {
	/** Custom text */
	text?: string;
	/** Position */
	position?: "top-right" | "top-left";
	/** Additional class names */
	className?: string;
}

export function ComingSoonRibbon({
	text = "Coming Soon",
	position = "top-right",
	className,
}: ComingSoonRibbonProps) {
	const prefersReducedMotion = useReducedMotion();

	const positionStyles: Record<string, string> = {
		"top-right": "top-[-0.5rem] right-[-0.5rem] rotate-12",
		"top-left": "top-[-0.5rem] left-[-0.5rem] -rotate-12",
	};

	return (
		<motion.div
			className={cn(
				"absolute z-10",
				"bg-gradient-to-r from-southern-gold via-sage-moss to-southern-gold",
				"text-midnight-navy",
				"font-accent font-bold text-xs",
				"px-6 py-2",
				"shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
				positionStyles[position],
				!prefersReducedMotion && "animate-pulse",
				className
			)}
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}>
			{text}
		</motion.div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// IN DEVELOPMENT BADGE
// ═══════════════════════════════════════════════════════════════════════════

interface InDevelopmentBadgeProps
	extends Omit<BadgeProps, "variant" | "children"> {
	/** Custom text */
	text?: string;
}

export const InDevelopmentBadge = forwardRef<
	HTMLSpanElement,
	InDevelopmentBadgeProps
>(({ text = "In Development", className, ...props }, ref) => {
	return (
		<Badge
			ref={ref}
			variant="status"
			status="info"
			size="sm"
			icon={<span className="w-2 h-2 rounded-full bg-info animate-pulse" />}
			className={className}
			{...props}>
			{text}
		</Badge>
	);
});

InDevelopmentBadge.displayName = "InDevelopmentBadge";

// ═══════════════════════════════════════════════════════════════════════════
// BADGE GROUP
// ═══════════════════════════════════════════════════════════════════════════

interface BadgeGroupProps {
	children: ReactNode;
	className?: string;
	/** Gap between badges */
	gap?: "sm" | "md" | "lg";
}

export function BadgeGroup({
	children,
	className,
	gap = "sm",
}: BadgeGroupProps) {
	const gapStyles: Record<string, string> = {
		sm: "gap-1",
		md: "gap-2",
		lg: "gap-3",
	};

	return (
		<div
			className={cn("flex flex-wrap items-center", gapStyles[gap], className)}>
			{children}
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION BADGE (Dot)
// ═══════════════════════════════════════════════════════════════════════════

interface NotificationBadgeProps {
	/** Count to display (if > 0) */
	count?: number;
	/** Maximum count to display */
	max?: number;
	/** Whether to show as dot only */
	dot?: boolean;
	/** Status color */
	status?: StatusType;
	/** Additional class names */
	className?: string;
}

export function NotificationBadge({
	count = 0,
	max = 99,
	dot = false,
	status = "error",
	className,
}: NotificationBadgeProps) {
	const prefersReducedMotion = useReducedMotion();

	if (count === 0 && !dot) return null;

	const statusColors: Record<StatusType, string> = {
		default: "bg-warm-gray",
		success: "bg-success",
		warning: "bg-warning",
		error: "bg-error",
		info: "bg-info",
	};

	const displayCount = count > max ? `${max}+` : count;

	return (
		<motion.span
			className={cn(
				"absolute -top-1 -right-1",
				"flex items-center justify-center",
				"text-white text-[0.65rem] font-bold",
				statusColors[status],
				dot ? "w-2.5 h-2.5" : "min-w-[1.25rem] h-5 px-1",
				"rounded-full",
				className
			)}
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={
				prefersReducedMotion
					? { duration: 0 }
					: { type: "spring", stiffness: 500, damping: 25 }
			}>
			{!dot && displayCount}
		</motion.span>
	);
}
