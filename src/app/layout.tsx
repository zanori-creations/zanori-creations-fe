import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zanori | Elegance That Speaks Quietly",
  description: "A global fashion house built on timeless design, discipline, and detail. From apparel to accessories and beyond, Zanori creates pieces that embody quiet wealth, confidence, and enduring style.",
  keywords: ["fashion", "luxury", "apparel", "accessories", "design", "elegance", "Zanori"],
  authors: [{ name: "Zanori" }],
  creator: "Zanori",
  publisher: "Zanori",
  openGraph: {
    title: "Zanori | Elegance That Speaks Quietly",
    description: "A global fashion house built on timeless design, discipline, and detail. From apparel to accessories and beyond, Zanori creates pieces that embody quiet wealth, confidence, and enduring style.",
    url: "https://zanoriworld.com",
    siteName: "Zanori",
    images: [
      {
        url: "/assets/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Zanori Logo - Elegance That Speaks Quietly",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanori | Elegance That Speaks Quietly",
    description: "A global fashion house built on timeless design, discipline, and detail. From apparel to accessories and beyond, Zanori creates pieces that embody quiet wealth, confidence, and enduring style.",
    images: ["/assets/logo.jpeg"],
    creator: "@zanoriworld",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
