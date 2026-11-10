import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flomynt | Join the Waitlist",
  description:
    "Flomynt is an AI workflow-automation platform with stronger privacy, white-labeling, voice-driven building and self-healing automations. Join the waitlist.",
  openGraph: {
    title: "Flomynt | Join the Waitlist",
    description:
      "AI workflow automation with zero data leaks, white-labeling, voice-driven building and self-healing automations.",
    type: "website",
    siteName: "Flomynt",
    url: "https://flomynt.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flomynt | Join the Waitlist",
    description:
      "AI workflow automation with zero data leaks, white-labeling, voice-driven building and self-healing automations.",
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
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
