/**
 * Framer Motion Animation Variants for Midnight Magnolia
 * Southern Gothic aesthetic with elegant, subtle animations
 */

import { Variants, TargetAndTransition } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// FADE ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Fade in while moving up - perfect for content reveals
 */
export const fadeInUp: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.3,
		},
	},
};

/**
 * Simple fade in animation
 */
export const fadeIn: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
		},
	},
};

/**
 * Fade in from below with scale
 */
export const fadeInScale: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
		y: 20,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// SLIDE ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Slide in from left
 */
export const slideInFromLeft: Variants = {
	hidden: {
		opacity: 0,
		x: -60,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
	exit: {
		opacity: 0,
		x: -30,
		transition: {
			duration: 0.3,
		},
	},
};

/**
 * Slide in from right
 */
export const slideInFromRight: Variants = {
	hidden: {
		opacity: 0,
		x: 60,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
	exit: {
		opacity: 0,
		x: 30,
		transition: {
			duration: 0.3,
		},
	},
};

/**
 * Slide in from bottom
 */
export const slideInFromBottom: Variants = {
	hidden: {
		opacity: 0,
		y: 60,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// STAGGER CONTAINERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Container for staggered children animations
 */
export const staggerContainer: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

/**
 * Fast stagger container for quick reveals
 */
export const staggerContainerFast: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.05,
		},
	},
};

/**
 * Slow stagger container for dramatic reveals
 */
export const staggerContainerSlow: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

/**
 * Stagger item for use with stagger containers
 */
export const staggerItem: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// HOVER EFFECTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Scale up on hover - for buttons and interactive elements
 */
export const scaleOnHover: TargetAndTransition = {
	scale: 1.05,
	transition: {
		type: "spring",
		stiffness: 400,
		damping: 17,
	},
};

/**
 * Scale down on tap
 */
export const scaleOnTap: TargetAndTransition = {
	scale: 0.98,
};

/**
 * Lift effect on hover - for cards
 */
export const liftOnHover: TargetAndTransition = {
	y: -4,
	transition: {
		type: "spring",
		stiffness: 300,
		damping: 20,
	},
};

/**
 * Button lift effect
 */
export const buttonLift: TargetAndTransition = {
	y: -2,
	transition: {
		type: "spring",
		stiffness: 400,
		damping: 17,
	},
};

/**
 * Magnetic hover effect - subtle pull towards cursor
 */
export const magneticHover = {
	rest: {
		x: 0,
		y: 0,
	},
	hover: (custom: { x: number; y: number }) => ({
		x: custom.x * 0.3,
		y: custom.y * 0.3,
		transition: {
			type: "spring",
			stiffness: 150,
			damping: 15,
		},
	}),
};

// ═══════════════════════════════════════════════════════════════════════════
// CONTINUOUS ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Continuous floating motion - for decorative elements
 */
export const floatAnimation: Variants = {
	initial: {
		y: 0,
	},
	animate: {
		y: [-10, 10, -10],
		transition: {
			duration: 4,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

/**
 * Gentle floating with rotation
 */
export const floatWithRotation: Variants = {
	initial: {
		y: 0,
		rotate: 0,
	},
	animate: {
		y: [-8, 8, -8],
		rotate: [-3, 3, -3],
		transition: {
			duration: 6,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

/**
 * Zodiac drift animation - slow drifting motion
 */
export const zodiacDrift: Variants = {
	initial: {
		x: 0,
		y: 0,
		rotate: 0,
		opacity: 0.3,
	},
	animate: {
		x: [0, 20, -10, 15, 0],
		y: [0, -15, 10, -5, 0],
		rotate: [0, 5, -3, 4, 0],
		opacity: [0.3, 0.5, 0.25, 0.4, 0.3],
		transition: {
			duration: 20,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

/**
 * Pulsing glow effect
 */
export const glowPulse: Variants = {
	initial: {
		boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)",
	},
	animate: {
		boxShadow: [
			"0 0 20px rgba(212, 175, 55, 0.2)",
			"0 0 40px rgba(212, 175, 55, 0.4)",
			"0 0 20px rgba(212, 175, 55, 0.2)",
		],
		transition: {
			duration: 3,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

/**
 * Sparkle/twinkle animation
 */
export const sparkle: Variants = {
	initial: {
		scale: 1,
		opacity: 0.6,
	},
	animate: {
		scale: [1, 1.2, 1],
		opacity: [0.6, 1, 0.6],
		transition: {
			duration: 3,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

/**
 * Constellation pulse - twinkling stars
 */
export const constellationPulse: Variants = {
	initial: {
		opacity: 0.3,
	},
	animate: {
		opacity: [0.3, 0.6, 0.3],
		transition: {
			duration: 4,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

/**
 * Slow rotation animation
 */
export const slowRotate: Variants = {
	initial: {
		rotate: 0,
	},
	animate: {
		rotate: 360,
		transition: {
			duration: 60,
			ease: "linear",
			repeat: Infinity,
		},
	},
};

/**
 * Reverse slow rotation
 */
export const slowRotateReverse: Variants = {
	initial: {
		rotate: 0,
	},
	animate: {
		rotate: -360,
		transition: {
			duration: 90,
			ease: "linear",
			repeat: Infinity,
		},
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Page fade transition
 */
export const pageTransition: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.4,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

/**
 * Page slide up transition
 */
export const pageSlideUp: Variants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.3,
		},
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// SPECIAL EFFECTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Shimmer effect for loading states
 */
export const shimmer: Variants = {
	initial: {
		backgroundPosition: "-200% 0",
	},
	animate: {
		backgroundPosition: "200% 0",
		transition: {
			duration: 1.5,
			ease: "linear",
			repeat: Infinity,
		},
	},
};

/**
 * Magnolia bloom animation
 */
export const magnoliaBoom: Variants = {
	initial: {
		scale: 1,
		rotate: 0,
		opacity: 0.8,
	},
	animate: {
		scale: [1, 1.05, 1],
		rotate: [0, 3, 0],
		opacity: [0.8, 1, 0.8],
		transition: {
			duration: 8,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

/**
 * Mood ring color shift (for box-shadow)
 */
export const moodRing: Variants = {
	initial: {
		boxShadow: "inset 0 0 40px rgba(163, 177, 138, 0.24)",
	},
	animate: {
		boxShadow: [
			"inset 0 0 40px rgba(163, 177, 138, 0.24)",
			"inset 0 0 40px rgba(212, 175, 55, 0.2)",
			"inset 0 0 40px rgba(86, 51, 78, 0.22)",
			"inset 0 0 40px rgba(10, 25, 47, 0.2)",
			"inset 0 0 40px rgba(163, 177, 138, 0.24)",
		],
		transition: {
			duration: 24,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create a custom fade in up variant with configurable duration and distance
 */
export const createFadeInUp = (duration = 0.6, distance = 30): Variants => ({
	hidden: {
		opacity: 0,
		y: distance,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
});

/**
 * Create a custom stagger container with configurable timing
 */
export const createStaggerContainer = (
	staggerChildren = 0.1,
	delayChildren = 0.1
): Variants => ({
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren,
			delayChildren,
		},
	},
});

/**
 * Create a custom float animation with configurable parameters
 */
export const createFloatAnimation = (
	amplitude = 10,
	duration = 4
): Variants => ({
	initial: {
		y: 0,
	},
	animate: {
		y: [-amplitude, amplitude, -amplitude],
		transition: {
			duration,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "loop",
		},
	},
});

/**
 * Spring transition preset for smooth, natural motion
 */
export const springTransition = {
	type: "spring" as const,
	stiffness: 120,
	damping: 14,
};

/**
 * Smooth transition preset
 */
export const smoothTransition = {
	duration: 0.3,
	ease: [0.25, 0.46, 0.45, 0.94] as const,
};

/**
 * Fast transition preset
 */
export const fastTransition = {
	duration: 0.2,
	ease: "easeInOut" as const,
};

/**
 * Slow transition preset
 */
export const slowTransition = {
	duration: 0.5,
	ease: "easeOut" as const,
};
