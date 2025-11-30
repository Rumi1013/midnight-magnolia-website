"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type CursorState = "default" | "hover" | "click" | "magnetic";

interface CursorPosition {
	x: number;
	y: number;
}

interface CursorConfig {
	size: number;
	scale: number;
	mixBlendMode: string;
	backgroundColor: string;
	border?: string;
	boxShadow?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CURSOR CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════

const cursorConfigs: Record<CursorState, CursorConfig> = {
	default: {
		size: 12,
		scale: 1,
		mixBlendMode: "difference",
		backgroundColor: "rgba(255, 255, 255, 0.8)",
	},
	hover: {
		size: 16,
		scale: 1.2,
		mixBlendMode: "difference",
		backgroundColor: "rgba(163, 177, 138, 0.9)",
		boxShadow: "0 0 20px rgba(163, 177, 138, 0.5)",
	},
	click: {
		size: 8,
		scale: 0.8,
		mixBlendMode: "difference",
		backgroundColor: "rgba(212, 175, 55, 1)",
		boxShadow: "0 0 30px rgba(212, 175, 55, 0.8)",
	},
	magnetic: {
		size: 20,
		scale: 1.5,
		mixBlendMode: "normal",
		backgroundColor: "rgba(163, 177, 138, 0.3)",
		border: "2px solid rgba(163, 177, 138, 0.6)",
		boxShadow: "0 0 40px rgba(163, 177, 138, 0.4)",
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC ELEMENTS SELECTOR
// ═══════════════════════════════════════════════════════════════════════════

const magneticSelectors = [
	"button",
	"a",
	"[role='button']",
	"[data-cursor-magnetic]",
	".cursor-magnetic",
	"input[type='submit']",
	"input[type='button']",
	".btn-primary",
	".btn-secondary",
	".btn-outline",
	".btn-sage",
	".btn-gold",
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN CURSOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function CustomCursor() {
	const [mousePosition, setMousePosition] = useState<CursorPosition>({
		x: 0,
		y: 0,
	});
	const [cursorState, setCursorState] = useState<CursorState>("default");
	const [isVisible, setIsVisible] = useState(false);
	const [magneticElement, setMagneticElement] = useState<Element | null>(null);
	const prefersReducedMotion = useReducedMotion();

	// Update mouse position
	const updateMousePosition = useCallback((e: MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY });
	}, []);

	// Handle mouse enter/leave for interactive elements
	const handleMouseEnter = useCallback((e: Event) => {
		const target = e.target as Element;

		// Check if element is magnetic
		const isMagnetic = magneticSelectors.some(
			(selector) => target.matches(selector) || target.closest(selector)
		);

		if (isMagnetic) {
			setCursorState("magnetic");
			setMagneticElement(target);
		} else if (
			target.matches(
				"button, a, [role='button'], input[type='submit'], input[type='button']"
			)
		) {
			setCursorState("hover");
		}
	}, []);

	const handleMouseLeave = useCallback(() => {
		setCursorState("default");
		setMagneticElement(null);
	}, []);

	// Handle mouse down/up for click feedback
	const handleMouseDown = useCallback(() => {
		setCursorState("click");
	}, []);

	const handleMouseUp = useCallback(() => {
		setCursorState(magneticElement ? "magnetic" : "hover");
	}, [magneticElement]);

	// Handle mouse enter/leave document
	const handleMouseEnterDocument = useCallback(() => {
		setIsVisible(true);
	}, []);

	const handleMouseLeaveDocument = useCallback(() => {
		setIsVisible(false);
	}, []);

	useEffect(() => {
		// Only enable custom cursor on desktop and when motion is not reduced
		if (prefersReducedMotion || window.innerWidth < 1024) {
			return;
		}

		// Add event listeners
		document.addEventListener("mousemove", updateMousePosition);
		document.addEventListener("mouseenter", handleMouseEnterDocument);
		document.addEventListener("mouseleave", handleMouseLeaveDocument);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);

		// Add hover listeners to interactive elements
		const addHoverListeners = () => {
			const interactiveElements = document.querySelectorAll(
				"button, a, [role='button'], input[type='submit'], input[type='button'], [data-cursor-magnetic], .cursor-magnetic"
			);

			interactiveElements.forEach((element) => {
				element.addEventListener("mouseenter", handleMouseEnter);
				element.addEventListener("mouseleave", handleMouseLeave);
			});

			return () => {
				interactiveElements.forEach((element) => {
					element.removeEventListener("mouseenter", handleMouseEnter);
					element.removeEventListener("mouseleave", handleMouseLeave);
				});
			};
		};

		const cleanup = addHoverListeners();

		// Re-add listeners when DOM changes (for dynamic content)
		const observer = new MutationObserver(addHoverListeners);
		observer.observe(document.body, { childList: true, subtree: true });

		return () => {
			document.removeEventListener("mousemove", updateMousePosition);
			document.removeEventListener("mouseenter", handleMouseEnterDocument);
			document.removeEventListener("mouseleave", handleMouseLeaveDocument);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
			cleanup();
			observer.disconnect();
		};
	}, [
		prefersReducedMotion,
		updateMousePosition,
		handleMouseEnter,
		handleMouseLeave,
		handleMouseDown,
		handleMouseUp,
		handleMouseEnterDocument,
		handleMouseLeaveDocument,
	]);

	// Don't render custom cursor on mobile or with reduced motion
	if (prefersReducedMotion || window.innerWidth < 1024) {
		return null;
	}

	const config = cursorConfigs[cursorState];

	return (
		<motion.div
			className="fixed top-0 left-0 pointer-events-none z-[9999]"
			style={{
				mixBlendMode: config.mixBlendMode as any,
			}}
			animate={{
				x: mousePosition.x - config.size / 2,
				y: mousePosition.y - config.size / 2,
				scale: config.scale,
				opacity: isVisible ? 1 : 0,
			}}
			transition={{
				type: "spring",
				stiffness: 500,
				damping: 28,
				scale: { type: "spring", stiffness: 400, damping: 17 },
				opacity: { duration: 0.2 },
			}}>
			<div
				className="rounded-full transition-all duration-200"
				style={{
					width: config.size,
					height: config.size,
					backgroundColor: config.backgroundColor,
					border: config.border,
					boxShadow: config.boxShadow,
				}}
			/>
		</motion.div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// CURSOR DOT (Small trailing dot)
// ═══════════════════════════════════════════════════════════════════════════

export function CursorDot() {
	const [mousePosition, setMousePosition] = useState<CursorPosition>({
		x: 0,
		y: 0,
	});
	const [isVisible, setIsVisible] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (prefersReducedMotion || window.innerWidth < 1024) return;

		const updateMousePosition = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		const handleMouseEnter = () => setIsVisible(true);
		const handleMouseLeave = () => setIsVisible(false);

		document.addEventListener("mousemove", updateMousePosition);
		document.addEventListener("mouseenter", handleMouseEnter);
		document.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			document.removeEventListener("mousemove", updateMousePosition);
			document.removeEventListener("mouseenter", handleMouseEnter);
			document.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [prefersReducedMotion]);

	if (prefersReducedMotion || window.innerWidth < 1024) return null;

	return (
		<motion.div
			className="fixed top-0 left-0 pointer-events-none z-[9998]"
			animate={{
				x: mousePosition.x - 2,
				y: mousePosition.y - 2,
				opacity: isVisible ? 0.6 : 0,
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}>
			<div className="w-1 h-1 bg-white rounded-full" />
		</motion.div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// CURSOR CONTEXT PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

export function CursorProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<CustomCursor />
			<CursorDot />
			{children}
		</>
	);
}
