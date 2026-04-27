# Deployment Guide - Vibe Fitness

This guide covers how to deploy Vibe Fitness to various platforms.

## Local Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173` with hot module replacement.

## Production Build

```bash
npm run build
npm run preview
```

Creates optimized production files in the `dist/` folder.

## Deployment Platforms

### Vercel (Recommended - Easiest)

1. **Connect your repository**
   - Push your code to GitHub
   - Sign up at [vercel.com](https://vercel.com)
   - Connect your GitHub account

2. **Deploy**
   - Click "New Project"
   - Select your repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Done!** Your app is live

### Netlify

1. **Local build**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Sign up at [netlify.com](https://netlify.com)
   - Drag and drop the `dist/` folder, or
   - Connect your GitHub repository for auto-deploy

### GitHub Pages

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/vibe-fitness/', // your repo name
   })
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   - Push `dist/` folder or use GitHub Actions
   - Enable Pages in repository settings

### Self-Hosted (Any Server)

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your server

3. **Configure web server** to serve `index.html` for all routes:

   **Nginx**
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

   **Apache** (.htaccess)
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
}
```

Build and run:

```bash
docker build -t vibe-fitness .
docker run -p 80:80 vibe-fitness
```

## Environment Variables

Create `.env.production` for production settings:

```env
VITE_API_URL=https://api.production.com
VITE_APP_NAME=Vibe Fitness
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Optimization

### Vercel/Netlify Auto-Optimizations
- Automatic minification
- Image optimization
- CDN edge caching
- Automatic GZIP compression

### Manual Optimizations

1. **Code splitting** - Already handled by Vite
2. **Image optimization** - Add in `public/` folder
3. **Caching headers**
   ```
   Cache-Control: max-age=31536000 (for dist/assets/*)
   Cache-Control: max-age=0 (for index.html)
   ```

## Monitoring & Analytics

### Add Google Analytics
```typescript
// In App.tsx
useEffect(() => {
  window.gtag('config', 'GA_MEASUREMENT_ID');
}, []);
```

### Error Tracking (Sentry)
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

## Troubleshooting

**Issue: 404 errors after Singlepage navigation**
- Ensure your web server routes all requests to `index.html`

**Issue: Blank page on load**
- Check browser console for errors
- Verify `base` in vite.config.ts matches deployment path

**Issue: localStorage not working**
- Check if private/incognito mode (usually disabled)
- Verify no CSP blocking localStorage

## Domain Setup

### Connecting Custom Domain

**Vercel:**
1. Go to Project Settings → Domains
2. Add custom domain
3. Update DNS records at your registrar

**Netlify:**
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

## SSL/HTTPS

All major platforms (Vercel, Netlify, GitHub Pages) provide free SSL certificates automatically.

## Version Numbers

Update in `package.json`:

```json
{
  "version": "1.0.0"
}
```

Then tag releases in git:

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

**Questions?** Refer to platform-specific documentation or check the main README.md.
