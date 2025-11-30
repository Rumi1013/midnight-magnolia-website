"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
	MoonIcon,
	SunIcon,
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button, { IconButton } from "./ui/Button";
import { magneticHover, buttonLift, scaleOnTap } from "@/lib/animations";

export default function Header() {
	const [mounted, setMounted] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [hoveredNav, setHoveredNav] = useState<string | null>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const { theme, setTheme } = useTheme();
	const pathname = usePathname();
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		setMounted(true);

		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useEffect(() => {
		// Close the mobile menu when navigating
		setIsMenuOpen(false);
	}, [pathname]);

	const navigation = [
		{ name: "Shop", href: "/shop" },
		{ name: "Services", href: "/services" },
		{ name: "Our Story", href: "/about" },
		{ name: "Midnight Musings", href: "/blog" },
		{ name: "Patreon", href: "/community" },
		{ name: "Contact", href: "/contact" },
	];

	const isActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	const navItemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.header
			className={`fixed top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${
				scrolled ? "bg-midnight-blue/90 shadow-md" : "bg-midnight-blue/50"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}>
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
				{/* Logo */}
				<div className="flex lg:flex-1">
					<Link
						href="/"
						className="-m-1.5 p-1.5 group">
						<div className="flex items-center gap-3">
							<div className="relative w-10 h-10 overflow-hidden rounded-full">
								<Image
									src="/images/logo-minimal.jpg"
									alt="Midnight Magnolia"
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-300"
								/>
							</div>
							<div>
								<div className="font-playfair text-xl font-bold text-magnolia-white">
									Midnight Magnolia
								</div>
								<div className="font-montserrat text-xs text-sage-green tracking-wider">
									DIGITAL SANCTUARY
								</div>
							</div>
						</div>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex lg:gap-x-8">
					{navigation.map((item) => (
						<motion.div
							key={item.name}
							className="relative px-2 py-1"
							onMouseEnter={() => setHoveredNav(item.href)}
							onMouseLeave={() => setHoveredNav(null)}
							whileHover={
								prefersReducedMotion
									? {}
									: magneticHover.hover({
										x: (mousePosition.x - window.innerWidth / 2) * 0.02,
										y: (mousePosition.y - window.innerHeight / 2) * 0.02,
									})
							}
							transition={{ type: "spring", stiffness: 200, damping: 20 }}>
							<Link
								href={item.href}
								className={`font-lora text-sm transition-all duration-300 relative z-10 ${
									isActive(item.href)
										? "text-gold font-semibold"
										: "text-magnolia-white hover:text-sage-green"
								}`}>
								{item.name}
							</Link>
							<AnimatePresence>
								{(hoveredNav === item.href || isActive(item.href)) && (
									<motion.span
										layoutId="nav-underline"
										className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
											isActive(item.href) ? "bg-gold" : "bg-sage-green"
										}`}
										style={{
											boxShadow: isActive(item.href)
												? "0 0 8px rgba(212, 175, 55, 0.5)"
												: "none",
										}}
										initial={{ opacity: 0, scaleX: 0 }}
										animate={{ opacity: 1, scaleX: 1 }}
										exit={{ opacity: 0, scaleX: 0 }}
										transition={{ duration: 0.25, ease: "easeOut" }}
									/>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>

				{/* Right side actions */}
				<div className="flex flex-1 justify-end items-center gap-4">
					{/* Theme toggle */}
					{mounted && (
						<IconButton
							icon={theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							variant="ghost"
							aria-label="Toggle theme"
							className="bg-magnolia-white/10 hover:bg-sage-green/20 hover:text-sage-green"
						/>
					)}

					{/* CTA Button */}
					<Button
						variant="primary"
						size="sm"
						className="hidden sm:block"
						whileHover={prefersReducedMotion ? {} : buttonLift}
						whileTap={prefersReducedMotion ? {} : scaleOnTap}>
						Enter Garden
					</Button>

					{/* Mobile menu button */}
					<IconButton
						icon={isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						variant="ghost"
						aria-label="Toggle menu"
						className="lg:hidden bg-magnolia-white/10 hover:bg-sage-green/20 hover:text-sage-green"
					/>
				</div>
			</nav>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="lg:hidden fixed inset-0 z-40 bg-midnight-blue/95 backdrop-blur-md">
						<motion.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
							transition={{ type: "spring", stiffness: 120, damping: 14 }}
							className="mt-20 border-t border-magnolia-white/10">
							<motion.div
								className="px-6 py-6 space-y-4"
								initial="hidden"
								animate="visible"
								exit="hidden"
								variants={{
									hidden: {
										transition: { staggerChildren: 0.05, staggerDirection: -1 },
									},
									visible: { transition: { staggerChildren: 0.07 } },
								}}>
								{navigation.map((item) => (
									<motion.div
										key={item.name}
										variants={navItemVariants}>
										<Link
											href={item.href}
											className="block font-lora text-lg text-magnolia-white hover:text-sage-green transition-colors duration-300 py-2">
											{item.name}
										</Link>
									</motion.div>
								))}
								<motion.div variants={navItemVariants}>
									<Button
										variant="primary"
										size="md"
										fullWidth
										className="mt-4 shadow-lg shadow-sage-green/20"
										whileHover={prefersReducedMotion ? {} : buttonLift}
										whileTap={prefersReducedMotion ? {} : scaleOnTap}>
										Enter Garden
									</Button>
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
