// Unified commerce fetcher for Shopify Storefront + Etsy Open API v3
// Falls back to local /src/data/products.json when creds are missing
import localProducts from '../data/products.json'

export async function fetchAllProducts(){
  const results = []
  const errs = []

  // Shopify Storefront API
  const shopDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
  const shopToken  = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
  if (shopDomain && shopToken){
    try{
      const url = `https://${shopDomain}/api/2024-07/graphql.json`
      const query = `
        query Products($first:Int!) {
          products(first:$first) {
            edges{
              node{
                id title productType tags
                handle
                featuredImage{ url altText }
                variants(first:1){ edges{ node{ price{ amount currencyCode } } } }
              }
            }
          }
        }`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'X-Shopify-Storefront-Access-Token': shopToken
        },
        body: JSON.stringify({ query, variables:{ first: 20 } })
      })
      if(!res.ok) throw new Error(await res.text())
      const data = await res.json()
      const edges = data?.data?.products?.edges ?? []
      edges.forEach(({node})=>{
        const price = node?.variants?.edges?.[0]?.node?.price?.amount ?? null
        results.push({
          source:'shopify',
          slug: node.handle,
          title: node.title,
          price: price ? Number(price) : null,
          type: node.productType || 'Product',
          tags: node.tags || [],
          image: node.featuredImage?.url || null,
          url: `https://${shopDomain}/products/${node.handle}`
        })
      })
    }catch(e){ errs.push('shopify:'+e.message) }
  }

  // Etsy Open API v3
  const etsyKey = import.meta.env.VITE_ETSY_API_KEY
  const etsyShopId = import.meta.env.VITE_ETSY_SHOP_ID
  if (etsyKey && etsyShopId){
    try{
      const url = `https://openapi.etsy.com/v3/application/shops/${etsyShopId}/listings/active?limit=24`
      const res = await fetch(url, {
        headers: { 'x-api-key': etsyKey }
      })
      if(!res.ok) throw new Error(await res.text())
      const data = await res.json()
      const listings = data?.results ?? data?.listings ?? []
      listings.forEach((l)=>{
        results.push({
          source:'etsy',
          slug: String(l.listing_id),
          title: l.title,
          price: l.price?.amount ? (Number(l.price.amount)/100) : (Number(l.price)||null),
          type: 'Etsy',
          tags: l.tags || [],
          image: Array.isArray(l.images) && l.images.length ? l.images[0].url_fullxfull : null,
          url: l.url || `https://www.etsy.com/listing/${l.listing_id}`
        })
      })
    }catch(e){ errs.push('etsy:'+e.message) }
  }

  // Fallback to local if nothing fetched
  if(results.length===0){
    return { items: localProducts.map(p=>({...p, source:'local'})), errors: errs }
  }
  return { items: results, errors: errs }
}
