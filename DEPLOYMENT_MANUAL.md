# Deployment & Operations Manual: Way #56 (Product 58)

## 1. Quick Start & Prerequisites
- Node.js v18.0.0+ LTS or v20.0.0+ LTS
- npm v9.0.0+
- Wrangler CLI v3.0.0+ (`npm install -g wrangler`)
- Modern Web Browser (Chrome, Firefox, Safari, Edge)

---

## 2. Local Installation & Development

### Pack 1: Resume & LinkedIn Optimization Engine
```bash
cd engine/resume_rewriting_engine
npm install
npm run build
npm test
```

### Pack 2: Edge Gateway & Cloudflare Worker
```bash
cd engine/edge_resume_gateway
npm install
npm run build

# Run local edge simulator
npx wrangler dev
```

### Pack 3: Monetization Kit
```bash
cd monetization_career_kit
npm install
npm run build
```

---

## 3. Cloudflare D1 Database Provisioning
To initialize the D1 database for production edge deployment:
```bash
# 1. Create the D1 database instance
npx wrangler d1 create resume-linkedin-db

# 2. Apply database migrations
npx wrangler d1 execute resume-linkedin-db --file=src/schema.sql

# 3. Deploy the Edge Gateway Worker
npx wrangler deploy
```

---

## 4. Interactive Showcase Launch
Open `showcase/index.html` directly in any web browser:
```bash
npx serve showcase
```
Exposes 4 interactive screens:
1. ATS Resume Parser & Keyword Density Auditor
2. Executive LinkedIn Profile & Headline Rewriter
3. Quantitative Impact Bullet Formatter (XYZ / STAR Framework)
4. Career Package Invoicing & Intake Assessment Portal
