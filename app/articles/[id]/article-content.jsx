"use client"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import PWARegister from "@/components/pwa-register"
import LanguageSwitcher from "@/components/language-switcher"
import { articles } from "@/components/article-list"
import NewtonsLawsArticle from "@/components/articles/newtons-laws"
import GravityArticle from "@/components/articles/gravity"
import FrictionArticle from "@/components/articles/friction"
import EnergyArticle from "@/components/articles/energy"
import HarmonicMotionArticle from "@/components/articles/harmonic-motion"

export default function ArticleContent({ id }) {
  const { t } = useLanguage()
  const router = useRouter()

  // Find the article metadata
  const article = articles.find((a) => a.id === id)

  if (!article) {
    return (
      <main className="flex min-h-screen flex-col bg-gray-900">
        <div className="container mx-auto py-8 px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article not found</h1>
          <Button asChild>
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("articles.backToList")}
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  // Render the appropriate article component based on the ID
  const renderArticleContent = () => {
    switch (id) {
      case "newtons-laws":
        return <NewtonsLawsArticle />
      case "gravity":
        return <GravityArticle />
      case "friction":
        return <FrictionArticle />
      case "energy":
        return <EnergyArticle />
      case "harmonic-motion":
        return <HarmonicMotionArticle />
      default:
        return <div className="text-white">Article content not available</div>
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <PWARegister />
      <div className="flex justify-between items-center p-4">
        <Button asChild variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("articles.backToList")}
          </Link>
        </Button>
        <LanguageSwitcher />
      </div>
      <div className="flex-1">
        <div className="container mx-auto py-4 px-4">
          <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={t(article.titleKey)}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-xs text-white p-1">
              <a href={article.imageCreditUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Photo: {article.imageCredit} / Unsplash
              </a>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">{t(article.titleKey)}</h1>
          <p className="text-gray-300 mb-8">{t(article.descriptionKey)}</p>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">{renderArticleContent()}</div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
