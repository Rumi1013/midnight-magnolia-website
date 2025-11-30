"use client";

import {
	ReactNode,
	useRef,
	Children,
	cloneElement,
	isValidElement,
} from "react";
import {
	motion,
	useInView,
	useReducedMotion,
	Variants,
	UseInViewOptions,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
	fadeInUp,
	fadeIn,
	slideInFromLeft,
	slideInFromRight,
	slideInFromBottom,
	fadeInScale,
	staggerContainer,
	staggerContainerFast,
	staggerContainerSlow,
	staggerItem,
} from "@/lib/animations";

// Types
export type RevealAnimation =
	| "fadeInUp"
	| "fadeIn"
	| "slideLeft"
	| "slideRight"
	| "slideUp"
	| "scale"
	| "custom";
export type StaggerSpeed = "fast" | "normal" | "slow";

interface ScrollRevealProps {
	children: ReactNode;
	animation?: RevealAnimation;
	variants?: Variants;
	delay?: number;
	duration?: number;
	once?: boolean;
	margin?: string;
	threshold?: number;
	className?: string;
}

interface StaggerRevealProps {
	children: ReactNode;
	speed?: StaggerSpeed;
	containerVariants?: Variants;
	itemVariants?: Variants;
	once?: boolean;
	margin?: string;
	className?: string;
}

// Animation mapping
const animationVariants: Record<RevealAnimation, Variants> = {
	fadeInUp,
	fadeIn,
	slideLeft: slideInFromLeft,
	slideRight: slideInFromRight,
	slideUp: slideInFromBottom,
	scale: fadeInScale,
	custom: fadeInUp,
};

const staggerVariants: Record<StaggerSpeed, Variants> = {
	fast: staggerContainerFast,
	normal: staggerContainer,
	slow: staggerContainerSlow,
};

// Main ScrollReveal component
export default function ScrollReveal({
	children,
	animation = "fadeInUp",
	variants: customVariants,
	delay = 0,
	duration,
	once = true,
	margin = "-50px",
	threshold = 0.1,
	className,
}: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const isInView = useInView(ref, {
		once,
		margin: margin as any,
		amount: threshold,
	});

	const selectedVariants =
		animation === "custom" && customVariants
			? customVariants
			: animationVariants[animation];

	const modifiedVariants: Variants = {
		hidden: selectedVariants.hidden,
		visible: {
			...selectedVariants.visible,
			transition: {
				...(typeof selectedVariants.visible === "object" &&
				"transition" in selectedVariants.visible
					? selectedVariants.visible.transition
					: {}),
				delay,
				...(duration && { duration }),
			},
		},
	};

	if (prefersReducedMotion) {
		return (
			<div
				ref={ref}
				className={className}>
				{children}
			</div>
		);
	}

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={modifiedVariants}
			className={className}>
			{children}
		</motion.div>
	);
}

// StaggerReveal component
export function StaggerReveal({
	children,
	speed = "normal",
	containerVariants: customContainerVariants,
	itemVariants: customItemVariants,
	once = true,
	margin = "-50px",
	className,
}: StaggerRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const isInView = useInView(ref, { once, margin: margin as any, amount: 0.1 });

	const containerVars = customContainerVariants || staggerVariants[speed];
	const itemVars = customItemVariants || staggerItem;

	if (prefersReducedMotion) {
		return (
			<div
				ref={ref}
				className={className}>
				{children}
			</div>
		);
	}

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={containerVars}
			className={className}>
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					return <motion.div variants={itemVars}>{child}</motion.div>;
				}
				return child;
			})}
		</motion.div>
	);
}

// RevealText component for text animations
interface RevealTextProps {
	children: string;
	className?: string;
	delay?: number;
	once?: boolean;
}

export function RevealText({
	children,
	className,
	delay = 0,
	once = true,
}: RevealTextProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const isInView = useInView(ref, { once, margin: "-20px" });

	if (prefersReducedMotion) {
		return (
			<span
				ref={ref}
				className={className}>
				{children}
			</span>
		);
	}

	const words = children.split(" ");

	return (
		<span
			ref={ref}
			className={cn("inline-block", className)}>
			{words.map((word, i) => (
				<motion.span
					key={i}
					className="inline-block mr-[0.25em]"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{
						duration: 0.4,
						delay: delay + i * 0.05,
						ease: [0.25, 0.46, 0.45, 0.94],
					}}>
					{word}
				</motion.span>
			))}
		</span>
	);
}

// RevealOnScroll hook for custom implementations
export function useScrollReveal(options?: {
	once?: boolean;
	margin?: string;
	threshold?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const prefersReducedMotion = useReducedMotion();
	const isInView = useInView(ref, {
		once: options?.once ?? true,
		margin: (options?.margin ?? "-50px") as any,
		amount: options?.threshold ?? 0.1,
	});

	return { ref, isInView, prefersReducedMotion };
}
