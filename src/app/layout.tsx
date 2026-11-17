import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flomynt — Build Without Limits. Keep Your Data Locked.",
  description:
    "The AI-native automation platform built for modern agencies. Turn plain English into resilient workflows, white-label them into client apps, and let autonomous agents fix runtime errors before your clients even notice.",
  openGraph: {
    title: "Flomynt — Build Without Limits. Keep Your Data Locked.",
    description:
      "Autonomous workflows that build, verify, and heal themselves. Built for modern agencies.",
    type: "website",
    siteName: "Flomynt",
    url: "https://flomynt.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flomynt — Build Without Limits",
    description:
      "Autonomous workflows that build, verify, and heal themselves. Built for modern agencies.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Premium type system:
            - Geist: UI + body sans (crisp, geometric)
            - Fraunces: variable serif for italic display accents ("Without Limits", "Data Locked")
            - Geist Mono: tech labels & stats */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500;1,9..144,600&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#bff02e]/40 selection:text-[#0b1b3a]">
        {children}
      </body>
    </html>
  );
}
