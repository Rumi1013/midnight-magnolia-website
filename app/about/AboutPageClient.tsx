"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import FloatingMoon from "../../components/FloatingMoon"
import FloatingZodiac from "../../components/FloatingZodiac"

export default function AboutPageClient() {
  return (
    <>
      <FloatingMoon />
      <FloatingZodiac fullPage />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-teal">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6"
              >
                Our Sacred Story
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed"
              >
                Born from transformation, rooted in resilience, and dedicated to creating digital sanctuaries where
                healing and prosperity intertwine like Spanish moss on ancient magnolia trees.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-20 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <p className="bg-sage-green text-magnolia-white font-montserrat text-sm tracking-wider uppercase px-4 py-2 rounded-full inline-block font-bold mb-6">
                    Founder & Visionary
                  </p>
                  <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
                    Latisha Vincent-Waters
                  </h2>
                  <p className="font-lora text-lg text-gray-800 leading-relaxed mb-6">
                    Midnight Magnolia was born during my own season of transformation—a time when I needed to create not
                    just a business, but a sanctuary. As a Black woman navigating chronic illness, career transition,
                    and the call to build something meaningful, I found myself at the intersection of necessity and
                    possibility.
                  </p>
                  <p className="font-lora text-lg text-gray-800 leading-relaxed mb-6">
                    With a background in data analytics and newly earned HTML/CSS certification, I began weaving
                    together my technical skills with my deep love for Southern heritage, spiritual practice, and the
                    healing arts. What emerged was more than a brand—it became a digital altar where technology serves
                    transformation.
                  </p>
                  <p className="font-lora text-lg text-gray-800 leading-relaxed mb-6">
                    Every product, every service, every word we share is infused with the understanding that healing is
                    not linear, that rest is revolutionary, and that your pace is sacred. We honor the wisdom of our
                    ancestors while embracing the tools of tomorrow, creating spaces where ancient knowing meets modern
                    innovation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-midnight-blue/5 rounded-2xl">
                    <div className="text-3xl mb-2">🎓</div>
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2">Certified</h3>
                    <p className="font-lora text-gray-700 text-sm">HTML/CSS Development</p>
                  </div>
                  <div className="text-center p-6 bg-sage-green/10 rounded-2xl">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2">Analytics</h3>
                    <p className="font-lora text-gray-700 text-sm">Data-driven insights</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                  <Image
                    src="/founder-portrait.png"
                    alt="Latisha Vincent-Waters, Founder of Midnight Magnolia"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold rounded-full flex items-center justify-center">
                  <div className="text-midnight-blue text-2xl">🌙</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
                  The Birth of Midnight Magnolia
                </h2>
                <p className="font-lora text-xl text-gray-800 leading-relaxed">
                  Every sacred beginning has its moment of recognition—ours came in the quiet hours before dawn.
                </p>
              </motion.div>

              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">The Midnight Hour</h3>
                  <p className="font-lora text-gray-800 leading-relaxed mb-4">
                    It was during one of those sleepless nights—the kind that come with chronic illness and racing
                    thoughts— that the vision crystallized. I was sitting at my kitchen table, surrounded by notebooks
                    filled with business ideas, healing modalities, and dreams that felt too big for my current reality.
                  </p>
                  <p className="font-lora text-gray-800 leading-relaxed">
                    The magnolia tree outside my window, illuminated by streetlight, seemed to whisper ancient secrets.
                    In that moment, I understood: this wasn't just about building a business. It was about creating a
                    digital sanctuary where others like me—the sensitive souls, the chronic illness warriors, the
                    neurodivergent dreamers—could find tools that actually worked with their unique rhythms.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Southern Gothic Grace</h3>
                  <p className="font-lora text-gray-800 leading-relaxed mb-4">
                    Growing up in the South, I was raised on stories that found beauty in brokenness, strength in
                    vulnerability, and magic in the mundane. Southern Gothic literature taught me that our shadows
                    aren't something to hide from—they're where our deepest wisdom lives.
                  </p>
                  <p className="font-lora text-gray-800 leading-relaxed">
                    This aesthetic became the foundation of everything we create: acknowledging the darkness while
                    cultivating the light, honoring our wounds while celebrating our resilience, and finding the sacred
                    in the everyday struggles of being human.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Technology as Medicine</h3>
                  <p className="font-lora text-gray-800 leading-relaxed mb-4">
                    My background in data analytics showed me the power of systems and patterns, while my journey with
                    chronic illness taught me the importance of gentle, sustainable approaches. When I began learning
                    web development, I realized I could merge these worlds.
                  </p>
                  <p className="font-lora text-gray-800 leading-relaxed">
                    Every line of code became an act of care. Every design choice was made with accessibility in mind.
                    Every product was tested not just for functionality, but for its ability to support someone on their
                    worst day as well as their best.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-midnight-blue">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">
                Our Sacred Mission
              </h2>
              <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
                To create digital sanctuaries where Southern Gothic grace meets ancestral wisdom, supporting souls on
                their journey toward healing, creativity, and sustainable prosperity.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌱",
                  title: "Trauma-Informed Design",
                  description:
                    "Every tool and experience is crafted with gentleness, understanding that healing happens at your own sacred pace. We design for nervous systems, not just user interfaces.",
                },
                {
                  icon: "🌸",
                  title: "Ancestral Wisdom",
                  description:
                    "Honoring the strength and knowledge passed down through generations of resilient women who paved our paths. We blend ancient practices with modern tools.",
                },
                {
                  icon: "✨",
                  title: "Neurodivergent Friendly",
                  description:
                    "Celebrating different minds with tools that work with your brain's unique patterns, not against them. ADHD, autism, and chronic illness are not obstacles—they're superpowers.",
                },
                {
                  icon: "🕊️",
                  title: "Inclusive Sanctuary",
                  description:
                    "A safe space for all identities, especially centering Black women and marginalized voices in wellness. Your healing matters, and you belong here.",
                },
                {
                  icon: "🔮",
                  title: "Digital Innovation",
                  description:
                    "Blending ancient wisdom with modern technology to create accessible, beautiful healing tools that honor both tradition and progress.",
                },
                {
                  icon: "⚖️",
                  title: "Justice & Healing",
                  description:
                    "Understanding that true wellness includes systemic change and community support for all. Personal healing and collective liberation are intertwined.",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-magnolia-white/20 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4">{value.title}</h3>
                  <p className="font-lora text-magnolia-white/80 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
                Our Healing Circle
              </h2>
              <p className="font-lora text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
                While Midnight Magnolia began as a solo journey, it has grown into a collaborative effort with
                incredible souls who share our vision of gentle, accessible healing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Amara Johnson",
                  role: "Trauma-Informed Wellness Advisor",
                  bio: "Licensed therapist specializing in EMDR and somatic healing for BIPOC communities.",
                  image: "/placeholder.svg?height=300&width=300&text=Dr.+Amara",
                },
                {
                  name: "Marcus Chen",
                  role: "Accessibility Consultant",
                  bio: "UX designer and disability advocate ensuring our digital spaces welcome everyone.",
                  image: "/placeholder.svg?height=300&width=300&text=Marcus",
                },
                {
                  name: "Sage Williams",
                  role: "Community Manager",
                  bio: "Chronic illness warrior and community builder fostering connection and support.",
                  image: "/placeholder.svg?height=300&width=300&text=Sage",
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-sm text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">{member.name}</h3>
                  <p className="font-montserrat text-sage-green font-semibold text-sm mb-3">{member.role}</p>
                  <p className="font-lora text-gray-700 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
                  Rumi-Nations LLC
                </h2>
                <p className="font-lora text-xl text-gray-800 leading-relaxed">
                  The parent company behind Midnight Magnolia, established to create sustainable, healing-centered
                  businesses that serve our community with integrity and love.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue">Our Commitment</h3>
                  <ul className="space-y-4 font-lora text-gray-800">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Ethical business practices rooted in community care and mutual aid</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Sustainable income models that honor rest, boundaries, and life balance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Technology solutions that center accessibility, inclusion, and trauma-informed design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Creative expression as a pathway to healing, empowerment, and prosperity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-sage-green rounded-full mt-3 flex-shrink-0" />
                      <span>Transparent operations with regular community feedback and accountability</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue">Contact Information</h3>
                  <div className="space-y-4 font-lora text-gray-800">
                    <div>
                      <p className="font-semibold">Rumi-Nations LLC</p>
                      <p>10070 Dorchester Rd, #51599</p>
                      <p>Summerville, SC 29485</p>
                    </div>
                    <div>
                      <p>Phone: (803) 387-2552</p>
                      <p>Email: info@midnight-magnolia.com</p>
                    </div>
                    <div>
                      <p className="font-semibold">Business Hours:</p>
                      <p>Monday - Friday: 9 AM - 5 PM EST</p>
                      <p>Weekend: By appointment</p>
                      <p className="text-sm text-gray-600 mt-2">
                        *We honor rest and may have slower response times during founder's health flares
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-midnight-blue">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="font-lora text-xl text-magnolia-white/80 mb-8 leading-relaxed">
                Whether you're seeking healing tools, digital products, or simply a community that understands your
                path, we're here to support your transformation. Your healing matters, and you don't have to walk this
                path alone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Explore Our Products
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-sage-green hover:bg-sage-green text-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Connect With Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
