import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("host") || "localhost:3001";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;
  return {
    title: "Ghost Hand Intelligence — Porsche DMS Prototype",
    description: "Cross-department dealership intelligence from the exports you already use.",
    metadataBase: new URL(origin),
    openGraph: {
      title: "Ghost Hand Intelligence",
      description: "See what your DMS is not telling you.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" data-brand="ghost-hand" suppressHydrationWarning><body className={`${geist.variable} ${mono.variable}`}><ThemeInitializer />{children}</body></html>;
}
