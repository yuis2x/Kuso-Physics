"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-gray-800 text-white hover:bg-gray-700">
          <Globe className="h-4 w-4 mr-2" />
          {t("language.switch")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-gray-700" : ""}>
          {t("language.en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ja")} className={language === "ja" ? "bg-gray-700" : ""}>
          {t("language.ja")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
