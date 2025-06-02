# 🌙 Midnight Magnolia Integration Setup Guide

This guide walks you through setting up Shopify, Patreon, and other service integrations for your Midnight Magnolia website.

## 🚀 Quick Setup

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your credentials** (see detailed instructions below)

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

---

## 🛍️ Shopify Integration

### Step 1: Get Your Shopify Credentials

1. **Go to your Shopify Admin** → Apps → App and sales channel settings
2. **Create a Private App** or use the Storefront API
3. **Get your credentials:**
   - Store domain: `your-store.myshopify.com`
   - Storefront access token
   - Admin API access token (for order management)

### Step 2: Configure Shopify in .env

```env
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_token
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret
```

### Step 3: Set Up Webhooks (Optional)

Configure webhooks in Shopify Admin to send order notifications to Make.com:
- **Endpoint:** Your Make.com webhook URL
- **Events:** Order creation, payment, fulfillment

---

## 💫 Patreon Integration

### Step 1: Create a Patreon App

1. **Go to** [Patreon Developer Portal](https://www.patreon.com/portal/registration/register-clients)
2. **Create a new client**
3. **Set redirect URI:** `https://your-domain.com/auth/patreon/callback`

### Step 2: Configure Patreon in .env

```env
PATREON_CLIENT_ID=your_client_id
PATREON_CLIENT_SECRET=your_client_secret
PATREON_ACCESS_TOKEN=your_access_token
PATREON_CAMPAIGN_ID=your_campaign_id
```

### Step 3: Get Your Campaign ID

1. **Use Patreon API:** `https://www.patreon.com/api/oauth2/v2/campaigns`
2. **Or check your Patreon creator dashboard**

---

## 💳 Payment Processing (Stripe)

### Step 1: Get Stripe Keys

1. **Go to** [Stripe Dashboard](https://dashboard.stripe.com/)
2. **Navigate to** Developers → API keys
3. **Copy your keys** (use test keys for development)

### Step 2: Configure Stripe in .env

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

---

## 📧 Email & Marketing

### Mailchimp Setup

1. **Get API Key:** Account → Extras → API keys
2. **Get List ID:** Audience → Settings → Unique id

```env
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_LIST_ID=your_list_id
```

### SendGrid Setup (Transactional Emails)

1. **Create API Key** in SendGrid dashboard
2. **Configure sender authentication**

```env
SENDGRID_API_KEY=your_sendgrid_key
```

---

## 🤖 Make.com Automation

### Step 1: Create Webhooks in Make.com

1. **Create scenarios** for:
   - New orders (Shopify → Email/Airtable)
   - New subscribers (Website → Mailchimp)
   - Contact form submissions (Website → Email)

2. **Copy webhook URLs** from each scenario

### Step 2: Configure Make.com in .env

```env
MAKE_ORDER_WEBHOOK_URL=https://hook.make.com/your_order_webhook
MAKE_SUBSCRIBER_WEBHOOK_URL=https://hook.make.com/your_subscriber_webhook
MAKE_CONTACT_WEBHOOK_URL=https://hook.make.com/your_contact_webhook
```

---

## 📊 Analytics Setup

### Google Analytics 4

1. **Create GA4 property**
2. **Get Measurement ID** (G-XXXXXXXXXX)

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Facebook Pixel

1. **Create Facebook Pixel** in Events Manager
2. **Copy Pixel ID**

```env
VITE_FACEBOOK_PIXEL_ID=your_pixel_id
```

---

## 🔐 Security Configuration

### JWT & Session Secrets

Generate secure random strings:

```bash
# Generate secure secrets
openssl rand -base64 32
```

```env
JWT_SECRET=your_super_secure_jwt_secret
SESSION_SECRET=your_session_secret
```

---

## 🚀 Deployment Configuration

### Railway Deployment

```env
RAILWAY_STATIC_URL=https://your-app.railway.app
VITE_SITE_URL=https://midnightmagnolia.com
NODE_ENV=production
```

---

## ✅ Testing Your Setup

1. **Check integration status** in browser console (development mode)
2. **Test each service:**
   - Place a test order in Shopify
   - Join a Patreon tier
   - Submit contact form
   - Subscribe to newsletter

3. **Verify webhooks** are receiving data in Make.com

---

## 🔧 Troubleshooting

### Common Issues

**Shopify not loading products:**
- Check domain format (include .myshopify.com)
- Verify Storefront API permissions
- Ensure CORS is configured

**Patreon authentication failing:**
- Check redirect URI matches exactly
- Verify client ID and secret
- Ensure campaign is active

**Make.com webhooks not working:**
- Test webhook URLs manually
- Check request format (JSON)
- Verify CORS headers

### Debug Mode

Enable debug logging:

```env
DEBUG=true
NODE_ENV=development
```

---

## 🌙 Integration Checklist

- [ ] Shopify store connected
- [ ] Patreon tiers syncing
- [ ] Stripe payments working
- [ ] Email automation active
- [ ] Analytics tracking
- [ ] Make.com workflows tested
- [ ] All webhooks functioning
- [ ] SSL certificates installed
- [ ] Domain configured

---

**Need help?** Check the integration status in your browser console or reach out for support.

*"Rooted in mystery. Blooming in truth."* 🌸