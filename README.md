# Architectural Real-Estate Website Template

A production-ready, highly customizable, and premium real-estate website template built with React, Vite, and Vanilla CSS. Designed specifically for premium townships, plotted developments, luxury villas, and residential communities.

The entire website is completely **configuration-driven**. You can launch a totally new property project by modifying only central configuration files—**without modifying any UI components, layout structures, animation loops, or interaction logic**.

---

## 🌟 Key Features Preserved & Enhanced

- **Fluid Floor Parallax Engine**: Background lerp parallax navigation across sections with `requestAnimationFrame`.
- **Interactive Vector SVG Plot Map**: Sanctioned plot grid with multi-level desktop HUD and mobile touch dock controls, live availability/sold status filters, facing filters, plot search, and real-time area calculations.
- **High-Definition CAD Blueprint Zoomer**: Zoom (1× to 4×), pan, pinch-to-zoom on touch screens with non-passive touch scroll lock, and one-click blueprint download.
- **Cinematic Video Preloader**: Preloads all media assets in parallel, tracks video duration, shows seamless cross-dissolve entry, and features a 6-second failsafe unlock.
- **Full-Screen Lightbox Gallery**: Touch-swipe enabled mobile lightbox, keyboard arrow & escape controls, and integrated custom video showcase player.
- **Dynamic Theme & Design System**: Injects brand colors (`--gold-accent`, `--clay-accent`, `--bg-sand`, `--bg-dark`), typography, and glassmorphism tokens dynamically via `:root` CSS variables.
- **Automated Runtime SEO**: Injects dynamic `<title>`, `<meta name="description">`, Open Graph tags, Twitter cards, and Schema.org `RealEstateAgent` JSON-LD structured data.
- **Lead Generation Webhook Pipeline**: Captures booking requests and advisory inquiries with Indian mobile number validation (`validateIndianMobile`) and dispatches directly to your Google Sheets / CRM webhook.

---

## 📁 Project Architecture & Configuration Directory

```text
src/
├── config/                     <-- ALL PROJECT CUSTOMIZATION LIVES HERE
│   ├── siteConfig.js           <-- Default Property Config (Thenshirdi Sai Residency)
│   ├── sampleProperty.js       <-- Demo Property Config (Green Valley Residency)
│   ├── theme.js                <-- Color palettes, typography & styling tokens
│   ├── navigation.js           <-- Navbar links, CTAs & footer menus
│   └── index.js                <-- ACTIVE_CONFIG switch selector
│
├── hooks/
│   ├── useProperty.js          <-- Primary hook exposing active property data
│   ├── useSEO.js               <-- Dynamic page title, meta, OG & JSON-LD hook
│   └── useTheme.js             <-- Dynamic CSS variable injector hook
│
├── data/
│   ├── propertyData.js         <-- Backwards-compatible bridge & lead dispatch
│   └── plotLayout/             <-- SVG plot map vectors & plot inventory
│       ├── layoutGraph.js      <-- Vector plot coordinates & polygon paths
│       ├── plotInventory.js    <-- Plot availability status, sizes & facing
│       └── layoutFrame.js      <-- Site boundary roads & markers
│
├── components/
│   ├── Navbar.jsx              <-- Adaptive chamfer navbar with mobile drawer
│   ├── Footer.jsx              <-- Config-driven brand footer
│   ├── Preloader.jsx           <-- Video & asset preloader with failsafe
│   ├── BookingModal.jsx        <-- Viewing scheduler modal with RERA compliance
│   ├── InteractiveMap.jsx      <-- Location hotspots & connectivity cartography
│   ├── BlueprintViewer.jsx     <-- CAD pan/zoom viewer & download tool
│   ├── BentoCard.jsx           <-- 3D tilt, spotlight & glassmorphism card
│   └── PlotMap/                <-- Vector SVG interactive master plan
│
├── pages/
│   ├── Home.jsx                <-- Hero, Vision, Amenities, FAQ, Callback
│   ├── About.jsx               <-- Architectural vision, Vastu & RERA bar
│   ├── MasterPlan.jsx          <-- Interactive plot selector & enquiry panel
│   ├── Gallery.jsx             <-- High-def photo grid & video tour
│   ├── Locations.jsx           <-- Connectivity map & blueprint viewer
│   ├── Contact.jsx             <-- Experience center details & advisory form
│   ├── PrivacyTerms.jsx        <-- Regulatory disclosures & legal terms
│   └── NotFound.jsx            <-- 404 handler
│
├── assets/
│   └── images/                 <-- Image registries & fallbacks
└── styles/
    └── main.css                <-- Design tokens, glassmorphism & responsive CSS
```

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
# Clone repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start local development server
npm run dev
```

### 2. Launching a New Property in 3 Steps

#### Step 1: Create your property configuration
Duplicate `src/config/siteConfig.js` (or `src/config/sampleProperty.js`) and name it after your project (e.g. `src/config/myNewProject.js`).

```javascript
// src/config/myNewProject.js
const myNewProjectConfig = {
  id: 'my-new-project',
  property: {
    name: 'Emerald Palms Estate',
    shortName: 'Emerald Palms',
    tagline: 'Ultra-Luxury Gated Villa Plots in Coimbatore',
    propertyType: 'Plotted Development & Luxury Villas',
    totalPlots: 88,
    totalArea: '12 Acres',
    location: {
      address: 'Near Golf Club, Kovaipudur',
      locality: 'Kovaipudur',
      city: 'Coimbatore',
      district: 'Coimbatore District',
      state: 'Tamil Nadu',
      pincode: '641042',
      landmark: 'Opposite Hill View Sanctuary',
      roadFrontage: 'Palakkad Main Highway'
    },
    developer: {
      name: 'Emerald Living Ventures Pvt Ltd',
      established: 2012
    },
    contact: {
      phone: '+91 98765 43210',
      phoneTel: '+919876543210',
      email: 'sales@emeraldpalms.com',
      experienceCenterAddress: 'Site 44, Kovaipudur, Coimbatore - 641042',
      salesHours: 'Monday – Sunday: 9:00 AM – 7:00 PM (IST)'
    }
  },
  legal: {
    authorityName: 'DTCP & TN RERA',
    dtcpNumber: '112/2024',
    tnReraNumber: 'RERA/TN/2024/0088',
    reraLayoutNumber: 'TN/11/Layout/0088/2024',
    developerName: 'Emerald Living Ventures'
  },
  theme: {
    colors: {
      goldAccent: '#10B981',       // Emerald Green accent
      clayAccent: '#047857',       // Deep Forest green
      bgSand: '#F7FAF7',           // Clean eco sand
      bgDark: '#061A14'            // Deep emerald night
    }
  },
  // ... (see Configuration Schema below for all fields)
};

export default myNewProjectConfig;
```

#### Step 2: Set the active configuration
Open `src/config/index.js` and set `ACTIVE_CONFIG` to your new config:

```javascript
// src/config/index.js
import myNewProjectConfig from './myNewProject';

export const ACTIVE_CONFIG = myNewProjectConfig;
export default ACTIVE_CONFIG;
```

#### Step 3: Run and view
Save the file. Your website will instantly update brand identity, typography colors, copy, contact numbers, amenities, locations, legal credentials, and SEO meta tags!

---

## 🎨 Theme Customization

Brand styling is managed through CSS custom properties defined in `src/config/theme.js` and injected at runtime by `useTheme()`.

```javascript
theme: {
  colors: {
    goldAccent: '#C9A063',         // Primary luxury accent (buttons, icons, highlights)
    goldGlow: 'rgba(201, 160, 99, 0.35)',
    goldHover: '#b08a4f',
    clayAccent: '#A85C3C',         // Secondary terracotta accent (badges, CTAs)
    clayHover: '#8e4c30',
    bgSand: '#FAF8F4',             // Light background base
    bgSandMuted: '#F2EDE4',
    bgDark: '#15130F',             // Cinematic dark background base
    bgDarkCard: '#1B1A17',         // Card background
    inkDark: '#1B1A17',            // Text color on light backgrounds
    textBody: '#3A362F',
    textMuted: '#6C665C',
    textOnDark: '#FAF8F4',         // Text color on dark sections
    textMutedDark: '#A59E92',
  },
  typography: {
    fontSerif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
  },
  radius: {
    sm: '10px',
    md: '18px',
    lg: '26px',
    xl: '34px',
    full: '9999px'
  }
}
```

---

## 🗺️ Interactive Plot Map & Inventory Setup

The plot selector map uses a vector layout coordinate system (`src/data/plotLayout/`).

### Plot Statuses Supported
- `available`: Rendered in clean white fill with selectable hover states.
- `sold`: Rendered in muted gray tones (`#C8BFB5`).
- `reserved` / `custom`: Customizable via `plotInventory.js`.

### Updating Plot Inventory
Edit `src/data/plotLayout/plotInventory.js`:
```javascript
// Change plot status, area, or facing orientation
[
  1, 
  { 
    id: 1, 
    status: 'available',     // 'available' | 'sold'
    areaSqft: 2400, 
    cent: 5.51, 
    facing: 'North'          // 'North' | 'South' | 'East' | 'West' | 'North East' ...
  }
]
```

---

## 📈 Lead Webhook Integration

Lead capture forms (`BookingModal.jsx`, `Home.jsx`, `Contact.jsx`) send submissions via `submitLeadToGoogleSheet()` in `src/data/propertyData.js`.

Configure your endpoint URL in `siteConfig.js`:
```javascript
integrations: {
  leadWebhookUrl: 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec',
  googleTagManagerId: 'GTM-XXXXXXX',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  metaPixelId: '1234567890'
}
```

Each lead payload includes:
```json
{
  "fullName": "Customer Name",
  "phone": "9876543210",
  "email": "customer@example.com",
  "message": "Plot: Plot #14 | Interested in bank loan",
  "source": "Thenshirdi Sai Residency Booking Modal",
  "timestamp": "2026-08-31T14:40:00.000Z"
}
```

---

## 🔎 SEO & Schema.org JSON-LD

The `useSEO` hook automatically synchronizes:
- HTML `<title>`
- `<meta name="description">` and `<meta name="keywords">`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- Schema.org `RealEstateAgent` structured data with developer info, geo-coordinates, and contact numbers.

---

## 🚢 Production Build & Deployment

### Build for Production
```bash
npm run build
```
The output will be placed in the `dist/` directory, ready to deploy to any static hosting provider.

### Vercel / Netlify
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 📄 License & Attribution

This template is licensed for commercial use across multiple real-estate projects. Built with performance, elegance, and conversion optimization in mind.
