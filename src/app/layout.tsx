import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ClientShell } from "@/components/providers/ClientShell";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CodeXorr — Enterprise IT, Cloud & AI Engineering",
    template: "%s · CodeXorr",
  },
  description:
    "High-end IT solutions — cloud platforms, AI automation, mobile & web products engineered for global brands.",
  keywords: ["CodeXorr", "IT solutions", "cloud engineering", "AI automation", "Next.js agency"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="font-sans min-h-full bg-background text-foreground">
        <ClientShell />
        <SmoothScroll>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
