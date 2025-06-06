# Midnight Magnolia Website: Local Preview Guide

This guide will help you preview and verify your website locally before deployment.

## 🚀 Local Preview Methods

You have two options for previewing your website locally:

### Method 1: Development Mode (Fast Refresh)
```bash
npm run dev
```

**Advantages:**
- Real-time updates as you edit files
- Faster refresh cycle
- Helpful error messages
- Hot module replacement

**When to use:**
- During active development
- When making small changes and testing immediately

### Method 2: Production Build Preview (Deployment-like)
```bash
npm run build
npm run preview
```

**Advantages:**
- Exactly matches what will be deployed
- Uses the same build output as production
- Tests all optimizations and bundling
- Verifies postbuild scripts

**When to use:**
- Before deployment
- Final verification
- Testing production performance

## 🔍 Verification Checklist

When previewing your site locally, verify:

1. **Visual Appearance**
   - [ ] All pages render correctly
   - [ ] Responsive design works at different screen sizes
   - [ ] Images load properly
   - [ ] Animations work as expected
   - [ ] Fonts and typography render correctly

2. **Functionality**
   - [ ] Navigation works between all pages
   - [ ] Interactive elements respond correctly
   - [ ] Forms submit properly (if applicable)
   - [ ] No JavaScript errors in console

3. **Performance**
   - [ ] Pages load quickly
   - [ ] Animations are smooth
   - [ ] No layout shifts during loading
   - [ ] Check for render-blocking resources

4. **SPA Routing**
   - [ ] Direct navigation to routes works
   - [ ] Browser back/forward buttons work
   - [ ] Page refresh preserves current route

## 🧪 Testing Steps

### Step 1: Start Development Server
```bash
npm run dev
```

- Open your browser to the URL shown (usually http://localhost:5173)
- Navigate through the site
- Check console for any errors (F12 or right-click > Inspect > Console)

### Step 2: Test Production Build
```bash
# Build the production version
npm run build

# Start the preview server
npm run preview
```

- Open your browser to the URL shown (usually http://localhost:4173)
- Verify all functionality again
- This is closer to what you'll see in production

### Step 3: Test SPA Routing
1. Navigate to a non-home page
2. Refresh the browser
3. Verify page still loads (not a 404)
4. Test direct URL access

## 🐛 Troubleshooting Common Issues

### If pages don't load:
- Check terminal for build errors
- Verify routes are correctly defined
- Check browser console for JavaScript errors

### If styles are missing:
- Ensure CSS files are being imported
- Check for CSS syntax errors
- Verify build process includes CSS processing

### If images don't appear:
- Check image paths
- Verify images exist in correct directories
- Check for console errors related to image loading

### If routing doesn't work:
- Verify routing configuration
- Check that `_redirects` file is set up correctly
- Ensure history API fallback is configured in dev server

## 📝 Next Steps After Successful Preview

Once you've verified everything works locally:

1. Commit any changes to your repository
2. Follow the deployment instructions in `deployment-plan.md`
3. Start with the recommended Netlify deployment option
4. Verify the same functionality on the deployed site

## 🔄 Test-Fix-Deploy Cycle

For best results:
1. Preview locally
2. Fix any issues
3. Preview again
4. Deploy
5. Verify deployment
6. Repeat if necessary