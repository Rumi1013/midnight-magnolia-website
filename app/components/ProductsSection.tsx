"use client"

import { useState, useEffect } from "react"

export default function ProductsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const featuredProducts = [
    {
      title: "The Magnolia Reset",
      subtitle: "90-Day Healing Journal",
      description:
        "A gentle companion for your sobriety and healing journey, with daily prompts that honor your pace and celebrate your progress.",
      price: "$47",
      digitalPrice: "$29",
      image: "📖",
      category: "Healing Journals",
      features: ["Daily affirmations", "Sobriety tracker", "Gentle accountability", "Progress celebration"],
      available: ["Digital Download", "KDP Paperback", "Hardcover Edition"],
      comingSoon: true,
    },
    {
      title: "Midnight Messages",
      subtitle: "Tarot & Affirmation Deck",
      description:
        "78 beautiful cards featuring Black icons with Southern Gothic elegance, ancestral wisdom, and empowering affirmations.",
      price: "$33",
      digitalPrice: "$19",
      image: "🔮",
      category: "Tarot & Divination",
      features: ["78 unique cards", "Digital guidebook", "Monthly spreads", "Ancestor wisdom"],
      available: ["Digital Deck", "Print-on-Demand", "Deluxe Physical Set"],
      comingSoon: true,
    },
    {
      title: "Sacred Productivity",
      subtitle: "ADHD-Friendly Planner",
      description:
        "Planning tools that work with your neurodivergent brain, not against it. Gentle structure for chaotic minds with spoon theory integration.",
      price: "$29",
      digitalPrice: "$19",
      image: "📝",
      category: "Digital Planners",
      features: ["Flexible templates", "Energy tracking", "Spoon theory integration", "Executive function support"],
      available: ["Digital Templates", "Printable PDF", "KDP Spiral Bound"],
      comingSoon: true,
    },
  ]

  if (!mounted) {
    return (
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#0A192F" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", color: "#FAF3E0" }}>
          <p>Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="products" style={{ padding: "5rem 1.5rem", backgroundColor: "#0A192F" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#A3B18A",
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Sacred Tools for Transformation
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: "bold",
              color: "#FAF3E0",
              marginBottom: "1.5rem",
              fontFamily: "serif",
            }}
          >
            Featured Products
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "rgba(250, 243, 224, 0.8)",
              maxWidth: "768px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Carefully crafted tools to support your healing journey. Each product is designed with love, intention, and
            deep respect for your unique path.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {featuredProducts.map((product, index) => (
            <div
              key={product.title}
              style={{
                backgroundColor: "#F5EDD6",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)"
                e.currentTarget.style.transform = "scale(1.02)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              {/* Coming Soon Banner */}
              {product.comingSoon && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "linear-gradient(45deg, #D4AF37, #A3B18A)",
                    color: "#0A192F",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    padding: "0.5rem 1.5rem",
                    transform: "rotate(12deg)",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    zIndex: 10,
                  }}
                >
                  COMING SOON
                </div>
              )}

              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem", transition: "transform 0.3s ease" }}>
                  {product.image}
                </div>
                <div
                  style={{
                    backgroundColor: "#0A192F",
                    color: "#FAF3E0",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    display: "inline-block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {product.category}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#0A192F",
                    marginBottom: "0.5rem",
                    fontFamily: "serif",
                  }}
                >
                  {product.title}
                </h3>
                <p
                  style={{
                    color: "#0A192F",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.subtitle}
                </p>
              </div>

              <p style={{ color: "#374151", lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1 }}>
                {product.description}
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#0A192F", marginBottom: "0.75rem" }}>
                  Available Formats:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {product.available.map((format, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#0A192F",
                        color: "#FAF3E0",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0" }}>
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "#6B7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#A3B18A",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "auto" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <div style={{ color: "#D4AF37", fontSize: "1.5rem", fontWeight: "bold", fontFamily: "serif" }}>
                      {product.digitalPrice}
                    </div>
                    <div style={{ color: "#6B7280", fontSize: "0.875rem" }}>Digital</div>
                  </div>
                  <div>
                    <div style={{ color: "#0A192F", fontSize: "1.5rem", fontWeight: "bold", fontFamily: "serif" }}>
                      {product.price}
                    </div>
                    <div style={{ color: "#6B7280", fontSize: "0.875rem" }}>Print</div>
                  </div>
                </div>
                <button
                  style={{
                    width: "100%",
                    fontWeight: "600",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "9999px",
                    border: "none",
                    transition: "all 0.3s ease",
                    minHeight: "44px",
                    cursor: product.comingSoon ? "not-allowed" : "pointer",
                    backgroundColor: product.comingSoon ? "#D4B99F" : "#A3B18A",
                    color: product.comingSoon ? "#6B7280" : "#0A192F",
                  }}
                  disabled={product.comingSoon}
                  onMouseOver={(e) => {
                    if (!product.comingSoon) {
                      e.currentTarget.style.backgroundColor = "rgba(163, 177, 138, 0.9)"
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!product.comingSoon) {
                      e.currentTarget.style.backgroundColor = "#A3B18A"
                      e.currentTarget.style.boxShadow = "none"
                    }
                  }}
                >
                  {product.comingSoon ? "Coming Soon" : "Add to Altar"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <button
            style={{
              border: "2px solid #A3B18A",
              backgroundColor: "transparent",
              color: "#A3B18A",
              fontWeight: "600",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              transition: "all 0.3s ease",
              minHeight: "44px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#A3B18A"
              e.currentTarget.style.color = "#0A192F"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "#A3B18A"
            }}
          >
            Explore All Sacred Tools
          </button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ProductsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const featuredProducts = [
    {
      title: "The Magnolia Reset",
      subtitle: "90-Day Healing Journal",
      description:
        "A gentle companion for your sobriety and healing journey, with daily prompts that honor your pace and celebrate your progress.",
      price: "$47",
      digitalPrice: "$29",
      image: "📖",
      category: "Healing Journals",
      features: ["Daily affirmations", "Sobriety tracker", "Gentle accountability", "Progress celebration"],
      available: ["Digital Download", "KDP Paperback", "Hardcover Edition"],
      comingSoon: true,
    },
    {
      title: "Midnight Messages",
      subtitle: "Tarot & Affirmation Deck",
      description:
        "78 beautiful cards featuring Black icons with Southern Gothic elegance, ancestral wisdom, and empowering affirmations.",
      price: "$33",
      digitalPrice: "$19",
      image: "🔮",
      category: "Tarot & Divination",
      features: ["78 unique cards", "Digital guidebook", "Monthly spreads", "Ancestor wisdom"],
      available: ["Digital Deck", "Print-on-Demand", "Deluxe Physical Set"],
      comingSoon: true,
    },
    {
      title: "Sacred Productivity",
      subtitle: "ADHD-Friendly Planner",
      description:
        "Planning tools that work with your neurodivergent brain, not against it. Gentle structure for chaotic minds with spoon theory integration.",
      price: "$29",
      digitalPrice: "$19",
      image: "📝",
      category: "Digital Planners",
      features: ["Flexible templates", "Energy tracking", "Spoon theory integration", "Executive function support"],
      available: ["Digital Templates", "Printable PDF", "KDP Spiral Bound"],
      comingSoon: true,
    },
  ]

  return (
    <section ref={ref} id="products" className="py-20 bg-midnight-blue">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sage-green font-montserrat text-sm tracking-wider uppercase mb-4">
            Sacred Tools for Transformation
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">Featured Products</h2>
          <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
            Carefully crafted tools to support your healing journey. Each product is designed with love, intention, and
            deep respect for your unique path.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#F5EDD6] rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group h-full flex flex-col relative overflow-hidden"
            >
              {/* Coming Soon Banner */}
              {product.comingSoon && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gold to-sage-green text-midnight-blue font-montserrat font-bold text-xs px-6 py-2 transform rotate-12 shadow-lg z-10">
                  COMING SOON
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="bg-midnight-blue text-magnolia-white font-montserrat text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full inline-block mb-3">
                  {product.category}
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">{product.title}</h3>
                <p className="font-montserrat text-midnight-blue font-semibold text-sm tracking-wide uppercase">
                  {product.subtitle}
                </p>
              </div>

              <p className="font-lora text-gray-800 leading-relaxed mb-6 flex-grow">{product.description}</p>

              <div className="mb-6">
                <h4 className="font-montserrat text-sm font-semibold text-midnight-blue mb-3">Available Formats:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.available.map((format, idx) => (
                    <span
                      key={idx}
                      className="bg-midnight-blue text-magnolia-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-2 mb-8">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-lora text-gray-700 text-sm">
                    <div className="w-2 h-2 bg-sage-green rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="space-y-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gold font-playfair text-2xl font-bold">{product.digitalPrice}</div>
                    <div className="text-gray-600 font-lora text-sm">Digital</div>
                  </div>
                  <div>
                    <div className="text-midnight-blue font-playfair text-2xl font-bold">{product.price}</div>
                    <div className="text-gray-600 font-lora text-sm">Print</div>
                  </div>
                </div>
                <button
                  className={`w-full font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 min-h-[44px] ${
                    product.comingSoon
                      ? "bg-warm-gray text-gray-600 cursor-not-allowed"
                      : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg"
                  }`}
                  disabled={product.comingSoon}
                >
                  {product.comingSoon ? "Coming Soon" : "Add to Altar"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="border-2 border-sage-green hover:bg-sage-green text-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 min-h-[44px]">
            Explore All Sacred Tools
          </button>
        </motion.div>
      </div>
    </section>
  )
}
