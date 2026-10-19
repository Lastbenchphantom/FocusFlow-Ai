import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://focusflow-ai.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FocusFlow AI — Prioritize work that actually moves the needle",
    template: "%s · FocusFlow AI",
  },
  description:
    "FocusFlow AI is an illustrative AI productivity product that helps teams prioritize tasks, cut noise, and ship with clarity. Fictional demo product for portfolio purposes.",
  keywords: [
    "FocusFlow AI",
    "AI productivity",
    "task prioritization",
    "focus tools",
    "portfolio demo",
  ],
  authors: [{ name: "FocusFlow AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FocusFlow AI",
    title: "FocusFlow AI — Prioritize work that actually moves the needle",
    description:
      "An illustrative AI productivity platform with intelligent task prioritization, focus sessions, and calm execution workflows.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FocusFlow AI product preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusFlow AI",
    description:
      "Illustrative AI productivity product — prioritize, focus, and ship.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
