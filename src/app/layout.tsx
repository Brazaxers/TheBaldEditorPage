import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Bald Editor — Video Editing for Creators & Brands",
  description: "Professional video editing for content creators, influencers, and brands. Cuts that hit different.",
  icons: {
    icon: "/images/submark-white.png",
    apple: "/images/submark-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-purple text-cream">
        {children}
      </body>
    </html>
  );
}
