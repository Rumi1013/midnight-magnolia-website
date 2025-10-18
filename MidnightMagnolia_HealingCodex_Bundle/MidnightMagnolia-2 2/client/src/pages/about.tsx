import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Our Sacred <span className="text-accent">Story</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Where Southern Gothic elegance meets modern spiritual practice
            </p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&h=400" 
                    alt="Magnolia blossom" 
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold mb-6 text-accent">The Vision</h2>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed mb-4">
                    Midnight Magnolia was born from a deep belief that creativity and spirituality are inseparable forces. 
                    In the quiet hours of midnight, when the veil between worlds grows thin, the magnolia blooms in all 
                    its ethereal beauty—a symbol of perseverance, dignity, and the magic that emerges from darkness.
                  </p>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    Our platform bridges the ancient wisdom of Southern Gothic tradition with cutting-edge AI technology, 
                    creating a sanctuary where modern mystics can explore, create, and heal through intentional design.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 mb-16">
                <h2 className="font-display text-3xl font-bold mb-8 text-center">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <i className="fas fa-moon text-accent text-4xl mb-4 magnolia-icon"></i>
                    <h3 className="font-display text-xl font-semibold mb-3">Conscious Creation</h3>
                    <p className="font-body text-muted-foreground">
                      Every piece of content, every design choice, every word is infused with intention and meaning.
                    </p>
                  </div>
                  <div className="text-center">
                    <i className="fas fa-heart text-accent text-4xl mb-4 magnolia-icon"></i>
                    <h3 className="font-display text-xl font-semibold mb-3">Healing Through Design</h3>
                    <p className="font-body text-muted-foreground">
                      We believe that beautiful, meaningful design has the power to heal and transform lives.
                    </p>
                  </div>
                  <div className="text-center">
                    <i className="fas fa-users text-accent text-4xl mb-4 magnolia-icon"></i>
                    <h3 className="font-display text-xl font-semibold mb-3">Sacred Community</h3>
                    <p className="font-body text-muted-foreground">
                      Building connections between like-minded souls who value depth, beauty, and authenticity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-6 text-accent">The Journey Ahead</h2>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed mb-4">
                    As we continue to grow and evolve, our commitment remains unwavering: to provide tools, inspiration, 
                    and community for creators who dare to infuse their work with soul and substance.
                  </p>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                    Through AI-powered journaling, curated mystical products, and authentic connection, we're building 
                    more than a platform—we're cultivating a movement of conscious creators who understand that true 
                    magic happens when technology serves the heart.
                  </p>
                  <a 
                    href="/signup" 
                    className="btn-gold px-6 py-3 rounded-full text-accent-foreground font-accent font-semibold inline-block"
                    data-testid="button-join-movement"
                  >
                    Join Our Movement
                  </a>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&h=400" 
                    alt="Mystical moonlight scene" 
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
