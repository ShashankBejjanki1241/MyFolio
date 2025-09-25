import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DebugPanel from "@/components/DebugPanel";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shashank Bejjanki — iOS Developer",
  description: "SwiftUI • ARKit • Core Data • High-performance iOS apps",
  openGraph: {
    type: 'website',
    siteName: 'Shashank Bejjanki — iOS Developer',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <DebugPanel />
        </ErrorBoundary>
      </body>
    </html>
  );
}
