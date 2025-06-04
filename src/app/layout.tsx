"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProvider from "@/providers/ClientProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProvider>
          <ThemeProvider>
            <Navbar /> {/* ✅ Navbar burada! */}
            <main>{children}</main>
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
