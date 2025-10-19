import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log("Adding to cart:", product);
  };

  return (
    <div className="product-card glass-card rounded-2xl p-6 transition-all duration-300 gold-glow border border-border">
      {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-64 object-cover rounded-xl mb-6"
          data-testid={`img-product-${product.id}`}
        />
      )}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-2xl font-semibold" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <span className="text-accent font-accent font-semibold text-xl" data-testid={`text-product-price-${product.id}`}>
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="font-body text-muted-foreground mb-6" data-testid={`text-product-description-${product.id}`}>
        {product.description}
      </p>
      <Button 
        onClick={handleAddToCart}
        className="w-full btn-gold py-3 rounded-full text-accent-foreground font-accent font-semibold"
        data-testid={`button-add-to-cart-${product.id}`}
      >
        Add to Cart
      </Button>
    </div>
  );
}
