import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap"
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-tight",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Emre Miraç Çakır | Software Developer & Technology Columnist",
  description:
    "Personal portfolio for Emre Miraç Çakır, a software developer and technology columnist building web apps, automation systems, automotive software experiments, and technology stories.",
  openGraph: {
    title: "Emre Miraç Çakır",
    description:
      "Software Developer · Technology Columnist · Builder",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
