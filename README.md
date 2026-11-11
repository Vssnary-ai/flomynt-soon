# Flomynt — Autonomous Workflows Platform

An AI-native automation platform built for modern agencies. Single-page architecture with smooth anchor sections, ambient background system, glass-morphism command bar, and a hidden password-protected administrative dashboard.

---

## ✨ System Architecture

- **Single-Page Smooth Scrolling:** `#home`, `#features`, `#what`, `#why`, `#wishlist`, `#contact`
- **Ambient Visual System:** Fixed aurora blobs, mouse spotlight tracking, radial-masked dot grid, and 3-4% film grain overlay
- **Hero & Command Bar:** Full-bleed hero background with Ken Burns, scroll parallax, and frosted glass command bar with rotating placeholder and suggestion chips
- **Architecture Showcase (Wishlist):** Equal-height glass cards featuring the 5 core Flomynt pillars + interactive early-access waitlist form
- **Administrative Portal (`/admin`):** Timing-safe bcrypt password-authenticated dashboard with rate limiting (5 attempts → 15min lockout), httpOnly session cookie, lead management, status updates, search/filter, and CSV exports

---

## 🚀 Getting Started

### 1. Installation

```bash
git clone https://github.com/Vssnary-ai/flomynt-soon.git
cd flomynt
npm install
```

### 2. Configure Environment Variables

Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

Configure your environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Admin Portal Authentication
ADMIN_PASSWORD=$2b$10$F6jKgB5pqBrlF7hiiEpLTuvYOqdrVyUskUVw/B0ypdUGUcC9GKH66
SESSION_SECRET=b82296004346fa4f5704e147bd52dd4cb6ad72e61faef5398ea686b7be3c24f1
```

> **Note:** The default admin password is set to `Aman@flomynt123`.

### 3. Changing the Admin Password

To generate a new bcrypt hash for a new master passcode:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourNewPasswordHere', 10));"
```

Copy the generated hash into `ADMIN_PASSWORD` in `.env.local`.

---

## 🛡️ Administrative Console (`/admin`)

Access the hidden administrative dashboard at `/admin`:

- **Master Passcode:** `Aman@flomynt123` (or your customized password)
- **Security Protections:**
  - Timing-safe bcrypt password comparison
  - IP-based rate limiting (5 failed attempts trigger a 15-minute lockout)
  - Signed HMAC SHA-256 session token stored in an `httpOnly`, `sameSite=strict` cookie (8-hour expiry)
- **Capabilities:**
  - View all direct engineering inquiries (Leads)
  - Change lead workflow stages (`NEW`, `CONTACTED`, `CONVERTED`, `ARCHIVED`)
  - View priority waitlist reservations with logged workflow specifications
  - Real-time search and status filtering
  - One-click CSV export for leads and wishlist datasets
  - Auto-refresh toggle (every 30 seconds)

---

## 🛠️ Build & Development Commands

```bash
# Start local development server (Turbopack)
npm run dev

# Compile Tailwind CSS
npm run build:css

# Production build (CSS compilation + Next.js build)
npm run build

# Start production server
npm start
```

---

## License

Private — © Flomynt Inc. All rights reserved.
