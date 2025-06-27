"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, Heart, MessageCircle, Share2, X } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured?: boolean
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "healing-through-southern-gothic",
    title: "Healing Through Southern Gothic Wisdom",
    excerpt:
      "Discover how the haunting beauty of Southern Gothic tradition offers profound lessons for modern healing and transformation.",
    content: `The Spanish moss drapes like memories across ancient oaks, whispering stories of resilience and transformation. In the heart of Southern Gothic tradition lies a profound understanding of healing—one that embraces both shadow and light, acknowledging that true growth often emerges from our deepest wounds.

Southern Gothic wisdom teaches us that healing is not about perfection or the erasure of our scars. Instead, it's about finding beauty in the broken places, strength in vulnerability, and grace in the spaces between what was and what could be.

This tradition, born from a landscape marked by both beauty and trauma, offers us a roadmap for navigating our own healing journeys. It reminds us that transformation is not linear, that setbacks are not failures, and that sometimes the most profound growth happens in the quiet, liminal spaces of our lives.

As we walk this path of healing, we learn to honor our ancestors—both biological and spiritual—who paved the way with their own courage and resilience. We learn to tend our inner gardens with the same care we would give to a magnolia tree, knowing that some seasons require rest, others require pruning, and all require patience.

The Southern Gothic approach to healing is one of radical acceptance coupled with gentle action. It asks us to sit with our shadows not to wallow, but to understand. To listen to the stories our pain tells us, and to transform those stories into wisdom that can light the way for others.

In this digital age, we can carry these ancient wisdoms forward, creating new traditions that honor the old while embracing the possibilities of the new. This is the essence of Midnight Magnolia—bridging the sacred past with the transformative present.`,
    author: "Latisha Vincent-Waters",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Healing",
    tags: ["southern-gothic", "healing", "transformation", "wisdom"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "sacred-productivity-adhd",
    title: "Sacred Productivity for the Neurodivergent Soul",
    excerpt:
      "Reimagining productivity through a lens of compassion, honoring the unique rhythms of ADHD and neurodivergent minds.",
    content: `Traditional productivity advice often feels like trying to fit a magnolia tree into a rose garden—beautiful in its own right, but fundamentally mismatched. For those of us with ADHD and other neurodivergent minds, the conventional wisdom of rigid schedules and linear progress can feel more like punishment than empowerment.

Sacred productivity offers a different path. It begins with the radical act of honoring your natural rhythms rather than fighting against them. It recognizes that creativity and productivity can look like hyperfocus sessions followed by necessary rest, like bursts of inspiration that don't follow a 9-to-5 schedule, like the need for movement, music, or specific environments to think clearly.

This approach to productivity is rooted in self-compassion rather than self-discipline. It asks: "What does my mind need to flourish?" rather than "How can I force myself to work like everyone else?"

Sacred productivity practices include:

- **Rhythm Recognition**: Learning to identify your natural energy cycles and working with them rather than against them
- **Gentle Structure**: Creating flexible frameworks that provide support without rigidity
- **Sensory Awareness**: Understanding how your environment affects your ability to focus and creating spaces that support your unique needs
- **Rest as Resistance**: Recognizing that rest is not laziness but a necessary component of sustainable productivity
- **Progress Over Perfection**: Celebrating small wins and understanding that growth is not always linear

The goal is not to become more "normal" but to become more authentically yourself—productive in ways that honor your unique gifts and challenges. This is productivity as a spiritual practice, a way of honoring the sacred vessel that is your neurodivergent mind.`,
    author: "Latisha Vincent-Waters",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Productivity",
    tags: ["adhd", "neurodivergent", "productivity", "self-compassion"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
  },
  {
    id: "digital-altars-sacred-spaces",
    title: "Creating Digital Altars: Sacred Spaces in Virtual Realms",
    excerpt:
      "How to infuse your digital spaces with intention, creating virtual sanctuaries that support your spiritual and creative practice.",
    content: `In our increasingly digital world, the line between physical and virtual sacred space continues to blur. Just as our ancestors created altars in their homes to honor the divine and focus their intentions, we too can create digital altars that serve as portals to the sacred in our everyday online experiences.

A digital altar is more than just a pretty desktop wallpaper or a curated Instagram feed—though these can certainly be components. It's an intentional curation of digital elements that remind you of your values, support your spiritual practice, and create a sense of sacred space within the virtual realm.

Creating your digital altar might include:

**Visual Elements**: Choosing wallpapers, screensavers, and profile images that reflect your spiritual aesthetic and remind you of your intentions. This might be images of nature, sacred symbols, or artwork that speaks to your soul.

**Intentional Apps**: Curating your digital tools to support rather than distract from your spiritual practice. This might mean meditation apps, moon phase trackers, or digital journals for reflection.

**Sacred Bookmarks**: Creating collections of websites, articles, and resources that nourish your spirit and support your growth.

**Mindful Notifications**: Setting up reminders for prayer, meditation, gratitude practice, or simply moments of mindful breathing throughout your day.

**Digital Rituals**: Establishing practices like morning intention-setting through a notes app, evening gratitude journaling, or weekly digital decluttering as a form of spiritual cleansing.

The key is intentionality. Every element of your digital altar should serve a purpose in supporting your spiritual and creative practice. Like any sacred space, it requires regular tending—updating, cleansing, and refreshing to keep the energy flowing.

Remember, the goal is not to escape the digital world but to sanctify it, to bring the sacred into every aspect of our modern lives.`,
    author: "Latisha Vincent-Waters",
    date: "2024-01-05",
    readTime: "5 min read",
    category: "Spirituality",
    tags: ["digital-spirituality", "sacred-space", "intention", "mindfulness"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
  },
]

export default function BlogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categories = ["all", "healing", "productivity", "spirituality", "business"]

  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCategory === "all" || post.category.toLowerCase() === selectedCategory
  )

  const toggleFavorite = (postId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(postId)) {
      newFavorites.delete(postId)
    } else {
      newFavorites.add(postId)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Header */}
      <div className="bg-midnight-blue border-b border-sage-green/20 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-4xl md:text-6xl font-bold text-gold mb-6"
            >
              Midnight Musings
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto"
            >
              Sacred wisdom for the modern soul. Explore healing, productivity, and transformation through the lens of
              Southern Gothic grace.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-midnight-blue py-6 border-b border-sage-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-montserrat font-medium transition-all duration-300 text-sm capitalize ${
                  selectedCategory === category
                    ? "bg-sage-green text-midnight-blue shadow-lg"
                    : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-sage-green border border-sage-green/30"
                }`}
              >
                {category === "all" ? "All Musings" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-magnolia-white rounded-3xl overflow-hidden shadow-sm hover:shadow-mystical transition-all duration-300 border border-transparent hover:border-sage-green/30 group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {post.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold/90 text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold">
                        ✨ Featured
                      </span>
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(post.id)
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-colors duration-200"
                  >
                    <Heart
                      size={18}
                      className={`transition-colors duration-200 ${
                        favorites.has(post.id) ? "fill-sage-green text-sage-green" : "text-midnight-blue"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-midnight-blue/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span className="font-montserrat">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span className="font-montserrat">{post.readTime}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-sage-green/20 text-sage-green text-xs rounded-full font-montserrat font-medium">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-3 leading-tight line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-montserrat text-sm text-midnight-blue/60">By {post.author}</span>
                    <div className="flex items-center gap-2 text-midnight-blue/40">
                      <MessageCircle size={16} />
                      <Share2 size={16} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-2">No musings found</h3>
              <p className="font-lora text-magnolia-white/60">Try exploring a different category</p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-sage-green/20 to-gold/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-bold text-magnolia-white mb-4">
            Join Our Sacred Circle
          </h2>
          <p className="font-lora text-magnolia-white/80 mb-8">
            Receive weekly musings, healing wisdom, and gentle guidance delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your sacred email..."
              className="flex-1 px-4 py-3 rounded-full border border-sage-green/30 bg-magnolia-white/10 text-magnolia-white placeholder-magnolia-white/60 focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
            <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold px-6 py-3 rounded-full transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-midnight-blue/95 backdrop-blur-sm"
          >
            <div className="flex items-start justify-center min-h-screen px-4 py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-magnolia-white rounded-3xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-midnight-blue/10 hover:bg-midnight-blue/20 transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-midnight-blue" />
                </button>

                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={selectedPost.image || "/placeholder.svg"}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-magnolia-white/80">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span className="font-montserrat">
                          {new Date(selectedPost.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span className="font-montserrat">{selectedPost.readTime}</span>
                      </div>
                    </div>
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-magnolia-white mb-2">
                      {selectedPost.title}
                    </h1>
                    <p className="font-montserrat text-magnolia-white/80">By {selectedPost.author}</p>
                  </div>
                \
