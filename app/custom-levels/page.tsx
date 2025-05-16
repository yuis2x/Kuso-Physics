"use client"

import CustomLevelBrowser from "@/components/custom-level-browser"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"

export default function CustomLevelsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <PWARegister />
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="flex-1 container mx-auto py-8">
        <CustomLevelBrowser />
      </div>
      <Footer />
    </main>
  )
}
