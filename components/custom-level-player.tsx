"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import PuzzleLevel from "./puzzle-level"
import CelebrationEffect from "./celebration-effect"
import TimerDisplay from "./timer-display"
import { AlertCircle, Share2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Vector2D, Line2D, Ball2D, type Puzzle } from "@/lib/types"
import type { CustomLevel } from "./level-editor"
import ShareButtons from "./share-buttons"

interface CustomLevelPlayerProps {
  customLevel: CustomLevel
  onBack: () => void
}

export default function CustomLevelPlayer({ customLevel, onBack }: CustomLevelPlayerProps) {
  const [isSimulating, setIsSimulating] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [timeLeft, setTimeLeft] = useState(customLevel.timeLimit || 0)
  const [isTimeOut, setIsTimeOut] = useState(false)
  const [shakeEnabled, setShakeEnabled] = useState(true)
  const [showShakeAlert, setShowShakeAlert] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [showSharePanel, setShowSharePanel] = useState(false)

  const ballRigidBodyRef = useRef<any>(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const shakeTimeout = useRef<NodeJS.Timeout | null>(null)
  const celebrationTimeout = useRef<NodeJS.Timeout | null>(null)
  const timerInterval = useRef<NodeJS.Timeout | null>(null)

  // カスタムレベルをPuzzleオブジェクトに変換
  const convertToPuzzle = (): Puzzle => {
    // 線を変換
    const convertedLines = customLevel.lines.map(
      (line) =>
        new Line2D(
          new Vector2D(line.start.x, line.start.y),
          new Vector2D(line.end.x, line.end.y),
          line.friction,
          line.bounce,
          line.color,
        ),
    )

    return {
      id: customLevel.id,
      lines: convertedLines,
      ball: new Ball2D(
        "custom_ball",
        new Vector2D(customLevel.startPosition.x, customLevel.startPosition.y),
        new Vector2D(0, 0),
        0.5,
        "#ff8888",
      ),
      startPosition: new Vector2D(customLevel.startPosition.x, customLevel.startPosition.y),
      endPosition: new Vector2D(customLevel.endPosition.x, customLevel.endPosition.y),
      gravity: new Vector2D(0, -9.81),
      timeLimit: customLevel.timeLimit || 0,
      applyPhysics: () => {},
      checkCollisions: () => {},
      isSolved: () => false,
      reset: () => {},
      render: () => {},
    }
  }

  const puzzle = convertToPuzzle()

  // 制限時間を設定
  useEffect(() => {
    setTimeLeft(customLevel.timeLimit || 0)
    setIsTimeOut(false)
  }, [customLevel])

  const startSimulation = () => {
    setIsSimulating(true)
    setIsSolved(false)
    setShowCelebration(false)
    setIsTimeOut(false)

    // 制限時間がある場合はタイマーを開始
    if (customLevel.timeLimit > 0) {
      setTimeLeft(customLevel.timeLimit)
      startTimer()
    }
  }

  const resetSimulation = () => {
    setIsSimulating(false)
    setIsSolved(false)
    setShowCelebration(false)
    setIsTimeOut(false)
    stopTimer()

    // 制限時間をリセット
    setTimeLeft(customLevel.timeLimit || 0)
  }

  const handlePuzzleSolved = () => {
    setIsSolved(true)
    setIsSimulating(false)
    setShowCelebration(true)
    stopTimer()

    // 5秒後にお祝いエフェクトを非表示にする
    if (celebrationTimeout.current) {
      clearTimeout(celebrationTimeout.current)
    }
    celebrationTimeout.current = setTimeout(() => {
      setShowCelebration(false)
      // クリア後にシェアパネルを表示
      setShowSharePanel(true)
    }, 5000)
  }

  const setBallRef = (ref: any) => {
    ballRigidBodyRef.current = ref
  }

  // タイマー関連の関数
  const startTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current)
    }

    timerInterval.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // タイムアウト
          handleTimeOut()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current)
      timerInterval.current = null
    }
  }

  const handleTimeOut = () => {
    stopTimer()
    setIsTimeOut(true)
    setIsSimulating(false)
  }

  // Handle device motion for mobile devices
  useEffect(() => {
    if (!shakeEnabled) return

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (!isSimulating || !ballRigidBodyRef.current) return

      const acceleration = event.accelerationIncludingGravity
      if (!acceleration || acceleration.x === null || acceleration.y === null) return

      // Apply force based on device acceleration
      const forceMultiplier = 0.3
      const forceX = -acceleration.x * forceMultiplier
      const forceY = acceleration.y * forceMultiplier

      ballRigidBodyRef.current.applyImpulse({ x: forceX, y: forceY, z: 0 }, true)

      // Visual feedback for shaking
      if (Math.abs(forceX) > 1 || Math.abs(forceY) > 1) {
        setIsShaking(true)

        if (shakeTimeout.current) {
          clearTimeout(shakeTimeout.current)
        }

        shakeTimeout.current = setTimeout(() => {
          setIsShaking(false)
        }, 500)
      }
    }

    // Request permission for DeviceMotion on iOS
    const requestDeviceMotionPermission = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          const permissionState = await (DeviceMotionEvent as any).requestPermission()
          if (permissionState === "granted") {
            window.addEventListener("devicemotion", handleDeviceMotion)
          } else {
            setShowShakeAlert(true)
          }
        } catch (error) {
          console.error("Error requesting device motion permission:", error)
          setShowShakeAlert(true)
        }
      } else {
        window.addEventListener("devicemotion", handleDeviceMotion)
      }
    }

    // Handle mouse movement for desktop
    const handleMouseMove = (event: MouseEvent) => {
      if (!isSimulating || !ballRigidBodyRef.current) return

      const currentMousePos = { x: event.clientX, y: event.clientY }
      const deltaX = currentMousePos.x - lastMousePos.current.x
      const deltaY = currentMousePos.y - lastMousePos.current.y
      lastMousePos.current = currentMousePos

      // Only apply force if the mouse movement is significant
      const movementThreshold = 15
      if (Math.abs(deltaX) > movementThreshold || Math.abs(deltaY) > movementThreshold) {
        const forceMultiplier = 0.05
        const forceX = deltaX * forceMultiplier
        const forceY = -deltaY * forceMultiplier // Invert Y for natural feel

        ballRigidBodyRef.current.applyImpulse({ x: forceX, y: forceY, z: 0 }, true)

        // Visual feedback for shaking
        setIsShaking(true)

        if (shakeTimeout.current) {
          clearTimeout(shakeTimeout.current)
        }

        shakeTimeout.current = setTimeout(() => {
          setIsShaking(false)
        }, 500)
      }
    }

    if (shakeEnabled) {
      requestDeviceMotionPermission()
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion)
      window.removeEventListener("mousemove", handleMouseMove)
      if (shakeTimeout.current) {
        clearTimeout(shakeTimeout.current)
      }
      if (celebrationTimeout.current) {
        clearTimeout(celebrationTimeout.current)
      }
      if (timerInterval.current) {
        clearInterval(timerInterval.current)
      }
    }
  }, [shakeEnabled, isSimulating])

  // フレームサイズの判定
  const isWideFrame = customLevel.lines.some(
    (line) =>
      Math.abs(line.start.x) > 10 ||
      Math.abs(line.start.y) > 6 ||
      Math.abs(line.end.x) > 10 ||
      Math.abs(line.end.y) > 6,
  )

  // カメラ設定の調整
  const getCameraPosition = () => {
    return isWideFrame ? [0, 0, 20] : [0, 0, 15]
  }

  // シェア用のテキストを生成
  const getShareTitle = () => {
    if (isSolved) {
      return `「${customLevel.name}」をクリアしました！ - Kuso Physics`
    }
    return `「${customLevel.name}」に挑戦しよう！ - Kuso Physics`
  }

  const getShareDescription = () => {
    if (isSolved) {
      return `作者: ${customLevel.author || "匿名"} のレベル「${customLevel.name}」をクリアしました！あなたも挑戦してみませんか？`
    }
    return `作者: ${customLevel.author || "匿名"} のレベル「${customLevel.name}」に挑戦しよう！物理パズルゲーム Kuso Physics`
  }

  return (
    <div className="relative w-full h-full">
      {showShakeAlert && (
        <Alert className="absolute top-4 left-4 right-4 z-10 bg-amber-100 border-amber-300">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription>
            デバイスの動きへのアクセスが許可されていません。設定から許可してください。
          </AlertDescription>
        </Alert>
      )}

      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <Button variant="outline" onClick={onBack} className="bg-gray-800 text-white hover:bg-gray-700">
          ← 戻る
        </Button>

        <Button
          variant="outline"
          className="bg-gray-800 text-white hover:bg-gray-700"
          onClick={() => setShowSharePanel(!showSharePanel)}
        >
          <Share2 className="h-4 w-4 mr-2" />
          シェア
        </Button>
      </div>

      {/* シェアパネル */}
      {showSharePanel && (
        <div className="absolute top-16 left-4 z-10 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-white text-sm mb-2">レベルをシェア</h3>
          <ShareButtons
            title={getShareTitle()}
            description={getShareDescription()}
            hashtags={["KusoPhysics", "物理パズル", "カスタムレベル"]}
          />
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={() => setShowSharePanel(false)}
          >
            ✕
          </button>
        </div>
      )}

      <div className={`w-full h-full ${isShaking ? "animate-shake" : ""}`}>
        <Canvas shadows camera={{ position: getCameraPosition(), fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <Physics gravity={[0, -9.81, 0]}>
            <PuzzleLevel
              puzzle={puzzle}
              isSimulating={isSimulating}
              onPuzzleSolved={handlePuzzleSolved}
              setBallRef={setBallRef}
              isSolved={isSolved}
            />
          </Physics>
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </div>

      {/* 制限時間表示 */}
      {customLevel.timeLimit > 0 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <TimerDisplay timeLeft={timeLeft} totalTime={customLevel.timeLimit} />
        </div>
      )}

      {/* クリア時のお祝いエフェクト */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          <CelebrationEffect />
        </div>
      )}

      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <div className="bg-gray-800 p-2 rounded text-white">
          <h3 className="font-bold">{customLevel.name}</h3>
          <p className="text-sm">作者: {customLevel.author || "匿名"}</p>
        </div>

        <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded">
          <Switch id="shake-mode" checked={shakeEnabled} onCheckedChange={setShakeEnabled} />
          <Label htmlFor="shake-mode" className="text-white">
            シェイクモード
          </Label>
        </div>
      </div>

      {/* クリア時のメッセージ */}
      {isSolved && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-6 rounded-xl text-center animate-bounce-in">
          <h2 className="text-4xl font-bold text-white mb-2">クリア！</h2>
          <p className="text-xl text-green-400">おめでとうございます！</p>
          <div className="mt-4">
            <Button onClick={() => setShowSharePanel(true)} className="bg-blue-600 hover:bg-blue-500 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              クリアをシェア
            </Button>
          </div>
        </div>
      )}

      {/* タイムアウト時のメッセージ */}
      {isTimeOut && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-6 rounded-xl text-center animate-bounce-in">
          <h2 className="text-4xl font-bold text-red-500 mb-2">タイムアップ！</h2>
          <p className="text-xl text-white">もう一度挑戦しましょう</p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        {!isSimulating ? (
          <Button onClick={startSimulation} className="bg-green-600 hover:bg-green-500">
            スタート
          </Button>
        ) : (
          <Button onClick={resetSimulation} className="bg-red-600 hover:bg-red-500">
            リセット
          </Button>
        )}
      </div>
    </div>
  )
}
