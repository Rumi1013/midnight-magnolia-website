"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const zodiacSigns = [
	{ symbol: "♈", name: "Aries", x: 10, y: 15 },
	{ symbol: "♉", name: "Taurus", x: 85, y: 25 },
	{ symbol: "♊", name: "Gemini", x: 20, y: 60 },
	{ symbol: "♋", name: "Cancer", x: 75, y: 70 },
	{ symbol: "♌", name: "Leo", x: 5, y: 85 },
	{ symbol: "♍", name: "Virgo", x: 90, y: 80 },
	{ symbol: "♎", name: "Libra", x: 15, y: 40 },
	{ symbol: "♏", name: "Scorpio", x: 80, y: 45 },
	{ symbol: "♐", name: "Sagittarius", x: 25, y: 20 },
	{ symbol: "♑", name: "Capricorn", x: 70, y: 10 },
	{ symbol: "♒", name: "Aquarius", x: 45, y: 75 },
	{ symbol: "♓", name: "Pisces", x: 60, y: 35 },
];

function FloatingZodiac() {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		function updateSize() {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		}

		window.addEventListener("resize", updateSize);
		updateSize();

		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return (
		<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
			{/* Zodiac constellation background */}
			{zodiacSigns.map((sign, index) => (
				<motion.div
					key={sign.name}
					className="absolute font-playfair pointer-events-none select-none"
					style={{
						left: `${sign.x}%`,
						top: `${sign.y}%`,
						textShadow:
							"0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(163, 177, 138, 0.2)",
					}}
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{
						x: [0, 25, -15, 10, 0],
						y: [0, -20, 15, -10, 0],
						rotate: [0, 8, -8, 4, 0],
						opacity: [0.15, 0.4, 0.25, 0.35, 0.15],
						scale: [1, 1.1, 0.95, 1.05, 1],
					}}
					transition={{
						duration: 20 + index * 3,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
						delay: index * 0.8,
					}}>
					<span
						className={`text-3xl md:text-4xl ${
							index % 3 === 0
								? "text-gold/40"
								: index % 3 === 1
								? "text-sage-green/50"
								: "text-magnolia-white/30"
						}`}>
						{sign.symbol}
					</span>
				</motion.div>
			))}

			{/* Connecting constellation lines */}
			<svg className="absolute inset-0 w-full h-full opacity-10">
				<defs>
					<linearGradient
						id="zodiacGradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%">
						<stop
							offset="0%"
							stopColor="#D4AF37"
							stopOpacity="0.3"
						/>
						<stop
							offset="50%"
							stopColor="#A3B18A"
							stopOpacity="0.2"
						/>
						<stop
							offset="100%"
							stopColor="#FAF3E0"
							stopOpacity="0.1"
						/>
					</linearGradient>
				</defs>
			</svg>
		</div>
	);
}

export default FloatingZodiac;
