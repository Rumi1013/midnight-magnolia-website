"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
	floatAnimation,
	floatWithRotation,
	zodiacDrift,
	sparkle,
	constellationPulse,
	createFloatAnimation,
} from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type ElementType =
	| "moon"
	| "star"
	| "sparkle"
	| "botanical"
	| "feather"
	| "zodiac";

export type Density = "sparse" | "normal" | "dense";

interface FloatingElement {
	id: string;
	type: ElementType;
	content: string;
	x: number;
	y: number;
	size: number;
	delay: number;
	duration: number;
	opacity: number;
}

interface FloatingElementsProps {
	/** Types of elements to render */
	types?: ElementType[];
	/** Density of elements */
	density?: Density;
	/** Custom class name for container */
	className?: string;
	/** Whether to show elements (can be controlled externally) */
	show?: boolean;
	/** Z-index for the container */
	zIndex?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// ELEMENT CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

const ELEMENT_CONTENT: Record<ElementType, string[]> = {
	moon: ["🌙", "🌛", "🌜"],
	star: ["⭐", "✦", "✧", "★"],
	sparkle: ["✨", "💫", "⋆"],
	botanical: ["🌿", "🍃", "🌸", "🌺", "🪻"],
	feather: ["🪶"],
	zodiac: [
		"♈",
		"♉",
		"♊",
		"♋",
		"♌",
		"♍",
		"♎",
		"♏",
		"♐",
		"♑",
		"♒",
		"♓",
	],
};

const DENSITY_COUNTS: Record<Density, number> = {
	sparse: 6,
	normal: 12,
	dense: 20,
};

const ELEMENT_SIZES: Record<ElementType, { min: number; max: number }> = {
	moon: { min: 1.5, max: 2.5 },
	star: { min: 0.8, max: 1.5 },
	sparkle: { min: 1, max: 1.8 },
	botanical: { min: 1.5, max: 2.5 },
	feather: { min: 1.2, max: 2 },
	zodiac: { min: 1.5, max: 2.5 },
};

const ELEMENT_OPACITY: Record<ElementType, { min: number; max: number }> = {
	moon: { min: 0.4, max: 0.8 },
	star: { min: 0.3, max: 0.6 },
	sparkle: { min: 0.5, max: 0.9 },
	botanical: { min: 0.3, max: 0.6 },
	feather: { min: 0.3, max: 0.5 },
	zodiac: { min: 0.15, max: 0.4 },
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function randomBetween(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

function randomFromArray<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function generateElements(
	types: ElementType[],
	count: number
): FloatingElement[] {
	const elements: FloatingElement[] = [];

	for (let i = 0; i < count; i++) {
		const type = randomFromArray(types);
		const sizeRange = ELEMENT_SIZES[type];
		const opacityRange = ELEMENT_OPACITY[type];

		elements.push({
			id: `floating-${type}-${i}`,
			type,
			content: randomFromArray(ELEMENT_CONTENT[type]),
			x: randomBetween(5, 95),
			y: randomBetween(5, 95),
			size: randomBetween(sizeRange.min, sizeRange.max),
			delay: randomBetween(0, 5),
			duration: randomBetween(4, 8),
			opacity: randomBetween(opacityRange.min, opacityRange.max),
		});
	}

	return elements;
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS BY TYPE
// ═══════════════════════════════════════════════════════════════════════════

function getAnimationVariant(type: ElementType, duration: number) {
	switch (type) {
		case "moon":
			return floatAnimation;
		case "star":
			return constellationPulse;
		case "sparkle":
			return sparkle;
		case "botanical":
			return floatWithRotation;
		case "feather":
			return zodiacDrift;
		case "zodiac":
			return zodiacDrift;
		default:
			return createFloatAnimation(10, duration);
	}
}

// ═══════════════════════════════════════════════════════════════════════════
// SINGLE FLOATING ELEMENT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface SingleElementProps {
	element: FloatingElement;
	reducedMotion: boolean;
}

function SingleFloatingElement({ element, reducedMotion }: SingleElementProps) {
	const variant = getAnimationVariant(element.type, element.duration);

	// For reduced motion, just show static elements
	if (reducedMotion) {
		return (
			<div
				className="absolute pointer-events-none select-none"
				style={{
					left: `${element.x}%`,
					top: `${element.y}%`,
					fontSize: `${element.size}rem`,
					opacity: element.opacity,
				}}
				aria-hidden="true">
				{element.content}
			</div>
		);
	}

	return (
		<motion.div
			className="absolute pointer-events-none select-none"
			style={{
				left: `${element.x}%`,
				top: `${element.y}%`,
				fontSize: `${element.size}rem`,
			}}
			initial="initial"
			animate="animate"
			variants={variant}
			transition={{
				delay: element.delay,
			}}
			aria-hidden="true">
			<motion.span
				style={{ opacity: element.opacity }}
				className={`inline-block ${
					element.type === "zodiac"
						? "text-zodiac-glow font-playfair"
						: element.type === "moon"
						? "drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
						: ""
				}`}>
				{element.content}
			</motion.span>
		</motion.div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function FloatingElements({
	types = ["moon", "star", "sparkle"],
	density = "normal",
	className = "",
	show = true,
	zIndex = 0,
}: FloatingElementsProps) {
	const [mounted, setMounted] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	// Generate elements only on client side to avoid hydration mismatch
	const elements = useMemo(() => {
		if (!mounted) return [];
		const count = DENSITY_COUNTS[density];
		return generateElements(types, count);
	}, [mounted, types, density]);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!show || !mounted) return null;

	return (
		<div
			className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
			style={{ zIndex }}
			aria-hidden="true">
			{elements.map((element) => (
				<SingleFloatingElement
					key={element.id}
					element={element}
					reducedMotion={prefersReducedMotion ?? false}
				/>
			))}
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// PRESET CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hero section floating elements - moons, stars, and sparkles
 */
export function HeroFloatingElements() {
	return (
		<FloatingElements
			types={["moon", "star", "sparkle"]}
			density="normal"
			zIndex={1}
		/>
	);
}

/**
 * Mystical section - zodiac symbols and stars
 */
export function MysticalFloatingElements() {
	return (
		<FloatingElements
			types={["zodiac", "star", "sparkle"]}
			density="sparse"
			zIndex={1}
		/>
	);
}

/**
 * Nature section - botanical elements
 */
export function BotanicalFloatingElements() {
	return (
		<FloatingElements
			types={["botanical", "feather", "sparkle"]}
			density="sparse"
			zIndex={1}
		/>
	);
}

/**
 * Sparse decorative elements for subtle backgrounds
 */
export function SubtleFloatingElements() {
	return (
		<FloatingElements
			types={["star", "sparkle"]}
			density="sparse"
			zIndex={0}
		/>
	);
}
