export default function Hero() {
  return (
    <section className="relative hero-pattern py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <i className="fas fa-spa text-accent text-6xl magnolia-icon mb-6 inline-block"></i>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-accent">
            Midnight Magnolia
          </h1>
          <p className="font-cursive text-2xl md:text-3xl text-[#EEE3CF] mb-6 italic">
            Rooted in mystery. Blooming in truth.
          </p>
          <p className="font-body text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
            Build digital magic. Heal through design.
          </p>
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Explore creative tools, art, and automation for a softer way to thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/shop" 
              className="btn-gold px-8 py-4 rounded-full text-accent-foreground font-accent font-semibold text-lg inline-block"
              data-testid="button-browse-collection"
            >
              Browse the Collection
            </a>
            <a 
              href="/tiers" 
              className="border-2 border-accent px-8 py-4 rounded-full text-accent font-accent font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 inline-block"
              data-testid="button-join-collective"
            >
              Join The Collective
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <i className="fas fa-star text-accent text-3xl"></i>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <i className="fas fa-star text-secondary text-2xl"></i>
      </div>
    </section>
  );
}
