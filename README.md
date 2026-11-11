# Flomynt — Waitlist Landing Page

A production-quality, single-page waitlist landing page built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Firebase** (Auth + Firestore).

![Preview](./preview.png)

---

## ✨ Features

- **Auto-playing carousel** with 5 slides, cross-fade transitions, and Instagram-stories progress bars
- **Google sign-in + email** waitlist form with Firestore backend
- **Dark, glassy, Apple-like** design with responsive mobile layout
- **Built-in fallback art** — looks great even without images
- **Accessible** — keyboard navigable, ARIA labels, prefers-reduced-motion support
- **SEO-ready** — Open Graph tags, meta description, semantic HTML
- **Anti-spam** — honeypot field + client-side rate limiting

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flomynt
npm install
```

### 2. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** → Sign-in method → **Google**.
3. Enable **Cloud Firestore** in production mode.
4. Copy the **Firestore security rules** from `firestore.rules` into your Firebase Console → Firestore → Rules.
5. Copy your Firebase config values.

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Optional — URLs for bottom buttons
NEXT_PUBLIC_VISIT_SITE_URL=https://flomynt.com
NEXT_PUBLIC_SPARKLE_URL=https://flomynt.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🖼️ Adding Your 5 Images

Place your images in:

```
public/slides/
  slide-1.webp
  slide-2.webp
  slide-3.webp
  slide-4.webp
  slide-5.webp
```

**Recommended:** Use `.webp` format, **800×1000px** (4:5 aspect ratio). If an image is missing, a beautiful CSS gradient fallback is rendered automatically — no broken-image icons.

---

## ✏️ Editing Slide Text & Timing

All slide data and the autoplay interval are in a single file:

```
src/config/slides.ts
```

- **`AUTOPLAY_MS`** — autoplay interval in milliseconds (default: `5000`)
- **`slides`** array — each slide has `id`, `image`, `tag`, `headline`, `subtext`
- Wrap a word in `*asterisks*` in the headline to render it in italic serif font

---

## 🚢 Deploying

### Vercel (recommended)

1. Push to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Add environment variables in Vercel dashboard.
4. Deploy — done!

### Firebase Hosting

```bash
npm run build
npx firebase deploy --only hosting
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind + custom styles
│   ├── layout.tsx         # Root layout, fonts, metadata
│   └── page.tsx           # Main page
├── components/
│   ├── Carousel.tsx       # Image carousel with fallback art
│   ├── SlideText.tsx      # Animated text overlay
│   ├── WaitlistForm.tsx   # Email + Google sign-in form
│   ├── GlassButton.tsx    # Glass-morphism button
│   └── Logo.tsx           # Flomynt wordmark logo
├── config/
│   └── slides.ts          # Slide data + autoplay timing
└── lib/
    └── firebase.ts        # Firebase init
```

---

## 📋 Firestore Security Rules

The rules in `firestore.rules` allow:
- **Create** a new waitlist entry (validated fields, server timestamp)
- **Get** a single document (for duplicate checking)
- **No** list, update, or delete operations
- **No** access to any other collections

---

## License

Private — © Flomynt
