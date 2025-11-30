/**
 * Custom hooks for micro-interactions in Midnight Magnolia
 * Provides reusable interaction patterns for enhanced user experience
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC EFFECT HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface MagneticOptions {
	/** Strength of the magnetic pull (0-1) */
	strength?: number;
	/** Distance threshold for activation (in pixels) */
	range?: number;
	/** Whether to enable the effect */
	enabled?: boolean;
}

interface MagneticPosition {
	x: number;
	y: number;
}

export function useMagneticEffect(options: MagneticOptions = {}) {
	const { strength = 0.3, range = 100, enabled = true } = options;
	const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 });
	const [isActive, setIsActive] = useState(false);
	const elementRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!elementRef.current || !enabled || prefersReducedMotion) return;

			const rect = elementRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const deltaX = e.clientX - centerX;
			const deltaY = e.clientY - centerY;
			const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

			if (distance < range) {
				const pullX =
					(deltaX / distance) * strength * range * (1 - distance / range);
				const pullY =
					(deltaY / distance) * strength * range * (1 - distance / range);

				setPosition({ x: pullX, y: pullY });
				setIsActive(true);
			} else {
				setPosition({ x: 0, y: 0 });
				setIsActive(false);
			}
		},
		[strength, range, enabled, prefersReducedMotion]
	);

	const handleMouseLeave = useCallback(() => {
		setPosition({ x: 0, y: 0 });
		setIsActive(false);
	}, []);

	useEffect(() => {
		if (!enabled || prefersReducedMotion) return;

		const element = elementRef.current;
		if (!element) return;

		element.addEventListener("mousemove", handleMouseMove);
		element.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			element.removeEventListener("mousemove", handleMouseMove);
			element.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [handleMouseMove, handleMouseLeave, enabled, prefersReducedMotion]);

	return {
		ref: elementRef,
		position,
		isActive,
		style: prefersReducedMotion
			? {}
			: {
					transform: `translate(${position.x}px, ${position.y}px)`,
					transition: isActive ? "none" : "transform 0.3s ease-out",
			  },
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX SCROLLING HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface ParallaxOptions {
	/** Speed multiplier (negative values move opposite to scroll) */
	speed?: number;
	/** Whether to enable the effect */
	enabled?: boolean;
	/** Direction of movement */
	direction?: "vertical" | "horizontal" | "both";
}

export function useParallax(options: ParallaxOptions = {}) {
	const { speed = 0.5, enabled = true, direction = "vertical" } = options;
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const elementRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (!enabled || prefersReducedMotion) return;

		const handleScroll = () => {
			if (!elementRef.current) return;

			const rect = elementRef.current.getBoundingClientRect();
			const scrollY = window.scrollY;
			const scrollX = window.scrollX;

			let newOffset = { x: 0, y: 0 };

			switch (direction) {
				case "vertical":
					newOffset.y = (rect.top + scrollY) * speed;
					break;
				case "horizontal":
					newOffset.x = (rect.left + scrollX) * speed;
					break;
				case "both":
					newOffset.x = (rect.left + scrollX) * speed;
					newOffset.y = (rect.top + scrollY) * speed;
					break;
			}

			setOffset(newOffset);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initial call

		return () => window.removeEventListener("scroll", handleScroll);
	}, [speed, enabled, direction, prefersReducedMotion]);

	return {
		ref: elementRef,
		offset,
		style: prefersReducedMotion
			? {}
			: {
					transform: `translate(${offset.x}px, ${offset.y}px)`,
			  },
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// HOVER GLOW EFFECT HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface GlowOptions {
	/** Glow color */
	color?: string;
	/** Glow intensity (0-1) */
	intensity?: number;
	/** Glow size in pixels */
	size?: number;
	/** Whether to enable the effect */
	enabled?: boolean;
}

export function useHoverGlow(options: GlowOptions = {}) {
	const {
		color = "rgba(163, 177, 138, 0.5)",
		intensity = 0.5,
		size = 20,
		enabled = true,
	} = options;

	const [isHovered, setIsHovered] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const elementRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!elementRef.current) return;

		const rect = elementRef.current.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	}, []);

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);

	useEffect(() => {
		if (!enabled || prefersReducedMotion) return;

		const element = elementRef.current;
		if (!element) return;

		element.addEventListener("mousemove", handleMouseMove);
		element.addEventListener("mouseenter", handleMouseEnter);
		element.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			element.removeEventListener("mousemove", handleMouseMove);
			element.removeEventListener("mouseenter", handleMouseEnter);
			element.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [
		handleMouseMove,
		handleMouseEnter,
		handleMouseLeave,
		enabled,
		prefersReducedMotion,
	]);

	const glowStyle =
		isHovered && !prefersReducedMotion
			? {
					background: `radial-gradient(circle ${size}px at ${
						mousePosition.x
					}px ${mousePosition.y}px, ${color}, transparent ${size * 2}px)`,
					opacity: intensity,
			  }
			: {};

	return {
		ref: elementRef,
		isHovered,
		mousePosition,
		style: glowStyle,
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPEWRITER EFFECT HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface TypewriterOptions {
	/** Text to type */
	text: string;
	/** Typing speed in milliseconds */
	speed?: number;
	/** Delay before starting in milliseconds */
	delay?: number;
	/** Whether to loop the animation */
	loop?: boolean;
	/** Whether to enable the effect */
	enabled?: boolean;
	/** Callback when typing is complete */
	onComplete?: () => void;
}

export function useTypewriter(options: TypewriterOptions) {
	const {
		text,
		speed = 100,
		delay = 0,
		loop = false,
		enabled = true,
		onComplete,
	} = options;

	const [displayText, setDisplayText] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (!enabled || prefersReducedMotion) {
			setDisplayText(text);
			setIsComplete(true);
			return;
		}

		const startTyping = () => {
			setIsTyping(true);
			setDisplayText("");
			setIsComplete(false);

			let i = 0;
			const timer = setInterval(() => {
				if (i < text.length) {
					setDisplayText((prev) => prev + text.charAt(i));
					i++;
				} else {
					clearInterval(timer);
					setIsTyping(false);
					setIsComplete(true);
					onComplete?.();
				}
			}, speed);

			return timer;
		};

		const timeout = setTimeout(() => {
			const timer = startTyping();

			if (loop) {
				// Restart after completion
				const restartTimer = setTimeout(() => {
					clearInterval(timer);
					startTyping();
				}, 2000); // 2 second pause before restart

				return () => {
					clearInterval(timer);
					clearTimeout(restartTimer);
				};
			}

			return () => clearInterval(timer);
		}, delay);

		return () => clearTimeout(timeout);
	}, [text, speed, delay, loop, enabled, prefersReducedMotion, onComplete]);

	return {
		displayText,
		isTyping,
		isComplete,
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// RIPPLE EFFECT HOOK (Material Design style)
// ═══════════════════════════════════════════════════════════════════════════

interface RippleOptions {
	/** Ripple color */
	color?: string;
	/** Ripple duration in milliseconds */
	duration?: number;
	/** Whether to enable the effect */
	enabled?: boolean;
}

interface Ripple {
	id: number;
	x: number;
	y: number;
	size: number;
}

export function useRippleEffect(options: RippleOptions = {}) {
	const {
		color = "rgba(163, 177, 138, 0.3)",
		duration = 600,
		enabled = true,
	} = options;
	const [ripples, setRipples] = useState<Ripple[]>([]);
	const elementRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const createRipple = useCallback(
		(event: MouseEvent) => {
			if (!elementRef.current || !enabled || prefersReducedMotion) return;

			const rect = elementRef.current.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = event.clientX - rect.left - size / 2;
			const y = event.clientY - rect.top - size / 2;

			const newRipple: Ripple = {
				id: Date.now(),
				x,
				y,
				size,
			};

			setRipples((prev) => [...prev, newRipple]);

			// Remove ripple after animation
			setTimeout(() => {
				setRipples((prev) =>
					prev.filter((ripple) => ripple.id !== newRipple.id)
				);
			}, duration);
		},
		[enabled, prefersReducedMotion, duration]
	);

	useEffect(() => {
		if (!enabled || prefersReducedMotion) return;

		const element = elementRef.current;
		if (!element) return;

		element.addEventListener("click", createRipple as any);

		return () => {
			element.removeEventListener("click", createRipple as any);
		};
	}, [createRipple, enabled, prefersReducedMotion]);

	return {
		ref: elementRef,
		ripples,
		rippleStyle: (ripple: Ripple) => ({
			position: "absolute" as const,
			left: ripple.x,
			top: ripple.y,
			width: ripple.size,
			height: ripple.size,
			borderRadius: "50%",
			backgroundColor: color,
			transform: "scale(0)",
			animation: `ripple ${duration}ms linear`,
			pointerEvents: "none" as const,
		}),
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL PROGRESS HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface ScrollProgressOptions {
	/** Whether to enable the effect */
	enabled?: boolean;
	/** Element to track (defaults to window) */
	element?: HTMLElement | null;
}

export function useScrollProgress(options: ScrollProgressOptions = {}) {
	const { enabled = true, element = null } = options;
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!enabled) return;

		const targetElement = element || window;
		const isWindow = targetElement === window;

		const handleScroll = () => {
			let scrollTop: number;
			let scrollHeight: number;
			let clientHeight: number;

			if (isWindow) {
				scrollTop = window.scrollY;
				scrollHeight =
					document.documentElement.scrollHeight - window.innerHeight;
			} else {
				const el = targetElement as HTMLElement;
				scrollTop = el.scrollTop;
				scrollHeight = el.scrollHeight - el.clientHeight;
			}

			const progress =
				scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
			setProgress(progress);
		};

		targetElement.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initial call

		return () => targetElement.removeEventListener("scroll", handleScroll);
	}, [enabled, element]);

	return progress;
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERSECTION OBSERVER HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface IntersectionOptions {
	/** Threshold for triggering (0-1) */
	threshold?: number | number[];
	/** Root margin */
	rootMargin?: string;
	/** Whether to trigger only once */
	triggerOnce?: boolean;
	/** Whether to enable the effect */
	enabled?: boolean;
}

export function useIntersectionObserver(options: IntersectionOptions = {}) {
	const {
		threshold = 0.1,
		rootMargin = "0px",
		triggerOnce = false,
		enabled = true,
	} = options;

	const [isIntersecting, setIsIntersecting] = useState(false);
	const [hasIntersected, setHasIntersected] = useState(false);
	const elementRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!enabled) return;

		const element = elementRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isElementIntersecting = entry.isIntersecting;

				if (triggerOnce && hasIntersected) return;

				setIsIntersecting(isElementIntersecting);

				if (isElementIntersecting && triggerOnce) {
					setHasIntersected(true);
				}
			},
			{
				threshold,
				rootMargin,
			}
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [threshold, rootMargin, triggerOnce, enabled, hasIntersected]);

	return {
		ref: elementRef,
		isIntersecting: triggerOnce ? hasIntersected : isIntersecting,
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// HOVER SCALE HOOK
// ═══════════════════════════════════════════════════════════════════════════

interface ScaleOptions {
	/** Scale factor on hover */
	scale?: number;
	/** Transition duration in seconds */
	duration?: number;
	/** Whether to enable the effect */
	enabled?: boolean;
}

export function useHoverScale(options: ScaleOptions = {}) {
	const { scale = 1.05, duration = 0.3, enabled = true } = options;
	const [isHovered, setIsHovered] = useState(false);
	const elementRef = useRef<HTMLElement>(null);
	const prefersReducedMotion = useReducedMotion();

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);

	useEffect(() => {
		if (!enabled || prefersReducedMotion) return;

		const element = elementRef.current;
		if (!element) return;

		element.addEventListener("mouseenter", handleMouseEnter);
		element.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			element.removeEventListener("mouseenter", handleMouseEnter);
			element.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [handleMouseEnter, handleMouseLeave, enabled, prefersReducedMotion]);

	return {
		ref: elementRef,
		isHovered,
		style: prefersReducedMotion
			? {}
			: {
					transform: `scale(${isHovered ? scale : 1})`,
					transition: `transform ${duration}s ease`,
			  },
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// CSS KEYFRAMES FOR RIPPLE EFFECT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Add this CSS to your global styles for the ripple effect:
 *
 * @keyframes ripple {
 *   to {
 *     transform: scale(4);
 *     opacity: 0;
 *   }
 * }
 */
