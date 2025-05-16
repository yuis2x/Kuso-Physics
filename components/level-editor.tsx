"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  Save,
  FileUp,
  FileDown,
  Play,
  Pause,
  Square,
  Circle,
  Move,
  Eraser,
  Undo,
  Redo,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Vector2D, Line2D, Ball2D, type Puzzle, type Vector } from "@/lib/types"
import EditorCanvas from "./editor-canvas"
import { useToast } from "@/hooks/use-toast"

// カスタムレベルの型定義
export interface CustomLevel {
  id: string
  name: string
  author: string
  lines: Array<{
    start: { x: number; y: number }
    end: { x: number; y: number }
    friction: number
    bounce: boolean
    color: string
  }>
  startPosition: { x: number; y: number }
  endPosition: { x: number; y: number }
  timeLimit: number
  createdAt: string
  updatedAt: string
}

// ツールの種類
type EditorTool = "line" | "start" | "end" | "select" | "erase"

export default function LevelEditor() {
  const { toast } = useToast()
  const [currentTool, setCurrentTool] = useState<EditorTool>("line")
  const [lines, setLines] = useState<Line2D[]>([
    // 外枠を初期状態で追加
    new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
    new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
    new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
    new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall
  ])
  const [startPosition, setStartPosition] = useState<Vector>(new Vector2D(-4, 1))
  const [endPosition, setEndPosition] = useState<Vector>(new Vector2D(4, -1))
  const [timeLimit, setTimeLimit] = useState(0)
  const [levelName, setLevelName] = useState("マイカスタムレベル")
  const [authorName, setAuthorName] = useState("匿名")
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState<Vector | null>(null)
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null)
  const [isWideFrame, setIsWideFrame] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [undoStack, setUndoStack] = useState<Line2D[][]>([])
  const [redoStack, setRedoStack] = useState<Line2D[][]>([])

  // 選択された線の属性
  const [selectedLineFriction, setSelectedLineFriction] = useState(0.5)
  const [selectedLineBounce, setSelectedLineBounce] = useState(true)
  const [selectedLineColor, setSelectedLineColor] = useState("#88ff88")

  // 編集履歴に現在の状態を保存
  const saveToHistory = () => {
    setUndoStack([...undoStack, [...lines]])
    setRedoStack([])
  }

  // 元に戻す
  const handleUndo = () => {
    if (undoStack.length === 0) return

    const prevState = undoStack[undoStack.length - 1]
    const newUndoStack = undoStack.slice(0, -1)

    setRedoStack([...redoStack, [...lines]])
    setLines(prevState)
    setUndoStack(newUndoStack)
  }

  // やり直し
  const handleRedo = () => {
    if (redoStack.length === 0) return

    const nextState = redoStack[redoStack.length - 1]
    const newRedoStack = redoStack.slice(0, -1)

    setUndoStack([...undoStack, [...lines]])
    setLines(nextState)
    setRedoStack(newRedoStack)
  }

  // フレームサイズの変更
  const toggleFrameSize = () => {
    saveToHistory()

    if (isWideFrame) {
      // 通常サイズに戻す
      setLines([
        new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
        new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
        new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
        new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall
      ])
    } else {
      // 広いサイズに変更
      setLines([
        new Line2D(new Vector2D(-12, -8), new Vector2D(12, -8), 0.5, true, "#8888ff"), // Bottom
        new Line2D(new Vector2D(-12, -8), new Vector2D(-12, 8), 0.5, true, "#8888ff"), // Left wall
        new Line2D(new Vector2D(-12, 8), new Vector2D(12, 8), 0.5, true, "#8888ff"), // Top
        new Line2D(new Vector2D(12, -8), new Vector2D(12, 8), 0.5, true, "#8888ff"), // Right wall
      ])
    }

    setIsWideFrame(!isWideFrame)
  }

  // キャンバス上でのクリックイベント
  const handleCanvasClick = (position: Vector) => {
    if (currentTool === "start") {
      setStartPosition(position)
    } else if (currentTool === "end") {
      setEndPosition(position)
    } else if (currentTool === "line" && !isDrawing) {
      setIsDrawing(true)
      setDrawStart(position)
    } else if (currentTool === "line" && isDrawing && drawStart) {
      saveToHistory()

      // 新しい線を追加
      const newLine = new Line2D(
        new Vector2D(drawStart.x, drawStart.y),
        new Vector2D(position.x, position.y),
        selectedLineFriction,
        selectedLineBounce,
        selectedLineColor,
      )
      setLines([...lines, newLine])
      setIsDrawing(false)
      setDrawStart(null)
    } else if (currentTool === "select") {
      // 最も近い線を選択
      let closestLineIndex = -1
      let closestDistance = Number.POSITIVE_INFINITY

      lines.forEach((line, index) => {
        // 線分と点の距離を計算
        const distance = distanceFromPointToLine(position, line.start, line.end)
        if (distance < closestDistance) {
          closestDistance = distance
          closestLineIndex = index
        }
      })

      // 十分近い場合のみ選択
      if (closestDistance < 0.5 && closestLineIndex >= 0) {
        setSelectedLineIndex(closestLineIndex)
        const selectedLine = lines[closestLineIndex]
        setSelectedLineFriction(selectedLine.friction || 0.5)
        setSelectedLineBounce(selectedLine.bounce || true)
        setSelectedLineColor(selectedLine.color || "#88ff88")
      } else {
        setSelectedLineIndex(null)
      }
    } else if (currentTool === "erase") {
      // 最も近い線を削除
      let closestLineIndex = -1
      let closestDistance = Number.POSITIVE_INFINITY

      lines.forEach((line, index) => {
        // 外枠は削除できないようにする（最初の4つの線）
        if (index < 4) return

        // 線分と点の距離を計算
        const distance = distanceFromPointToLine(position, line.start, line.end)
        if (distance < closestDistance) {
          closestDistance = distance
          closestLineIndex = index
        }
      })

      // 十分近い場合のみ削除
      if (closestDistance < 0.5 && closestLineIndex >= 4) {
        saveToHistory()
        const newLines = [...lines]
        newLines.splice(closestLineIndex, 1)
        setLines(newLines)
      }
    }
  }

  // 線分と点の距離を計算する関数
  const distanceFromPointToLine = (point: Vector, lineStart: Vector, lineEnd: Vector) => {
    const A = point.x - lineStart.x
    const B = point.y - lineStart.y
    const C = lineEnd.x - lineStart.x
    const D = lineEnd.y - lineStart.y

    const dot = A * C + B * D
    const lenSq = C * C + D * D
    let param = -1

    if (lenSq !== 0) param = dot / lenSq

    let xx, yy

    if (param < 0) {
      xx = lineStart.x
      yy = lineStart.y
    } else if (param > 1) {
      xx = lineEnd.x
      yy = lineEnd.y
    } else {
      xx = lineStart.x + param * C
      yy = lineStart.y + param * D
    }

    const dx = point.x - xx
    const dy = point.y - yy

    return Math.sqrt(dx * dx + dy * dy)
  }

  // 選択された線の属性を更新
  const updateSelectedLine = () => {
    if (selectedLineIndex === null) return

    saveToHistory()
    const newLines = [...lines]
    newLines[selectedLineIndex] = new Line2D(
      new Vector2D(lines[selectedLineIndex].start.x, lines[selectedLineIndex].start.y),
      new Vector2D(lines[selectedLineIndex].end.x, lines[selectedLineIndex].end.y),
      selectedLineFriction,
      selectedLineBounce,
      selectedLineColor,
    )
    setLines(newLines)
  }

  // レベルを保存
  const saveLevel = () => {
    if (!levelName.trim()) {
      toast({
        title: "エラー",
        description: "レベル名を入力してください",
        variant: "destructive",
      })
      return
    }

    const levelId = `custom_${Date.now()}`
    const customLevel: CustomLevel = {
      id: levelId,
      name: levelName,
      author: authorName || "匿名",
      lines: lines.map((line) => ({
        start: { x: line.start.x, y: line.start.y },
        end: { x: line.end.x, y: line.end.y },
        friction: line.friction || 0.5,
        bounce: line.bounce || true,
        color: line.color || "#88ff88",
      })),
      startPosition: { x: startPosition.x, y: startPosition.y },
      endPosition: { x: endPosition.x, y: endPosition.y },
      timeLimit: timeLimit,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // ローカルストレージに保存
    try {
      // 既存のレベルを取得
      const savedLevelsJSON = localStorage.getItem("customLevels")
      let savedLevels: CustomLevel[] = []

      if (savedLevelsJSON) {
        savedLevels = JSON.parse(savedLevelsJSON)
      }

      // 新しいレベルを追加
      savedLevels.push(customLevel)

      // 保存
      localStorage.setItem("customLevels", JSON.stringify(savedLevels))

      toast({
        title: "保存完了",
        description: `レベル「${levelName}」が保存されました`,
      })
    } catch (error) {
      console.error("レベルの保存に失敗しました:", error)
      toast({
        title: "保存エラー",
        description: "レベルの保存に失敗しました",
        variant: "destructive",
      })
    }
  }

  // レベルをエクスポート
  const exportLevel = () => {
    if (!levelName.trim()) {
      toast({
        title: "エラー",
        description: "レベル名を入力してください",
        variant: "destructive",
      })
      return
    }

    const customLevel: CustomLevel = {
      id: `custom_${Date.now()}`,
      name: levelName,
      author: authorName || "匿名",
      lines: lines.map((line) => ({
        start: { x: line.start.x, y: line.start.y },
        end: { x: line.end.x, y: line.end.y },
        friction: line.friction || 0.5,
        bounce: line.bounce || true,
        color: line.color || "#88ff88",
      })),
      startPosition: { x: startPosition.x, y: startPosition.y },
      endPosition: { x: endPosition.x, y: endPosition.y },
      timeLimit: timeLimit,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // JSONとしてエクスポート
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customLevel))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `${levelName.replace(/\s+/g, "_")}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // レベルをインポート
  const importLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedLevel: CustomLevel = JSON.parse(content)

        // データを検証
        if (!importedLevel.lines || !importedLevel.startPosition || !importedLevel.endPosition) {
          throw new Error("無効なレベルデータです")
        }

        // データをロード
        setLevelName(importedLevel.name || "インポートしたレベル")
        setAuthorName(importedLevel.author || "匿名")
        setTimeLimit(importedLevel.timeLimit || 0)

        // 線を変換
        const convertedLines = importedLevel.lines.map(
          (line) =>
            new Line2D(
              new Vector2D(line.start.x, line.start.y),
              new Vector2D(line.end.x, line.end.y),
              line.friction,
              line.bounce,
              line.color,
            ),
        )
        setLines(convertedLines)

        // 開始位置と終了位置を設定
        setStartPosition(new Vector2D(importedLevel.startPosition.x, importedLevel.startPosition.y))
        setEndPosition(new Vector2D(importedLevel.endPosition.x, importedLevel.endPosition.y))

        // フレームサイズを判定
        const isWide = convertedLines.some(
          (line) =>
            Math.abs(line.start.x) > 10 ||
            Math.abs(line.start.y) > 6 ||
            Math.abs(line.end.x) > 10 ||
            Math.abs(line.end.y) > 6,
        )
        setIsWideFrame(isWide)

        toast({
          title: "インポート完了",
          description: `レベル「${importedLevel.name}」がインポートされました`,
        })
      } catch (error) {
        console.error("レベルのインポートに失敗しました:", error)
        toast({
          title: "インポートエラー",
          description: "無効なレベルファイルです",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)

    // ファイル選択をリセット
    event.target.value = ""
  }

  // テストプレイの開始/停止
  const toggleTestPlay = () => {
    setIsTesting(!isTesting)
  }

  // 現在のパズルをPuzzleオブジェクトに変換
  const getCurrentPuzzle = (): Puzzle => {
    return {
      id: "editor_preview",
      lines: lines,
      ball: new Ball2D(
        "editor_ball",
        new Vector2D(startPosition.x, startPosition.y),
        new Vector2D(0, 0),
        0.5,
        "#ff8888",
      ),
      startPosition: startPosition,
      endPosition: endPosition,
      gravity: new Vector2D(0, -9.81),
      timeLimit: timeLimit,
      applyPhysics: () => {},
      checkCollisions: () => {},
      isSolved: () => false,
      reset: () => {},
      render: () => {},
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-white">レベルエディタ</h2>
          <div className="flex items-center space-x-1">
            <Input
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              placeholder="レベル名"
              className="w-48 h-8"
            />
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="作者名"
              className="w-32 h-8"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={saveLevel} className="flex items-center space-x-1">
            <Save className="h-4 w-4" />
            <span>保存</span>
          </Button>

          <Button variant="outline" size="sm" onClick={exportLevel} className="flex items-center space-x-1">
            <FileDown className="h-4 w-4" />
            <span>エクスポート</span>
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1"
              onClick={() => document.getElementById("import-level")?.click()}
            >
              <FileUp className="h-4 w-4" />
              <span>インポート</span>
            </Button>
            <input id="import-level" type="file" accept=".json" onChange={importLevel} className="hidden" />
          </div>

          <Button
            variant={isTesting ? "destructive" : "default"}
            size="sm"
            onClick={toggleTestPlay}
            className="flex items-center space-x-1"
          >
            {isTesting ? (
              <>
                <Pause className="h-4 w-4" />
                <span>停止</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>テストプレイ</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="w-64 bg-gray-900 p-4 flex flex-col space-y-4 overflow-y-auto">
          <Tabs defaultValue="tools">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tools">ツール</TabsTrigger>
              <TabsTrigger value="properties">プロパティ</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white">描画ツール</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={currentTool === "line" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentTool("line")}
                    className="flex flex-col items-center py-2"
                  >
                    <Square className="h-4 w-4 mb-1" />
                    <span className="text-xs">線</span>
                  </Button>

                  <Button
                    variant={currentTool === "start" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentTool("start")}
                    className="flex flex-col items-center py-2"
                  >
                    <Circle className="h-4 w-4 mb-1 text-green-500" />
                    <span className="text-xs">開始点</span>
                  </Button>

                  <Button
                    variant={currentTool === "end" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentTool("end")}
                    className="flex flex-col items-center py-2"
                  >
                    <Circle className="h-4 w-4 mb-1 text-red-500" />
                    <span className="text-xs">終了点</span>
                  </Button>

                  <Button
                    variant={currentTool === "select" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentTool("select")}
                    className="flex flex-col items-center py-2"
                  >
                    <Move className="h-4 w-4 mb-1" />
                    <span className="text-xs">選択</span>
                  </Button>

                  <Button
                    variant={currentTool === "erase" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentTool("erase")}
                    className="flex flex-col items-center py-2"
                  >
                    <Eraser className="h-4 w-4 mb-1" />
                    <span className="text-xs">消去</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white">編集</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUndo}
                    disabled={undoStack.length === 0}
                    className="flex items-center justify-center space-x-1"
                  >
                    <Undo className="h-4 w-4" />
                    <span className="text-xs">元に戻す</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRedo}
                    disabled={redoStack.length === 0}
                    className="flex items-center justify-center space-x-1"
                  >
                    <Redo className="h-4 w-4" />
                    <span className="text-xs">やり直し</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white">フレームサイズ</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="wide-frame" checked={isWideFrame} onCheckedChange={toggleFrameSize} />
                  <Label htmlFor="wide-frame" className="text-white">
                    広いフレーム
                  </Label>
                </div>
                <p className="text-xs text-gray-400">{isWideFrame ? "サイズ: -12 〜 12" : "サイズ: -8 〜 8"}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white">制限時間</h3>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="0"
                    max="300"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number.parseInt(e.target.value) || 0)}
                    className="w-20 h-8"
                  />
                  <span className="text-white">秒</span>
                </div>
                <p className="text-xs text-gray-400">0 = 制限時間なし</p>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="space-y-4">
              {selectedLineIndex !== null ? (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">線のプロパティ</h3>

                    <div className="space-y-1">
                      <Label htmlFor="line-friction" className="text-xs text-white">
                        摩擦係数: {selectedLineFriction.toFixed(2)}
                      </Label>
                      <Slider
                        id="line-friction"
                        min={0}
                        max={1}
                        step={0.05}
                        value={[selectedLineFriction]}
                        onValueChange={(value) => setSelectedLineFriction(value[0])}
                        className="py-2"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="line-bounce" checked={selectedLineBounce} onCheckedChange={setSelectedLineBounce} />
                      <Label htmlFor="line-bounce" className="text-white">
                        バウンス
                      </Label>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="line-color" className="text-xs text-white">
                        色
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="line-color"
                          value={selectedLineColor}
                          onChange={(e) => setSelectedLineColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer"
                        />
                        <div className="grid grid-cols-4 gap-1">
                          {["#88ff88", "#ff88ff", "#8888ff", "#ffff88"].map((color) => (
                            <div
                              key={color}
                              className="w-6 h-6 rounded cursor-pointer border border-gray-600"
                              style={{ backgroundColor: color }}
                              onClick={() => setSelectedLineColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button onClick={updateSelectedLine} className="w-full mt-2">
                      適用
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>線を選択してください</p>
                  <p className="text-xs mt-2">「選択」ツールを使用して線をクリックすると、プロパティを編集できます</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-auto pt-4 border-t border-gray-700">
            <Alert className="bg-gray-800 border-gray-700">
              <AlertCircle className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-xs text-gray-300">
                作成したレベルは自動的に保存されません。「保存」ボタンを押して保存してください。
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="flex-1 relative">
          <EditorCanvas
            puzzle={getCurrentPuzzle()}
            onCanvasClick={handleCanvasClick}
            currentTool={currentTool}
            isDrawing={isDrawing}
            drawStart={drawStart}
            isWideFrame={isWideFrame}
            isTesting={isTesting}
          />
        </div>
      </div>
    </div>
  )
}
