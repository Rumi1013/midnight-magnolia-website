import { notFound } from "next/navigation"
import { getProductBySlug, products } from "../data/products"
import ProductPageClient from "./ProductPageClient"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Product Not Found | Midnight Magnolia",
    }
  }

  return {
    title: `${product.name} | Midnight Magnolia Shop`,
    description: product.description,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}

