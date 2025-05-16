"use client"

import { useLanguage } from "@/lib/language-context"

export default function GravityArticle() {
  const { t, language } = useLanguage()

  // Content based on language
  const content = {
    en: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">Gravity and Projectile Motion</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">What is Gravity?</h3>
          <p className="text-gray-300 mb-4">
            Gravity is a fundamental force that attracts objects with mass toward each other. On Earth, gravity pulls
            objects toward the center of the planet with an acceleration of approximately 9.8 m/s² (meters per second
            squared).
          </p>
          <p className="text-gray-300 mb-4">
            In our physics puzzle game, gravity is a constant downward force that affects the ball's movement. This
            creates the challenge of navigating the ball to the goal while accounting for this ever-present force.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When you start a level, the ball immediately begins to fall downward due to gravity, unless
              it's resting on a surface that provides an equal and opposite force.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Projectile Motion</h3>
          <p className="text-gray-300 mb-4">
            Projectile motion describes the curved path that an object follows when thrown, launched, or otherwise
            projected near the Earth's surface. It combines horizontal motion (which would be constant without air
            resistance) and vertical motion (which is accelerated by gravity).
          </p>
          <p className="text-gray-300 mb-4">
            This creates the characteristic parabolic arc that we see when objects are thrown. In our game, the ball
            follows projectile motion principles when it's in the air.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When the ball bounces off an angled surface, it follows a parabolic path due to the
              combination of its initial velocity and the constant downward pull of gravity.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">The Mathematics of Projectile Motion</h3>
          <p className="text-gray-300 mb-4">
            For a ball launched with an initial velocity (v₀) at an angle (θ) to the horizontal, its position at any
            time (t) can be calculated using these equations:
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">Horizontal position: x = (v₀ × cos θ) × t</p>
            <p className="text-gray-200 font-mono mt-2">Vertical position: y = (v₀ × sin θ) × t - (1/2) × g × t²</p>
            <p className="text-gray-200 mt-2">Where g is the acceleration due to gravity (9.8 m/s²)</p>
          </div>
          <p className="text-gray-300 mb-4">
            The game's physics engine calculates these equations many times per second to create realistic ball
            movement.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Gravity in Kuso Physics</h3>
        <p className="text-gray-300 mb-4">
          In our game, we simulate gravity with a constant downward acceleration. This creates several interesting
          gameplay elements:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">The ball naturally falls downward when not supported</li>
          <li className="mb-2">Horizontal throws become curved trajectories</li>
          <li className="mb-2">Bounces off surfaces create complex, predictable paths</li>
          <li className="mb-2">Players must account for gravity when planning the ball's route to the goal</li>
        </ul>
        <p className="text-gray-300">
          Understanding how gravity affects the ball's motion is crucial for solving the more complex puzzles in the
          game. Sometimes you'll need to use gravity to your advantage, letting the ball fall to build up speed or using
          the natural arc of projectile motion to reach otherwise inaccessible areas.
        </p>
      </>
    ),
    ja: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">重力と放物運動</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">重力とは？</h3>
          <p className="text-gray-300 mb-4">
            重力は、質量を持つ物体同士を引き寄せる基本的な力です。地球上では、重力は物体を地球の中心に向かって 約9.8
            m/s²（毎秒毎秒メートル）の加速度で引っ張ります。
          </p>
          <p className="text-gray-300 mb-4">
            私たちの物理パズルゲームでは、重力はボールの動きに影響を与える一定の下向きの力です。
            これにより、この常に存在する力を考慮しながらボールを目標に導くという課題が生まれます。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：レベルを開始すると、等しく反対向きの力を提供する表面の上に乗っていない限り、
              ボールはすぐに重力によって下に落ち始めます。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">放物運動</h3>
          <p className="text-gray-300 mb-4">
            放物運動は、地球の表面近くで投げられたり、発射されたり、その他の方法で投射されたりした物体が辿る曲線の経路を表します。
            これは、水平方向の動き（空気抵抗がなければ一定）と垂直方向の動き（重力によって加速される）を組み合わせたものです。
          </p>
          <p className="text-gray-300 mb-4">
            これにより、物体が投げられたときに見られる特徴的な放物線が生まれます。私たちのゲームでは、
            ボールが空中にあるとき、放物運動の原理に従います。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：ボールが角度のある表面から跳ね返ると、初速度と重力の一定の下向きの引力の組み合わせにより、
              放物線の経路をたどります。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">放物運動の数学</h3>
          <p className="text-gray-300 mb-4">
            水平面に対して角度（θ）で初速度（v₀）で発射されたボールの任意の時間（t）での位置は、次の式で計算できます：
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">水平位置：x = (v₀ × cos θ) × t</p>
            <p className="text-gray-200 font-mono mt-2">垂直位置：y = (v₀ × sin θ) × t - (1/2) × g × t²</p>
            <p className="text-gray-200 mt-2">ここで、gは重力による加速度（9.8 m/s²）です</p>
          </div>
          <p className="text-gray-300 mb-4">
            ゲームの物理エンジンは、リアルなボールの動きを作り出すために、これらの方程式を1秒間に何度も計算しています。
          </p>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Kuso Physicsにおける重力</h3>
        <p className="text-gray-300 mb-4">
          私たちのゲームでは、一定の下向きの加速度で重力をシミュレートしています。これにより、いくつかの興味深いゲームプレイ要素が生まれます：
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">サポートされていないとき、ボールは自然に下に落ちます</li>
          <li className="mb-2">水平方向の投げは曲線の軌道になります</li>
          <li className="mb-2">表面からの跳ね返りは、複雑だが予測可能な経路を作り出します</li>
          <li className="mb-2">プレイヤーはボールを目標に導く経路を計画するとき、重力を考慮する必要があります</li>
        </ul>
        <p className="text-gray-300">
          重力がボールの動きにどのように影響するかを理解することは、ゲーム内のより複雑なパズルを解くために不可欠です。
          時には、ボールを落として速度を上げたり、放物運動の自然な弧を利用して、
          そうでなければアクセスできない領域に到達するために、重力を利用する必要があるでしょう。
        </p>
      </>
    ),
  }

  return <div className="article-content text-white">{language === "ja" ? content.ja : content.en}</div>
}
