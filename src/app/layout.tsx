import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        {/* Load Inter & Instrument Serif via standard link tags so build does not need network */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
