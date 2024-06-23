# 📷 Photo Blog

https://photo-blogs.vercel.app

Features
-

- Built-in auth
- Photo upload with EXIF extraction
- Organize photos by tag
- Infinite scroll
- Light/dark mode
- Automatic OG image generation
- CMD-K menu with photo search
- Support for Fujifilm simulations

Installation
-

### 1. Develop locally

1. Clone code
2. Run `bun i` to install dependencies
3. Setup environment variables
4. Run `bun dev` to start dev server
####    Or
1. If necessary, install [Vercel CLI](https://vercel.com/docs/cli#installing-vercel-cli) and authenticate by running `vercel login`
2. Run `vercel link` to connect the CLI to your project
3. Run `vercel dev` to start dev server with Vercel-managed environment variables

### 2. Setup Auth

1. [Generate auth secret](https://generate-secret.vercel.app/32) and add to environment variables:
   - `AUTH_SECRET`
2. Add admin user to environment variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
3. Trigger redeploy
   - Visit project on Vercel, navigate to "Deployments" tab, click ••• button next to most recent deployment, and select "Redeploy"

### 3. Upload your first photo 🎉

1. Visit `/admin`
2. Sign in with credentials supplied in Step 2
2. Click "Upload Photos"
3. Add optional title
4. Click "Create"
