# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Build & Type Checking
- ✅ Build completes successfully: `npm run build`
- ✅ Type checking passes: `npm run typecheck`
- ✅ No linter errors

### 2. Configuration Files
- ✅ `package.json` has correct build scripts
- ✅ `vercel.json` configured for React Router v7
- ✅ `.gitignore` excludes build artifacts and node_modules

### 3. Routes & Error Handling
- ✅ Home route (`/`) loads posts from Sanity
- ✅ Post route (`/:slug`) handles missing posts (404)
- ✅ Error boundaries configured in root.tsx

### 4. Sanity Configuration
- ✅ Sanity client configured with project ID and dataset
- ✅ Image URL builder configured
- ✅ Queries properly structured

### 5. Dependencies
- ✅ All dependencies installed
- ✅ Production dependencies only in `dependencies`
- ✅ Dev dependencies in `devDependencies`

## 🚀 Vercel Deployment Steps

1. **Connect Repository**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard

2. **Configure Build Settings**
   - Framework Preset: **Other** (or let Vercel auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `build/client`
   - Install Command: `npm install`
   - Node.js Version: **20.x** (recommended)

3. **Environment Variables** (if needed)
   - Currently using hardcoded Sanity credentials
   - If you want to use env vars, add:
     - `SANITY_PROJECT_ID`
     - `SANITY_DATASET`
     - Update `app/sanity/client.ts` to use `process.env`

4. **Deploy**
   - Click "Deploy"
   - Monitor build logs
   - Test the deployed site

## 📝 Notes

- React Router v7 uses SSR by default
- Vercel will auto-detect React Router and configure serverless functions
- The `vercel.json` file provides basic configuration
- Static assets are served from `build/client`
- Server-side rendering handled by Vercel's Node.js runtime

## 🔍 Post-Deployment Verification

- [ ] Home page loads correctly
- [ ] Posts display with images
- [ ] Individual post pages work
- [ ] 404 page shows for invalid slugs
- [ ] Images load from Sanity CDN
- [ ] Navigation works correctly
- [ ] Mobile responsive design works

