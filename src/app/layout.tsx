import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ClientShell } from "@/components/providers/ClientShell";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CodeXorr — Enterprise IT, Cloud & AI Engineering",
    template: "%s · CodeXorr",
  },
  description:
    "AI-native engineering studio — resilient cloud platforms, immersive product UX, and intelligent workflows for teams that refuse to ship average.",
  keywords: ["CodeXorr", "IT solutions", "cloud engineering", "AI automation", "Next.js agency"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafbfc",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="font-sans min-h-full bg-background text-foreground">
        <ClientShell />
      <SmoothScroll>
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex min-w-0 flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
