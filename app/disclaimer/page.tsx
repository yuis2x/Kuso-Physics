"use client"

import { useLanguage } from "@/lib/language-context"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DisclaimerPage() {
  const { t } = useLanguage()

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <PWARegister />
      <div className="flex justify-between items-center p-4">
        <Button asChild variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("articles.backToGame")}
          </Link>
        </Button>
        <LanguageSwitcher />
      </div>
      <div className="flex-1">
        <div className="container mx-auto py-8 px-4 max-w-4xl">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-2">{t("disclaimer.title")}</h1>
            <p className="text-gray-400 mb-8">{t("legal.lastUpdated")}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("disclaimer.general")}</h2>
              <p className="text-gray-300">{t("disclaimer.generalText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("disclaimer.liability")}</h2>
              <p className="text-gray-300">{t("disclaimer.liabilityText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("disclaimer.accuracy")}</h2>
              <p className="text-gray-300">{t("disclaimer.accuracyText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("disclaimer.externalLinks")}</h2>
              <p className="text-gray-300">{t("disclaimer.externalLinksText")}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t("disclaimer.userContent")}</h2>
              <p className="text-gray-300">{t("disclaimer.userContentText")}</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
