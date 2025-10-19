import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import TierCard from "@/components/ui/tier-card";

export default function Tiers() {
  const tiers = [
    {
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
    },
    {
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
    },
    {
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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Join The <span className="text-accent">Collective</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Choose your path and unlock powerful tools for spiritual creation
            </p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="font-display text-2xl font-bold mb-4">Why Choose Midnight Magnolia?</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <i className="fas fa-shield-alt text-accent text-3xl mb-3"></i>
                <h4 className="font-accent font-semibold mb-2">Secure & Private</h4>
                <p className="font-body text-sm text-muted-foreground">
                  Your spiritual journey is sacred. We protect your data with enterprise-grade security.
                </p>
              </div>
              <div className="text-center">
                <i className="fas fa-brain text-accent text-3xl mb-3"></i>
                <h4 className="font-accent font-semibold mb-2">AI-Powered Insights</h4>
                <p className="font-body text-sm text-muted-foreground">
                  Our advanced AI understands the nuances of spiritual growth and creative expression.
                </p>
              </div>
              <div className="text-center">
                <i className="fas fa-heart text-accent text-3xl mb-3"></i>
                <h4 className="font-accent font-semibold mb-2">Community Support</h4>
                <p className="font-body text-sm text-muted-foreground">
                  Connect with like-minded souls on a similar journey of conscious creation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="font-body text-muted-foreground mb-4">
              <i className="fas fa-lock text-accent mr-2"></i>
              Secure payments powered by Stripe
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Cancel anytime • No hidden fees • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
