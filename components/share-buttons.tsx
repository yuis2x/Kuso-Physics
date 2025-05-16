"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Share2, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

interface ShareButtonsProps {
  url?: string
  title?: string
  description?: string
  hashtags?: string[]
  showCopyLink?: boolean
  className?: string
}

export default function ShareButtons({
  url = "",
  title = "Kuso Physics - 物理パズルゲーム",
  description = "物理エンジンを使った楽しいパズルゲーム。ボールを操作して目標地点に到達させよう！",
  hashtags = ["KusoPhysics", "パズルゲーム", "物理ゲーム"],
  showCopyLink = true,
  className = "",
}: ShareButtonsProps) {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Get the current URL if not provided and we're in the browser
  const currentUrl = typeof window !== "undefined" ? url || window.location.href : url

  // エンコードされたパラメータを準備
  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedHashtags = hashtags.join(",")

  // Twitterでシェア
  const shareOnTwitter = () => {
    if (typeof window !== "undefined") {
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`
      window.open(twitterUrl, "_blank", "noopener,noreferrer")
    }
  }

  // Facebookでシェア
  const shareOnFacebook = () => {
    if (typeof window !== "undefined") {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      window.open(facebookUrl, "_blank", "noopener,noreferrer")
    }
  }

  // LINEでシェア
  const shareOnLine = () => {
    if (typeof window !== "undefined") {
      const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`
      window.open(lineUrl, "_blank", "noopener,noreferrer")
    }
  }

  // リンクをコピー
  const copyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(
        () => {
          setCopied(true)
          toast({
            title: t("alert.copySuccess"),
            description: t("alert.copySuccessDetail"),
          })
          setTimeout(() => setCopied(false), 2000)
        },
        (err) => {
          console.error("リンクのコピーに失敗しました:", err)
          toast({
            title: t("alert.copyError"),
            description: t("alert.copyErrorDetail"),
            variant: "destructive",
          })
        },
      )
    }
  }

  // ネイティブシェア（モバイル）
  const nativeShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: currentUrl,
        })
        .then(() => console.log("共有に成功しました"))
        .catch((error) => console.log("共有に失敗しました", error))
    } else {
      toast({
        title: t("alert.shareNotSupported"),
        description: t("alert.shareNotSupportedDetail"),
        variant: "destructive",
      })
    }
  }

  // Check if we're in the browser and if the share API is available
  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* ネイティブシェアボタン（モバイル向け） */}
      {canNativeShare && (
        <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white" onClick={nativeShare}>
          <Share2 className="h-4 w-4 mr-2" />
          {t("game.share")}
        </Button>
      )}

      {/* Twitterシェアボタン */}
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1DA1F2] hover:bg-[#1a94df] text-white"
        onClick={shareOnTwitter}
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>

      {/* Facebookシェアボタン */}
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1877F2] hover:bg-[#166fe5] text-white"
        onClick={shareOnFacebook}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>

      {/* LINEシェアボタン */}
      <Button variant="outline" size="sm" className="bg-[#06C755] hover:bg-[#05b54c] text-white" onClick={shareOnLine}>
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.365 9.89c.50 0 .866.37.866.87 0 .5-.366.87-.866.87h-2.373v1.49h2.373c.5 0 .866.37.866.87 0 .5-.366.87-.866.87h-3.242c-.5 0-.866-.37-.866-.87V9.02c0-.5.366-.87.866-.87h3.242c.5 0 .866.37.866.87 0 .5-.366.87-.866.87h-2.373v1.49h2.373zm-7.869 4.1c0 .5-.366.87-.866.87-.5 0-.866-.37-.866-.87V9.02c0-.5.366-.87.866-.87.5 0 .866.37.866.87v4.97zm-1.752-1.49h-2.215v-3.48c0-.5-.366-.87-.866-.87-.5 0-.866.37-.866.87v4.35c0 .5.366.87.866.87h3.08c.5 0 .866-.37.866-.87 0-.5-.365-.87-.865-.87zm-5.188-3.48H3.31c-.5 0-.866.37-.866.87 0 .5.366.87.866.87h.866v3.48c0 .5.366.87.866.87.5 0 .866-.37.866-.87v-3.48h.866c.5 0 .866-.37.866-.87 0-.5-.366-.87-.866-.87zM24 10.32C24 4.99 18.627 0 12 0S0 4.99 0 10.32c0 4.83 4.29 8.87 10.084 9.65.393.08.927.27 1.063.61.12.31.08.8.04 1.12l-.173 1.03c-.05.31-.24 1.22 1.07.67s7.13-4.2 9.726-7.19C23.29 14.67 24 12.59 24 10.32z" />
        </svg>
        LINE
      </Button>

      {/* リンクコピーボタン */}
      {showCopyLink && typeof navigator !== "undefined" && navigator.clipboard && (
        <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white" onClick={copyLink}>
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? t("share.copied") : t("share.copyLink")}
        </Button>
      )}
    </div>
  )
}
