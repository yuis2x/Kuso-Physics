"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier"
import { OrbitControls } from "@react-three/drei"
import type { Puzzle, Vector } from "@/lib/types"
import PuzzleLevel from "./puzzle-level"
import type * as THREE from "three"

interface EditorCanvasProps {
  puzzle: Puzzle
  onCanvasClick: (position: Vector) => void
  currentTool: string
  isDrawing: boolean
  drawStart: Vector | null
  isWideFrame: boolean
  isTesting: boolean
}

// 3D空間の座標をワールド座標に変換するコンポーネント
function CanvasInteraction({
  onCanvasClick,
  currentTool,
  isDrawing,
  drawStart,
  isWideFrame,
}: {
  onCanvasClick: (position: Vector) => void
  currentTool: string
  isDrawing: boolean
  drawStart: Vector | null
  isWideFrame: boolean
}) {
  const { camera, raycaster, mouse, viewport } = useThree()
  const planeRef = useRef<THREE.Mesh>(null)
  const [previewEnd, setPreviewEnd] = useState<{ x: number; y: number } | null>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null)

  // マウスクリックイベントのハンドラ
  const handleClick = (event: MouseEvent) => {
    if (!planeRef.current) return

    // マウス位置を正規化
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // レイキャストを更新
    raycaster.setFromCamera(mouse, camera)

    // 平面との交差を計算
    const intersects = raycaster.intersectObject(planeRef.current)

    if (intersects.length > 0) {
      const point = intersects[0].point
      onCanvasClick({ x: point.x, y: point.y })
    }
  }

  // マウスイベントのリスナーを設定
  useEffect(() => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      canvas.addEventListener("click", handleClick)
      return () => {
        canvas.removeEventListener("click", handleClick)
      }
    }
  }, [])

  // マウス位置の追跡とプレビュー更新
  useFrame(() => {
    if (planeRef.current) {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(planeRef.current)

      if (intersects.length > 0) {
        const point = intersects[0].point
        setCursorPos({ x: point.x, y: point.y })

        if (isDrawing && drawStart) {
          setPreviewEnd({ x: point.x, y: point.y })
        }
      } else {
        setCursorPos(null)
        if (isDrawing) {
          setPreviewEnd(null)
        }
      }
    }
  })

  // 描画中の線のプレビュー
  const DrawingPreview = () => {
    if (!isDrawing || !drawStart || !previewEnd) return null

    return (
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            count={2}
            array={new Float32Array([drawStart.x, drawStart.y, 0, previewEnd.x, previewEnd.y, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#ffffff" opacity={0.5} transparent />
      </line>
    )
  }

  // カーソルの表示
  const CursorIndicator = () => {
    if (!cursorPos) return null

    // ツールに応じたカーソル表示
    let cursorColor = "#ffffff"
    let cursorSize = 0.2

    if (currentTool === "start") {
      cursorColor = "#00ff00"
      cursorSize = 0.3
    } else if (currentTool === "end") {
      cursorColor = "#ff0000"
      cursorSize = 0.3
    } else if (currentTool === "erase") {
      cursorColor = "#ff6666"
      cursorSize = 0.4
    }

    return (
      <mesh position={[cursorPos.x, cursorPos.y, 0.01]}>
        <ringGeometry args={[cursorSize - 0.05, cursorSize, 16]} />
        <meshBasicMaterial color={cursorColor} transparent opacity={0.7} />
      </mesh>
    )
  }

  // フレームサイズに応じた平面のサイズを設定
  const planeSize = isWideFrame ? 24 : 16

  return (
    <>
      <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} visible={false}>
        <planeGeometry args={[planeSize, planeSize]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <DrawingPreview />
      <CursorIndicator />
    </>
  )
}

export default function EditorCanvas({
  puzzle,
  onCanvasClick,
  currentTool,
  isDrawing,
  drawStart,
  isWideFrame,
  isTesting,
}: EditorCanvasProps) {
  const ballRef = useRef<RapierRigidBody>(null)

  // カメラ設定の調整
  const cameraPosition = isWideFrame ? [0, 0, 20] : [0, 0, 15]

  return (
    <Canvas shadows camera={{ position: cameraPosition, fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />

      <Physics gravity={[0, -9.81, 0]}>
        {isTesting ? (
          <PuzzleLevel
            puzzle={puzzle}
            isSimulating={true}
            onPuzzleSolved={() => {}}
            setBallRef={(ref) => {}}
            isSolved={false}
          />
        ) : (
          <>
            {/* 線の表示 */}
            {puzzle.lines.map((line, index) => {
              const centerX = (line.start.x + line.end.x) / 2
              const centerY = (line.start.y + line.end.y) / 2
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
                </RigidBody>
              )
            })}

            {/* 開始位置 */}
            <mesh position={[puzzle.startPosition.x, puzzle.startPosition.y, 0]}>
              <ringGeometry args={[0.6, 0.7, 32]} />
              <meshStandardMaterial color="#00ff00" />
            </mesh>

            {/* 終了位置 */}
            <mesh position={[puzzle.endPosition.x, puzzle.endPosition.y, 0]}>
              <ringGeometry args={[0.6, 0.7, 32]} />
              <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* ボール（非テスト時は静的表示） */}
            <mesh position={[puzzle.startPosition.x, puzzle.startPosition.y, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#ff8888" transparent opacity={0.7} />
            </mesh>

            {/* 外枠の可視化 */}
            <mesh position={[0, 0, -0.2]} receiveShadow>
              <ringGeometry args={[isWideFrame ? 11.9 : 7.9, isWideFrame ? 12 : 8, 32]} />
              <meshBasicMaterial color="#333333" transparent opacity={0.1} />
            </mesh>

            {/* キャンバスインタラクション */}
            <CanvasInteraction
              onCanvasClick={onCanvasClick}
              currentTool={currentTool}
              isDrawing={isDrawing}
              drawStart={drawStart}
              isWideFrame={isWideFrame}
            />
          </>
        )}
      </Physics>

      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  )
}
