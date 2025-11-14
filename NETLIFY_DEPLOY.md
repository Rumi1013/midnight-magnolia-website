# 🚀 Deploy Midnight Magnolia to Netlify - Step by Step

## Step 1: Push Your Code to GitHub

```bash
cd /Users/latishaimara/midnight-magnolia-website

# Run the deployment script
./deploy.sh
```

This will:
- Clean up git state
- Commit all changes
- Push to GitHub

✅ **Wait for this to complete before moving to Step 2**

---

## Step 2: Sign Up for Netlify

1. Go to **https://app.netlify.com/signup**
2. Click **"Sign up with GitHub"**
3. Authorize Netlify to access your GitHub account
4. ✅ You're now logged into Netlify!

---

## Step 3: Import Your Project

1. Click the **"Add new site"** button (top right)
2. Select **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. You'll see a list of your repositories
5. Find and click **"midnight-magnolia-website"**

---

## Step 4: Configure Build Settings

Netlify will show a configuration screen. Use these settings:

### **Build Settings:**

```
Branch to deploy: main

Build command: pnpm run build

Publish directory: out

Base directory: (leave blank)
```

### **Advanced Settings (click "Show advanced"):**

Add these build environment variables NOW (or skip and add later):

```
NODE_VERSION = 18
```

✅ Click **"Deploy midnight-magnolia-website"**

---

## Step 5: Wait for First Deployment

You'll see a deployment screen with logs:
- 📦 Installing dependencies (1-2 min)
- 🔨 Building your site (2-3 min)
- 🚀 Publishing (30 sec)

⏱️ **Total time: 3-5 minutes**

✅ When you see **"Site is live"** - you're done!

---

## Step 6: View Your Live Site

Your site will be at:
```
https://[random-name].netlify.app
```

**Example:** `https://moonlit-magnolia-a1b2c3.netlify.app`

🎉 **Your site is LIVE!**

---

## Step 7: Add Environment Variables (Important!)

Your site is live but API routes need secrets:

1. In Netlify, click **"Site configuration"** (or Settings)
2. Go to **"Environment variables"** in the left sidebar
3. Click **"Add a variable"**
4. Add these one by one:

### **Required Environment Variables:**

```
Key: STRIPE_SECRET_KEY
Value: sk_test_... (from your .env.local)
Scope: All (default)

Key: POSTGRES_URL
Value: postgresql://... (from your .env.local)
Scope: All

Key: SUPABASE_URL
Value: https://nbzzpkuhnwbeaaepigqx.supabase.co
Scope: All

Key: SUPABASE_ANON_KEY
Value: eyJ... (from your .env.local)
Scope: All

Key: NEXT_PUBLIC_SHOPIFY_DOMAIN
Value: your-store.myshopify.com (if you have one)
Scope: All

Key: NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
Value: your_token (if you have one)
Scope: All
```

5. After adding all variables, click **"Deploy site"** → **"Trigger deploy"**

---

## Step 8: Change Your Site Name (Optional)

Your random URL isn't very pretty. Let's fix it:

1. Go to **"Site configuration"** → **"Site details"**
2. Click **"Change site name"**
3. Enter: `midnight-magnolia` (or `midnightmagnolia`, `midnight-magnolia-sanctuary`, etc.)
4. Click **Save**

✅ Your new URL: `https://midnight-magnolia.netlify.app`

---

## Step 9: Add Custom Domain (Optional)

If you own `midnightmagnolia.com`:

1. Go to **"Domain management"** → **"Add domain"**
2. Enter your domain: `midnightmagnolia.com`
3. Click **"Verify"**
4. Netlify will show you DNS records to add
5. Go to your domain registrar (Namecheap, GoDaddy, etc.)
6. Add the DNS records Netlify shows you:
   - **A Record:** `75.2.60.5`
   - **CNAME for www:** `[your-site].netlify.app`
7. Wait 24-48 hours for DNS propagation

✅ Netlify automatically handles SSL certificates!

---

## 🎯 Test Your Site

Visit these URLs to make sure everything works:

```
Homepage: https://midnight-magnolia.netlify.app
Blog: https://midnight-magnolia.netlify.app/blog
Eulogy Post: https://midnight-magnolia.netlify.app/blog/eulogy-for-the-life-i-survived
Shop: https://midnight-magnolia.netlify.app/shop
Product: https://midnight-magnolia.netlify.app/shop/magnolia-reset-journal
About: https://midnight-magnolia.netlify.app/about
Contact: https://midnight-magnolia.netlify.app/contact
```

---

## 🔧 Common Issues & Fixes

### "Build failed" Error?

**Check the build logs:**
1. Click "Deploys" in Netlify
2. Click the failed deploy
3. Read the error message

**Common fixes:**
- Add `NODE_VERSION=18` to environment variables
- Make sure `pnpm-lock.yaml` is committed to git
- Check that `package.json` has all dependencies

### Images Not Loading?

- All images should be in `/public` folder ✅ (you already have this!)
- Make sure image paths start with `/` (e.g., `/magnolia-logo.png`)

### Environment Variables Not Working?

- Make sure you clicked "Trigger deploy" after adding them
- Check variable names match exactly (case-sensitive!)
- Values should not have quotes around them

---

## 🚀 Automatic Deployments

**Great news:** From now on, every time you push to GitHub, Netlify automatically deploys!

```bash
# Make changes to your site
# Then:
git add .
git commit -m "Update blog post"
git push origin main

# Netlify automatically builds and deploys! 🎉
```

You'll get:
- ✅ Deploy notifications
- ✅ Preview of changes before they go live
- ✅ Automatic rollback if build fails

---

## 📊 Netlify Dashboard Features

### **Analytics** (Free)
- Site Settings → Analytics
- See visitor stats, page views, etc.

### **Forms** (Free)
- Your contact form will work automatically!
- See submissions in: Site Settings → Forms

### **Functions** (Free tier: 125k invocations/month)
- For any custom serverless functions
- Deploy in `netlify/functions/` folder

---

## 🎉 You're Done!

Your Midnight Magnolia site is now:
- ✅ Live on the internet
- ✅ Automatically deploying on every push
- ✅ Secured with HTTPS
- ✅ Hosted on a global CDN
- ✅ Ready for custom domain

**Share your site:** `https://midnight-magnolia.netlify.app` 🌸✨

---

## 📞 Need Help?

If something goes wrong:
1. Check the **deploy logs** in Netlify
2. Look at the **error message** (usually very helpful!)
3. Make sure all files are committed to git: `git status`
4. Try re-deploying: **Deploys → Trigger deploy**

Most issues are solved by adding the `NODE_VERSION=18` environment variable!

---

## 🔄 Making Updates

```bash
# Edit your site files
# Then:
git add .
git commit -m "Your update message"
git push origin main

# Netlify auto-deploys in 2-3 minutes!
```

**That's it!** Welcome to having a live website! 🌙🌸

