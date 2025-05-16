"use client"

import { useLanguage } from "@/lib/language-context"

export default function EnergyArticle() {
  const { t, language } = useLanguage()

  // Content based on language
  const content = {
    en: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">Conservation of Energy</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">The Principle of Energy Conservation</h3>
          <p className="text-gray-300 mb-4">
            The law of conservation of energy states that energy cannot be created or destroyed, only transformed from
            one form to another. The total energy in an isolated system remains constant over time.
          </p>
          <p className="text-gray-300 mb-4">
            This fundamental principle is one of the most important concepts in physics and underlies many of the
            mechanics in our puzzle game.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When the ball falls from a height, its potential energy (due to its position in a
              gravitational field) is converted to kinetic energy (energy of motion). The total energy remains the same,
              minus some losses due to friction.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Types of Energy in Physics</h3>
          <p className="text-gray-300 mb-4">
            In physics, energy exists in many forms. The most relevant to our game include:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>Potential Energy:</strong> Energy stored in an object due to its position or state
            </li>
            <li className="mb-2">
              <strong>Kinetic Energy:</strong> Energy of motion, calculated as (1/2) × mass × velocity²
            </li>
            <li className="mb-2">
              <strong>Gravitational Potential Energy:</strong> Energy stored in an object due to its height in a
              gravitational field
            </li>
            <li className="mb-2">
              <strong>Elastic Potential Energy:</strong> Energy stored in stretched or compressed objects
            </li>
          </ul>
          <p className="text-gray-300 mb-4">
            In our game, the ball constantly converts between these forms of energy as it moves through the puzzles.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Energy Transformations</h3>
          <p className="text-gray-300 mb-4">
            As the ball moves through a level, energy is constantly being transformed:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">When the ball is high up, it has more gravitational potential energy</li>
            <li className="mb-2">
              As it falls, this potential energy converts to kinetic energy (the ball moves faster)
            </li>
            <li className="mb-2">
              When it hits a bouncy surface, some kinetic energy is temporarily stored as elastic potential energy
            </li>
            <li className="mb-2">
              When it bounces back up, the elastic potential energy converts back to kinetic and then to gravitational
              potential energy
            </li>
            <li className="mb-2">
              Throughout this process, some energy is lost to friction and converted to heat (which is why the ball
              doesn't bounce back to its original height)
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Mathematical Representation</h3>
          <p className="text-gray-300 mb-4">
            The conservation of energy can be expressed mathematically. For a ball in our game:
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">Total Energy = Kinetic Energy + Potential Energy</p>
            <p className="text-gray-200 font-mono mt-2">E = (1/2) × m × v² + m × g × h</p>
            <p className="text-gray-200 mt-2">
              Where m is mass, v is velocity, g is gravitational acceleration, and h is height
            </p>
          </div>
          <p className="text-gray-300 mb-4">
            In an ideal system without friction, this total energy would remain constant. In reality (and in our game),
            some energy is lost to friction and other non-conservative forces.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Energy Conservation in Kuso Physics</h3>
        <p className="text-gray-300 mb-4">
          Understanding energy conservation is key to mastering our physics puzzle game:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">To reach high places, the ball needs sufficient energy (either potential or kinetic)</li>
          <li className="mb-2">
            You can use gravity to convert potential energy to kinetic energy (letting the ball fall to gain speed)
          </li>
          <li className="mb-2">Bouncy surfaces can help preserve energy that would otherwise be lost to friction</li>
          <li className="mb-2">Some puzzles require you to carefully manage the ball's energy to reach the goal</li>
        </ul>
        <p className="text-gray-300">
          By understanding how energy is conserved and transformed, you can better predict the ball's behavior and solve
          even the most challenging puzzles in the game. Remember that while energy is conserved in theory, in practice
          (and in our game), some energy is always lost to friction and other non-conservative forces.
        </p>
      </>
    ),
    ja: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">エネルギー保存則</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">エネルギー保存の原理</h3>
          <p className="text-gray-300 mb-4">
            エネルギー保存の法則は、エネルギーは創造も破壊もできず、ある形態から別の形態に変換されるだけであると述べています。
            孤立系の総エネルギーは時間とともに一定のままです。
          </p>
          <p className="text-gray-300 mb-4">
            この基本原理は物理学で最も重要な概念の一つであり、私たちのパズルゲームの多くのメカニクスの基礎となっています。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：ボールが高さから落ちるとき、その位置エネルギー（重力場における位置による）は
              運動エネルギー（動きのエネルギー）に変換されます。総エネルギーは、摩擦によるいくつかの損失を除いて、同じままです。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">物理学におけるエネルギーの種類</h3>
          <p className="text-gray-300 mb-4">
            物理学では、エネルギーは多くの形態で存在します。私たちのゲームに最も関連するものには以下が含まれます：
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>位置エネルギー：</strong>物体の位置や状態によって蓄えられるエネルギー
            </li>
            <li className="mb-2">
              <strong>運動エネルギー：</strong>動きのエネルギー、(1/2) × 質量 × 速度²として計算される
            </li>
            <li className="mb-2">
              <strong>重力位置エネルギー：</strong>重力場における高さによって物体に蓄えられるエネルギー
            </li>
            <li className="mb-2">
              <strong>弾性位置エネルギー：</strong>伸びたり圧縮されたりした物体に蓄えられるエネルギー
            </li>
          </ul>
          <p className="text-gray-300 mb-4">
            私たちのゲームでは、ボールがパズルを通過するにつれて、これらのエネルギー形態の間で常に変換されています。
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">エネルギー変換</h3>
          <p className="text-gray-300 mb-4">ボールがレベルを移動するにつれて、エネルギーは常に変換されています：</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">ボールが高い位置にあるとき、より多くの重力位置エネルギーを持っています</li>
            <li className="mb-2">
              落下するにつれて、この位置エネルギーは運動エネルギーに変換されます（ボールはより速く動きます）
            </li>
            <li className="mb-2">
              弾力のある表面に当たると、一部の運動エネルギーは一時的に弾性位置エネルギーとして蓄えられます
            </li>
            <li className="mb-2">
              跳ね返るとき、弾性位置エネルギーは再び運動エネルギーに、そして重力位置エネルギーに変換されます
            </li>
            <li className="mb-2">
              このプロセス全体を通じて、一部のエネルギーは摩擦によって失われ、熱に変換されます（これがボールが元の高さまで跳ね返らない理由です）
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">数学的表現</h3>
          <p className="text-gray-300 mb-4">エネルギー保存は数学的に表現できます。私たちのゲームのボールの場合：</p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">総エネルギー = 運動エネルギー + 位置エネルギー</p>
            <p className="text-gray-200 font-mono mt-2">E = (1/2) × m × v² + m × g × h</p>
            <p className="text-gray-200 mt-2">ここで、mは質量、vは速度、gは重力加速度、hは高さです</p>
          </div>
          <p className="text-gray-300 mb-4">
            摩擦のない理想的なシステムでは、この総エネルギーは一定のままでしょう。現実（そして私たちのゲーム）では、
            一部のエネルギーは摩擦やその他の非保存力によって失われます。
          </p>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Kuso Physicsにおけるエネルギー保存</h3>
        <p className="text-gray-300 mb-4">
          エネルギー保存を理解することは、私たちの物理パズルゲームをマスターするための鍵です：
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">
            高い場所に到達するには、ボールに十分なエネルギー（位置エネルギーまたは運動エネルギー）が必要です
          </li>
          <li className="mb-2">
            重力を使用して位置エネルギーを運動エネルギーに変換できます（ボールを落として速度を得る）
          </li>
          <li className="mb-2">
            弾力のある表面は、そうでなければ摩擦によって失われるエネルギーを保存するのに役立ちます
          </li>
          <li className="mb-2">
            一部のパズルでは、目標に到達するためにボールのエネルギーを慎重に管理する必要があります
          </li>
        </ul>
        <p className="text-gray-300">
          エネルギーがどのように保存され変換されるかを理解することで、ボールの動作をより良く予測し、
          ゲーム内の最も難しいパズルでも解くことができます。理論的にはエネルギーは保存されますが、実際には
          （そして私たちのゲームでは）、一部のエネルギーは常に摩擦やその他の非保存力によって失われることを覚えておいてください。
        </p>
      </>
    ),
  }

  return <div className="article-content text-white">{language === "ja" ? content.ja : content.en}</div>
}
