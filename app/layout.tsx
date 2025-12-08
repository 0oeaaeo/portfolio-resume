import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UIProvider } from "./context/UIContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eric Dennis | Founder Stack & AI Architect",
  description: "Portfolio of Eric Dennis - Bridging Linux Mastery and Next-Gen AI",
  openGraph: {
    title: "Eric Dennis | Founder Stack & AI Architect",
    description: "Portfolio of Eric Dennis - Bridging Linux Mastery and Next-Gen AI",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Dennis | Founder Stack & AI Architect",
    description: "Portfolio of Eric Dennis - Bridging Linux Mastery and Next-Gen AI",
    images: ["/og-image.png"],
  },
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
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
