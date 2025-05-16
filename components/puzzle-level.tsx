"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { RigidBody, CuboidCollider, type RapierRigidBody } from "@react-three/rapier"
import type { Puzzle } from "@/lib/types"
import { useSpring, animated } from "@react-spring/three"

interface PuzzleLevelProps {
  puzzle: Puzzle
  isSimulating: boolean
  onPuzzleSolved: () => void
  setBallRef: (ref: RapierRigidBody) => void
  isSolved: boolean
}

export default function PuzzleLevel({ puzzle, isSimulating, onPuzzleSolved, setBallRef, isSolved }: PuzzleLevelProps) {
  const ballRef = useRef<RapierRigidBody>(null)
  const [solved, setSolved] = useState(false)

  // エンドポイントのアニメーション
  const endPointSpring = useSpring({
    scale: isSolved ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: isSolved ? "#ffff00" : "#ff0000",
    emissive: isSolved ? "#ffff00" : "#000000",
    emissiveIntensity: isSolved ? 1 : 0,
    config: { tension: 120, friction: 14 },
  })

  // Pass the ball ref to parent component
  useEffect(() => {
    if (ballRef.current) {
      setBallRef(ballRef.current)
    }
  }, [ballRef, setBallRef])

  // Reset ball position when simulation starts or stops
  useEffect(() => {
    if (ballRef.current) {
      if (isSimulating) {
        ballRef.current.setTranslation({ x: puzzle.startPosition.x, y: puzzle.startPosition.y, z: 0 }, true)
        ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
        ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      } else {
        ballRef.current.setTranslation({ x: puzzle.startPosition.x, y: puzzle.startPosition.y, z: 0 }, true)
        ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
        ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      }
    }
    setSolved(false)
  }, [isSimulating, puzzle])

  // Check if ball has reached the end position
  useFrame(() => {
    if (!isSimulating || solved || !ballRef.current) return

    const ballPosition = ballRef.current.translation()
    const distance = Math.sqrt(
      Math.pow(ballPosition.x - puzzle.endPosition.x, 2) + Math.pow(ballPosition.y - puzzle.endPosition.y, 2),
    )

    if (distance < puzzle.ball.radius + 0.5) {
      setSolved(true)
      onPuzzleSolved()
    }
  })

  // フレームサイズの取得（レベル8以上は広いフレーム）
  const getFrameSize = () => {
    // レベル8以上は広いフレーム
    if (puzzle.id === "puzzle8" || puzzle.id === "puzzle9") {
      return 11.9 // 12 - 0.1 for visual
    }
    return 7.9 // 8 - 0.1 for visual
  }

  return (
    <>
      {/* Ball */}
      <RigidBody
        ref={ballRef}
        position={[puzzle.startPosition.x, puzzle.startPosition.y, 0]}
        colliders="ball"
        restitution={0.7}
        friction={0.5}
        linearDamping={0.5}
        angularDamping={0.5}
        type={isSimulating ? "dynamic" : "fixed"}
      >
        <mesh castShadow>
          <sphereGeometry args={[puzzle.ball.radius, 32, 32]} />
          <meshStandardMaterial color={puzzle.ball.color} />
        </mesh>
      </RigidBody>

      {/* Lines */}
      {puzzle.lines.map((line, index) => {
        // Calculate the center position and dimensions of the line
        const centerX = (line.start.x + line.end.x) / 2
        const centerY = (line.start.y + line.end.y) / 2

        // Calculate the length and rotation of the line
        const dx = line.end.x - line.start.x
        const dy = line.end.y - line.start.y
        const length = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        return (
          <RigidBody key={index} type="fixed" position={[centerX, centerY, 0]} rotation={[0, 0, angle]}>
            <mesh receiveShadow>
              <boxGeometry args={[length, 0.2, 0.2]} />
              <meshStandardMaterial color={line.color || "#ffffff"} />
            </mesh>
            <CuboidCollider
              args={[length / 2, 0.1, 0.1]}
              restitution={line.bounce ? 0.8 : 0.2}
              friction={line.friction || 0.5}
            />
          </RigidBody>
        )
      })}

      {/* Start Position */}
      <mesh position={[puzzle.startPosition.x, puzzle.startPosition.y, 0]}>
        <ringGeometry args={[puzzle.ball.radius + 0.1, puzzle.ball.radius + 0.2, 32]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>

      {/* End Position - アニメーション付き */}
      <animated.mesh position={[puzzle.endPosition.x, puzzle.endPosition.y, 0]} scale={endPointSpring.scale}>
        <ringGeometry args={[puzzle.ball.radius + 0.1, puzzle.ball.radius + 0.2, 32]} />
        <animated.meshStandardMaterial
          color={endPointSpring.color}
          emissive={endPointSpring.emissive}
          emissiveIntensity={endPointSpring.emissiveIntensity}
        />
      </animated.mesh>

      {/* クリア時のエフェクト光 */}
      {isSolved && (
        <mesh position={[puzzle.endPosition.x, puzzle.endPosition.y, -0.1]}>
          <planeGeometry args={[3, 3]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.3} />
        </mesh>
      )}

      {/* 外枠の可視化（デバッグ用） */}
      <mesh position={[0, 0, -0.2]} receiveShadow>
        <ringGeometry args={[getFrameSize(), getFrameSize() + 0.1, 32]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.1} />
      </mesh>

      {/* Ground plane */}
      <RigidBody type="fixed" position={[0, -5, 0]}>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <CuboidCollider args={[25, 0.1, 25]} />
      </RigidBody>
    </>
  )
}
