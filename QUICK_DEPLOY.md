# 🚀 Quick Deploy Guide - Midnight Magnolia

## Current Status:
You're in the middle of a git rebase. Let's finish that and get you deployed! 🌸

---

## Step 1: Complete the Git Rebase

```bash
cd /Users/latishaimara/midnight-magnolia-website

# Abort the current rebase (safest option)
git rebase --abort

# Switch to main branch
git checkout main
```

---

## Step 2: Stage All Your New Changes

```bash
# Add all the new files and changes
git add .

# Commit everything
git commit -m "🌸 Complete site rebuild: Blog posts, product pages, accessibility, branding"

# Push to GitHub
git push origin main
```

---

## Step 3: Deploy to Vercel (5 Minutes!)

### Option A: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from your project directory)
vercel

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? midnight-magnolia-website
# - In which directory is your code located? ./
# - Want to override settings? No

# Your site is now live! 🎉
```

### Option B: Using Vercel Dashboard (Easier)

1. **Go to:** https://vercel.com/signup
2. **Sign up** with GitHub
3. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your `midnight-magnolia-website` repo
   - Click "Import"
4. **Deploy Settings:**
   - Framework Preset: **Next.js** (auto-detected ✅)
   - Build Command: `next build` (auto-filled ✅)
   - Output Directory: `.next` (auto-filled ✅)
   - Install Command: `pnpm install` (auto-filled ✅)
5. **Click "Deploy"**

⏱️ **First deployment takes 2-3 minutes**

---

## Step 4: Add Environment Variables (Important!)

Once deployed, add your secrets:

1. Go to your project in Vercel
2. **Settings** → **Environment Variables**
3. Add these:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
POSTGRES_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=...
```

4. **Redeploy** after adding variables:
   - Go to "Deployments"
   - Click "..." menu on latest deployment
   - Click "Redeploy"

---

## Step 5: Test Your Live Site

Your site will be at:
```
https://midnight-magnolia-website.vercel.app
```

**Test these:**
- ✅ Homepage loads
- ✅ Blog posts work: `/blog/eulogy-for-the-life-i-survived`
- ✅ Product pages work: `/shop/magnolia-reset-journal`
- ✅ About page works: `/about`
- ✅ Contact form loads: `/contact`
- ✅ Shop page loads: `/shop`

---

## Step 6: Add Custom Domain (Optional)

If you have `midnightmagnolia.com`:

1. **In Vercel:**
   - Settings → Domains
   - Enter your domain
   - Follow DNS instructions

2. **In your domain registrar:**
   - Add A record: `76.76.21.21`
   - Add CNAME for `www`: `cname.vercel-dns.com`

3. **Wait 24-48 hours** for DNS propagation

---

## 🎯 Quick Commands Cheat Sheet

```bash
# If something goes wrong with the rebase:
git rebase --abort

# To start fresh:
git checkout main
git add .
git commit -m "Complete rebuild"
git push origin main

# To redeploy on Vercel:
vercel --prod
```

---

## 🚨 Common Issues & Fixes

### "Build failed" on Vercel?
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Test locally: `pnpm run build`

### Environment variables not working?
- Make sure they're added in Vercel Settings
- Redeploy after adding them
- Check variable names match exactly

### Images not loading?
- All images should be in `/public` folder ✅
- You already have this set up correctly!

---

## 📊 What Happens Next

**After deployment:**
1. **Automatic deployments** - Every git push = new deployment
2. **Preview deployments** - Every PR gets a preview URL
3. **Analytics** - Built-in traffic analytics (free tier)
4. **Edge network** - Your site loads fast worldwide

---

## 🎉 You're Almost There!

Just run these 3 commands:

```bash
git rebase --abort
git add .
git commit -m "🌸 Complete site rebuild"
git push origin main
```

Then deploy to Vercel and you're LIVE! 🚀✨

