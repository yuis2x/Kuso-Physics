"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Define the article data structure
export interface Article {
  id: string
  titleKey: string
  descriptionKey: string
  imageUrl: string
  imageCredit: string
  imageCreditUrl: string
}

// List of available articles
export const articles: Article[] = [
  {
    id: "newtons-laws",
    titleKey: "article.newtonLaws.title",
    descriptionKey: "article.newtonLaws.description",
    imageUrl: "/images/articles/newtons-laws.jpg",
    imageCredit: "Karim MANJRA",
    imageCreditUrl: "https://unsplash.com/@karim_manjra",
  },
  {
    id: "gravity",
    titleKey: "article.gravity.title",
    descriptionKey: "article.gravity.description",
    imageUrl: "/images/articles/gravity.jpg",
    imageCredit: "NASA",
    imageCreditUrl: "https://unsplash.com/@nasa",
  },
  {
    id: "friction",
    titleKey: "article.friction.title",
    descriptionKey: "article.friction.description",
    imageUrl: "/images/articles/friction.jpg",
    imageCredit: "Wynand van Poortvliet",
    imageCreditUrl: "https://unsplash.com/@wwwynand",
  },
  {
    id: "energy",
    titleKey: "article.energy.title",
    descriptionKey: "article.energy.description",
    imageUrl: "/images/articles/energy.jpg",
    imageCredit: "Rohan Makhecha",
    imageCreditUrl: "https://unsplash.com/@rohanmakhecha",
  },
  {
    id: "harmonic-motion",
    titleKey: "article.harmonic.title",
    descriptionKey: "article.harmonic.description",
    imageUrl: "/images/articles/harmonic-motion.jpg",
    imageCredit: "Jonatan Pie",
    imageCreditUrl: "https://unsplash.com/@r3dmax",
  },
]

export default function ArticleList() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-2">{t("articles.title")}</h1>
      <p className="text-gray-300 mb-8">{t("articles.description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={article.imageUrl || "/placeholder.svg"}
                alt={t(article.titleKey)}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-xs text-white p-1">
                <a href={article.imageCreditUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Photo: {article.imageCredit} / Unsplash
                </a>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-white">{t(article.titleKey)}</CardTitle>
              <CardDescription>{t(article.descriptionKey)}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/articles/${article.id}`}>
                  {t("articles.readMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
