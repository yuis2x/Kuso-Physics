"use client"

import { useState } from "react"
import CustomLevelBrowser from "@/components/custom-level-browser"
import CustomLevelPlayer from "@/components/custom-level-player"
import type { CustomLevel } from "@/components/level-editor"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"

export default function PlayCustomLevelPage() {
  const [selectedLevel, setSelectedLevel] = useState<CustomLevel | null>(null)

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <PWARegister />
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      {selectedLevel ? (
        <div className="flex-1 w-full">
          <CustomLevelPlayer customLevel={selectedLevel} onBack={() => setSelectedLevel(null)} />
        </div>
      ) : (
        <div className="flex-1 container mx-auto py-8">
          <CustomLevelBrowser onSelectLevel={setSelectedLevel} showPlayButton={true} />
        </div>
      )}
      {!selectedLevel && <Footer />}
    </main>
  )
}
