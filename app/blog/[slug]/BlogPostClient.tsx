"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, User, ArrowLeft, Share2, Heart } from "lucide-react"
import { useState } from "react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"
import type { BlogPost } from "../data/blogPosts"
import ReactMarkdown from "react-markdown"

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [liked, setLiked] = useState(false)

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24 pb-20">
        {/* Back Button */}
        <div className="container mx-auto px-6 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sage-green hover:text-rich-gold transition-colors duration-300 font-lora"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>

        {/* Hero Section */}
        <article className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-sage-green/20 text-sage-green font-montserrat text-sm font-semibold border border-sage-green/30">
                {post.category}
              </span>
              {post.featured && (
                <span className="inline-block px-4 py-2 rounded-full bg-rich-gold/20 text-rich-gold font-montserrat text-sm font-semibold border border-rich-gold/30">
                  ✨ Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-magnolia-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="font-lora text-xl text-magnolia-white/80 mb-8 leading-relaxed">{post.excerpt}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-magnolia-white/70 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} className="text-sage-green" />
                <span className="font-lora text-sm">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-sage-green" />
                <span className="font-lora text-sm">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-sage-green" />
                <span className="font-lora text-sm">{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Tag size={16} className="text-sage-green" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-magnolia-white/10 text-magnolia-white/70 font-lora text-xs hover:bg-magnolia-white/20 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 border border-rich-gold/20 shadow-2xl"
          >
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/60 to-transparent" />
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-12 pb-8 border-b border-magnolia-white/10">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                liked
                  ? "bg-rich-gold text-midnight-blue"
                  : "bg-magnolia-white/10 text-magnolia-white hover:bg-magnolia-white/20"
              }`}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
              <span className="font-montserrat text-sm font-semibold">
                {liked ? "Saved" : "Save"}
              </span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-magnolia-white/10 text-magnolia-white hover:bg-magnolia-white/20 transition-all duration-300">
              <Share2 size={18} />
              <span className="font-montserrat text-sm font-semibold">Share</span>
            </button>
          </div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="blog-content font-lora text-magnolia-white/90 leading-relaxed space-y-6">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-playfair text-4xl font-bold text-magnolia-white mt-12 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-playfair text-3xl font-bold text-magnolia-white mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-playfair text-2xl font-bold text-sage-green mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg leading-relaxed mb-6">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-rich-gold font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-sage-green italic">{children}</em>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 ml-4 mb-6">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 ml-4 mb-6">{children}</ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-sage-green pl-6 italic text-magnolia-white/80 my-8">
                      {children}
                    </blockquote>
                  ),
                  hr: () => (
                    <hr className="border-magnolia-white/20 my-12" />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Author Bio */}
          <div className="mt-16 pt-12 border-t border-magnolia-white/20">
            <div className="flex items-start gap-6 bg-magnolia-white/5 backdrop-blur-sm border border-magnolia-white/10 rounded-2xl p-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-sage-green">
                <Image
                  src="/placeholder-user.jpg"
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-2">
                  About {post.author}
                </h3>
                <p className="font-lora text-magnolia-white/80 leading-relaxed mb-4">
                  Latisha Vincent-Waters is the founder of Midnight Magnolia, a trauma-informed healing space
                  that centers neurodivergent Black women. She writes about gentle productivity, Southern Gothic
                  spirituality, and building businesses that honor rest.
                </p>
                <Link
                  href="/about"
                  className="text-sage-green hover:text-rich-gold transition-colors duration-300 font-montserrat text-sm font-semibold"
                >
                  Learn more about Latisha →
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-12 bg-sage-green/10 backdrop-blur-sm border border-sage-green/30 rounded-2xl p-8 text-center">
            <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-3">
              Want more healing wisdom in your inbox?
            </h3>
            <p className="font-lora text-magnolia-white/80 mb-6">
              Subscribe to the Midnight Moonletter for weekly reflections, exclusive resources, and gentle
              reminders that you're doing better than you think.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-midnight-blue border border-magnolia-white/20 text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:ring-2 focus:ring-sage-green font-lora"
              />
              <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h3 className="font-playfair text-3xl font-bold text-magnolia-white mb-8">Continue Reading</h3>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sage-green hover:text-rich-gold transition-colors duration-300 font-montserrat font-semibold"
            >
              View All Posts
              <ArrowLeft size={18} className="rotate-180" />
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

