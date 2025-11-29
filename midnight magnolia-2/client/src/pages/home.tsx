import Navigation from "@/components/ui/navigation";
import Hero from "@/components/ui/hero";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/product-card";
import TierCard from "@/components/ui/tier-card";
import JournalPortal from "@/components/ui/journal-portal";
import { useQuery } from "@tanstack/react-query";

type FeaturedProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export default function Home() {
  const { data: products = [] } = useQuery<FeaturedProduct[]>({
    queryKey: ["/api/products/featured"],
  });

  return (
    <div className="mm-app">
      <Navigation />
      <main>
        <Hero />

        <section className="intro" aria-labelledby="intro-heading">
          <h2 id="intro-heading">Rooted in ritual. Becoming with ease.</h2>
          <p>
            Midnight Magnolia is a southern-gothic digital healing brand crafted by Latisha Vincent-Waters. We weave
            ancestry, automation, and recovery wisdom into gentle products, guided services, and community automations
            that honor rest as the strategy and creation as the power.
          </p>
        </section>

        <section className="mm-container moodboard" aria-labelledby="moodboard-heading">
          <h2 id="moodboard-heading">Brand Moodboard</h2>
          <div className="card">
            <a
              className="asp-embed-link"
              href="https://new.express.adobe.com/webpage/TSeHXFj23vE6h/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://new.express.adobe.com/webpage/TSeHXFj23vE6h/resources?asset_id=rendition&buster=1760132903315"
                alt="Magnolia Mood board"
              />
            </a>
          </div>
        </section>

        <section id="about" className="mm-container about" aria-labelledby="about-heading">
          <h2 id="about-heading">Our Sacred Story</h2>
          <div className="about-grid">
            <img
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&h=800"
              alt="Magnolia flower blooming"
            />
            <div className="details">
              <h3>A Modern Digital Grimoire</h3>
              <p>
                Midnight Magnolia is more than a platform—it is a sacred space where creativity meets consciousness. Born
                from the intersection of Southern Gothic tradition and modern digital artistry, we believe in the
                transformative power of intentional creation.
              </p>
              <p>
                Our mission is to provide tools, community, and inspiration for creators who seek to infuse their work
                with meaning, healing, and magic. Through AI-powered journaling, curated mystical products, and a
                supportive collective, we're building a new paradigm for spiritual entrepreneurship.
              </p>
              <ul className="about-highlights">
                <li>
                  <i className="fas fa-moon" aria-hidden="true"></i>
                  <span>Conscious Creation</span>
                </li>
                <li>
                  <i className="fas fa-heart" aria-hidden="true"></i>
                  <span>Healing Through Design</span>
                </li>
                <li>
                  <i className="fas fa-users" aria-hidden="true"></i>
                  <span>Sacred Community</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="shop" className="mm-container shop" aria-labelledby="shop-heading">
          <h2 id="shop-heading">Shop — Digital &amp; Healing Tools</h2>
          <p className="note">
            Curated mystical tools and art to elevate your spiritual practice. New inventory is added as the seasons
            shift—restock notifications arrive via the newsletter.
          </p>
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <a
            href="/shop"
            className="cta small"
            data-testid="button-view-all-products"
          >
            View all products
          </a>
        </section>

        <section id="tiers" className="mm-container services" aria-labelledby="tiers-heading">
          <h2 id="tiers-heading">Creator Membership Paths</h2>
          <p className="note">
            Choose a pathway that keeps your magic sustainable. From Seekers exploring first rituals to Mystics ready for
            full manifestation, each tier protects rest and amplifies creativity.
          </p>
          <div className="grid">
            <TierCard
              tier={{
                name: "Seeker",
                price: "Free",
                description: "Begin your journey",
                icon: "fas fa-seedling",
                features: ["Access to public shop", "Monthly newsletter", "Community forum access"],
                unavailable: ["AI journal generation", "Creator dashboard"],
                buttonText: "Get Started",
                popular: false,
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
                  "20% off all products",
                ],
                unavailable: [],
                buttonText: "Start Creating",
                popular: true,
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
                  "Exclusive product releases",
                ],
                unavailable: [],
                buttonText: "Unlock All",
                popular: false,
              }}
            />
          </div>
          <p className="note success">
            <i className="fas fa-lock" aria-hidden="true"></i> Secure payments powered by Stripe
          </p>
        </section>

        <JournalPortal />
      </main>
      <Footer />
    </div>
  );
}
