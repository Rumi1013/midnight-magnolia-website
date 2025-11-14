# 🤖 Cursor Agent Deployment Guide

This file contains instructions for AI agents (like Cursor Agent) to deploy Midnight Magnolia automatically.

---

## 🎯 Agent Deployment Commands

### Quick Deploy (Most Common)
```bash
# One-line deployment
cd /Users/latishaimara/midnight-magnolia-website && git add . && git commit -m "Deploy: Update site" && git push origin main
```

### Verify Before Deploy
```bash
# Check what will be deployed
cd /Users/latishaimara/midnight-magnolia-website
git status

# Test build locally
pnpm run build

# If successful, deploy
git add . && git commit -m "Deploy: [description]" && git push origin main
```

---

## 📋 Deployment Checklist

**Agent should verify:**
- [ ] In correct directory: `/Users/latishaimara/midnight-magnolia-website`
- [ ] Build passes: `pnpm run build` exits with code 0
- [ ] Git has changes: `git status` shows modifications
- [ ] On main branch: `git branch` shows `* main`
- [ ] Changes committed: `git commit` succeeds
- [ ] Pushed to GitHub: `git push origin main` succeeds

---

## 🔧 Configuration Files

### netlify.toml (Auto-Deploy Config)
✅ Already configured with:
- Build command: `pnpm run build`
- Publish directory: `out`
- Node version: 18
- Redirects & headers
- Caching rules

### .cursorrules (Agent Context)
✅ Contains:
- Project structure
- Deployment steps
- Environment variables list
- Troubleshooting guide

---

## 🚀 Deployment Flow

```
User: "Deploy the site"
  ↓
Agent: Run pre-deployment checks
  ↓
Agent: git add . && git commit && git push
  ↓
Netlify: Detects push to main branch
  ↓
Netlify: Reads netlify.toml
  ↓
Netlify: Runs `pnpm run build`
  ↓
Netlify: Publishes `out` directory
  ↓
Site is live! ✅
```

---

## 📊 Current Setup Status

### ✅ Completed
- [x] netlify.toml created
- [x] Build configuration set
- [x] Git repository initialized
- [x] Next.js configured for static export
- [x] All pages built (79 pages)
- [x] Images optimized
- [x] Blog posts created (8 posts)
- [x] Product pages created (6 products)

### ⏳ Requires Manual Setup (One Time)
- [ ] Netlify account connected to GitHub
- [ ] Environment variables added in Netlify
- [ ] Custom domain configured (optional)

---

## 🔐 Environment Variables

**Agent should remind user to add these in Netlify:**

```env
STRIPE_SECRET_KEY=sk_test_...
POSTGRES_URL=postgresql://...
SUPABASE_URL=https://nbzzpkuhnwbeaaepigqx.supabase.co
SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SHOPIFY_DOMAIN=store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=...
```

**Location:** Netlify Dashboard → Site Settings → Environment Variables

---

## 🎬 Agent Response Templates

### When User Says "Deploy"
```
Deploying Midnight Magnolia to Netlify...

✓ Checking build status...
✓ Staging changes...
✓ Committing: "Deploy: [changes]"
✓ Pushing to GitHub...

Netlify will automatically build and deploy your site.
Check status at: https://app.netlify.com

Expected deployment time: 3-5 minutes
Your site: https://midnight-magnolia.netlify.app
```

### When Build Fails
```
⚠️ Build failed locally. Errors found:

[show errors]

Fixing issues before deployment...
Would you like me to:
1. Fix the errors automatically
2. Show detailed error log
3. Attempt deployment anyway (not recommended)
```

### When Git Has Conflicts
```
⚠️ Git conflicts detected.

Current status:
[show git status]

Would you like me to:
1. Abort current rebase/merge
2. Resolve conflicts automatically
3. Show conflict details
```

---

## 🛠️ Common Agent Tasks

### Task: "Update blog post and deploy"
```bash
# Edit blog post
# Then:
cd /Users/latishaimara/midnight-magnolia-website
pnpm run build  # verify
git add app/blog/data/blogPosts.ts
git commit -m "Update blog post: [title]"
git push origin main
```

### Task: "Add new product and deploy"
```bash
# Edit products file
# Then:
cd /Users/latishaimara/midnight-magnolia-website
pnpm run build  # verify
git add app/shop/data/products.ts
git commit -m "Add product: [name]"
git push origin main
```

### Task: "Deploy all changes"
```bash
cd /Users/latishaimara/midnight-magnolia-website
pnpm run build
git add .
git commit -m "Deploy: Multiple updates"
git push origin main
```

---

## 🔍 Verification Commands

### Check Current Deployment Status
```bash
# Check last commit
git log -1 --oneline

# Check remote status
git remote -v

# Check branch
git branch --show-current

# Check Netlify status (requires netlify-cli)
netlify status
```

### Verify Live Site
```bash
# Check if site is accessible
curl -I https://midnight-magnolia.netlify.app

# Expected: HTTP 200 OK
```

---

## 📚 Related Files

- **NETLIFY_DEPLOY.md** - Detailed human-readable guide
- **HOSTING_ALTERNATIVES.md** - Other hosting options
- **DEPLOYMENT_GUIDE.md** - General deployment info
- **netlify.toml** - Build configuration
- **.cursorrules** - Agent context & rules

---

## 🤖 Agent Capabilities

**The agent CAN:**
- Build the site (`pnpm run build`)
- Commit changes (`git commit`)
- Push to GitHub (`git push`)
- Verify build status
- Check deployment logs
- Update content files

**The agent CANNOT:**
- Connect Netlify to GitHub (manual, one-time)
- Add environment variables to Netlify (manual, one-time)
- Configure custom domains (manual)
- Access Netlify dashboard directly

---

## 🎯 Success Criteria

**Deployment is successful when:**
- ✅ `git push` completes without errors
- ✅ Netlify build succeeds (check dashboard)
- ✅ Site is accessible at netlify.app URL
- ✅ All pages load correctly
- ✅ Images display properly
- ✅ Blog posts are readable
- ✅ Product pages are accessible

---

## 🚨 Rollback Procedure

**If deployment breaks the site:**
```bash
# View recent commits
git log --oneline -n 5

# Rollback to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard [commit-hash]

# Force push
git push origin main --force
```

**In Netlify:**
- Go to Deploys
- Find working deployment
- Click "Publish deploy"

---

## 📞 Support Commands

### Agent should ask user:
- "Would you like me to deploy the site?"
- "Should I check the build first?"
- "Would you like to see what changed?"
- "Should I verify the deployment after?"

### Agent should inform user:
- "Deployment in progress (3-5 minutes)"
- "Build successful, pushing to GitHub"
- "Site is live at [URL]"
- "Deployment failed: [reason]"

---

**Ready for agent deployment!** 🤖🚀

The agent can now handle deployments automatically using:
- `./deploy.sh` for simple deployments
- Git commands for granular control
- Build verification before pushing
- Status checking after deployment

