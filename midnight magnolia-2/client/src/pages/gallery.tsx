import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Gallery() {
  const adobePortfolioUrl = "https://midnightmagnolia.myportfolio.com";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Art <span className="text-accent">Gallery</span>
              </h1>
              <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
                A visual journey through Southern Gothic mysticism and spiritual artistry
              </p>
            </div>

            {/* Adobe Portfolio Embed */}
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center justify-between flex-wrap gap-4">
                  <span>
                    <i className="fas fa-palette text-accent mr-3"></i>
                    Featured Works
                  </span>
                  <Button 
                    variant="outline" 
                    className="btn-gold"
                    onClick={() => window.open(adobePortfolioUrl, '_blank')}
                    data-testid="button-view-full-gallery"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    View Full Portfolio
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-background/50 rounded-lg overflow-hidden border border-border">
                  <iframe
                    src={adobePortfolioUrl}
                    className="w-full h-[900px]"
                    title="Midnight Magnolia Art Gallery"
                    data-testid="iframe-adobe-portfolio"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center font-accent">
                  Portfolio powered by Adobe Portfolio • All works © Midnight Magnolia
                </p>
              </CardContent>
            </Card>

            {/* Art Categories */}
            <Tabs defaultValue="illustrations" className="mb-12">
              <TabsList className="grid w-full grid-cols-4 glass-card">
                <TabsTrigger value="illustrations" className="font-accent">
                  <i className="fas fa-image mr-2"></i>
                  Illustrations
                </TabsTrigger>
                <TabsTrigger value="tarot" className="font-accent">
                  <i className="fas fa-sparkles mr-2"></i>
                  Tarot Art
                </TabsTrigger>
                <TabsTrigger value="mixed-media" className="font-accent">
                  <i className="fas fa-brush mr-2"></i>
                  Mixed Media
                </TabsTrigger>
                <TabsTrigger value="digital" className="font-accent">
                  <i className="fas fa-laptop mr-2"></i>
                  Digital
                </TabsTrigger>
              </TabsList>

              <TabsContent value="illustrations" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="glass-card group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden aspect-square">
                        <img 
                          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&h=800" 
                          alt="Magnolia Moon"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div>
                            <h3 className="font-display text-xl font-bold text-accent">Magnolia Moon</h3>
                            <p className="font-body text-sm text-muted-foreground">Southern Gothic Series</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden aspect-square">
                        <img 
                          src="https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?auto=format&fit=crop&w=800&h=800" 
                          alt="Botanical Dreams"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div>
                            <h3 className="font-display text-xl font-bold text-accent">Botanical Dreams</h3>
                            <p className="font-body text-sm text-muted-foreground">Nature Mysticism</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden aspect-square">
                        <img 
                          src="https://images.unsplash.com/photo-1604754742629-3e5728249d73?auto=format&fit=crop&w=800&h=800" 
                          alt="Crystal Visions"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div>
                            <h3 className="font-display text-xl font-bold text-accent">Crystal Visions</h3>
                            <p className="font-body text-sm text-muted-foreground">Healing Energy</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tarot" className="mt-6">
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <i className="fas fa-cards text-accent text-6xl mb-4 magnolia-icon"></i>
                    <h3 className="font-display text-2xl font-bold mb-4">Custom Tarot Designs</h3>
                    <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-6">
                      Hand-illustrated tarot cards featuring Southern Gothic imagery, magnolia symbolism, and mystical moon phases. Each card tells a story of transformation and spiritual awakening.
                    </p>
                    <Button className="btn-gold" data-testid="button-commission-tarot">
                      <i className="fas fa-envelope mr-2"></i>
                      Commission Custom Tarot
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mixed-media" className="mt-6">
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <i className="fas fa-layer-group text-accent text-6xl mb-4"></i>
                    <h3 className="font-display text-2xl font-bold mb-4">Mixed Media Explorations</h3>
                    <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-6">
                      Combining traditional watercolor, ink, and digital techniques to create layered pieces that bridge the physical and spiritual realms.
                    </p>
                    <Button className="btn-gold" data-testid="button-explore-mixed-media">
                      <i className="fas fa-images mr-2"></i>
                      Explore Collection
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="digital" className="mt-6">
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <i className="fas fa-desktop text-accent text-6xl mb-4"></i>
                    <h3 className="font-display text-2xl font-bold mb-4">Digital Mysticism</h3>
                    <p className="font-body text-muted-foreground max-w-2xl mx-auto mb-6">
                      Modern digital artistry infused with ancient symbols and Southern Gothic atmospheres. Perfect for prints, phone wallpapers, and digital altars.
                    </p>
                    <Button className="btn-gold" data-testid="button-view-digital-art">
                      <i className="fas fa-download mr-2"></i>
                      Download Art
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Commission CTA */}
            <Card className="glass-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-display text-3xl font-bold mb-4">
                      Commission Custom Art
                    </h3>
                    <p className="font-body text-muted-foreground mb-6">
                      Bring your spiritual vision to life with custom illustrations, tarot designs, or sacred art pieces tailored to your unique journey.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="font-accent flex items-center">
                        <i className="fas fa-check-circle text-accent mr-3"></i>
                        Custom tarot card designs
                      </li>
                      <li className="font-accent flex items-center">
                        <i className="fas fa-check-circle text-accent mr-3"></i>
                        Oracle deck illustrations
                      </li>
                      <li className="font-accent flex items-center">
                        <i className="fas fa-check-circle text-accent mr-3"></i>
                        Spiritual portraits & sacred geometry
                      </li>
                    </ul>
                    <Button className="btn-gold" data-testid="button-request-commission">
                      <i className="fas fa-paint-brush mr-2"></i>
                      Request a Commission
                    </Button>
                  </div>
                  <div className="relative h-64 md:h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&h=400" 
                      alt="Artist at work"
                      className="rounded-lg object-cover w-full h-full border-2 border-accent/30"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
