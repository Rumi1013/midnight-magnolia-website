"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, FileText, Video, Headphones, Search, BookOpen, CreditCard, Loader2 } from "lucide-react"
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
import { Label } from "@/components/ui/label"

const resources = [
  {
    id: 1,
    title: "Gentle Morning Rituals for Chronic Illness",
    description:
      "A collection of adaptable morning practices that honor your energy levels and support gentle starts to your day.",
    type: "PDF Guide",
    category: "Self-Care",
    downloadCount: 1247,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    free: true,
  },
  {
    id: 2,
    title: "ADHD-Friendly Productivity Workbook",
    description:
      "Practical worksheets and strategies for creating productivity systems that work with neurodivergent brains.",
    type: "Workbook",
    category: "Productivity",
    downloadCount: 892,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    free: true,
  },
  {
    id: 3,
    title: "Ancestral Healing Meditation Series",
    description: "Guided meditations for connecting with ancestral wisdom and healing generational trauma.",
    type: "Audio",
    category: "Healing",
    downloadCount: 634,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    free: true,
  },
  {
    id: 4,
    title: "Moon Phase Ritual Guide",
    description: "Complete guide to creating meaningful rituals aligned with lunar cycles for intention and release.",
    type: "PDF Guide",
    category: "Spirituality",
    downloadCount: 1156,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    free: true,
  },
  {
    id: 5,
    title: "Trauma-Informed Movement Video Series",
    description: "Gentle movement practices designed for trauma survivors to reconnect with their bodies safely.",
    type: "Video",
    category: "Movement",
    downloadCount: 445,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    free: true,
  },
  {
    id: 6,
    title: "Southern Gothic Journaling Prompts",
    description: "Writing prompts that explore the beauty in shadows and help you craft your personal narrative.",
    type: "PDF Guide",
    category: "Journaling",
    downloadCount: 723,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    free: true,
  },
  {
    id: 7,
    title: "Spoon Theory Planner Template",
    description: "Digital planner template designed specifically for managing energy and tasks with chronic illness.",
    type: "Template",
    category: "Productivity",
    downloadCount: 567,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    free: true,
  },
  {
    id: 8,
    title: "Nervous System Regulation Toolkit",
    description:
      "Practical tools and techniques for regulating your nervous system during times of stress or overwhelm.",
    type: "Toolkit",
    category: "Self-Care",
    downloadCount: 934,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    free: true,
  },
  {
    id: 9,
    title: "Complete Ancestral Healing Course",
    description:
      "Comprehensive 8-week course with video lessons, workbooks, and personal guidance for deep ancestral healing work.",
    type: "Course",
    category: "Healing",
    downloadCount: 234,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    free: false,
    price: 197,
  },
  {
    id: 10,
    title: "Premium ADHD Productivity System",
    description:
      "Advanced productivity system with custom templates, video tutorials, and monthly group coaching calls.",
    type: "System",
    category: "Productivity",
    downloadCount: 156,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
    free: false,
    price: 97,
  },
  {
    id: 11,
    title: "Sacred Business Blueprint",
    description:
      "Complete guide to building a trauma-informed business that aligns with your values and supports your healing.",
    type: "Blueprint",
    category: "Business",
    downloadCount: 89,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
    free: false,
    price: 147,
  },
]

const categories = [
  "All Resources",
  "Self-Care",
  "Productivity",
  "Healing",
  "Spirituality",
  "Movement",
  "Journaling",
  "Business",
]
const types = [
  "All Types",
  "PDF Guide",
  "Workbook",
  "Audio",
  "Video",
  "Template",
  "Toolkit",
  "Course",
  "System",
  "Blueprint",
]

export default function ResourcesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Resources")
  const [selectedType, setSelectedType] = useState("All Types")
  const [searchQuery, setSearchQuery] = useState("")
  const [purchaseModal, setPurchaseModal] = useState<{ open: boolean; resource: any | null }>({
    open: false,
    resource: null,
  })
  const [purchaseForm, setPurchaseForm] = useState({
    name: "",
    email: "",
  })
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false)

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "All Resources" || resource.category === selectedCategory
    const matchesType = selectedType === "All Types" || resource.type === selectedType
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesType && matchesSearch
  })

  const featuredResources = resources.filter((resource) => resource.featured)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF Guide":
        return <FileText className="h-4 w-4" />
      case "Workbook":
        return <BookOpen className="h-4 w-4" />
      case "Audio":
        return <Headphones className="h-4 w-4" />
      case "Video":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handlePurchaseResource = async (resource: any) => {
    if (!purchaseForm.name || !purchaseForm.email) {
      alert("Please fill in your name and email address.")
      return
    }

    setIsPurchaseLoading(true)

    try {
      const response = await fetch("/api/stripe/create-resource-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resourceId: resource.id,
          resourceName: resource.title,
          price: resource.price,
          type: resource.type,
          customerEmail: purchaseForm.email,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "Failed to create checkout session")
      }
    } catch (error) {
      console.error("Purchase error:", error)
      alert("There was an error processing your purchase. Please try again.")
    } finally {
      setIsPurchaseLoading(false)
    }
  }

  const openPurchaseModal = (resource: any) => {
    setPurchaseModal({ open: true, resource })
  }

  const closePurchaseModal = () => {
    setPurchaseModal({ open: false, resource: null })
    setPurchaseForm({ name: "", email: "" })
  }

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6"
              >
                Healing Resources
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8"
              >
                Free tools, guides, and resources to support your healing journey. Created with trauma-informed care and
                Southern Gothic wisdom.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative max-w-xl mx-auto"
              >
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-full bg-magnolia-white/10 backdrop-blur-sm border border-magnolia-white/20 text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:ring-2 focus:ring-sage-green/50 font-lora"
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-magnolia-white/70"
                  size={18}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-16 bg-[#0A192F] border-b border-magnolia-white/10">
          <div className="container mx-auto px-6">
            <h2 className="font-playfair text-3xl font-bold text-magnolia-white mb-10">Featured Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="bg-magnolia-white/5 border border-magnolia-white/10 overflow-hidden hover:bg-magnolia-white/10 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt={resource.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-sage-green text-midnight-blue font-montserrat font-bold">Featured</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-magnolia-white/90 text-midnight-blue">
                          {resource.free ? "Free" : "Premium"}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {getTypeIcon(resource.type)}
                        <span className="font-montserrat text-sm text-magnolia-white/70">{resource.type}</span>
                      </div>

                      <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-3 group-hover:text-sage-green transition-colors duration-300">
                        {resource.title}
                      </h3>

                      <p className="font-lora text-magnolia-white/80 mb-4 text-sm leading-relaxed">
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-magnolia-white/60">
                          <Download className="h-4 w-4" />
                          <span className="font-lora text-xs">{resource.downloadCount} downloads</span>
                        </div>
                        <Badge variant="outline" className="border-sage-green text-sage-green">
                          {resource.category}
                        </Badge>
                      </div>

                      {resource.free ? (
                        <Button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold">
                          <Download className="mr-2 h-4 w-4" />
                          Download Free
                        </Button>
                      ) : (
                        <Dialog open={purchaseModal.open} onOpenChange={(open) => !open && closePurchaseModal()}>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-semibold"
                              onClick={() => openPurchaseModal(resource)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Purchase ${resource.price}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-magnolia-white max-w-md">
                            <DialogHeader>
                              <DialogTitle className="font-playfair text-2xl text-midnight-blue">
                                Purchase Resource
                              </DialogTitle>
                              <DialogDescription className="font-lora text-gray-700">
                                {purchaseModal.resource?.title} - ${purchaseModal.resource?.price}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="purchase-name" className="font-montserrat text-midnight-blue">
                                  Full Name *
                                </Label>
                                <Input
                                  id="purchase-name"
                                  value={purchaseForm.name}
                                  onChange={(e) => setPurchaseForm({ ...purchaseForm, name: e.target.value })}
                                  className="border-warm-gray focus:border-sage-green"
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="purchase-email" className="font-montserrat text-midnight-blue">
                                  Email Address *
                                </Label>
                                <Input
                                  id="purchase-email"
                                  type="email"
                                  value={purchaseForm.email}
                                  onChange={(e) => setPurchaseForm({ ...purchaseForm, email: e.target.value })}
                                  className="border-warm-gray focus:border-sage-green"
                                  required
                                />
                              </div>

                              <div className="bg-gold/10 p-4 rounded-lg">
                                <p className="font-lora text-sm text-midnight-blue">
                                  You'll receive download links immediately after payment. All purchases include
                                  lifetime access.
                                </p>
                              </div>

                              <div className="flex gap-3">
                                <Button
                                  variant="outline"
                                  onClick={closePurchaseModal}
                                  className="flex-1 border-warm-gray text-midnight-blue hover:bg-warm-gray/10"
                                  disabled={isPurchaseLoading}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handlePurchaseResource(purchaseModal.resource)}
                                  className="flex-1 bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-semibold"
                                  disabled={isPurchaseLoading}
                                >
                                  {isPurchaseLoading ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Processing...
                                    </>
                                  ) : (
                                    `Pay $${purchaseModal.resource?.price}`
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Resources */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="lg:w-1/4">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                  <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Filter Resources</h3>

                  <div className="mb-6">
                    <h4 className="font-montserrat font-semibold text-midnight-blue mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left py-2 px-3 rounded-lg font-lora transition-colors ${
                            selectedCategory === category
                              ? "bg-sage-green/20 text-midnight-blue font-semibold"
                              : "text-gray-700 hover:bg-sage-green/10"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-montserrat font-semibold text-midnight-blue mb-3">Type</h4>
                    <div className="space-y-2">
                      {types.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`w-full text-left py-2 px-3 rounded-lg font-lora transition-colors ${
                            selectedType === type
                              ? "bg-sage-green/20 text-midnight-blue font-semibold"
                              : "text-gray-700 hover:bg-sage-green/10"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-playfair text-2xl font-bold text-midnight-blue">
                    All Resources{" "}
                    <span className="font-lora font-normal text-gray-600">({filteredResources.length})</span>
                  </h2>
                </div>

                {filteredResources.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl text-center">
                    <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">No resources found</h3>
                    <p className="font-lora text-gray-700">
                      Try adjusting your search or filter criteria to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredResources.map((resource, index) => (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group"
                      >
                        <Card className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="flex">
                            <div className="w-1/3 relative h-32">
                              <Image
                                src={resource.image || "/placeholder.svg"}
                                alt={resource.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="w-2/3 p-4">
                              <div className="flex items-center gap-2 mb-2">
                                {getTypeIcon(resource.type)}
                                <span className="font-montserrat text-xs text-gray-500">{resource.type}</span>
                                <Badge variant="outline" className="border-sage-green text-sage-green text-xs">
                                  {resource.category}
                                </Badge>
                              </div>

                              <h3 className="font-playfair text-lg font-bold text-midnight-blue mb-2 group-hover:text-sage-green transition-colors duration-300">
                                {resource.title}
                              </h3>

                              <p className="font-lora text-gray-700 text-sm mb-3 line-clamp-2">
                                {resource.description}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-gray-500">
                                  <Download className="h-3 w-3" />
                                  <span className="font-lora text-xs">{resource.downloadCount}</span>
                                </div>
                                {resource.free ? (
                                  <Button
                                    size="sm"
                                    className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold"
                                  >
                                    <Download className="mr-1 h-3 w-3" />
                                    Download
                                  </Button>
                                ) : (
                                  <Dialog
                                    open={purchaseModal.open}
                                    onOpenChange={(open) => !open && closePurchaseModal()}
                                  >
                                    <DialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        className="bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-semibold"
                                        onClick={() => openPurchaseModal(resource)}
                                      >
                                        <CreditCard className="mr-1 h-3 w-3" />
                                        Purchase ${resource.price}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-magnolia-white max-w-md">
                                      <DialogHeader>
                                        <DialogTitle className="font-playfair text-2xl text-midnight-blue">
                                          Purchase Resource
                                        </DialogTitle>
                                        <DialogDescription className="font-lora text-gray-700">
                                          {purchaseModal.resource?.title} - ${purchaseModal.resource?.price}
                                        </DialogDescription>
                                      </DialogHeader>

                                      <div className="space-y-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="purchase-name" className="font-montserrat text-midnight-blue">
                                            Full Name *
                                          </Label>
                                          <Input
                                            id="purchase-name"
                                            value={purchaseForm.name}
                                            onChange={(e) => setPurchaseForm({ ...purchaseForm, name: e.target.value })}
                                            className="border-warm-gray focus:border-sage-green"
                                            required
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label
                                            htmlFor="purchase-email"
                                            className="font-montserrat text-midnight-blue"
                                          >
                                            Email Address *
                                          </Label>
                                          <Input
                                            id="purchase-email"
                                            type="email"
                                            value={purchaseForm.email}
                                            onChange={(e) =>
                                              setPurchaseForm({ ...purchaseForm, email: e.target.value })
                                            }
                                            className="border-warm-gray focus:border-sage-green"
                                            required
                                          />
                                        </div>

                                        <div className="bg-gold/10 p-4 rounded-lg">
                                          <p className="font-lora text-sm text-midnight-blue">
                                            You'll receive download links immediately after payment. All purchases
                                            include lifetime access.
                                          </p>
                                        </div>

                                        <div className="flex gap-3">
                                          <Button
                                            variant="outline"
                                            onClick={closePurchaseModal}
                                            className="flex-1 border-warm-gray text-midnight-blue hover:bg-warm-gray/10"
                                            disabled={isPurchaseLoading}
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            onClick={() => handlePurchaseResource(purchaseModal.resource)}
                                            className="flex-1 bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-semibold"
                                            disabled={isPurchaseLoading}
                                          >
                                            {isPurchaseLoading ? (
                                              <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                              </>
                                            ) : (
                                              `Pay $${purchaseModal.resource?.price}`
                                            )}
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">Stay Updated</h2>
              <p className="font-lora text-xl text-gray-800 mb-8 leading-relaxed">
                Get notified when we release new resources and receive exclusive content for your healing journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-sage-green font-lora"
                />
                <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
