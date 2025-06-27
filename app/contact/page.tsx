"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MessageCircle, Heart, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-magnolia-white pt-20">
      {/* Header */}
      <section className="bg-midnight-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
              Sacred
              <span className="text-gold"> Connection</span>
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
              Reach out with your questions, stories, or simply to say hello. Every message is received with love and
              intention.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-montserrat font-semibold text-midnight-blue mb-2">
                    Your Sacred Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-sage-green/20 focus:border-sage-green focus:outline-none font-lora"
                    placeholder="How shall we address you?"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-montserrat font-semibold text-midnight-blue mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-sage-green/20 focus:border-sage-green focus:outline-none font-lora"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block font-montserrat font-semibold text-midnight-blue mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-sage-green/20 focus:border-sage-green focus:outline-none font-lora"
                    placeholder="What brings you to our sanctuary?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-montserrat font-semibold text-midnight-blue mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-sage-green/20 focus:border-sage-green focus:outline-none font-lora resize-none"
                    placeholder="Share your thoughts, questions, or simply say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Sacred Message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-sage-green/20 border border-sage-green/30 rounded-2xl p-8 text-center"
              >
                <Heart className="w-12 h-12 text-sage-green mx-auto mb-4" />
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Message Received with Love</h3>
                <p className="font-lora text-midnight-blue/80 leading-relaxed">
                  Thank you for reaching out, beautiful soul. Your message has been received and will be answered with
                  the care and attention it deserves. Expect a response within 24-48 hours.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-6">
                Connect with Our
                <span className="text-sage-green"> Sanctuary</span>
              </h2>
              <p className="font-lora text-lg text-midnight-blue/80 leading-relaxed">
                Whether you have questions about our products, need support on your healing journey, or simply want to
                share your story, we're here to listen with open hearts and gentle understanding.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-sage-green" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Email Sanctuary</h3>
                  <p className="font-lora text-midnight-blue/70">hello@midnightmagnolia.com</p>
                  <p className="font-lora text-sm text-midnight-blue/60 mt-1">
                    We respond within 24-48 hours with love and intention
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-sage-green" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Sacred Support</h3>
                  <p className="font-lora text-midnight-blue/70">
                    Need help with an order or have questions about our tools? We're here to guide you with gentle care.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-sage-green" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-midnight-blue mb-2">Community Connection</h3>
                  <p className="font-lora text-midnight-blue/70">
                    Share your healing journey, connect with kindred spirits, or simply let us know how we can better
                    serve your sacred path.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-midnight-blue/5 rounded-2xl p-6">
              <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-3">Sacred Hours</h3>
              <p className="font-lora text-midnight-blue/70 mb-2">
                We honor the rhythm of rest and work, responding to messages during:
              </p>
              <p className="font-montserrat text-midnight-blue/80">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
              <p className="font-lora text-sm text-midnight-blue/60 mt-2">
                Weekend messages are received with love and answered on Monday
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
