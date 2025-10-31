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
  title: "Rooted & Radiant with Lydia McCuen | Christian Podcast",
  description: "Where faith meets everyday life. A Christian podcast helping people grow in faith, find peace in the present, and live with confidence in who God created them to be.",
  metadataBase: new URL("https://rooted-and-radiant.wyatt-works.com"),
  openGraph: {
    title: "Rooted & Radiant with Lydia McCuen",
    description: "Where faith meets everyday life. A Christian podcast helping people grow in faith, find peace in the present, and live with confidence in who God created them to be.",
    siteName: "Rooted & Radiant",
    url: "https://rooted-and-radiant.wyatt-works.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooted & Radiant with Lydia McCuen",
    description: "Where faith meets everyday life. A Christian podcast helping people grow in faith, find peace in the present, and live with confidence in who God created them to be.",
  },
  alternates: {
    canonical: "https://rooted-and-radiant.wyatt-works.com",
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
        {children}
      </body>
    </html>
  );
}
