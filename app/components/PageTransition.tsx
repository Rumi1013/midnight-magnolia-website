"use client";

import { ReactNode, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { pageTransition, pageSlideUp } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type TransitionType =
	| "fade"
	| "slideUp"
	| "slideLeft"
	| "slideRight"
	| "scale"
	| "none";

interface PageTransitionProps {
	/** Children to render */
	children: ReactNode;
	/** Transition type */
	type?: TransitionType;
	/** Custom transition variants */
	variants?: any;
	/** Transition duration in seconds */
	duration?: number;
	/** Whether to show loading state */
	showLoading?: boolean;
	/** Loading component */
	loadingComponent?: ReactNode;
	/** Additional class names */
	className?: string;
}

interface PageTransitionContextType {
	/** Current transition state */
	isTransitioning: boolean;
	/** Start a transition */
	startTransition: () => void;
	/** End a transition */
	endTransition: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// TRANSITION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

const transitionVariants = {
	fade: pageTransition,
	slideUp: pageSlideUp,
	slideLeft: {
		initial: { opacity: 0, x: 50 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -50 },
	},
	slideRight: {
		initial: { opacity: 0, x: -50 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 50 },
	},
	scale: {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 1.05 },
	},
	none: {
		initial: { opacity: 1 },
		animate: { opacity: 1 },
		exit: { opacity: 1 },
	},
};

// ═══════════════════════════════════════════════════════════════════════════
// LOADING COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function DefaultLoadingSpinner() {
	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-navy"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<div className="flex flex-col items-center gap-4">
				{/* Magnolia flower animation */}
				<motion.div
					className="relative w-16 h-16"
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
					<div className="absolute inset-0 border-4 border-sage-moss/20 rounded-full" />
					<div className="absolute inset-0 border-4 border-transparent border-t-sage-moss rounded-full" />
				</motion.div>

				{/* Loading text */}
				<motion.p
					className="text-magnolia-white font-merriweather text-sm"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}>
					Entering the garden...
				</motion.p>
			</div>
		</motion.div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE TRANSITION PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

import { createContext } from "react";

const PageTransitionContext = createContext<PageTransitionContextType | null>(
	null
);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
	// This would be used for more complex transition management
	// For now, we'll keep it simple
	return <>{children}</>;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE TRANSITION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function PageTransition({
	children,
	type = "fade",
	variants: customVariants,
	duration = 0.4,
	showLoading = false,
	loadingComponent,
	className,
}: PageTransitionProps) {
	const pathname = usePathname();
	const prefersReducedMotion = useReducedMotion();

	// Use custom variants or get from predefined types
	const variants = customVariants || transitionVariants[type];

	// Modify variants with custom duration
	const modifiedVariants = {
		initial: variants.initial,
		animate: {
			...variants.animate,
			transition: {
				...variants.animate?.transition,
				duration,
			},
		},
		exit: {
			...variants.exit,
			transition: {
				...variants.exit?.transition,
				duration,
			},
		},
	};

	// For reduced motion, use simple fade
	const finalVariants = prefersReducedMotion
		? transitionVariants.none
		: modifiedVariants;

	return (
		<>
			{/* Loading overlay */}
			<AnimatePresence>
				{showLoading && (loadingComponent || <DefaultLoadingSpinner />)}
			</AnimatePresence>

			{/* Page content */}
			<motion.div
				key={pathname}
				className={className}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={finalVariants}>
				{children}
			</motion.div>
		</>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// ROUTE-BASED TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════════

interface RouteTransitionProps extends Omit<PageTransitionProps, "type"> {
	/** Route-specific transition configurations */
	routeConfig?: Record<string, TransitionType>;
	/** Default transition type */
	defaultType?: TransitionType;
}

export function RouteTransition({
	children,
	routeConfig = {},
	defaultType = "fade",
	...props
}: RouteTransitionProps) {
	const pathname = usePathname();

	// Determine transition type based on current route
	const transitionType = routeConfig[pathname] || defaultType;

	return (
		<PageTransition
			type={transitionType}
			{...props}>
			{children}
		</PageTransition>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT TRANSITION WRAPPER
// ═══════════════════════════════════════════════════════════════════════════

interface LayoutTransitionProps {
	children: ReactNode;
	/** Transition type for layout changes */
	type?: TransitionType;
	/** Whether to animate layout changes */
	animateLayout?: boolean;
}

export function LayoutTransition({
	children,
	type = "fade",
	animateLayout = true,
}: LayoutTransitionProps) {
	const prefersReducedMotion = useReducedMotion();

	if (!animateLayout || prefersReducedMotion) {
		return <>{children}</>;
	}

	const variants = transitionVariants[type];

	return (
		<motion.div
			layout
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
			transition={{ duration: 0.3 }}>
			{children}
		</motion.div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL TRANSITION
// ═══════════════════════════════════════════════════════════════════════════

interface ModalTransitionProps {
	/** Whether the modal is open */
	isOpen: boolean;
	/** Modal content */
	children: ReactNode;
	/** Close handler */
	onClose?: () => void;
	/** Modal variant */
	variant?: "center" | "bottom" | "top" | "left" | "right";
}

export function ModalTransition({
	isOpen,
	children,
	onClose,
	variant = "center",
}: ModalTransitionProps) {
	const prefersReducedMotion = useReducedMotion();

	const modalVariants = {
		center: {
			initial: { opacity: 0, scale: 0.95 },
			animate: { opacity: 1, scale: 1 },
			exit: { opacity: 0, scale: 0.95 },
		},
		bottom: {
			initial: { opacity: 0, y: 50 },
			animate: { opacity: 1, y: 0 },
			exit: { opacity: 0, y: 50 },
		},
		top: {
			initial: { opacity: 0, y: -50 },
			animate: { opacity: 1, y: 0 },
			exit: { opacity: 0, y: -50 },
		},
		left: {
			initial: { opacity: 0, x: -50 },
			animate: { opacity: 1, x: 0 },
			exit: { opacity: 0, x: -50 },
		},
		right: {
			initial: { opacity: 0, x: 50 },
			animate: { opacity: 1, x: 0 },
			exit: { opacity: 0, x: 50 },
		},
	};

	const backdropVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const variants = prefersReducedMotion
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
		  }
		: modalVariants[variant];

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 z-40 bg-midnight-navy/50 backdrop-blur-sm"
						variants={backdropVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center p-4"
						variants={variants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ type: "spring", stiffness: 300, damping: 30 }}>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATION TRANSITION
// ═══════════════════════════════════════════════════════════════════════════

interface NotificationTransitionProps {
	/** Whether to show the notification */
	show: boolean;
	/** Notification content */
	children: ReactNode;
	/** Position of the notification */
	position?:
		| "top"
		| "bottom"
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right";
	/** Auto-hide duration in milliseconds */
	autoHideDuration?: number;
	/** Close handler */
	onClose?: () => void;
}

export function NotificationTransition({
	show,
	children,
	position = "top",
	autoHideDuration,
	onClose,
}: NotificationTransitionProps) {
	const prefersReducedMotion = useReducedMotion();

	const positionClasses = {
		"top": "top-4 left-1/2 transform -translate-x-1/2",
		"bottom": "bottom-4 left-1/2 transform -translate-x-1/2",
		"top-left": "top-4 left-4",
		"top-right": "top-4 right-4",
		"bottom-left": "bottom-4 left-4",
		"bottom-right": "bottom-4 right-4",
	};

	const slideVariants = {
		initial: { opacity: 0, y: position.includes("top") ? -20 : 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: position.includes("top") ? -20 : 20 },
	};

	const variants = prefersReducedMotion
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
		  }
		: slideVariants;

	useEffect(() => {
		if (show && autoHideDuration && onClose) {
			const timer = setTimeout(onClose, autoHideDuration);
			return () => clearTimeout(timer);
		}
	}, [show, autoHideDuration, onClose]);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className={`fixed z-50 ${positionClasses[position]}`}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ type: "spring", stiffness: 400, damping: 25 }}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK FOR CUSTOM TRANSITIONS
// ═══════════════════════════════════════════════════════════════════════════

export function usePageTransition() {
	const pathname = usePathname();

	return {
		pathname,
		// You can add more transition utilities here
	};
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create a custom transition variant
 */
export function createTransitionVariant(
	initial: any,
	animate: any,
	exit: any,
	duration = 0.4
) {
	return {
		initial,
		animate: {
			...animate,
			transition: { duration },
		},
		exit: {
			...exit,
			transition: { duration },
		},
	};
}

/**
 * Predefined transition presets for common use cases
 */
export const transitionPresets = {
	// Page transitions
	pageFade: transitionVariants.fade,
	pageSlide: transitionVariants.slideUp,

	// Modal transitions
	modalCenter: {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	},
	modalBottom: {
		initial: { opacity: 0, y: 50 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
	},

	// Element transitions
	elementFade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	elementSlide: {
		initial: { opacity: 0, x: -20 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 20 },
	},
};
