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
import type { PhysicsEngine } from "@/lib/types"
import { puzzles } from "@/lib/puzzle-data"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Import the useLanguage hook
import { useLanguage } from "@/lib/language-context"

export default function PhysicsPuzzleGame() {
  // Add the useLanguage hook
  const { t } = useLanguage()

  // Rest of the component remains the same
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimeOut, setIsTimeOut] = useState(false)
  // シェイクモードをデフォルトで有効に設定
  const [shakeEnabled, setShakeEnabled] = useState(true)
  const [showShakeAlert, setShowShakeAlert] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const physicsEngineRef = useRef<PhysicsEngine | null>(null)
  const ballRigidBodyRef = useRef<any>(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const shakeTimeout = useRef<NodeJS.Timeout | null>(null)
  const celebrationTimeout = useRef<NodeJS.Timeout | null>(null)
  const timerInterval = useRef<NodeJS.Timeout | null>(null)

  // 現在のパズルの制限時間を設定
  useEffect(() => {
    const currentPuzzle = puzzles[currentPuzzleIndex]
    setTimeLeft(currentPuzzle.timeLimit)
    setIsTimeOut(false)
  }, [currentPuzzleIndex])

  const startSimulation = () => {
    setIsSimulating(true)
    setIsSolved(false)
    setShowCelebration(false)
    setIsTimeOut(false)

    // 制限時間がある場合はタイマーを開始
    const currentPuzzle = puzzles[currentPuzzleIndex]
    if (currentPuzzle.timeLimit > 0) {
      setTimeLeft(currentPuzzle.timeLimit)
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
    const currentPuzzle = puzzles[currentPuzzleIndex]
    setTimeLeft(currentPuzzle.timeLimit)
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
    }, 5000)
  }

  const nextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1)
      resetSimulation()
    }
  }

  const prevPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(currentPuzzleIndex - 1)
      resetSimulation()
    }
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

  // 難易度表示のヘルパー関数
  const getDifficultyLabel = (index: number) => {
    if (index < 3) return t("difficulty.beginner")
    if (index < 5) return t("difficulty.intermediate")
    if (index < 6) return t("difficulty.advanced")
    if (index < 8) return t("difficulty.expert")
    return t("difficulty.master")
  }

  // カメラ設定の調整
  const getCameraPosition = () => {
    // レベル8以上は広いフレームを使用するため、カメラを遠ざける
    if (currentPuzzleIndex >= 7) {
      return [0, 0, 20]
    }
    return [0, 0, 15]
  }

  return (
    <div className="relative w-full h-full">
      {showShakeAlert && (
        <Alert className="absolute top-4 left-4 right-4 z-10 bg-amber-100 border-amber-300">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription>{t("alert.motionPermission")}</AlertDescription>
        </Alert>
      )}

      <div className={`w-full h-full ${isShaking ? "animate-shake" : ""}`}>
        <Canvas shadows camera={{ position: getCameraPosition(), fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <Physics gravity={[0, -9.81, 0]}>
            <PuzzleLevel
              puzzle={puzzles[currentPuzzleIndex]}
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
      {puzzles[currentPuzzleIndex].timeLimit > 0 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <TimerDisplay timeLeft={timeLeft} totalTime={puzzles[currentPuzzleIndex].timeLimit} />
        </div>
      )}

      {/* クリア時のお祝いエフェクト */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          <CelebrationEffect />
        </div>
      )}

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded">
          <Switch id="shake-mode" checked={shakeEnabled} onCheckedChange={setShakeEnabled} />
          <Label htmlFor="shake-mode" className="text-white">
            {t("game.shakeMode")}
          </Label>
        </div>
        <div className="bg-gray-800 p-2 rounded text-white text-sm">
          {t("difficulty.level")}{" "}
          <span
            className={
              currentPuzzleIndex < 3
                ? "text-green-400"
                : currentPuzzleIndex < 5
                  ? "text-yellow-400"
                  : currentPuzzleIndex < 7
                    ? "text-orange-400"
                    : "text-red-400"
            }
          >
            {getDifficultyLabel(currentPuzzleIndex)}
          </span>
        </div>
        {shakeEnabled && (
          <div className="bg-gray-800 p-2 rounded text-white text-sm">
            {isShaking ? t("game.shakeDetected") : t("game.shakeInstructions")}
          </div>
        )}
      </div>

      {/* クリア時のメッセージ */}
      {isSolved && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-6 rounded-xl text-center animate-bounce-in">
          <h2 className="text-4xl font-bold text-white mb-2">{t("game.cleared")}</h2>
          <p className="text-xl text-green-400">{t("game.congratulations")}</p>
        </div>
      )}

      {/* タイムアウト時のメッセージ */}
      {isTimeOut && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-6 rounded-xl text-center animate-bounce-in">
          <h2 className="text-4xl font-bold text-red-500 mb-2">{t("game.timeUp")}</h2>
          <p className="text-xl text-white">{t("game.tryAgain")}</p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div>
          <Button
            variant="outline"
            onClick={prevPuzzle}
            disabled={currentPuzzleIndex === 0}
            className="mr-2 bg-gray-700 text-white hover:bg-gray-600"
          >
            {t("game.prevLevel")}
          </Button>
          <Button
            variant="outline"
            onClick={nextPuzzle}
            disabled={currentPuzzleIndex === puzzles.length - 1 || !isSolved}
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            {t("game.nextLevel")}
          </Button>
        </div>

        <div>
          <span className="text-white mr-4">
            {t("game.level")} {currentPuzzleIndex + 1}/{puzzles.length}
          </span>
          {isSolved && <span className="text-green-400 mr-4">{t("game.cleared")}</span>}
          {!isSimulating ? (
            <Button onClick={startSimulation} className="bg-green-600 hover:bg-green-500">
              {t("game.start")}
            </Button>
          ) : (
            <Button onClick={resetSimulation} className="bg-red-600 hover:bg-red-500">
              {t("game.reset")}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
