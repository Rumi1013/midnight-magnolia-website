"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Book, Database, Users, LinkIcon, FileText } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const resources = {
  databases: [
    {
      title: "Freedman's Bureau Records",
      description: "Essential records for post-emancipation African American genealogy.",
      link: "https://www.archives.gov/research/african-americans/freedmens-bureau",
    },
    {
      title: "AfriGeneas",
      description: "A vital resource for African American genealogy, with records and community forums.",
      link: "https://www.afrigeneas.com/",
    },
    {
      title: "FamilySearch",
      description: "A massive, free genealogy database with extensive records from the American South.",
      link: "https://www.familysearch.org/",
    },
  ],
  guides: [
    {
      title: "Beginner's Guide to Black Genealogy",
      description: "A step-by-step guide from Midnight Magnolia on how to start your ancestral research journey.",
      link: "/resources/black-genealogy-guide",
    },
    {
      title: "Navigating Pre-1870 Records",
      description: "Strategies for breaking through the 'brick wall' of slavery in genealogical research.",
      link: "/resources/pre-1870-guide",
    },
    {
      title: "DNA & Genealogy",
      description: "Understanding how to use DNA test results to supplement your paper trail research.",
      link: "/resources/dna-guide",
    },
  ],
  services: [
    {
      title: "Ancestral Healing Deep Dive",
      description: "A 1:1 session to explore your lineage and heal generational patterns.",
      link: "/services",
    },
    {
      title: "Genealogy Research Consultation",
      description: "Get expert help with your research roadblocks and create a plan for your next steps.",
      link: "/services",
    },
  ],
}

export default function GenealogyPageClient() {
  return (
    <>
      <FloatingMoon />
      <FloatingZodiac fullPage />

      <main className="min-h-screen bg-midnight-blue pt-24">
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">
                Connecting with Your Roots
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                A curated collection of resources to support your genealogy journey, with a special focus on Black
                Southern heritage. Uncover the stories of your ancestors and begin the work of healing.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6 space-y-16">
            {/* Databases */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-8 flex items-center gap-3">
                <Database className="text-sage-green" /> Essential Databases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.databases.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="font-lora text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        <Button asChild variant="outline">
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            Visit Site <LinkIcon className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Guides */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-8 flex items-center gap-3">
                <Book className="text-sage-green" /> Our Research Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.guides.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="font-lora text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        <Button asChild>
                          <Link href={item.link}>
                            Read Guide <FileText className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-8 flex items-center gap-3">
                <Users className="text-sage-green" /> Guided Support
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.services.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-sage-green/10 border-sage-green">
                      <CardHeader>
                        <CardTitle className="font-lora text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-800 mb-4">{item.description}</p>
                        <Button asChild>
                          <Link href={item.link}>Learn More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
