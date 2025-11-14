#!/bin/bash

# 🌸 Midnight Magnolia Quick Deploy Script

echo "🌸 Midnight Magnolia Deployment Script"
echo "========================================"
echo ""

# Step 1: Fix git state
echo "📦 Step 1: Cleaning up git state..."
git rebase --abort 2>/dev/null || true
git checkout main

# Step 2: Stage all changes
echo "📝 Step 2: Staging all changes..."
git add .

# Step 3: Commit
echo "💾 Step 3: Committing changes..."
git commit -m "🌸 Complete site rebuild: Blog posts, product pages, and branding" || echo "No changes to commit"

# Step 4: Push
echo "🚀 Step 4: Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "🎯 Next Steps - Choose Your Host:"
echo ""
echo "Option 1 - Netlify (Recommended):"
echo "  1. Go to https://netlify.com and sign up with GitHub"
echo "  2. Click 'Add new site' → 'Import from Git'"
echo "  3. Build command: pnpm run build"
echo "  4. Publish directory: out"
echo "  5. Add environment variables in Settings"
echo ""
echo "Option 2 - Cloudflare Pages (Fastest):"
echo "  1. Go to https://dash.cloudflare.com"
echo "  2. Pages → Create a project → Connect GitHub"
echo "  3. Framework: Next.js (Static HTML Export)"
echo "  4. Build output: out"
echo ""
echo "Option 3 - Railway (Full-stack):"
echo "  1. Go to https://railway.app"
echo "  2. New Project → Deploy from GitHub"
echo "  3. Railway auto-detects settings!"
echo ""
echo "📖 See HOSTING_ALTERNATIVES.md for detailed guides!"
echo ""
echo "Your site will be live in 2-3 minutes! 🌙✨"

