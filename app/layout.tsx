import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="pb-16"></div>
        {/*<footer className="w-full py-4 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800 fixed bottom-0 left-0 shadow-sm">*/}
        {/*  <div className="max-w-5xl mx-auto px-4">*/}
        {/*    <div className="flex flex-col items-center">*/}
        {/*      <a */}
        {/*        href="https://citycompare.zippland.com/" */}
        {/*        target="_blank"*/}
        {/*        rel="noopener noreferrer"*/}
        {/*        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center text-base"*/}
        {/*      >*/}
        {/*        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">*/}
        {/*          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />*/}
        {/*        </svg>*/}
        {/*        另一个项目：在不同城市要过上同等生活水平需要多少钱？*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</footer>*/}
      </body>
    </html>
  );
}
