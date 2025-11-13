import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const notionEmbedUrl = "https://midnight-magnolia.notion.site";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Mystical <span className="text-accent">Musings</span>
              </h1>
              <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore thoughts on spiritual healing, creative manifestation, and Southern Gothic mysticism.
              </p>
            </div>

            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center justify-between">
                  <span>
                    <i className="fas fa-book-open text-accent mr-3"></i>
                    Latest Reflections
                  </span>
                  <Button 
                    variant="outline" 
                    className="btn-gold"
                    onClick={() => window.open(notionEmbedUrl, "_blank")}
                    data-testid="button-view-full-blog"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    View Full Blog
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-background/50 rounded-lg overflow-hidden border border-border">
                  <iframe
                    src={notionEmbedUrl}
                    className="w-full h-[800px]"
                    title="Midnight Magnolia Blog"
                    data-testid="iframe-notion-blog"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center font-accent">
                  Blog powered by Notion • Updated regularly with new insights
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="glass-card hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-moon text-accent text-4xl mb-4"></i>
                  <h3 className="font-display text-xl font-bold mb-2">Lunar Wisdom</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Moon phases, rituals, and celestial guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-palette text-accent text-4xl mb-4"></i>
                  <h3 className="font-display text-xl font-bold mb-2">Creative Healing</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Art, journaling, and transformative expression.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-heart text-accent text-4xl mb-4"></i>
                  <h3 className="font-display text-xl font-bold mb-2">Southern Mysticism</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Gothic spirituality and ancestral wisdom.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
              <CardContent className="p-8 text-center">
                <h3 className="font-display text-2xl font-bold mb-4">
                  Subscribe to the Newsletter
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Receive weekly mystical musings, creative prompts, and exclusive content.
                </p>
                <Button className="btn-gold" data-testid="button-subscribe-newsletter">
                  <i className="fas fa-envelope mr-2"></i>
                  Join the Circle
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
