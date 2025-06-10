const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Verify Shopify webhook signature
const verifyShopifyWebhook = (req, res, next) => {
  const hmac = req.headers['x-shopify-hmac-sha256'];
  const body = req.body;
  
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('base64');

  if (hash === hmac) {
    next();
  } else {
    res.status(401).send('Invalid webhook signature');
  }
};

router.post('/webhooks/orders/create', verifyShopifyWebhook, async (req, res) => {
  try {
    const order = req.body;
    // Handle order creation
    console.log('New order received:', order.id);
    
    // Add your order processing logic here
    
    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Webhook processing failed');
  }
});

router.post('/webhooks/products/update', verifyShopifyWebhook, async (req, res) => {
  try {
    const product = req.body;
    // Handle product update
    console.log('Product updated:', product.id);
    
    // Add your product update logic here
    
    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Webhook processing failed');
  }
});

module.exports = router;