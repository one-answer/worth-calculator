import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';

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
  title: "worth-calculator",
  description: "worth-calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3811349067654166"
              crossOrigin="anonymous"></script>
      
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7NW87MMQ05" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7NW87MMQ05');
        `}
      </Script>
    </head>
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <div className="pb-16"></div>
        </body>
      </html>
    );
  }