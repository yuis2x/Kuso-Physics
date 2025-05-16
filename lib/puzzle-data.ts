import { Vector2D, Line2D, Ball2D, type Puzzle } from "./types"

// Create puzzles with the implementation classes
export const puzzles: Puzzle[] = [
  // Puzzle 1: Simple ramp
  {
    id: "puzzle1",
    lines: [
      // 広いフレーム（外枠）
      new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall

      // 内部の要素
      new Line2D(new Vector2D(-3, -1), new Vector2D(0, 0), 0.1, true, "#88ff88"), // Ramp
    ],
    ball: new Ball2D("ball1", new Vector2D(-4, 1), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-4, 1),
    endPosition: new Vector2D(4, -1),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 0, // 制限時間なし
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 2: Zigzag path
  {
    id: "puzzle2",
    lines: [
      // 広いフレーム（外枠）
      new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall

      // 内部の要素
      new Line2D(new Vector2D(-3, 0), new Vector2D(0, 0), 0.1, true, "#88ff88"), // Platform 1
      new Line2D(new Vector2D(0, -1), new Vector2D(3, -1), 0.1, true, "#88ff88"), // Platform 2
    ],
    ball: new Ball2D("ball2", new Vector2D(-4, 1), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-4, 1),
    endPosition: new Vector2D(4, -1.5),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 0, // 制限時間なし
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 3: Complex path with bounces
  {
    id: "puzzle3",
    lines: [
      // 広いフレーム（外枠）
      new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall

      // 内部の要素
      new Line2D(new Vector2D(-4, 0), new Vector2D(-2, 0), 0.1, true, "#88ff88"), // Platform 1
      new Line2D(new Vector2D(-1, -1), new Vector2D(1, -1), 0.1, true, "#88ff88"), // Platform 2
      new Line2D(new Vector2D(2, 0), new Vector2D(4, 0), 0.1, true, "#88ff88"), // Platform 3
      new Line2D(new Vector2D(0, 1), new Vector2D(2, 1), 0.1, true, "#ff88ff"), // Bouncy platform
    ],
    ball: new Ball2D("ball3", new Vector2D(-4, 1), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-4, 1),
    endPosition: new Vector2D(4, -1.5),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 0, // 制限時間なし
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 4: Staircase Challenge (難しいレベル)
  {
    id: "puzzle4",
    lines: [
      // 広いフレーム（外枠）
      new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall

      // 階段状の障害物
      new Line2D(new Vector2D(-6, -3), new Vector2D(-4, -3), 0.1, true, "#88ff88"), // Step 1
      new Line2D(new Vector2D(-3, -2), new Vector2D(-1, -2), 0.1, true, "#88ff88"), // Step 2
      new Line2D(new Vector2D(0, -1), new Vector2D(2, -1), 0.1, true, "#88ff88"), // Step 3
      new Line2D(new Vector2D(3, 0), new Vector2D(5, 0), 0.1, true, "#88ff88"), // Step 4

      // 障害物
      new Line2D(new Vector2D(-2, 1), new Vector2D(0, 1), 0.1, true, "#ff88ff"), // Bouncy platform
      new Line2D(new Vector2D(1, 2), new Vector2D(3, 2), 0.1, true, "#ff88ff"), // Bouncy platform
    ],
    ball: new Ball2D("ball4", new Vector2D(-7, 4), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-7, 4),
    endPosition: new Vector2D(6, -4),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 0, // 制限時間なし
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 5: Pinball Challenge (難しいレベル)
  {
    id: "puzzle5",
    lines: [
      // 広いフレーム（外枠）
      new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall

      // ピンボール風の障害物
      new Line2D(new Vector2D(-6, 0), new Vector2D(-4, 0), 0.1, true, "#88ff88"), // Platform
      new Line2D(new Vector2D(-2, -2), new Vector2D(0, -2), 0.1, true, "#88ff88"), // Platform
      new Line2D(new Vector2D(2, 0), new Vector2D(4, 0), 0.1, true, "#88ff88"), // Platform
      new Line2D(new Vector2D(0, 2), new Vector2D(2, 2), 0.1, true, "#88ff88"), // Platform

      // 斜めの障害物
      new Line2D(new Vector2D(-5, 3), new Vector2D(-3, 1), 0.1, true, "#ff88ff"), // Diagonal
      new Line2D(new Vector2D(3, 3), new Vector2D(5, 1), 0.1, true, "#ff88ff"), // Diagonal
      new Line2D(new Vector2D(-5, -3), new Vector2D(-3, -1), 0.1, true, "#ff88ff"), // Diagonal
      new Line2D(new Vector2D(3, -3), new Vector2D(5, -1), 0.1, true, "#ff88ff"), // Diagonal
    ],
    ball: new Ball2D("ball5", new Vector2D(-7, 4), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-7, 4),
    endPosition: new Vector2D(7, -4),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 0, // 制限時間なし
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 6: Maze Challenge (難しいレベル)
  {
    id: "puzzle6",
    lines: [
      // 広いフレーム（外枠）
      new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall

      // 迷路の壁
      new Line2D(new Vector2D(-6, 3), new Vector2D(-2, 3), 0.1, true, "#88ff88"), // Horizontal wall
      new Line2D(new Vector2D(-2, 3), new Vector2D(-2, 1), 0.1, true, "#88ff88"), // Vertical wall
      new Line2D(new Vector2D(-2, 1), new Vector2D(-4, 1), 0.1, true, "#88ff88"), // Horizontal wall
      new Line2D(new Vector2D(-4, 1), new Vector2D(-4, -1), 0.1, true, "#88ff88"), // Vertical wall
      new Line2D(new Vector2D(-4, -1), new Vector2D(-6, -1), 0.1, true, "#88ff88"), // Horizontal wall
      new Line2D(new Vector2D(-6, -1), new Vector2D(-6, -3), 0.1, true, "#88ff88"), // Vertical wall

      new Line2D(new Vector2D(0, 3), new Vector2D(0, -1), 0.1, true, "#88ff88"), // Vertical wall
      new Line2D(new Vector2D(0, -1), new Vector2D(2, -1), 0.1, true, "#88ff88"), // Horizontal wall
      new Line2D(new Vector2D(2, -1), new Vector2D(2, 1), 0.1, true, "#88ff88"), // Vertical wall
      new Line2D(new Vector2D(2, 1), new Vector2D(4, 1), 0.1, true, "#88ff88"), // Horizontal wall
      new Line2D(new Vector2D(4, 1), new Vector2D(4, -3), 0.1, true, "#88ff88"), // Vertical wall
      new Line2D(new Vector2D(4, -3), new Vector2D(6, -3), 0.1, true, "#88ff88"), // Horizontal wall

      // バウンス台
      new Line2D(new Vector2D(-1, -3), new Vector2D(1, -3), 0.1, true, "#ff88ff"), // Bouncy platform
    ],
    ball: new Ball2D("ball6", new Vector2D(-7, 4), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-7, 4),
    endPosition: new Vector2D(7, -4),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 0, // 制限時間なし
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 7: Extreme Challenge (超難しいレベル)
  {
    id: "puzzle7",
    lines: [
      // 広いフレーム（外枠）
      new Line2D(new Vector2D(-8, -5), new Vector2D(8, -5), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-8, -5), new Vector2D(-8, 5), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-8, 5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(8, -5), new Vector2D(8, 5), 0.5, true, "#8888ff"), // Right wall

      // 複雑な障害物
      // 左側の構造
      new Line2D(new Vector2D(-7, 3), new Vector2D(-5, 3), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-5, 3), new Vector2D(-5, 1), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-7, 1), new Vector2D(-5, 1), 0.1, true, "#88ff88"),

      // 中央の構造
      new Line2D(new Vector2D(-3, 4), new Vector2D(-1, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-1, 4), new Vector2D(-1, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-3, 2), new Vector2D(-1, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-3, 2), new Vector2D(-3, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-3, 0), new Vector2D(-1, 0), 0.1, true, "#88ff88"),

      // 右側の構造
      new Line2D(new Vector2D(1, 3), new Vector2D(3, 3), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(3, 3), new Vector2D(3, 1), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(1, 1), new Vector2D(3, 1), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(1, 1), new Vector2D(1, -1), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(1, -1), new Vector2D(3, -1), 0.1, true, "#88ff88"),

      // 下部の構造
      new Line2D(new Vector2D(-7, -2), new Vector2D(-5, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-5, -2), new Vector2D(-5, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-5, -4), new Vector2D(-3, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-3, -4), new Vector2D(-3, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-3, -2), new Vector2D(-1, -2), 0.1, true, "#88ff88"),

      // 斜めの障害物
      new Line2D(new Vector2D(4, 4), new Vector2D(6, 2), 0.1, true, "#ff88ff"), // Diagonal
      new Line2D(new Vector2D(4, 0), new Vector2D(6, -2), 0.1, true, "#ff88ff"), // Diagonal

      // バウンス台
      new Line2D(new Vector2D(-1, -4), new Vector2D(1, -4), 0.1, true, "#ff88ff"), // Bouncy platform
      new Line2D(new Vector2D(5, 0), new Vector2D(7, 0), 0.1, true, "#ff88ff"), // Bouncy platform
    ],
    ball: new Ball2D("ball7", new Vector2D(-7, 4), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-7, 4),
    endPosition: new Vector2D(7, -4),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 0, // 制限時間なし
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 8: Ultra Extreme Challenge (超超難しいレベル) - より広いフレームと迷路構造
  {
    id: "puzzle8",
    lines: [
      // より広いフレーム（外枠）
      new Line2D(new Vector2D(-12, -8), new Vector2D(12, -8), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-12, -8), new Vector2D(-12, 8), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-12, 8), new Vector2D(12, 8), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(12, -8), new Vector2D(12, 8), 0.5, true, "#8888ff"), // Right wall

      // 複雑な迷路構造 - 外周
      new Line2D(new Vector2D(-10, 6), new Vector2D(10, 6), 0.1, true, "#88ff88"), // Top inner wall
      new Line2D(new Vector2D(-10, -6), new Vector2D(10, -6), 0.1, true, "#88ff88"), // Bottom inner wall
      new Line2D(new Vector2D(-10, -6), new Vector2D(-10, 6), 0.1, true, "#88ff88"), // Left inner wall
      new Line2D(new Vector2D(10, -6), new Vector2D(10, 6), 0.1, true, "#88ff88"), // Right inner wall

      // 迷路の内部構造 - 上部セクション
      new Line2D(new Vector2D(-8, 4), new Vector2D(-2, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-8, 4), new Vector2D(-8, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, 2), new Vector2D(-2, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-2, 4), new Vector2D(-2, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, 0), new Vector2D(-2, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, 0), new Vector2D(-6, -2), 0.1, true, "#88ff88"),

      // 迷路の内部構造 - 中央セクション
      new Line2D(new Vector2D(0, 6), new Vector2D(0, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, 2), new Vector2D(4, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(4, 2), new Vector2D(4, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(4, 4), new Vector2D(8, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(8, 4), new Vector2D(8, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, 0), new Vector2D(8, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, 0), new Vector2D(2, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, -2), new Vector2D(6, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(6, -2), new Vector2D(6, -4), 0.1, true, "#88ff88"),

      // 迷路の内部構造 - 下部セクション
      new Line2D(new Vector2D(-8, -2), new Vector2D(-2, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-2, -2), new Vector2D(-2, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-8, -4), new Vector2D(-2, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-8, -4), new Vector2D(-8, -6), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, -4), new Vector2D(4, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, -4), new Vector2D(0, -6), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(8, -2), new Vector2D(8, -6), 0.1, true, "#88ff88"),

      // バウンス台
      new Line2D(new Vector2D(-4, 6), new Vector2D(-2, 6), 0.1, true, "#ff88ff"),
      new Line2D(new Vector2D(6, 6), new Vector2D(8, 6), 0.1, true, "#ff88ff"),
      new Line2D(new Vector2D(-4, -6), new Vector2D(-2, -6), 0.1, true, "#ff88ff"),
      new Line2D(new Vector2D(4, -6), new Vector2D(6, -6), 0.1, true, "#ff88ff"),
      new Line2D(new Vector2D(-10, 0), new Vector2D(-8, 0), 0.1, true, "#ff88ff"),
      new Line2D(new Vector2D(10, 0), new Vector2D(8, 0), 0.1, true, "#ff88ff"),
    ],
    ball: new Ball2D("ball8", new Vector2D(-11, 7), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-11, 7),
    endPosition: new Vector2D(11, -7),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 60, // 60秒の制限時間
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },

  // Puzzle 9: Labyrinth of Doom (超超超難しいレベル)
  {
    id: "puzzle9",
    lines: [
      // より広いフレーム（外枠）
      new Line2D(new Vector2D(-12, -8), new Vector2D(12, -8), 0.5, true, "#8888ff"), // Bottom
      new Line2D(new Vector2D(-12, -8), new Vector2D(-12, 8), 0.5, true, "#8888ff"), // Left wall
      new Line2D(new Vector2D(-12, 8), new Vector2D(12, 8), 0.5, true, "#8888ff"), // Top
      new Line2D(new Vector2D(12, -8), new Vector2D(12, 8), 0.5, true, "#8888ff"), // Right wall

      // 複雑な迷路構造 - 外周
      new Line2D(new Vector2D(-10, 6), new Vector2D(10, 6), 0.1, true, "#88ff88"), // Top inner wall
      new Line2D(new Vector2D(-10, -6), new Vector2D(10, -6), 0.1, true, "#88ff88"), // Bottom inner wall
      new Line2D(new Vector2D(-10, -6), new Vector2D(-10, 6), 0.1, true, "#88ff88"), // Left inner wall
      new Line2D(new Vector2D(10, -6), new Vector2D(10, 6), 0.1, true, "#88ff88"), // Right inner wall

      // 迷路の内部構造 - 複雑なグリッド
      // 水平線
      new Line2D(new Vector2D(-10, 4), new Vector2D(-6, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-4, 4), new Vector2D(0, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, 4), new Vector2D(6, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(8, 4), new Vector2D(10, 4), 0.1, true, "#88ff88"),

      new Line2D(new Vector2D(-10, 2), new Vector2D(-8, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, 2), new Vector2D(-2, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, 2), new Vector2D(4, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(6, 2), new Vector2D(10, 2), 0.1, true, "#88ff88"),

      new Line2D(new Vector2D(-10, 0), new Vector2D(-4, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-2, 0), new Vector2D(2, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(4, 0), new Vector2D(8, 0), 0.1, true, "#88ff88"),

      new Line2D(new Vector2D(-10, -2), new Vector2D(-6, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-4, -2), new Vector2D(0, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, -2), new Vector2D(6, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(8, -2), new Vector2D(10, -2), 0.1, true, "#88ff88"),

      new Line2D(new Vector2D(-10, -4), new Vector2D(-8, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, -4), new Vector2D(-2, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, -4), new Vector2D(4, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(6, -4), new Vector2D(10, -4), 0.1, true, "#88ff88"),

      // 垂直線
      new Line2D(new Vector2D(-8, 6), new Vector2D(-8, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, 4), new Vector2D(-6, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-4, 6), new Vector2D(-4, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-2, 4), new Vector2D(-2, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, 6), new Vector2D(0, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, 4), new Vector2D(2, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(4, 6), new Vector2D(4, 4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(6, 4), new Vector2D(6, 2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(8, 6), new Vector2D(8, 4), 0.1, true, "#88ff88"),

      new Line2D(new Vector2D(-8, 2), new Vector2D(-8, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, 0), new Vector2D(-6, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-4, 2), new Vector2D(-4, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-2, 0), new Vector2D(-2, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, 2), new Vector2D(0, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, 0), new Vector2D(2, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(4, 2), new Vector2D(4, 0), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(6, 0), new Vector2D(6, -2), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(8, 2), new Vector2D(8, 0), 0.1, true, "#88ff88"),

      new Line2D(new Vector2D(-8, -2), new Vector2D(-8, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-6, -4), new Vector2D(-6, -6), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-4, -2), new Vector2D(-4, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(-2, -4), new Vector2D(-2, -6), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(0, -2), new Vector2D(0, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(2, -4), new Vector2D(2, -6), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(4, -2), new Vector2D(4, -4), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(6, -4), new Vector2D(6, -6), 0.1, true, "#88ff88"),
      new Line2D(new Vector2D(8, -2), new Vector2D(8, -4), 0.1, true, "#88ff88"),

      // バウンス台 - 戦略的に配置
      new Line2D(new Vector2D(-9, 5), new Vector2D(-7, 3), 0.1, true, "#ff88ff"), // 斜めバウンス台
      new Line2D(new Vector2D(-3, 5), new Vector2D(-1, 3), 0.1, true, "#ff88ff"), // 斜めバウンス台
      new Line2D(new Vector2D(3, 5), new Vector2D(5, 3), 0.1, true, "#ff88ff"), // 斜めバウンス台
      new Line2D(new Vector2D(9, 5), new Vector2D(7, 3), 0.1, true, "#ff88ff"), // 斜めバウンス台

      new Line2D(new Vector2D(-9, -3), new Vector2D(-7, -5), 0.1, true, "#ff88ff"), // 斜めバウンス台
      new Line2D(new Vector2D(-3, -3), new Vector2D(-1, -5), 0.1, true, "#ff88ff"), // 斜めバウンス台
      new Line2D(new Vector2D(3, -3), new Vector2D(5, -5), 0.1, true, "#ff88ff"), // 斜めバウンス台
      new Line2D(new Vector2D(9, -3), new Vector2D(7, -5), 0.1, true, "#ff88ff"), // 斜めバウンス台

      new Line2D(new Vector2D(-5, 1), new Vector2D(-3, -1), 0.1, true, "#ff88ff"), // 中央の斜めバウンス台
      new Line2D(new Vector2D(3, 1), new Vector2D(5, -1), 0.1, true, "#ff88ff"), // 中央の斜めバウンス台
    ],
    ball: new Ball2D("ball9", new Vector2D(-11, 7), new Vector2D(0, 0), 0.5, "#ff8888"),
    startPosition: new Vector2D(-11, 7),
    endPosition: new Vector2D(11, -7),
    gravity: new Vector2D(0, -9.81),
    timeLimit: 45, // 45秒の制限時間
    applyPhysics: (timeDelta: number) => {},
    checkCollisions: () => {},
    isSolved: () => false,
    reset: () => {},
    render: () => {},
  },
]
