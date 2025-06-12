"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { MailIcon, PhoneIcon, ClockIcon, HeartIcon } from "lucide-react"
import ContactForm from "../components/ContactForm"

export default function ContactPageClient() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="bg-[#0A192F] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#FAF3E0] mb-6">
            Begin a Conversation
          </h1>
          <p className="text-xl md:text-2xl font-lora text-[#FAF3E0] opacity-90 max-w-3xl mx-auto">
            "In the quiet spaces between words, healing begins. Reach out when your soul is ready."
          </p>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute top-20 left-[15%] text-4xl opacity-20"
          >
            🌙
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute top-40 right-[20%] text-4xl opacity-20"
          >
            🌸
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-[#FAF3E0] bg-opacity-[0.03] backdrop-blur-sm border border-[#D4B99F] border-opacity-20 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-8">
                      <TabsTrigger
                        value="general"
                        className="data-[state=active]:bg-[#A3B18A] data-[state=active]:text-[#0A192F]"
                      >
                        General
                      </TabsTrigger>
                      <TabsTrigger
                        value="support"
                        className="data-[state=active]:bg-[#A3B18A] data-[state=active]:text-[#0A192F]"
                      >
                        Support
                      </TabsTrigger>
                      <TabsTrigger
                        value="wholesale"
                        className="data-[state=active]:bg-[#A3B18A] data-[state=active]:text-[#0A192F]"
                      >
                        Wholesale
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                      <h2 className="text-2xl font-playfair font-semibold text-[#FAF3E0] mb-4">General Inquiries</h2>
                      <p className="text-[#FAF3E0] opacity-80 mb-6">
                        Have a question about our offerings or interested in collaborating? We'd love to hear from you.
                      </p>
                      <ContactForm />
                    </TabsContent>
                    <TabsContent value="support">
                      <h2 className="text-2xl font-playfair font-semibold text-[#FAF3E0] mb-4">Product Support</h2>
                      <p className="text-[#FAF3E0] opacity-80 mb-6">
                        Need assistance with an order or product? Our support team is here to help you.
                      </p>
                      <ContactForm />
                    </TabsContent>
                    <TabsContent value="wholesale">
                      <h2 className="text-2xl font-playfair font-semibold text-[#FAF3E0] mb-4">Wholesale Inquiries</h2>
                      <p className="text-[#FAF3E0] opacity-80 mb-6">
                        Interested in carrying Midnight Magnolia products in your store? Let's discuss wholesale
                        options.
                      </p>
                      <ContactForm />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Support Information */}
            <div>
              <Card className="bg-[#FAF3E0] bg-opacity-[0.03] backdrop-blur-sm border border-[#D4B99F] border-opacity-20 shadow-lg mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-playfair font-semibold text-[#FAF3E0] mb-6">Connect With Us</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <MailIcon className="h-5 w-5 text-[#A3B18A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#FAF3E0]">Email</h3>
                        <p className="text-[#FAF3E0] opacity-80">hello@midnightmagnolia.com</p>
                        <p className="text-sm text-[#FAF3E0] opacity-60 mt-1">Response within 48 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <PhoneIcon className="h-5 w-5 text-[#A3B18A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#FAF3E0]">Phone</h3>
                        <p className="text-[#FAF3E0] opacity-80">(555) 123-4567</p>
                        <p className="text-sm text-[#FAF3E0] opacity-60 mt-1">Mon-Fri, 10am-6pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <ClockIcon className="h-5 w-5 text-[#A3B18A]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#FAF3E0]">Hours</h3>
                        <p className="text-[#FAF3E0] opacity-80">Monday - Friday: 10am - 6pm EST</p>
                        <p className="text-[#FAF3E0] opacity-80">Saturday: 12pm - 4pm EST</p>
                        <p className="text-[#FAF3E0] opacity-80">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#FAF3E0] bg-opacity-[0.03] backdrop-blur-sm border border-[#D4B99F] border-opacity-20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <HeartIcon className="h-5 w-5 text-[#A3B18A] mr-2" />
                    <h2 className="text-xl font-playfair font-semibold text-[#FAF3E0]">Crisis Support</h2>
                  </div>
                  <p className="text-[#FAF3E0] opacity-80 mb-4">
                    If you're experiencing a mental health crisis or emergency situation, please reach out to these
                    resources:
                  </p>
                  <ul className="space-y-2 text-[#FAF3E0] opacity-80">
                    <li>
                      National Suicide Prevention Lifeline: <strong>988</strong>
                    </li>
                    <li>
                      Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong>
                    </li>
                    <li>
                      Emergency Services: <strong>911</strong>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-playfair font-bold text-[#FAF3E0] mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-[#D4B99F] border-opacity-30">
                  <AccordionTrigger className="text-[#FAF3E0] hover:text-[#A3B18A] text-lg font-lora py-4">
                    How quickly will I receive a response?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#FAF3E0] opacity-80">
                    We strive to respond to all inquiries within 48 hours during business days. For urgent matters,
                    please call our support line.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-[#D4B99F] border-opacity-30">
                  <AccordionTrigger className="text-[#FAF3E0] hover:text-[#A3B18A] text-lg font-lora py-4">
                    Do you offer consultations for healing practices?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#FAF3E0] opacity-80">
                    Yes, we offer private consultations for those seeking personalized guidance on their healing
                    journey. Please use the contact form and select "General Inquiries" to schedule.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-[#D4B99F] border-opacity-30">
                  <AccordionTrigger className="text-[#FAF3E0] hover:text-[#A3B18A] text-lg font-lora py-4">
                    What is your shipping policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#FAF3E0] opacity-80">
                    We ship all physical products within 3-5 business days. Digital products are delivered immediately
                    after purchase. For international shipping inquiries, please contact us directly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b border-[#D4B99F] border-opacity-30">
                  <AccordionTrigger className="text-[#FAF3E0] hover:text-[#A3B18A] text-lg font-lora py-4">
                    Do you offer refunds?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#FAF3E0] opacity-80">
                    We offer refunds on physical products within 30 days of purchase if they are unused and in original
                    packaging. Digital products are non-refundable due to their nature.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b border-[#D4B99F] border-opacity-30">
                  <AccordionTrigger className="text-[#FAF3E0] hover:text-[#A3B18A] text-lg font-lora py-4">
                    How can I join your community?
                  </AccordionTrigger>
                  <AccordionContent className="text-[#FAF3E0] opacity-80">
                    You can join our community by signing up for our newsletter, following us on social media, or
                    becoming a member through our Community page. We welcome all who seek healing and growth.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
