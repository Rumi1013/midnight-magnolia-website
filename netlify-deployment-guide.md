# 🌐 Netlify Deployment Guide - Midnight Magnolia

## 📋 Quick Setup Checklist

### ✅ Files Added
- [x] `netlify.toml` - Main configuration file
- [x] `public/_redirects` - SPA routing fallback

### ✅ Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Deploy Context**: Production

## 🚀 Deployment Methods

### Method 1: GitHub Integration (Recommended)
1. **Connect Repository**:
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select `midnight-magnolia-website` repository

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Production branch**: `main` (or your default branch)

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Method 2: Manual Deploy
1. **Build Locally**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `dist` folder to the deploy area

## 🔧 Configuration Details

### Build Environment
- **Node.js**: 18.x
- **Package Manager**: npm
- **Build Tool**: Vite

### Performance Optimizations
- Asset caching (1 year for JS/CSS)
- Image caching (1 day)
- Gzip compression enabled
- Source maps disabled for production

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection: enabled
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 🌍 Custom Domain Setup (Optional)

### If you have a custom domain:
1. **Add Domain**:
   - Go to Site Settings → Domain management
   - Click "Add custom domain"
   - Enter your domain name

2. **Configure DNS**:
   - Add CNAME record pointing to your Netlify subdomain
   - Or use Netlify DNS for full management

3. **Enable HTTPS**:
   - Netlify provides free SSL certificates
   - Enable "Force HTTPS" in domain settings

## 🐛 Troubleshooting

### Common Issues:
1. **Build Fails**:
   - Check Node version is 18.x
   - Verify all dependencies in package.json
   - Run `npm run build` locally first

2. **404 on Refresh**:
   - Ensure `_redirects` file is in public directory
   - Check netlify.toml redirects configuration

3. **Assets Not Loading**:
   - Verify `dist` is set as publish directory
   - Check asset paths in your code

### Build Logs:
- Access via Netlify dashboard → Deploys → [Build number]
- Look for specific error messages
- Compare with successful local build

## 📊 Expected Build Output
- **CSS Bundle**: ~12.89 kB
- **JS Bundle**: ~48.69 kB  
- **Build Time**: ~30-60 seconds on Netlify
- **Deploy Time**: ~1-2 minutes total

## 🔄 Continuous Deployment
Once connected to GitHub:
- Automatic deploys on push to main branch
- Preview deploys for pull requests
- Branch deploys for development

## 📞 Support
- **Netlify Docs**: https://docs.netlify.com
- **Build Issues**: Check build logs in Netlify dashboard
- **Domain Issues**: Netlify support or domain provider

---

**Ready to deploy!** 🚀 Your Midnight Magnolia website is configured for seamless Netlify deployment.

*"Rooted in mystery. Blooming in truth."* 🌸 