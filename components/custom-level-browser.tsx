"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Download, Trash2, Play, Edit, Plus, Share2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { CustomLevel } from "./level-editor"
import { useRouter } from "next/navigation"
import ShareButtons from "./share-buttons"

interface CustomLevelBrowserProps {
  onSelectLevel?: (level: CustomLevel) => void
  showPlayButton?: boolean
}

export default function CustomLevelBrowser({ onSelectLevel, showPlayButton = true }: CustomLevelBrowserProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [levels, setLevels] = useState<CustomLevel[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [levelToDelete, setLevelToDelete] = useState<CustomLevel | null>(null)
  const [levelToShare, setLevelToShare] = useState<CustomLevel | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // レベルデータをロード
  useEffect(() => {
    try {
      const savedLevelsJSON = localStorage.getItem("customLevels")
      if (savedLevelsJSON) {
        const savedLevels = JSON.parse(savedLevelsJSON)
        setLevels(savedLevels)
      }
    } catch (error) {
      console.error("カスタムレベルの読み込みに失敗しました:", error)
      toast({
        title: "エラー",
        description: "カスタムレベルの読み込みに失敗しました",
        variant: "destructive",
      })
    }
  }, [])

  // レベルを削除
  const deleteLevel = (level: CustomLevel) => {
    try {
      const updatedLevels = levels.filter((l) => l.id !== level.id)
      localStorage.setItem("customLevels", JSON.stringify(updatedLevels))
      setLevels(updatedLevels)
      setLevelToDelete(null)
      setShowDeleteConfirm(false)

      toast({
        title: "削除完了",
        description: `レベル「${level.name}」が削除されました`,
      })
    } catch (error) {
      console.error("レベルの削除に失敗しました:", error)
      toast({
        title: "削除エラー",
        description: "レベルの削除に失敗しました",
        variant: "destructive",
      })
    }
  }

  // レベルをエクスポート
  const exportLevel = (level: CustomLevel) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(level))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `${level.name.replace(/\s+/g, "_")}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()

    toast({
      title: "エクスポート完了",
      description: `レベル「${level.name}」がエクスポートされました`,
    })
  }

  // レベルを編集
  const editLevel = (level: CustomLevel) => {
    router.push("/level-editor")
  }

  // 検索結果をフィルタリング
  const filteredLevels = levels.filter(
    (level) =>
      level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      level.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    } catch {
      return "不明な日付"
    }
  }

  // シェア用のテキストを生成
  const getShareTitle = (level: CustomLevel) => {
    return `「${level.name}」に挑戦しよう！ - Kuso Physics`
  }

  const getShareDescription = (level: CustomLevel) => {
    return `作者: ${level.author || "匿名"} のレベル「${level.name}」に挑戦しよう！物理パズルゲーム Kuso Physics`
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">カスタムレベル</h2>
        <Button onClick={() => router.push("/level-editor")} className="flex items-center space-x-1">
          <Plus className="h-4 w-4" />
          <span>新規作成</span>
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="レベル名または作者名で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {filteredLevels.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          {searchTerm ? (
            <p>検索条件に一致するレベルが見つかりませんでした</p>
          ) : (
            <>
              <p>カスタムレベルがありません</p>
              <Button onClick={() => router.push("/level-editor")} className="mt-4">
                最初のレベルを作成
              </Button>
            </>
          )}
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLevels.map((level) => (
              <Card key={level.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">{level.name}</CardTitle>
                  <CardDescription>作者: {level.author || "匿名"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {level.timeLimit > 0 ? `制限時間: ${level.timeLimit}秒` : "制限時間なし"}
                  </div>
                  <div className="text-xs text-gray-500">作成日: {formatDate(level.createdAt)}</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => exportLevel(level)} title="エクスポート">
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => editLevel(level)} title="編集">
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLevelToDelete(level)
                        setShowDeleteConfirm(true)
                      }}
                      title="削除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => setLevelToShare(level)} title="シェア">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {showPlayButton && onSelectLevel && (
                    <Button size="sm" onClick={() => onSelectLevel(level)} className="flex items-center space-x-1">
                      <Play className="h-4 w-4" />
                      <span>プレイ</span>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && levelToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">レベルを削除</h3>
            <p className="text-gray-300 mb-6">
              レベル「{levelToDelete.name}」を削除しますか？この操作は元に戻せません。
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setLevelToDelete(null)
                  setShowDeleteConfirm(false)
                }}
              >
                キャンセル
              </Button>
              <Button variant="destructive" onClick={() => levelToDelete && deleteLevel(levelToDelete)}>
                削除
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* シェアパネル */}
      {levelToShare && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">レベルをシェア</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setLevelToShare(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-300 mb-4">カスタムレベル「{levelToShare.name}」をSNSでシェアしましょう！</p>
            <ShareButtons
              title={getShareTitle(levelToShare)}
              description={getShareDescription(levelToShare)}
              hashtags={["KusoPhysics", "物理パズル", "カスタムレベル"]}
            />
          </div>
        </div>
      )}
    </div>
  )
}
