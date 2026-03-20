import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bmi-keisan.vercel.app";

export const metadata: Metadata = {
  title: "BMI計算機 - 肥満度・理想体重を無料で計算",
  description:
    "身長・体重を入力するだけでBMI値・肥満度判定（痩せ・普通・肥満）・理想体重を即座に計算できる無料ツールです。WHO基準・日本肥満学会基準の両方に対応。スマホでも使いやすいシンプルなデザイン。",
  keywords: ["BMI計算機", "BMI計算", "肥満度計算", "理想体重", "体重管理", "無料ツール"],
  authors: [{ name: "BMI計算機" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "BMI計算機 - 肥満度・理想体重を無料で計算",
    title: "BMI計算機 - 肥満度・理想体重を無料で計算",
    description:
      "身長・体重を入力するだけでBMI・肥満度判定・理想体重を即座に計算。無料ツール。",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "BMI計算機 - 肥満度・理想体重を無料で計算",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI計算機 - 肥満度・理想体重を無料で計算",
    description: "身長・体重を入力するだけでBMI・肥満度判定・理想体重を即座に計算できる無料ツール。",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "9hsoM-4jQQ8ck8mOn39f6Z5K9A5QZOZzd_AdUX24QPM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8297663476934392"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
