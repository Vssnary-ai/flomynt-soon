import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flomynt — Autonomous Workflows That Build, Verify, and Heal Themselves",
  description:
    "The AI-native automation platform built for modern agencies. Turn plain English into resilient workflows, white-label them into client apps, and let autonomous agents fix runtime errors before your clients even notice.",
  openGraph: {
    title: "Flomynt — Autonomous Workflows That Build, Verify, and Heal",
    description:
      "Autonomous workflows that build, verify, and heal themselves. Built for modern agencies.",
    type: "website",
    siteName: "Flomynt",
    url: "https://flomynt.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flomynt — Autonomous Workflows",
    description:
      "Autonomous workflows that build, verify, and heal themselves. Built for modern agencies.",
  },
  robots: {
    index: true,
    follow: true,
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
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#e9b45b]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
