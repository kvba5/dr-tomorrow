import type { Metadata, Viewport } from "next";

import "./globals.css";

import localFont from "next/font/local"


const determinationMono = localFont({
  src: "../fonts/DeterminationMonoWebRegular-Z5oq.ttf",
  display: "swap",
  preload: true
})

export const metadata: Metadata = {
  title: "DELTARUNE TOMORROW",
  description: "WE'RE SO BACK",
  creator: "kvba5",
  applicationName: "Deltarune Square Progress",
  keywords: ["deltarune", "undertale", "deltarune chapter 3", "deltarune chapter 4", "deltarune new chapter", "deltarune countdown"],
  openGraph: {
    title: "DELTARUNE TOMORROW",
    description: "WE'RE SO BACK",
    creators: ["kvba5"],
    siteName: "Deltarune Square Progress",
    tags: ["deltarune", "undertale", "deltarune chapter 3", "deltarune chapter 4", "deltarune new chapter", "deltarune countdown"]
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={determinationMono.className}
      >
        {children}
      </body>
    </html>
  );
}
