import Stripe from 'stripe';

// Script to create Stripe products and prices for subscriptions
async function setupStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-09-30.clover',
  });

  try {
    // Create Creator product
    const creatorProduct = await stripe.products.create({
      name: 'Creator Membership',
      description: 'For digital mystics - AI journal generation, daily affirmations, creator dashboard',
      metadata: {
        tier: 'creator'
      }
    });

    // Create Creator price ($29/month)
    const creatorPrice = await stripe.prices.create({
      product: creatorProduct.id,
      unit_amount: 2900, // $29.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'month'
      },
      metadata: {
        tier: 'creator'
      }
    });

    // Create Mystic product
    const mysticProduct = await stripe.products.create({
      name: 'Mystic Membership',
      description: 'Full manifestation - Unlimited AI generations, coaching, exclusive content',
      metadata: {
        tier: 'mystic'
      }
    });

    // Create Mystic price ($99/month)
    const mysticPrice = await stripe.prices.create({
      product: mysticProduct.id,
      unit_amount: 9900, // $99.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'month'
      },
      metadata: {
        tier: 'mystic'
      }
    });

    console.log('Stripe products created successfully:');
    console.log('Creator Price ID:', creatorPrice.id);
    console.log('Mystic Price ID:', mysticPrice.id);
    console.log('\nAdd these to your environment variables:');
    console.log(`STRIPE_CREATOR_PRICE_ID=${creatorPrice.id}`);
    console.log(`STRIPE_MYSTIC_PRICE_ID=${mysticPrice.id}`);

    return {
      creatorPriceId: creatorPrice.id,
      mysticPriceId: mysticPrice.id
    };
  } catch (error) {
    console.error('Error creating Stripe products:', error);
    throw error;
  }
}

// Run setup
setupStripeProducts().catch(console.error);

export { setupStripeProducts };