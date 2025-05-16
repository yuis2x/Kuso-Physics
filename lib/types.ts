// Vector Type Definition for 2D space
export interface Vector {
  x: number
  y: number
  magnitude(): number
  normalize(): Vector
  add(other: Vector): Vector
  subtract(other: Vector): Vector
  scale(factor: number): Vector
  dot(other: Vector): number
}

// Ball Type Definition
export interface Ball {
  id: string
  position: Vector
  velocity: Vector
  radius: number
  color: string
  move(timeDelta: number): void
  applyForce(force: Vector): void
  reset(): void
}

// Line Type Definition
export interface Line {
  start: Vector
  end: Vector
  friction?: number
  bounce?: boolean
  color?: string
  isHorizontal(): boolean
  isVertical(): boolean
}

// Puzzle Type Definition
export interface Puzzle {
  id: string
  lines: Line[]
  ball: Ball
  startPosition: Vector
  endPosition: Vector
  gravity: Vector
  timeLimit: number // 制限時間を追加（秒単位、0は制限なし）
  applyPhysics(timeDelta: number): void
  checkCollisions(): void
  isSolved(): boolean
  reset(): void
  render(): void
}

// Physics Engine Type Definition
export interface PhysicsEngine {
  puzzles: Puzzle[]
  currentPuzzle: Puzzle
  deltaTime: number
  gravity: Vector
  update(timeDelta: number): void
  solvePuzzle(): boolean
  resetPuzzle(): void
  setPuzzle(puzzleId: string): void
}

// Vector implementation
export class Vector2D implements Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize(): Vector {
    const mag = this.magnitude()
    if (mag === 0) return new Vector2D(0, 0)
    return new Vector2D(this.x / mag, this.y / mag)
  }

  add(other: Vector): Vector {
    return new Vector2D(this.x + other.x, this.y + other.y)
  }

  subtract(other: Vector): Vector {
    return new Vector2D(this.x - other.x, this.y - other.y)
  }

  scale(factor: number): Vector {
    return new Vector2D(this.x * factor, this.y * factor)
  }

  dot(other: Vector): number {
    return this.x * other.x + this.y * other.y
  }
}

// Line implementation
export class Line2D implements Line {
  constructor(
    public start: Vector,
    public end: Vector,
    public friction = 0.5,
    public bounce = true,
    public color = "#ffffff",
  ) {}

  isHorizontal(): boolean {
    return Math.abs(this.start.y - this.end.y) < 0.001
  }

  isVertical(): boolean {
    return Math.abs(this.start.x - this.end.x) < 0.001
  }
}

// Ball implementation
export class Ball2D implements Ball {
  constructor(
    public id: string,
    public position: Vector,
    public velocity: Vector,
    public radius: number,
    public color: string,
  ) {}

  move(timeDelta: number): void {
    const deltaPos = this.velocity.scale(timeDelta)
    this.position = this.position.add(deltaPos)
  }

  applyForce(force: Vector): void {
    this.velocity = this.velocity.add(force)
  }

  reset(): void {
    this.velocity = new Vector2D(0, 0)
  }
}
