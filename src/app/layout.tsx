import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import GlassDistortionFilter from "@/components/graphics/GlassDistortionFilter";
import SiteLoadGate from "@/components/layouts/SiteLoadGate";
import ScrollRevealObserver from "@/components/animations/ScrollRevealObserver";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Overcourse",
    template: "%s | Overcourse",
  },
  description:
    "Сервис для подбора и сравнения онлайн-курсов от разных школ.",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="no-js" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js');`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SiteLoadGate />
        <GlassDistortionFilter />
        <Header />
        <main id="main">{children}</main>
        <ScrollRevealObserver />
        <Footer />
      </body>
    </html>
  );
}
