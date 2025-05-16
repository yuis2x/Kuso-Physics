"use client"

import PhysicsPuzzleGame from "@/components/physics-puzzle-game"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import ShareButtons from "@/components/share-buttons"

// Import the useLanguage hook
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"

// Update the Home component to use translations
export default function Home() {
  // Add the useLanguage hook
  const { t } = useLanguage()

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <PWARegister />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">{t("app.title")}</h1>
        <div className="w-full max-w-4xl h-[600px] bg-gray-800 rounded-lg overflow-hidden">
          <PhysicsPuzzleGame />
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-500">
              <Link href="/play-custom-level">{t("nav.playCustomLevel")}</Link>
            </Button>

            <Button asChild className="bg-green-600 hover:bg-green-500">
              <Link href="/level-editor">{t("nav.openLevelEditor")}</Link>
            </Button>

            <Button asChild className="bg-purple-600 hover:bg-purple-500">
              <Link href="/articles">{t("nav.articles")}</Link>
            </Button>

            <Button asChild className="bg-yellow-600 hover:bg-yellow-500">
              <Link href="/help">{t("nav.help")}</Link>
            </Button>
          </div>

          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white text-center mb-3">{t("share.title")}</h3>
            <ShareButtons
              title={t("app.title")}
              description={t("share.levelDescription", { name: t("app.title"), author: "KusoGames" })}
              hashtags={["KusoPhysics", "PhysicsPuzzle", "Game"]}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
