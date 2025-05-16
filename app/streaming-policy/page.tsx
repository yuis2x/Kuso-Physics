"use client"

import { useLanguage } from "@/lib/language-context"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function StreamingPolicyPage() {
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
            <h1 className="text-3xl font-bold text-white mb-2">{t("streaming.title")}</h1>
            <p className="text-gray-400 mb-8">{t("legal.lastUpdated")}</p>

            <p className="text-gray-300 mb-6">{t("streaming.introduction")}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("streaming.permission")}</h2>
              <p className="text-gray-300">{t("streaming.permissionText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("streaming.monetization")}</h2>
              <p className="text-gray-300 mb-4">{t("streaming.monetizationText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("streaming.ads")}</li>
                <li>{t("streaming.donations")}</li>
                <li>{t("streaming.sponsorships")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("streaming.restrictions")}</h2>
              <p className="text-gray-300 mb-4">{t("streaming.restrictionsText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("streaming.commercialUse")}</li>
                <li>{t("streaming.paidContent")}</li>
                <li>{t("streaming.misrepresentation")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("streaming.attribution")}</h2>
              <p className="text-gray-300 mb-4">{t("streaming.attributionText")}</p>
              <div className="bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-gray-200 font-mono">{t("streaming.attributionExample")}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("streaming.contentGuidelines")}</h2>
              <p className="text-gray-300 mb-4">{t("streaming.contentGuidelinesText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("streaming.appropriate")}</li>
                <li>{t("streaming.noHate")}</li>
                <li>{t("streaming.noMisleading")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t("streaming.contactUs")}</h2>
              <p className="text-gray-300">{t("streaming.contactUsText")}</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
