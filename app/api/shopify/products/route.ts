import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would:
    // 1. Retrieve Shopify credentials from secure storage
    // 2. Make an authenticated request to the Shopify API
    // 3. Process and return the products data

    // For this example, we'll return mock data
    const mockProducts = [
      {
        id: "gid://shopify/Product/1234567890",
        title: "Magnolia Bloom Tote Bag",
        handle: "magnolia-bloom-tote-bag",
        description: "Elegant tote featuring our signature magnolia design on premium eco-canvas",
        images: [
          {
            id: "gid://shopify/ProductImage/1234567890",
            src: "/magnolia-tote-bag.png",
            alt: "Magnolia Bloom Tote Bag",
          },
        ],
        variants: [
          {
            id: "gid://shopify/ProductVariant/1234567890",
            title: "Default Title",
            price: "34.99",
            compareAtPrice: "42.99",
            sku: "MM-TOTE-001",
            inventoryQuantity: 24,
          },
        ],
        status: "active",
        productType: "Accessories",
        vendor: "Midnight Magnolia",
        tags: ["tote", "bag", "magnolia", "eco-friendly"],
        createdAt: "2023-06-01T10:00:00Z",
        updatedAt: "2023-06-07T14:30:00Z",
      },
      // Add more mock products as needed
    ]

    return NextResponse.json({
      products: mockProducts,
      pagination: {
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: mockProducts.length,
      },
    })
  } catch (error: any) {
    console.error("Error fetching Shopify products:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // In a real implementation, you would:
    // 1. Validate the product data
    // 2. Create the product in Shopify using the Admin API
    // 3. Return the created product data

    // For this example, we'll return a mock response
    return NextResponse.json({
      success: true,
      product: {
        id: "gid://shopify/Product/new123456",
        title: productData.title,
        status: "draft",
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("Error creating Shopify product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

// 🌙 Sacred Shopify configuration - SERVER-SIDE ONLY
const SHOPIFY_DOMAIN = "3ada30-b9.myshopify.com"

// 🌸 Server-side only token (no NEXT_PUBLIC_ prefix)
const SHOPIFY_STOREFRONT_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.Storefront_API_access_token ||
  "7d01fd6b53d40fa958e39a5f49fa0ea8" // Your actual token as fallback

const SHOPIFY_API_VERSION = "2024-01"

// 🌸 Sacred products query
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          vendor
          tags
          availableForSale
          totalInventory
          featuredImage {
            url
            altText
            width
            height
          }
          images(first: 5) {
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
          variants(first: 3) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

export async function GET(request: NextRequest) {
  try {
    console.log("🌙 Connecting to sacred Shopify sanctuary...")
    console.log("Domain:", SHOPIFY_DOMAIN)
    console.log("Token found:", !!SHOPIFY_STOREFRONT_TOKEN)

    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20"), 50)

    const apiUrl = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`

    // Make the sacred connection to Shopify
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        "User-Agent": "Midnight-Magnolia-Sanctuary/1.0",
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { first: limit },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Shopify API Error:", response.status, errorText)

      return NextResponse.json(
        {
          success: false,
          error: `API Error: ${response.status}`,
          message: `Failed to connect to Shopify`,
          debug: {
            status: response.status,
            domain: SHOPIFY_DOMAIN,
          },
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors)
      return NextResponse.json(
        {
          success: false,
          error: "GraphQL errors",
          message: "API returned errors",
          debug: {
            errors: data.errors,
          },
        },
        { status: 400 },
      )
    }

    // Transform Shopify products into sacred Midnight Magnolia offerings
    const allProducts =
      data.data?.products?.edges?.map((edge: any) => {
        const product = edge.node
        const minPrice = Number.parseFloat(product.priceRange.minVariantPrice.amount)
        const maxPrice = Number.parseFloat(product.priceRange.maxVariantPrice.amount)

        const tags = product.tags || []
        const isBlessed = tags.some((tag: string) =>
          ["blessed", "featured", "special", "sacred", "bestseller"].includes(tag.toLowerCase()),
        )
        const isBestseller = tags.some((tag: string) =>
          ["bestseller", "popular", "top", "favorite"].includes(tag.toLowerCase()),
        )
        const isNew = tags.some((tag: string) => ["new", "latest", "fresh"].includes(tag.toLowerCase()))

        return {
          id: product.id,
          shopifyId: product.id,
          name: product.title,
          handle: product.handle,
          description: product.description || "",
          price: minPrice,
          maxPrice: maxPrice !== minPrice ? maxPrice : null,
          currency: product.priceRange.minVariantPrice.currencyCode,
          image: product.featuredImage?.url || "/placeholder.svg?height=400&width=400&text=Sacred+Product",
          images: product.images.edges.map((img: any) => ({
            url: img.node.url,
            alt: img.node.altText || product.title,
            width: img.node.width,
            height: img.node.height,
          })),
          category: "physical",
          subcategory: product.productType || "Sacred Items",
          vendor: product.vendor || "Midnight Magnolia",
          tags: tags,
          availableForSale: product.availableForSale,
          totalInventory: product.totalInventory,
          isBlessed,
          isBestseller,
          isNew,
          variants: product.variants.edges.map((v: any) => ({
            id: v.node.id,
            title: v.node.title,
            price: Number.parseFloat(v.node.price.amount),
            availableForSale: v.node.availableForSale,
          })),
        }
      }) || []

    // Filter for available products only
    const products = allProducts.filter((product) => product.availableForSale)

    console.log(`✨ Successfully fetched ${products.length} sacred products`)

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        hasNextPage: data.data?.products?.pageInfo?.hasNextPage || false,
        hasPreviousPage: data.data?.products?.pageInfo?.hasPreviousPage || false,
      },
      meta: {
        totalFetched: products.length,
        domain: SHOPIFY_DOMAIN,
        tokenType: "Storefront API ✨",
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("💔 Sacred Shopify connection error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Connection failed",
        message: error.message || "Unable to connect to sacred product sanctuary",
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
