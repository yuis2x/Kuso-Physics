"use client"

import LevelEditor from "@/components/level-editor"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"

export default function LevelEditorPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <PWARegister />
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="flex-1 w-full">
        <LevelEditor />
      </div>
      <Footer />
    </main>
  )
}
