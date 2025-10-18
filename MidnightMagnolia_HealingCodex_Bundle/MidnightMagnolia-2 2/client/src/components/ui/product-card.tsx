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

  const priceLabel =
    typeof product.price === "number" && !Number.isNaN(product.price)
      ? formatPrice(product.price)
      : "Priced by ritual";

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
  };

  return (
    <article className="card product-card" data-testid={`card-product-${product.id}`}>
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="thumb"
          data-testid={`img-product-${product.id}`}
        />
      ) : null}

      <h3 data-testid={`text-product-name-${product.id}`}>{product.name}</h3>

      {product.category ? (
        <span className="pill" data-testid={`text-product-category-${product.id}`}>
          {product.category}
        </span>
      ) : null}

      <p className="price" data-testid={`text-product-price-${product.id}`}>
        {priceLabel}
      </p>

      {product.description ? (
        <p className="description" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>
      ) : null}

      <button
        type="button"
        className="cta small"
        onClick={handleAddToCart}
        data-testid={`button-add-to-cart-${product.id}`}
      >
        Add to cart
      </button>
    </article>
  );
}
