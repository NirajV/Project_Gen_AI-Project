# Niraj KV - Portfolio Website

A modern, responsive portfolio website showcasing 18+ years of experience in data warehouse, ETL development, and business intelligence.

## 🚀 Features

- **Modern Design** - Clean, professional interface with dark theme
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Fast Performance** - Built with Next.js 14 for optimal speed
- **SEO Optimized** - Meta tags and structured data for search engines
- **Smooth Navigation** - Scroll-to-section navigation with sticky header

## 📋 Sections

- **Hero** - Eye-catching introduction
- **About** - Professional summary and background
- **Experience** - Detailed work history with highlights
- **Skills** - Comprehensive skill categories
- **Contact** - Easy-to-reach contact information

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: npm/yarn

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the portfolio directory:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Experience.tsx    # Experience section
│   ├── Skills.tsx        # Skills section
│   ├── Contact.tsx       # Contact section
│   └── Footer.tsx        # Footer
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind CSS config
└── next.config.js        # Next.js config
```

## 📝 Customization

### Update Profile Information
- Edit component files in `components/` folder
- Modify skills, experience, and contact details
- Update colors in `tailwind.config.js`

### Styling
All styles use Tailwind CSS utilities. Modify `tailwind.config.js` to customize colors and theme.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
Create a `Dockerfile` in the portfolio directory for containerized deployment.

### Static Export
```bash
npm run build
# Output in .next/static
```

## 📱 Building for Production

```bash
npm run build
npm run start
```

## 📄 License

Personal portfolio - © 2026 Niraj KV

---

**Created**: January 2026
**Status**: Initial Release
