// Manual script to help create Stripe products
// Run this once you have the correct Stripe API key

console.log(`
=== Stripe Product Setup Instructions ===

Since we need the correct Stripe API key, please follow these steps:

1. Go to https://dashboard.stripe.com/test/products
2. Click "Add product" to create the Creator membership:
   - Name: Creator Membership
   - Description: For digital mystics - AI journal generation, daily affirmations, creator dashboard
   - Pricing: $29.00 / month (recurring)
   
3. Click "Add product" to create the Mystic membership:
   - Name: Mystic Membership  
   - Description: Full manifestation - Unlimited AI generations, coaching, exclusive content
   - Pricing: $99.00 / month (recurring)

4. After creating the products, get the Price IDs:
   - Click on each product
   - Copy the Price ID (starts with "price_")
   
5. Add these environment variables to your Replit secrets:
   - STRIPE_CREATOR_PRICE_ID=price_xxxxx (the Creator price ID)
   - STRIPE_MYSTIC_PRICE_ID=price_xxxxx (the Mystic price ID)
   - STRIPE_SECRET_KEY=sk_test_xxxxx (your API secret key)

The application is already set up to use these price IDs for subscriptions!
`);