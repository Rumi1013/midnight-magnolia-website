"use client"

import { motion } from "framer-motion"

const Hero = () => {
  return (
    <section className="bg-magnolia-50 py-20">
      <div className="container mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-playfair text-6xl lg:text-8xl font-bold text-magnolia-white leading-[0.9]"
        >
          Midnight
          <br />
          <span className="text-gold">Magnolia</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-600 mt-4">A place for relaxation and rejuvenation.</p>
        {/* Add more content here, like a booking button or image */}
      </div>
    </section>
  )
}

export default Hero
