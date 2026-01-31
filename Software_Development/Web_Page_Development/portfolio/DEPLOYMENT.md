# Portfolio Website - Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
cd portfolio
npm install
npm run dev
# For faster startup (Next.js 14+), use: npm run dev -- --turbo
```
Visit `http://localhost:3000`

### Build for Production
```bash
npm run start
npm run start
```

---

## 📤 Deployment Options

### Option 1: Vercel (Easiest)
Perfect for Next.js applications with zero-config deployment.

**Steps**:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select your repository
4. Select `portfolio` folder as root
5. Click Deploy

**Result**: Your site will be live at a Vercel URL (e.g., `niraj-portfolio.vercel.app`)

### Option 2: Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Follow prompts and select portfolio folder

### Option 3: Self-Hosted (VPS/Server)
```bash
# Build the project
npm run build

# Start production server
npm run start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
```

### Option 4: Docker Container
```dockerfile
# Dockerfile in portfolio/
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## 🔧 Environment Variables

Create `.env.local` in portfolio directory:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 📊 Performance

- Next.js optimizations: Image, Font, CSS minification
- Tailwind CSS: Purged unused styles in production
- Lighthouse score: Expected 90+

---

## 🔗 Custom Domain

**With Vercel**:
1. Go to Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records according to Vercel instructions

---

## 📝 Maintenance

- Update content in component files
- Rebuild: `npm run build`
- Redeploy following your chosen platform's process

---

**Last Updated**: January 2026
