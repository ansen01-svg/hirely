import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import AuthWrapper from "./components/auth_wrapper/auth_wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "JobGregate: Your Ultimate Job Search Aggregator | Find Jobs Across Top Platforms",
  description:
    "JobGregate aggregates jobs from top platforms in one place, simplifying your job search. Find the right role effortlessly with listings from LinkedIn, Glassdoor, and more.",
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
        <AuthWrapper>
          {children}
          <Analytics />
        </AuthWrapper>
      </body>
    </html>
  );
}
