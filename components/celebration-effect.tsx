"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export default function CelebrationEffect() {
  const [confettiCanvas, setConfettiCanvas] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // キャンバスを作成
    const canvas = document.createElement("canvas")
    canvas.className = "fixed inset-0 w-full h-full pointer-events-none z-50"
    document.body.appendChild(canvas)
    setConfettiCanvas(canvas)

    // 紙吹雪エフェクトを開始
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    // 複数の紙吹雪エフェクトを実行
    const duration = 5 * 1000
    const end = Date.now() + duration

    // 花火のような紙吹雪
    const fireworksInterval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(fireworksInterval)
        return
      }

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
      })
    }, 400)

    // 左右から紙吹雪
    setTimeout(() => {
      myConfetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      })

      myConfetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      })
    }, 200)

    // キラキラ効果
    setTimeout(() => {
      myConfetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        gravity: 0.5,
        scalar: 1.2,
        drift: 0,
      })
    }, 600)

    // クリーンアップ
    return () => {
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
      clearInterval(fireworksInterval)
    }
  }, [])

  return (
    <>
      {/* キラキラ星エフェクト */}
      <div className="stars-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}
