"use client"

import { useLanguage } from "@/lib/language-context"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-bold text-white mb-2">{t("privacy.title")}</h1>
            <p className="text-gray-400 mb-8">{t("legal.lastUpdated")}</p>

            <p className="text-gray-300 mb-6">{t("privacy.introduction")}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("privacy.whatWeCollect")}</h2>
              <p className="text-gray-300 mb-4">{t("privacy.whatWeCollectText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("privacy.localStorage")}</li>
                <li>{t("privacy.noPersonalData")}</li>
                <li>{t("privacy.analytics")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("privacy.howWeUse")}</h2>
              <p className="text-gray-300 mb-4">{t("privacy.howWeUseText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("privacy.provideService")}</li>
                <li>{t("privacy.improveService")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("privacy.dataSharing")}</h2>
              <p className="text-gray-300 mb-4">{t("privacy.dataSharingText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("privacy.serviceProviders")}</li>
                <li>{t("privacy.legalRequirements")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("privacy.dataRetention")}</h2>
              <p className="text-gray-300">{t("privacy.dataRetentionText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("privacy.userRights")}</h2>
              <p className="text-gray-300 mb-4">{t("privacy.userRightsText")}</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("privacy.accessData")}</li>
                <li>{t("privacy.deleteData")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">{t("privacy.changes")}</h2>
              <p className="text-gray-300">{t("privacy.changesText")}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t("privacy.contact")}</h2>
              <p className="text-gray-300">{t("privacy.contactText")}</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
