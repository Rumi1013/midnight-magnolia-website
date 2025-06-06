// Midnight Magnolia - External Integrations
// Environment variable configuration for Shopify, Patreon, and other services

// ==============================================
// SHOPIFY CONFIGURATION
// ==============================================
export const shopifyConfig = {
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}

// ==============================================
// PATREON CONFIGURATION
// ==============================================
export const patreonConfig = {
  clientId: import.meta.env.PATREON_CLIENT_ID,
  accessToken: import.meta.env.PATREON_ACCESS_TOKEN,
}

// ==============================================
// HELPER FUNCTIONS
// ==============================================

// Check if all required environment variables are set
export const validateEnvironment = () => {
  const required = [
    'VITE_SHOPIFY_DOMAIN',
    'VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
    'PATREON_CLIENT_ID'
  ]

  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing)
    console.warn('Copy .env.example to .env and fill in your credentials')
    return false
  }
  
  return true
}

// Initialize analytics if configured
export const initializeAnalytics = () => {
  console.log('🌙 Midnight Magnolia - Ready for integrations')
}