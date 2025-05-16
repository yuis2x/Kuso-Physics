"use client"

import { useLanguage } from "@/lib/language-context"

export default function NewtonsLawsArticle() {
  const { t, language } = useLanguage()

  // Content based on language
  const content = {
    en: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">Newton's Laws of Motion</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">First Law: Law of Inertia</h3>
          <p className="text-gray-300 mb-4">
            An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction,
            unless acted upon by an external force.
          </p>
          <p className="text-gray-300 mb-4">
            In our physics puzzle game, you'll notice that the ball doesn't start moving until you apply a force to it.
            Once it's in motion, it will continue moving until it hits a wall or another obstacle that applies a force
            to change its direction.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When you start a level, the ball remains stationary until you initiate movement. Without
              gravity or other forces, it would continue moving in a straight line forever.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Second Law: F = ma</h3>
          <p className="text-gray-300 mb-4">
            The acceleration of an object is directly proportional to the force applied and inversely proportional to
            the object's mass. This is expressed by the famous equation: F = ma (Force = mass × acceleration).
          </p>
          <p className="text-gray-300 mb-4">
            In the game, this law determines how quickly the ball accelerates when forces are applied. The heavier the
            ball would be, the more force would be needed to move it at the same rate.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When you shake your device or move your mouse, you apply a force to the ball. The
              acceleration of the ball is proportional to the force you apply.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Third Law: Action and Reaction</h3>
          <p className="text-gray-300 mb-4">
            For every action, there is an equal and opposite reaction. When one object exerts a force on a second
            object, the second object exerts an equal and opposite force on the first.
          </p>
          <p className="text-gray-300 mb-4">
            This law explains why the ball bounces off walls and obstacles in the game. When the ball hits a wall, it
            exerts a force on the wall, and the wall exerts an equal and opposite force back on the ball, causing it to
            bounce.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When the ball collides with a wall, it bounces back with a force determined by the wall's
              elasticity (bounce property). This is Newton's Third Law in action!
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">How These Laws Apply in Our Game</h3>
        <p className="text-gray-300 mb-4">In Kuso Physics, all three of Newton's laws are constantly at work:</p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">The ball remains stationary until a force is applied (First Law)</li>
          <li className="mb-2">
            The ball accelerates proportionally to the forces applied, including gravity (Second Law)
          </li>
          <li className="mb-2">The ball bounces off surfaces with equal and opposite reactions (Third Law)</li>
        </ul>
        <p className="text-gray-300">
          Understanding these principles can help you predict how the ball will move and bounce in the game, making it
          easier to solve the puzzles and guide the ball to its destination.
        </p>
      </>
    ),
    ja: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">ニュートンの運動法則</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">第一法則：慣性の法則</h3>
          <p className="text-gray-300 mb-4">
            静止している物体は静止し続け、運動している物体は外力が働かない限り、同じ速さと方向で運動し続ける。
          </p>
          <p className="text-gray-300 mb-4">
            私たちの物理パズルゲームでは、ボールに力を加えるまで動き始めないことに気づくでしょう。
            一度動き出すと、壁や他の障害物にぶつかって方向を変える力が加わるまで、動き続けます。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：レベルを開始すると、動きを開始するまでボールは静止したままです。
              重力やその他の力がなければ、永遠に直線上を移動し続けるでしょう。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">第二法則：F = ma</h3>
          <p className="text-gray-300 mb-4">
            物体の加速度は、加えられた力に比例し、物体の質量に反比例する。 これは有名な方程式：F = ma（力 = 質量 ×
            加速度）で表されます。
          </p>
          <p className="text-gray-300 mb-4">
            ゲームでは、この法則によって力が加えられたときにボールがどれだけ速く加速するかが決まります。
            ボールが重ければ重いほど、同じ速度で動かすためにはより多くの力が必要になります。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：デバイスを振ったりマウスを動かしたりすると、ボールに力が加わります。
              ボールの加速度は、あなたが加える力に比例します。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">第三法則：作用・反作用の法則</h3>
          <p className="text-gray-300 mb-4">
            すべての作用に対して、等しく反対向きの反作用がある。一つの物体が二つ目の物体に力を及ぼすとき、
            二つ目の物体は一つ目の物体に等しく反対向きの力を及ぼす。
          </p>
          <p className="text-gray-300 mb-4">
            この法則は、ゲーム内でボールが壁や障害物から跳ね返る理由を説明しています。ボールが壁にぶつかると、
            ボールは壁に力を及ぼし、壁はボールに等しく反対向きの力を及ぼし、それによってボールが跳ね返ります。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：ボールが壁に衝突すると、壁の弾性（バウンス特性）によって決まる力で跳ね返ります。
              これがニュートンの第三法則の実践です！
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">これらの法則がゲームにどのように適用されるか</h3>
        <p className="text-gray-300 mb-4">Kuso Physicsでは、ニュートンの3つの法則がすべて常に働いています：</p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">力が加わるまでボールは静止したままです（第一法則）</li>
          <li className="mb-2">ボールは重力を含む加えられた力に比例して加速します（第二法則）</li>
          <li className="mb-2">ボールは等しく反対向きの反作用で表面から跳ね返ります（第三法則）</li>
        </ul>
        <p className="text-gray-300">
          これらの原理を理解することで、ゲーム内でボールがどのように動き、跳ね返るかを予測するのに役立ち、
          パズルを解いてボールを目的地に導くことが容易になります。
        </p>
      </>
    ),
  }

  return <div className="article-content text-white">{language === "ja" ? content.ja : content.en}</div>
}
