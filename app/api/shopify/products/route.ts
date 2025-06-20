import { type NextRequest, NextResponse } from "next/server"

// 🌙 Sacred Shopify configuration using your credentials
const SHOPIFY_DOMAIN = process.env.SHOPIFY_STOREFRONT_ADMIN?.replace("https://", "").replace("http://", "")
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_ADMIN_API
const SHOPIFY_API_VERSION = "2024-01"

// 🌸 Storefront API GraphQL query for customer-facing products
const STOREFRONT_PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after, available: true) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          productType
          vendor
          tags
          createdAt
          updatedAt
          availableForSale
          totalInventory
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

// 🌿 Sacred Shopify Storefront API client
async function shopifyStorefrontFetch(query: string, variables: any = {}) {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Sacred Shopify credentials are not properly configured")
  }

  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Shopify API Response Error:", response.status, errorText)
      throw new Error(`Shopify API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error("Shopify GraphQL Errors:", data.errors)
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
    }

    return data
  } catch (error) {
    console.error("Sacred Shopify connection error:", error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20"), 50) // Max 50 per request
    const after = searchParams.get("after") || null

    console.log("🌙 Fetching sacred products from Shopify...")
    console.log("Domain:", SHOPIFY_DOMAIN)
    console.log("Has Token:", !!SHOPIFY_STOREFRONT_TOKEN)

    // 🌙 Fetch sacred products from Shopify Storefront
    const response = await shopifyStorefrontFetch(STOREFRONT_PRODUCTS_QUERY, {
      first: limit,
      after,
    })

    if (!response.data?.products) {
      throw new Error("No products data received from Shopify")
    }

    // 🌸 Transform Shopify data into sacred offerings
    const products = response.data.products.edges.map((edge: any) => {
      const product = edge.node
      const minPrice = Number.parseFloat(product.priceRange.minVariantPrice.amount)
      const maxPrice = Number.parseFloat(product.priceRange.maxVariantPrice.amount)

      // Get compare at price if available
      const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
        ? Number.parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
        : product.variants.edges[0]?.node?.compareAtPrice?.amount
          ? Number.parseFloat(product.variants.edges[0].node.compareAtPrice.amount)
          : null

      // 🌿 Sacred tag analysis
      const tags = product.tags || []
      const isBlessed = tags.some((tag: string) =>
        ["blessed", "featured", "special", "sacred"].includes(tag.toLowerCase()),
      )
      const isBestseller = tags.some((tag: string) =>
        ["bestseller", "popular", "top", "favorite"].includes(tag.toLowerCase()),
      )
      const isNew =
        tags.some((tag: string) => ["new", "latest", "fresh"].includes(tag.toLowerCase())) ||
        new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      return {
        id: product.id,
        shopifyId: product.id,
        name: product.title,
        handle: product.handle,
        description: product.description || "",
        price: minPrice,
        maxPrice: maxPrice !== minPrice ? maxPrice : null,
        originalPrice: compareAtPrice && compareAtPrice > minPrice ? compareAtPrice : null,
        image: product.featuredImage?.url || "/placeholder.svg?height=400&width=400&text=Sacred+Product",
        images: product.images.edges.map((img: any) => ({
          url: img.node.url,
          alt: img.node.altText || product.title,
          width: img.node.width,
          height: img.node.height,
        })),
        category: "physical", // All Shopify products are physical
        subcategory: product.productType || "Sacred Items",
        vendor: product.vendor || "Midnight Magnolia",
        tags: tags,
        availableForSale: product.availableForSale,
        totalInventory: product.totalInventory,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        // 🌸 Sacred indicators
        isBlessed,
        isBestseller,
        isNew,
        // Additional variant info
        variantId: product.variants.edges[0]?.node?.id,
        quantityAvailable: product.variants.edges[0]?.node?.quantityAvailable,
      }
    })

    console.log(`✨ Successfully fetched ${products.length} sacred products`)

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        hasNextPage: response.data.products.pageInfo.hasNextPage,
        hasPreviousPage: response.data.products.pageInfo.hasPreviousPage,
        lastCursor: response.data.products.edges[response.data.products.edges.length - 1]?.cursor,
        startCursor: response.data.products.pageInfo.startCursor,
        endCursor: response.data.products.pageInfo.endCursor,
      },
      meta: {
        totalFetched: products.length,
        domain: SHOPIFY_DOMAIN,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("💔 Sacred Shopify connection error:", error)

    // 🌙 Graceful fallback with healing energy
    return NextResponse.json(
      {
        success: false,
        error: "Unable to connect to sacred product sanctuary",
        message: error.message || "Our product spirits are temporarily resting. Please try again in a moment.",
        products: [],
        debug: {
          domain: SHOPIFY_DOMAIN,
          hasToken: !!SHOPIFY_STOREFRONT_TOKEN,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}

// 🌸 Health check endpoint
export async function HEAD() {
  try {
    if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
      return new Response(null, { status: 503 })
    }
    return new Response(null, { status: 200 })
  } catch {
    return new Response(null, { status: 503 })
  }
}
