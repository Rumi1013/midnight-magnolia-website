"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonLift, scaleOnTap } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
	extends Omit<HTMLMotionProps<"button">, "children" | "className"> {
	/** Button variant style */
	variant?: ButtonVariant;
	/** Button size */
	size?: ButtonSize;
	/** Loading state */
	isLoading?: boolean;
	/** Disabled state */
	disabled?: boolean;
	/** Icon to display on the left */
	leftIcon?: ReactNode;
	/** Icon to display on the right */
	rightIcon?: ReactNode;
	/** Full width button */
	fullWidth?: boolean;
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
  font-accent font-semibold
  rounded-full
  transition-all duration-300
  cursor-pointer
  border-2 border-transparent
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
  touch-target
`;

const variantStyles: Record<ButtonVariant, string> = {
	primary: `
    bg-sage-moss text-midnight-navy
    shadow-sage
    hover:shadow-sage-hover
    focus-visible:ring-sage-moss
    active:shadow-[0_8px_20px_rgba(163,177,138,0.3)]
  `,
	secondary: `
    bg-gradient-to-b from-southern-gold to-[#C49A30]
    text-midnight-navy
    shadow-gold
    hover:shadow-gold-hover hover:from-[#C49A30] hover:to-[#B8860B]
    focus-visible:ring-southern-gold
    active:shadow-[0_8px_25px_rgba(212,175,55,0.3)]
  `,
	outline: `
    bg-transparent
    text-magnolia-white
    border-current
    hover:bg-southern-gold/10 hover:border-southern-gold hover:text-southern-gold
    focus-visible:ring-southern-gold
    active:bg-southern-gold/20
  `,
	ghost: `
    bg-transparent
    text-magnolia-white
    hover:bg-magnolia-white/10 hover:text-sage-moss
    focus-visible:ring-sage-moss
    active:bg-magnolia-white/20
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "px-4 py-2 text-sm gap-1.5",
	md: "px-6 py-3 text-base gap-2",
	lg: "px-8 py-4 text-lg gap-2.5",
};

// ═══════════════════════════════════════════════════════════════════════════
// LOADING SPINNER
// ═══════════════════════════════════════════════════════════════════════════

function LoadingSpinner({ size }: { size: ButtonSize }) {
	const spinnerSizes: Record<ButtonSize, string> = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
	};

	return (
		<svg
			className={cn("animate-spin", spinnerSizes[size])}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true">
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			isLoading = false,
			disabled = false,
			leftIcon,
			rightIcon,
			fullWidth = false,
			children,
			className,
			...props
		},
		ref
	) => {
		const prefersReducedMotion = useReducedMotion();
		const isDisabled = disabled || isLoading;

		// Animation props - disabled for reduced motion preference
		const motionProps = prefersReducedMotion
			? {}
			: {
					whileHover: isDisabled ? {} : buttonLift,
					whileTap: isDisabled ? {} : scaleOnTap,
			  };

		return (
			<motion.button
				ref={ref}
				className={cn(
					baseStyles,
					variantStyles[variant],
					sizeStyles[size],
					fullWidth && "w-full",
					"tracking-wider uppercase",
					className
				)}
				disabled={isDisabled}
				aria-disabled={isDisabled}
				aria-busy={isLoading}
				{...motionProps}
				{...props}>
				{/* Loading spinner or left icon */}
				{isLoading ? (
					<LoadingSpinner size={size} />
				) : leftIcon ? (
					<span
						className="flex-shrink-0"
						aria-hidden="true">
						{leftIcon}
					</span>
				) : null}

				{/* Button text */}
				<span className={isLoading ? "opacity-70" : ""}>{children}</span>

				{/* Right icon */}
				{rightIcon && !isLoading && (
					<span
						className="flex-shrink-0"
						aria-hidden="true">
						{rightIcon}
					</span>
				)}
			</motion.button>
		);
	}
);

Button.displayName = "Button";

export default Button;

// ═══════════════════════════════════════════════════════════════════════════
// ICON BUTTON VARIANT
// ═══════════════════════════════════════════════════════════════════════════

interface IconButtonProps
	extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
	/** Icon to display */
	"icon": ReactNode;
	/** Accessible label for the button */
	"aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ icon, size = "md", className, ...props }, ref) => {
		const iconSizeStyles: Record<ButtonSize, string> = {
			sm: "p-2",
			md: "p-3",
			lg: "p-4",
		};

		return (
			<Button
				ref={ref}
				size={size}
				className={cn(iconSizeStyles[size], "!rounded-full", className)}
				{...props}>
				{icon}
			</Button>
		);
	}
);

IconButton.displayName = "IconButton";

// ═══════════════════════════════════════════════════════════════════════════
// BUTTON GROUP
// ═══════════════════════════════════════════════════════════════════════════

interface ButtonGroupProps {
	children: ReactNode;
	className?: string;
	/** Orientation of the button group */
	orientation?: "horizontal" | "vertical";
	/** Gap between buttons */
	gap?: "sm" | "md" | "lg";
}

export function ButtonGroup({
	children,
	className,
	orientation = "horizontal",
	gap = "md",
}: ButtonGroupProps) {
	const gapStyles: Record<string, string> = {
		sm: "gap-2",
		md: "gap-4",
		lg: "gap-6",
	};

	return (
		<div
			className={cn(
				"flex",
				orientation === "horizontal" ? "flex-row" : "flex-col",
				gapStyles[gap],
				className
			)}
			role="group">
			{children}
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════════════════
// PRESET BUTTONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Primary CTA button with sage green styling
 */
export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
	return (
		<Button
			variant="primary"
			{...props}
		/>
	);
}

/**
 * Secondary CTA button with gold styling
 */
export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
	return (
		<Button
			variant="secondary"
			{...props}
		/>
	);
}

/**
 * Outline button for secondary actions
 */
export function OutlineButton(props: Omit<ButtonProps, "variant">) {
	return (
		<Button
			variant="outline"
			{...props}
		/>
	);
}

/**
 * Ghost button for tertiary actions
 */
export function GhostButton(props: Omit<ButtonProps, "variant">) {
	return (
		<Button
			variant="ghost"
			{...props}
		/>
	);
}
