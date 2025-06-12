"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MailIcon, PhoneIcon, ClockIcon, HeartIcon } from "lucide-react"
import ContactForm from "../components/ContactForm"

export default function ContactPageClient() {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAF3E0] mb-6">Begin a Conversation</h1>
          <p className="text-xl md:text-2xl text-[#FAF3E0] opacity-90 max-w-3xl mx-auto">
            "In the quiet spaces between words, healing begins. Reach out when your soul is ready."
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-[#FAF3E0] bg-opacity-[0.03] border border-[#D4B99F] border-opacity-20 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold text-[#FAF3E0] mb-4">General Inquiries</h2>
                  <p className="text-[#FAF3E0] opacity-80 mb-6">
                    Have a question about our offerings or interested in collaborating? We'd love to hear from you.
                  </p>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Support Information */}
            <div>
              <Card className="bg-[#FAF3E0] bg-opacity-[0.03] border border-[#D4B99F] border-opacity-20 shadow-lg mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold text-[#FAF3E0] mb-6">Connect With Us</h2>

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

              <Card className="bg-[#FAF3E0] bg-opacity-[0.03] border border-[#D4B99F] border-opacity-20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <HeartIcon className="h-5 w-5 text-[#A3B18A] mr-2" />
                    <h2 className="text-xl font-semibold text-[#FAF3E0]">Crisis Support</h2>
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
        </div>
      </section>
    </div>
  )
}
