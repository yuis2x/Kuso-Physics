"use client"

import { useLanguage } from "@/lib/language-context"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Github } from "lucide-react"

export default function ContactPage() {
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
            <h1 className="text-3xl font-bold text-white mb-4">{t("contact.title")}</h1>
            <p className="text-gray-300 mb-8">{t("contact.text")}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("contact.github")}</h2>
              <p className="text-gray-300 mb-4">{t("contact.githubText")}</p>
              <Button asChild size="lg" className="flex items-center">
                <a href="https://github.com/KusoGames/Kuso-Physics" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  {t("contact.githubLink")}
                </a>
              </Button>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("contact.issues")}</h2>
              <p className="text-gray-300 mb-4">{t("contact.issuesText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("contact.issueSteps")}</li>
                <li>{t("contact.issueBehavior")}</li>
                <li>{t("contact.issueSystem")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t("contact.feature")}</h2>
              <p className="text-gray-300">{t("contact.featureText")}</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
