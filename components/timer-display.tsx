"use client"

import { useEffect, useState } from "react"

interface TimerDisplayProps {
  timeLeft: number
  totalTime: number
}

export default function TimerDisplay({ timeLeft, totalTime }: TimerDisplayProps) {
  const [color, setColor] = useState("text-white")

  useEffect(() => {
    // 残り時間に応じて色を変更
    if (timeLeft <= totalTime * 0.2) {
      // 残り20%以下は赤色で点滅
      setColor("text-red-500 animate-pulse")
    } else if (timeLeft <= totalTime * 0.5) {
      // 残り50%以下はオレンジ色
      setColor("text-orange-400")
    } else {
      // それ以外は白色
      setColor("text-white")
    }
  }, [timeLeft, totalTime])

  // 分と秒に変換
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className={`text-2xl font-bold ${color} bg-gray-800 bg-opacity-80 px-4 py-2 rounded-lg`}>
      {minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, "0")}` : `${seconds}秒`}
    </div>
  )
}
