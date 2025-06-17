"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, CheckCircle, ArrowRight, Calendar, Users, Video, Heart } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const serviceCategories = [
  "All Services",
  "Individual Sessions",
  "Group Programs",
  "Courses & Workshops",
  "VIP Packages",
]

const services = [
  {
    id: 1,
    title: "Ancestral Healing Deep Dive",
    description:
      "90-minute intensive session exploring your lineage, identifying generational patterns, and creating a personalized healing plan with follow-up support.",
    duration: "90 minutes + 30 days support",
    price: 297,
    originalPrice: 397,
    category: "Individual Sessions",
    features: [
      "Comprehensive ancestral mapping",
      "Trauma pattern identification",
      "Personalized healing rituals",
      "30-day email support",
      "Session recording provided",
      "Follow-up resource packet",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Ancestral+Healing",
    popular: true,
    waitlist: false,
    testimonial: {
      name: "Maria S.",
      quote: "This session helped me understand patterns I'd carried for generations. Life-changing work.",
      rating: 5,
    },
  },
  {
    id: 2,
    title: "Gentle Productivity Breakthrough",
    description:
      "Personalized productivity coaching for ADHD minds and chronic illness warriors. Create systems that honor your energy and unique brain wiring.",
    duration: "75 minutes + resources",
    price: 197,
    originalPrice: null,
    category: "Individual Sessions",
    features: [
      "ADHD-friendly system design",
      "Spoon theory integration",
      "Energy management strategies",
      "Custom planning templates",
      "Accountability framework",
      "2-week follow-up check-in",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Productivity+Coaching",
    popular: false,
    waitlist: false,
    testimonial: {
      name: "Alex R.",
      quote: "Finally, productivity advice that works WITH my ADHD instead of against it!",
      rating: 5,
    },
  },
  {
    id: 3,
    title: "Moon Cycle Healing Circle",
    description:
      "Monthly group ceremony aligned with lunar phases for intention setting, release work, and community healing. Limited to 12 participants for intimate connection.",
    duration: "2 hours monthly",
    price: 67,
    originalPrice: null,
    category: "Group Programs",
    features: [
      "Live virtual ceremony",
      "Guided meditation",
      "Group energy work",
      "Ritual instruction",
      "Community support",
      "Recording for members",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Moon+Circle",
    popular: true,
    waitlist: false,
    testimonial: {
      name: "Luna M.",
      quote: "The most powerful healing work I've ever experienced. This circle is magic.",
      rating: 5,
    },
  },
  {
    id: 4,
    title: "Trauma-Informed Business Building",
    description:
      "6-week intensive program for sensitive entrepreneurs ready to build businesses that support their healing while creating sustainable income.",
    duration: "6 weeks + bonuses",
    price: 997,
    originalPrice: 1297,
    category: "Courses & Workshops",
    features: [
      "6 live group coaching calls",
      "Business planning workbooks",
      "Marketing for sensitives training",
      "Pricing psychology workshop",
      "Private community access",
      "90-day implementation support",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Business+Building",
    popular: true,
    waitlist: false,
    testimonial: {
      name: "Jordan K.",
      quote: "Built my first $10K month using these gentle, trauma-informed strategies.",
      rating: 5,
    },
  },
  {
    id: 5,
    title: "Sacred Boundaries Workshop",
    description:
      "Learn to set and maintain healthy boundaries without guilt or fear. Perfect for people-pleasers, empaths, and those healing from codependency.",
    duration: "3 hours + workbook",
    price: 147,
    originalPrice: null,
    category: "Courses & Workshops",
    features: [
      "Live interactive workshop",
      "Boundary-setting scripts",
      "Guilt-free framework",
      "Practice scenarios",
      "Downloadable workbook",
      "30-day email support",
    ],
    image: "/placeholder.svg?height=400&width=600&text=Boundaries+Workshop",
    popular: false,
    waitlist: false,
    testimonial: {
      name: "Sam T.",
      quote: "I finally learned to say no without feeling guilty. This workshop changed everything.",
      rating: 5,
    },
  },
  {
    id: 6,
    title: "VIP Healing Intensive",
    description:
      "3-month private mentorship combining ancestral healing, productivity coaching, and business strategy. For those ready for complete transformation.",
    duration: "3 months",
    price: 3997,
    originalPrice: 4997,
    category: "VIP Packages",
    features: [
      "6 private 90-minute sessions",
      "Unlimited Voxer support",
      "Custom healing protocols",
      "Business strategy development",
      "Energy clearing sessions",
      "Lifetime access to resources",
    ],
    image: "/placeholder.svg?height=400&width=600&text=VIP+Intensive",
    popular: true,
    waitlist: true,
    testimonial: {
      name: "Taylor P.",
      quote: "The most transformative 3 months of my life. Worth every penny and more.",
      rating: 5,
    },
  },
]

export default function ServicesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Services")
  const [bookingModal, setBookingModal] = useState<{ open: boolean; service: any | null }>({
    open: false,
    service: null,
  })
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isBookingLoading, setIsBookingLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredServices =
    selectedCategory === "All Services" ? services : services.filter((service) => service.category === selectedCategory)

  const handleBookService = async (service: any) => {
    setError(null)

    // Enhanced validation
    if (!bookingForm.name?.trim()) {
      setError("Please enter your full name.")
      return
    }

    if (!bookingForm.email?.trim() || !bookingForm.email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    if (bookingForm.name.length > 100) {
      setError("Name is too long. Please use a shorter name.")
      return
    }

    if (bookingForm.email.length > 254) {
      setError("Email address is too long.")
      return
    }

    setIsBookingLoading(true)

    try {
      const response = await fetch("/api/stripe/create-service-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.title,
          price: service.price,
          duration: service.duration,
          customerEmail: bookingForm.email.trim(),
          customerName: bookingForm.name.trim(),
          customerPhone: bookingForm.phone.trim(),
          customerMessage: bookingForm.message.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create checkout session")
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("Booking error:", error)
      setError("There was an error processing your booking. Please try again or contact support.")
    } finally {
      setIsBookingLoading(false)
    }
  }

  const openBookingModal = (service: any) => {
    setBookingModal({ open: true, service })
  }

  const closeBookingModal = () => {
    setBookingModal({ open: false, service: null })
    setBookingForm({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac fullPage />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6"
              >
                Sacred Healing Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8"
              >
                Trauma-informed healing services that honor your journey and support your transformation through
                Southern Gothic wisdom, ancestral practices, and modern therapeutic approaches.
              </motion.p>

              {/* Service Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-playfair font-bold text-sage-green">500+</div>
                  <p className="font-montserrat text-sm text-magnolia-white">Souls Served</p>
                </div>
                <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-playfair font-bold text-gold">4.9★</div>
                  <p className="font-montserrat text-sm text-magnolia-white">Average Rating</p>
                </div>
                <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-playfair font-bold text-sage-green">98%</div>
                  <p className="font-montserrat text-sm text-magnolia-white">Would Recommend</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="#services">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Explore Our Offerings
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {serviceCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-montserrat text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-sage-green text-midnight-blue shadow-md"
                      : "bg-white text-gray-700 hover:bg-sage-green/20 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 relative">
                    {/* Badges */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                      {service.popular && (
                        <Badge className="bg-gold text-midnight-blue font-montserrat font-bold">MOST POPULAR</Badge>
                      )}
                      {service.originalPrice && (
                        <Badge className="bg-red-500 text-white font-montserrat font-bold">
                          SAVE ${service.originalPrice - service.price}
                        </Badge>
                      )}
                      {service.waitlist && (
                        <Badge className="bg-warm-gray text-magnolia-white font-montserrat font-bold">
                          WAITLIST ONLY
                        </Badge>
                      )}
                    </div>

                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-magnolia-white/90 text-midnight-blue">
                          {service.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2 group-hover:text-sage-green transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="font-lora text-gray-700 mb-4 text-sm leading-relaxed">{service.description}</p>

                      {/* Features */}
                      <div className="mb-6">
                        <p className="font-montserrat text-xs text-sage-green font-semibold mb-2">WHAT'S INCLUDED:</p>
                        <ul className="space-y-1">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-sage-green mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                          {service.features.length > 4 && (
                            <li className="text-xs text-gray-500 italic">
                              +{service.features.length - 4} more features included
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Testimonial */}
                      {service.testimonial && (
                        <div className="bg-sage-green/10 p-4 rounded-lg mb-4">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(service.testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-gold fill-gold" />
                            ))}
                          </div>
                          <p className="font-lora text-xs text-gray-700 italic mb-2">"{service.testimonial.quote}"</p>
                          <p className="font-montserrat text-xs font-semibold text-midnight-blue">
                            - {service.testimonial.name}
                          </p>
                        </div>
                      )}

                      {/* Service Details */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration}
                          </div>
                          {service.category === "Group Programs" && (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              Limited spots
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-playfair text-2xl font-bold text-midnight-blue">${service.price}</span>
                          {service.originalPrice && (
                            <span className="font-lora text-sm text-gray-500 line-through">
                              ${service.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <Dialog open={bookingModal.open} onOpenChange={(open) => !open && closeBookingModal()}>
                        <DialogTrigger asChild>
                          <Button
                            className={`w-full font-montserrat font-semibold transition-all duration-300 ${
                              service.waitlist
                                ? "bg-warm-gray hover:bg-warm-gray/90 text-magnolia-white"
                                : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue"
                            }`}
                            onClick={() => openBookingModal(service)}
                          >
                            {service.waitlist ? (
                              <>
                                <Heart className="mr-2 h-4 w-4" />
                                Join Waitlist
                              </>
                            ) : (
                              <>
                                <Calendar className="mr-2 h-4 w-4" />
                                Book Session
                              </>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-magnolia-white max-w-md">
                          <DialogHeader>
                            <DialogTitle className="font-playfair text-2xl text-midnight-blue">
                              {service.waitlist ? "Join Waitlist" : "Book Your Session"}
                            </DialogTitle>
                            <DialogDescription className="font-lora text-gray-700">
                              {bookingModal.service?.title} - ${bookingModal.service?.price}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            {error && (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                <p className="font-lora text-sm text-red-700">{error}</p>
                              </div>
                            )}

                            <div className="space-y-2">
                              <Label htmlFor="name" className="font-montserrat text-midnight-blue">
                                Full Name *
                              </Label>
                              <Input
                                id="name"
                                value={bookingForm.name}
                                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                className="border-warm-gray focus:border-sage-green"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email" className="font-montserrat text-midnight-blue">
                                Email Address *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={bookingForm.email}
                                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                className="border-warm-gray focus:border-sage-green"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="font-montserrat text-midnight-blue">
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={bookingForm.phone}
                                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                className="border-warm-gray focus:border-sage-green"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="message" className="font-montserrat text-midnight-blue">
                                Tell us about your healing goals
                              </Label>
                              <Textarea
                                id="message"
                                value={bookingForm.message}
                                onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                                className="border-warm-gray focus:border-sage-green"
                                rows={3}
                                placeholder="What brings you to this work? What are you hoping to heal or transform?"
                              />
                            </div>

                            <div className="bg-sage-green/10 p-4 rounded-lg">
                              <p className="font-lora text-sm text-midnight-blue">
                                {service.waitlist
                                  ? "You'll be notified when spots become available. No payment required to join the waitlist."
                                  : "After payment, we'll contact you within 24 hours to schedule your session at a time that works for you."}
                              </p>
                            </div>

                            <div className="flex gap-3">
                              <Button
                                variant="outline"
                                onClick={closeBookingModal}
                                className="flex-1 border-warm-gray text-midnight-blue hover:bg-warm-gray/10"
                                disabled={isBookingLoading}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleBookService(bookingModal.service)}
                                className={`flex-1 font-montserrat font-semibold ${
                                  service.waitlist
                                    ? "bg-warm-gray hover:bg-warm-gray/90 text-magnolia-white"
                                    : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue"
                                }`}
                                disabled={isBookingLoading}
                              >
                                {isBookingLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                  </>
                                ) : service.waitlist ? (
                                  "Join Waitlist"
                                ) : (
                                  `Pay $${bookingModal.service?.price}`
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-4xl font-bold text-midnight-blue mb-12 text-center"
            >
              Transformation Stories
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  service: "Ancestral Healing Deep Dive",
                  quote:
                    "This session helped me understand patterns I'd carried for generations. I finally feel free to write my own story.",
                  rating: 5,
                  result: "Broke generational trauma patterns",
                },
                {
                  name: "Marcus T.",
                  service: "Gentle Productivity Breakthrough",
                  quote:
                    "Finally, a productivity system that works with my ADHD instead of against it. My business has tripled.",
                  rating: 5,
                  result: "3x business growth in 6 months",
                },
                {
                  name: "Luna K.",
                  service: "Moon Circle",
                  quote:
                    "The community and ritual practice have become essential to my healing. I look forward to every gathering.",
                  rating: 5,
                  result: "Found her healing community",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white p-6 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                        ))}
                      </div>
                      <p className="font-lora text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                      <div className="border-t pt-4">
                        <p className="font-montserrat font-semibold text-midnight-blue">{testimonial.name}</p>
                        <p className="font-lora text-sm text-gray-600 mb-2">{testimonial.service}</p>
                        <Badge className="bg-sage-green/20 text-sage-green font-montserrat text-xs">
                          {testimonial.result}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-midnight-blue">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-6">Frequently Asked Questions</h2>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                Everything you need to know about our healing services
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What makes your approach different from traditional therapy?",
                  answer:
                    "Our work combines trauma-informed therapeutic principles with ancestral wisdom, Southern Gothic spirituality, and practical life skills. We honor both the clinical and the mystical, creating space for healing that addresses mind, body, and spirit.",
                },
                {
                  question: "Do you offer payment plans for your services?",
                  answer:
                    "Yes! We offer payment plans for services over $500. We believe healing shouldn't be limited by financial constraints. Contact us to discuss options that work for your budget.",
                },
                {
                  question: "Are your services covered by insurance?",
                  answer:
                    "Our services are not covered by insurance as we're not licensed therapists. However, many clients use HSA/FSA funds for our wellness services. We provide receipts for your records.",
                },
                {
                  question: "What if I need to reschedule my session?",
                  answer:
                    "We understand that life happens, especially when managing chronic illness or trauma. We offer flexible rescheduling with 24-hour notice. Emergency situations are always accommodated with compassion.",
                },
                {
                  question: "How do I know which service is right for me?",
                  answer:
                    "Book a free 15-minute consultation call where we'll discuss your goals, current challenges, and which service would best support your healing journey. We're here to guide you to the right fit.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-magnolia-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <h3 className="font-playfair text-lg font-bold text-magnolia-white mb-3">{faq.question}</h3>
                  <p className="font-lora text-magnolia-white/80 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-magnolia-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">
                Ready to Begin Your Healing Journey?
              </h2>
              <p className="font-lora text-xl text-gray-800 mb-8 leading-relaxed">
                Every journey begins with a single step. Let us walk alongside you as you discover your path to
                wholeness, productivity, and sustainable transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contact">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="/community">
                  <Button
                    variant="outline"
                    className="border-midnight-blue text-midnight-blue hover:bg-midnight-blue hover:text-magnolia-white font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  >
                    Join Our Community
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Video className="h-5 w-5 text-sage-green" />
                  <span className="font-lora text-gray-700">Virtual & In-Person Options</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-sage-green" />
                  <span className="font-lora text-gray-700">Trauma-Informed Approach</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-gold" />
                  <span className="font-lora text-gray-700">500+ Souls Served</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
