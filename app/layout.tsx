import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent/CookieConsent";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAS.COM Consulting",
  description: "Global Management Consulting Firm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
