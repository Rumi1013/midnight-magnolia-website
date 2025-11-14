# 🚀 Deployment Guide for Midnight Magnolia

Your site is configured as a static Next.js app (`output: 'export'`), which means you can deploy it to multiple platforms. Here are your best options:

---

## ✨ **Recommended: Vercel** (Easiest & Best for Next.js)

### Why Vercel?
- **Made by Next.js creators** - perfect compatibility
- **Free tier** with generous limits
- **Automatic deployments** from GitHub
- **Custom domains** included
- **Edge network** (super fast globally)
- **Zero configuration** needed

### Steps:

1. **Push your code to GitHub:**
   ```bash
   cd /Users/latishaimara/midnight-magnolia-website
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" (use GitHub login)
   - Click "Import Project"
   - Select your `midnight-magnolia-website` repository
   - Vercel will auto-detect Next.js settings ✅
   - Click "Deploy"

3. **Add Environment Variables (Important!):**
   - In Vercel dashboard, go to: **Settings → Environment Variables**
   - Add these (from your `.env.local`):
     ```
     STRIPE_SECRET_KEY=your_stripe_key
     STRIPE_WEBHOOK_SECRET=your_webhook_secret
     POSTGRES_URL=your_neon_database_url
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_key
     NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
     NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token
     ```

4. **Redeploy** to apply environment variables

5. **Add Custom Domain (Optional):**
   - Settings → Domains
   - Add `midnightmagnolia.com` (or your domain)
   - Follow DNS instructions

**Your site will be live at:** `https://midnight-magnolia-website.vercel.app`

---

## 🎯 **Alternative: Netlify** (Also Excellent)

### Why Netlify?
- **Great free tier**
- **Simple drag-and-drop** deployment option
- **Built-in forms** (free for contact forms)
- **Split testing** built in

### Steps:

1. **Build your site locally:**
   ```bash
   cd /Users/latishaimara/midnight-magnolia-website
   pnpm run build
   ```
   This creates an `out` folder with your static site.

2. **Deploy to Netlify:**

   **Option A: Drag & Drop (Fastest)**
   - Go to [netlify.com](https://netlify.com)
   - Sign up (free)
   - Drag the `out` folder to Netlify's drop zone
   - Done! ✅

   **Option B: GitHub (Automatic updates)**
   - Connect your GitHub repo
   - Build command: `pnpm run build`
   - Publish directory: `out`
   - Add environment variables in Settings

3. **Add Environment Variables:**
   - Site Settings → Environment Variables
   - Add the same variables as Vercel

**Your site will be live at:** `https://midnight-magnolia.netlify.app`

---

## 📄 **Alternative: GitHub Pages** (100% Free, but Limited)

### Pros:
- **Completely free**
- **Custom domain supported**
- **Simple setup**

### Cons:
- **No server-side features** (API routes won't work)
- **No environment variables** (can't hide API keys)
- **Slower than Vercel/Netlify**

### Steps:

1. **Deploy script already configured!**
   Your `package.json` has:
   ```json
   "deploy": "next build && gh-pages -d out -t"
   ```

2. **Run deployment:**
   ```bash
   pnpm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to your GitHub repo
   - Settings → Pages
   - Source: `gh-pages` branch
   - Click Save

**Your site will be live at:** `https://yourusername.github.io/midnight-magnolia-website`

⚠️ **Warning:** API routes (Stripe, Shopify, Database) **won't work** on GitHub Pages because it's static-only. You'd need to use external APIs or serverless functions.

---

## 🎨 **Recommended Setup for Midnight Magnolia**

### Best Practice:

**Use Vercel for full functionality:**
- ✅ All API routes work
- ✅ Stripe checkout works
- ✅ Shopify integration works
- ✅ Database connections work
- ✅ Automatic HTTPS
- ✅ Global CDN

---

## 🔧 **Pre-Deployment Checklist**

Before deploying, make sure:

- [ ] `.env.local` has all API keys (don't commit this file!)
- [ ] `.gitignore` includes `.env.local`
- [ ] All images are optimized and in `/public`
- [ ] `pnpm run build` runs successfully locally
- [ ] Test the site locally: `pnpm run dev`
- [ ] Environment variables are added to deployment platform
- [ ] Custom domain DNS is configured (if using one)

---

## 🌐 **Custom Domain Setup**

### If you have a domain (e.g., `midnightmagnolia.com`):

1. **Buy domain** from:
   - Namecheap
   - Google Domains
   - GoDaddy
   - Cloudflare

2. **Connect to Vercel/Netlify:**
   - Add domain in platform settings
   - Update your domain's DNS records:
     - **A Record:** Point to platform's IP
     - **CNAME:** Point `www` to your deployment URL

3. **SSL Certificate:**
   - Vercel/Netlify handle this automatically (free!)

---

## 📊 **Post-Deployment Monitoring**

### Set up analytics:
- **Vercel Analytics** (built-in, free tier available)
- **Google Analytics** (add to `app/layout.tsx`)
- **Plausible Analytics** (privacy-friendly alternative)

### Monitor errors:
- **Sentry** (error tracking)
- **LogRocket** (session replay)

---

## 🚨 **Troubleshooting**

### Build fails on deployment?
```bash
# Test locally first:
pnpm run build

# Check for errors in:
# - API routes missing environment variables
# - Image imports
# - TypeScript errors
```

### API routes not working?
- Make sure environment variables are added to your deployment platform
- Check that you're not using `output: 'export'` if you need API routes
  - For Vercel: Remove `output: 'export'` from `next.config.mjs`
  - For static hosts: Keep `output: 'export'` but use external APIs

### Images not loading?
- Make sure all images are in `/public` folder
- Check image paths start with `/` (e.g., `/magnolia-logo.png`)
- Verify `images.unoptimized: true` is in `next.config.mjs`

---

## 🎯 **My Recommendation for You**

**Deploy to Vercel** because:
1. ✅ Your site will work 100% as-is
2. ✅ Free tier is generous
3. ✅ Automatic deployments on every git push
4. ✅ Built-in analytics
5. ✅ All your API routes will work
6. ✅ Takes 5 minutes to set up

---

## 🔐 **Important Security Notes**

1. **Never commit `.env.local`** to GitHub
2. **Always add secrets as environment variables** in deployment platform
3. **Use webhook secrets** for Stripe/Shopify webhooks
4. **Enable CORS** only for your domain (already configured in `next.config.mjs`)

---

## 📞 **Need Help?**

If you run into issues:
1. Check build logs in deployment platform
2. Test `pnpm run build` locally first
3. Verify all environment variables are set
4. Check that all imports/paths are correct

---

**Ready to go live?** Start with Vercel - it's the fastest path to a live site! 🚀🌸

