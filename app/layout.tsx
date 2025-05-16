import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kuso Physics - 物理パズルゲーム",
  description:
    "物理エンジンを使った楽しいパズルゲーム。ボールを操作して目標地点に到達させよう！カスタムレベルの作成も可能。",
  keywords: "物理パズル, ゲーム, 物理エンジン, React, Three.js, カスタムレベル, パズルゲーム",
  authors: [{ name: "KusoGames" }],
  creator: "KusoGames",
  publisher: "KusoGames",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://kuso-physics.vercel.app/",
    title: "Kuso Physics - 物理パズルゲーム",
    description: "物理エンジンを使った楽しいパズルゲーム。ボールを操作して目標地点に到達させよう！",
    siteName: "Kuso Physics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuso Physics - 物理パズルゲーム",
    description: "物理エンジンを使った楽しいパズルゲーム。ボールを操作して目標地点に到達させよう！",
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  themeColor: "#1a1a2e",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kuso Physics" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
