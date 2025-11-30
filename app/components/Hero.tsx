"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-midnight-blue overflow-hidden">
      {/* Floating Moon - Top Right */}
      <motion.div
        className="absolute top-24 right-12 text-4xl z-10"
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌙
      </motion.div>

      {/* Floating Moon - Top Right Corner */}
      <motion.div
        className="absolute top-16 right-4 text-3xl opacity-60 z-10"
        animate={{
          y: [-5, 5, -5],
          x: [-3, 3, -3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🌙
      </motion.div>

      {/* Floating Feather/Leaf */}
      <motion.div
        className="absolute top-1/3 left-1/2 text-2xl opacity-40 z-10"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [-15, 15, -15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🪶
      </motion.div>

      {/* Sparkles */}
      <motion.div
        className="absolute bottom-1/3 left-1/2 text-2xl z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✨
      </motion.div>

      {/* Botanical element - bottom right */}
      <motion.div
        className="absolute bottom-32 right-16 text-3xl z-10"
        animate={{
          rotate: [-5, 5, -5],
          y: [-5, 5, -5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌿
      </motion.div>

      {/* Small decorative dots */}
      <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-sage-green/40 rounded-full" />
      <div className="absolute bottom-36 left-1/3 ml-20 w-2 h-2 bg-sage-green/30 rounded-full" />
      <div className="absolute bottom-32 right-1/3 w-2 h-2 bg-sage-green/40 rounded-full" />

      <div className="container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left z-20"
          >
            {/* Small Logo Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-sage-green/30 shadow-lg">
                <Image
                  src="/images/logo-main.jpg"
                  alt="Midnight Magnolia"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Welcome Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sage-green font-montserrat text-sm tracking-[0.25em] uppercase font-medium"
            >
              Rooted in Mystery. Blooming in Truth.
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-playfair text-6xl lg:text-8xl font-normal text-magnolia-white leading-[1.1] italic"
            >
              Midnight
              <br />
              <span
                className="text-gold not-italic font-bold"
                style={{ textShadow: '0 0 60px rgba(212, 175, 55, 0.4)' }}
              >
                Magnolia
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-lora text-lg lg:text-xl text-magnolia-white/80 leading-relaxed max-w-xl"
            >
              A Southern Gothic digital sanctuary where art, ancestry, automation, and healing coexist — helping you earn with ease, create with freedom, and live with intention.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <button
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-base"
                style={{ boxShadow: '0 0 30px rgba(163, 177, 138, 0.25)' }}
              >
                Shop Sacred Tools
              </button>
              <button className="border-2 border-magnolia-white/30 hover:border-gold/60 text-magnolia-white hover:text-gold font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base hover:bg-gold/5">
                Start Your Journey
              </button>
            </motion.div>
          </motion.div>

          {/* Right content - Rotating Logo Circle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center z-10"
          >
            <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">

              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-sage-green/20"
              />

              {/* Middle static ring with dots */}
              <div className="absolute inset-8 rounded-full border border-sage-green/30">
                {/* Orbit dots */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-sage-green/50 rounded-full" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-sage-green/50 rounded-full" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-sage-green/50 rounded-full" />
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-sage-green/50 rounded-full" />
              </div>

              {/* Inner glow ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute inset-20 rounded-full border border-gold/20"
                style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.1)' }}
              />

              {/* Center logo container */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="relative w-48 h-48 lg:w-56 lg:h-56"
              >
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-midnight-blue via-sage-green/10 to-midnight-blue"
                  style={{ boxShadow: '0 0 60px rgba(163, 177, 138, 0.2), inset 0 0 40px rgba(0,0,0,0.3)' }}
                />
                <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-sage-green/30">
                  <Image
                    src="/images/logo-circular.jpg"
                    alt="Midnight Magnolia Sacred Symbol"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Floating sparkle near logo */}
              <motion.div
                className="absolute bottom-20 left-20 text-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line with dots */}
      <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-4 opacity-30">
        <div className="w-2 h-2 bg-sage-green rounded-full" />
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-sage-green to-transparent" />
        <div className="w-2 h-2 bg-sage-green rounded-full" />
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-sage-green to-transparent" />
        <div className="w-2 h-2 bg-sage-green rounded-full" />
      </div>
    </section>
  )
}
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 1.2 }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
					className="text-magnolia-white/60 text-center">
					<p className="font-montserrat text-sm mb-2">Begin your journey</p>
					<div className="w-6 h-10 border-2 border-magnolia-white/30 rounded-full mx-auto flex justify-center">
						<div className="w-1 h-3 bg-magnolia-white/60 rounded-full mt-2" />
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
