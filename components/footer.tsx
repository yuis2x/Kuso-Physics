"use client"

import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { Github } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-900 py-4 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm mb-2 md:mb-0">{t("footer.copyright", { year: currentYear })}</div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
            {t("legal.privacyPolicy")}
          </Link>
          <Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm transition-colors">
            {t("legal.disclaimer")}
          </Link>
          <Link href="/streaming-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
            {t("legal.streamingPolicy")}
          </Link>
          <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
            {t("legal.contact")}
          </Link>
          <Link
            href="https://github.com/KusoGames/Kuso-Physics"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5 mr-1" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
