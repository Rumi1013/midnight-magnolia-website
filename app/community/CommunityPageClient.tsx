"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const events = [
  {
    id: 1,
    title: "New Moon Intention Setting Circle",
    description:
      "Join us for a virtual gathering to set intentions for the lunar cycle ahead. We'll use gentle journaling prompts, meditation, and community sharing.",
    date: "June 17, 2024",
    time: "8:00 PM - 9:30 PM EST",
    location: "Virtual (Zoom)",
    attendees: 42,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 2,
    title: "Ancestral Healing Workshop",
    description:
      "Explore practices for connecting with and healing ancestral trauma. This workshop combines Southern folk traditions with modern therapeutic approaches.",
    date: "June 25, 2024",
    time: "1:00 PM - 4:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: 28,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: 3,
    title: "Gentle Productivity for Spoonies",
    description:
      "A workshop designed specifically for those with chronic illness or limited energy. Learn practical tools for honoring your capacity while moving forward.",
    date: "July 8, 2024",
    time: "2:00 PM - 3:30 PM EST",
    location: "Virtual (Zoom)",
    attendees: 35,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: 4,
    title: "Full Moon Release Ceremony",
    description:
      "A sacred space for letting go of what no longer serves you under the light of the full moon. Includes guided meditation and symbolic release rituals.",
    date: "July 21, 2024",
    time: "9:00 PM - 10:30 PM EST",
    location: "Virtual (Zoom)",
    attendees: 56,
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

const testimonials = [
  {
    id: 1,
    name: "Jasmine R.",
    location: "Atlanta, GA",
    quote:
      "Finding Midnight Magnolia was like coming home. The community has supported me through chronic illness flares, ADHD struggles, and healing from generational trauma. I've never felt so seen and accepted.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "New Orleans, LA",
    quote:
      "The ancestral healing workshops helped me reconnect with parts of my heritage I thought were lost. I'm now incorporating these practices into my daily life and sharing them with my children.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Amara K.",
    location: "Durham, NC",
    quote:
      "As someone with ADHD and chronic pain, I've always felt like productivity advice wasn't made for me. Midnight Magnolia's gentle approach has transformed how I work and rest without shame.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const forumTopics = [
  {
    id: 1,
    title: "Ancestral Healing Practices for Those Cut Off from Family History",
    replies: 24,
    likes: 37,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    title: "Managing ADHD Without Stimulants: Herbal Approaches & Lifestyle Adaptations",
    replies: 42,
    likes: 56,
    lastActive: "5 hours ago",
  },
  {
    id: 3,
    title: "Creating Sacred Space in Small Apartments & Shared Living",
    replies: 18,
    likes: 29,
    lastActive: "1 day ago",
  },
  {
    id: 4,
    title: "Navigating Spiritual Practice While Chronically Ill",
    replies: 31,
    likes: 48,
    lastActive: "2 days ago",
  },
]

export default function CommunityPageClient() {
  const [activeTab, setActiveTab] = useState("events")

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">
                Join Our Healing Circle
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8">
                Connect with a community of gentle souls on similar healing journeys. Share wisdom, find support, and
                grow together in a space that honors your whole self.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/community/join"
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Join Our Community
                </Link>
                <Link
                  href="#events"
                  className="bg-magnolia-white/10 hover:bg-magnolia-white/20 text-magnolia-white font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Explore Events
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Community Navigation */}
        <section className="bg-[#0A192F] border-y border-magnolia-white/10">
          <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab("events")}
                className={`px-6 py-4 font-montserrat font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeTab === "events"
                    ? "text-sage-green border-b-2 border-sage-green"
                    : "text-magnolia-white/70 hover:text-magnolia-white"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("testimonials")}
                className={`px-6 py-4 font-montserrat font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeTab === "testimonials"
                    ? "text-sage-green border-b-2 border-sage-green"
                    : "text-magnolia-white/70 hover:text-magnolia-white"
                }`}
              >
                Community Stories
              </button>
              <button
                onClick={() => setActiveTab("forum")}
                className={`px-6 py-4 font-montserrat font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeTab === "forum"
                    ? "text-sage-green border-b-2 border-sage-green"
                    : "text-magnolia-white/70 hover:text-magnolia-white"
                }`}
              >
                Discussion Forum
              </button>
              <button
                onClick={() => setActiveTab("membership")}
                className={`px-6 py-4 font-montserrat font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeTab === "membership"
                    ? "text-sage-green border-b-2 border-sage-green"
                    : "text-magnolia-white/70 hover:text-magnolia-white"
                }`}
              >
                Membership Benefits
              </button>
            </div>
          </div>
        </section>

        {/* Events Section */}
        {activeTab === "events" && (
          <section id="events" className="py-16 bg-magnolia-white">
            <div className="container mx-auto px-6">
              <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-10">Upcoming Events</h2>

              {/* Featured Events */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {events
                  .filter((event) => event.featured)
                  .map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="group"
                    >
                      <Link href={`/community/events/${event.id}`} className="block">
                        <div className="relative h-64 overflow-hidden rounded-xl mb-6">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar size={16} className="text-sage-green" />
                              <span className="font-montserrat text-sm font-semibold text-magnolia-white">
                                {event.date}
                              </span>
                            </div>
                            <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-2 group-hover:text-sage-green transition-colors duration-300">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-4 text-magnolia-white/70">
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                <span className="font-lora text-sm">{event.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users size={14} />
                                <span className="font-lora text-sm">{event.attendees
