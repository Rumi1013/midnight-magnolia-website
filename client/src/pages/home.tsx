import Navigation from "@/components/ui/navigation";
import Hero from "@/components/ui/hero";
import Footer from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/ui/product-card";
import TierCard from "@/components/ui/tier-card";
import JournalPortal from "@/components/ui/journal-portal";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: featuredProducts } = useQuery({
    queryKey: ['/api/products/featured'],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero />

      {/* Brand Moodboard Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-accent">Brand Moodboard</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
            
            <div className="glass-card rounded-2xl p-8">
              <div className="aspect-video">
                <a className="asp-embed-link" href="https://new.express.adobe.com/webpage/TSeHXFj23vE6h/" target="_blank">
                  <img 
                    src="https://new.express.adobe.com/webpage/TSeHXFj23vE6h/resources?asset_id=rendition&buster=1760132903315"
                    alt="Magnolia Mood board" 
                    className="w-full rounded-lg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Sacred Story</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&h=800" 
                  alt="Magnolia flower blooming" 
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="space-y-6">
                <h3 className="font-display text-3xl font-semibold text-accent">A Modern Digital Grimoire</h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Midnight Magnolia is more than a platform—it's a sacred space where creativity meets consciousness. 
                  Born from the intersection of Southern Gothic tradition and modern digital artistry, we believe in the 
                  transformative power of intentional creation.
                </p>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Our mission is to provide tools, community, and inspiration for creators who seek to infuse their work 
                  with meaning, healing, and magic. Through AI-powered journaling, curated mystical products, and a 
                  supportive collective, we're building a new paradigm for spiritual entrepreneurship.
                </p>
                <div className="pt-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <i className="fas fa-moon text-accent text-2xl"></i>
                    <span className="font-accent text-lg">Conscious Creation</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <i className="fas fa-heart text-accent text-2xl"></i>
                    <span className="font-accent text-lg">Healing Through Design</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="fas fa-users text-accent text-2xl"></i>
                    <span className="font-accent text-lg">Sacred Community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Preview */}
      <section id="shop" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">The Digital Grimoire</h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated mystical tools and art to elevate your spiritual practice
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/shop" 
              className="btn-gold px-8 py-4 rounded-full text-accent-foreground font-accent font-semibold text-lg inline-block"
              data-testid="button-view-all-products"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Tiers Preview */}
      <section id="tiers" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Join The Collective</h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your path and unlock powerful tools for spiritual creation
            </p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TierCard 
              tier={{
                name: "Seeker",
                price: "Free",
                description: "Begin your journey",
                icon: "fas fa-seedling",
                features: [
                  "Access to public shop",
                  "Monthly newsletter", 
                  "Community forum access"
                ],
                unavailable: ["AI journal generation", "Creator dashboard"],
                buttonText: "Get Started",
                popular: false
              }}
            />
            <TierCard 
              tier={{
                name: "Creator", 
                price: "$29/mo",
                description: "For digital mystics",
                icon: "fas fa-magic",
                features: [
                  "Everything in Seeker",
                  "AI journal generation (50/mo)",
                  "Daily affirmations",
                  "Creator dashboard access",
                  "20% off all products"
                ],
                unavailable: [],
                buttonText: "Start Creating",
                popular: true
              }}
            />
            <TierCard 
              tier={{
                name: "Mystic",
                price: "$99/mo", 
                description: "Full manifestation",
                icon: "fas fa-crown",
                features: [
                  "Everything in Creator",
                  "Unlimited AI generations",
                  "1-on-1 coaching session",
                  "Notion template library",
                  "Exclusive product releases"
                ],
                unavailable: [],
                buttonText: "Unlock All",
                popular: false
              }}
            />
          </div>

          <div className="text-center mt-12">
            <p className="font-body text-muted-foreground">
              <i className="fas fa-lock text-accent mr-2"></i>
              Secure payments powered by Stripe
            </p>
          </div>
        </div>
      </section>

      <JournalPortal />
      <Footer />
    </div>
  );
}
