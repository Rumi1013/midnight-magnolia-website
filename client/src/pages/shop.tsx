import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import ProductCard from "@/components/ui/product-card";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  const categories = [
    { id: "all", name: "All Products", icon: "fas fa-star" },
    { id: "tarot", name: "Tarot", icon: "fas fa-moon" },
    { id: "journal", name: "Journals", icon: "fas fa-book" },
    { id: "art", name: "Art Prints", icon: "fas fa-palette" },
    { id: "oracle", name: "Oracle Cards", icon: "fas fa-eye" },
    { id: "crystal", name: "Crystals", icon: "fas fa-gem" },
    { id: "ritual", name: "Ritual Kits", icon: "fas fa-fire" },
  ];

  const filteredProducts = products?.filter((product: any) => 
    selectedCategory === "all" || product.category === selectedCategory
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-12 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              The Digital <span className="text-accent">Grimoire</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Curated mystical tools and art to elevate your spiritual practice
            </p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-accent text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'btn-gold text-accent-foreground'
                    : 'border border-border text-muted-foreground hover:text-accent hover:border-accent'
                }`}
                data-testid={`filter-${category.id}`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredProducts?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts?.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
              <p className="font-body text-lg text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
