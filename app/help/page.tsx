"use client"

import { useLanguage } from "@/lib/language-context"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, MousePointer, Smartphone, Gamepad2, Lightbulb, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
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
            <h1 className="text-3xl font-bold text-white mb-2">{t("help.title")}</h1>
            <h2 className="text-xl text-gray-300 mb-6">{t("help.subtitle")}</h2>

            <p className="text-gray-300 mb-8 text-lg">{t("help.introduction")}</p>

            {/* Game Overview Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Gamepad2 className="mr-2 h-6 w-6" />
                {t("help.overview.title")}
              </h2>
              <p className="text-gray-300 mb-4">{t("help.overview.description")}</p>
              <h3 className="text-lg font-medium text-white mb-2">{t("help.overview.features")}</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>{t("help.overview.feature1")}</li>
                <li>{t("help.overview.feature2")}</li>
                <li>{t("help.overview.feature3")}</li>
                <li>{t("help.overview.feature4")}</li>
                <li>{t("help.overview.feature5")}</li>
              </ul>
            </section>

            {/* How to Play Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Gamepad2 className="mr-2 h-6 w-6" />
                {t("help.howToPlay.title")}
              </h2>
              <p className="text-gray-300 mb-4">{t("help.howToPlay.description")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.howToPlay.step1.title")}</h3>
                  <p className="text-gray-300">{t("help.howToPlay.step1.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.howToPlay.step2.title")}</h3>
                  <p className="text-gray-300">{t("help.howToPlay.step2.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.howToPlay.step3.title")}</h3>
                  <p className="text-gray-300">{t("help.howToPlay.step3.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.howToPlay.step4.title")}</h3>
                  <p className="text-gray-300">{t("help.howToPlay.step4.description")}</p>
                </div>
              </div>
            </section>

            {/* Controls Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Gamepad2 className="mr-2 h-6 w-6" />
                {t("help.controls.title")}
              </h2>
              <p className="text-gray-300 mb-4">{t("help.controls.description")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                    <Smartphone className="mr-2 h-5 w-5" />
                    {t("help.controls.mobile.title")}
                  </h3>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>{t("help.controls.mobile.shake")}</li>
                    <li>{t("help.controls.mobile.touch")}</li>
                    <li>{t("help.controls.mobile.pinch")}</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                    <MousePointer className="mr-2 h-5 w-5" />
                    {t("help.controls.desktop.title")}
                  </h3>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>{t("help.controls.desktop.mouse")}</li>
                    <li>{t("help.controls.desktop.buttons")}</li>
                    <li>{t("help.controls.desktop.orbit")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Game Modes Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Gamepad2 className="mr-2 h-6 w-6" />
                {t("help.modes.title")}
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.modes.campaign.title")}</h3>
                  <p className="text-gray-300">{t("help.modes.campaign.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.modes.custom.title")}</h3>
                  <p className="text-gray-300">{t("help.modes.custom.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.modes.editor.title")}</h3>
                  <p className="text-gray-300">{t("help.modes.editor.description")}</p>
                </div>
              </div>
            </section>

            {/* Tips and Tricks Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Lightbulb className="mr-2 h-6 w-6" />
                {t("help.tips.title")}
              </h2>
              <p className="text-gray-300 mb-4">{t("help.tips.intro")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.tips.tip1.title")}</h3>
                  <p className="text-gray-300">{t("help.tips.tip1.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.tips.tip2.title")}</h3>
                  <p className="text-gray-300">{t("help.tips.tip2.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.tips.tip3.title")}</h3>
                  <p className="text-gray-300">{t("help.tips.tip3.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.tips.tip4.title")}</h3>
                  <p className="text-gray-300">{t("help.tips.tip4.description")}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg md:col-span-2">
                  <h3 className="text-lg font-medium text-white mb-2">{t("help.tips.tip5.title")}</h3>
                  <p className="text-gray-300">{t("help.tips.tip5.description")}</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <HelpCircle className="mr-2 h-6 w-6" />
                {t("help.faq.title")}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                    {t("help.faq.q1")}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">{t("help.faq.a1")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                    {t("help.faq.q2")}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">{t("help.faq.a2")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                    {t("help.faq.q3")}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">{t("help.faq.a3")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                    {t("help.faq.q4")}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">{t("help.faq.a4")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-white hover:no-underline py-4">
                    {t("help.faq.q5")}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pb-4">{t("help.faq.a5")}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
