"use client"

import { useLanguage } from "@/lib/language-context"

export default function HarmonicMotionArticle() {
  const { t, language } = useLanguage()

  // Content based on language
  const content = {
    en: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">Simple Harmonic Motion</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">What is Simple Harmonic Motion?</h3>
          <p className="text-gray-300 mb-4">
            Simple Harmonic Motion (SHM) is a type of periodic motion where a restoring force acts on an object, causing
            it to oscillate back and forth around an equilibrium position. This type of motion is characterized by a
            sinusoidal pattern and is fundamental to many physical systems, from pendulums to springs to sound waves.
          </p>
          <p className="text-gray-300 mb-4">
            In our physics puzzle game, simple harmonic motion principles apply when the ball bounces on elastic
            surfaces or oscillates between obstacles.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When the ball bounces repeatedly on a highly elastic surface, it exhibits a form of simple
              harmonic motion, with each bounce slightly lower than the previous one due to energy losses.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Mathematical Description</h3>
          <p className="text-gray-300 mb-4">
            Simple harmonic motion can be described mathematically using sinusoidal functions. The position of an object
            in SHM can be represented as:
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">x(t) = A × cos(ωt + φ)</p>
            <p className="text-gray-200 mt-2">
              Where A is the amplitude, ω is the angular frequency, t is time, and φ is the phase constant
            </p>
          </div>
          <p className="text-gray-300 mb-4">
            The velocity and acceleration of the object can be derived from this equation:
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">v(t) = -A × ω × sin(ωt + φ)</p>
            <p className="text-gray-200 font-mono mt-2">a(t) = -A × ω² × cos(ωt + φ) = -ω² × x(t)</p>
          </div>
          <p className="text-gray-300 mb-4">
            This last equation shows that in SHM, the acceleration is proportional to the displacement but in the
            opposite direction, which is the defining characteristic of simple harmonic motion.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Examples of Simple Harmonic Motion</h3>
          <p className="text-gray-300 mb-4">
            In the real world, many systems exhibit simple harmonic motion or approximations of it:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>Pendulums:</strong> For small angles, a pendulum swings with simple harmonic motion
            </li>
            <li className="mb-2">
              <strong>Mass on a Spring:</strong> A classic example of SHM when the spring follows Hooke's Law
            </li>
            <li className="mb-2">
              <strong>Sound Waves:</strong> The vibration of air molecules in sound waves follows SHM principles
            </li>
            <li className="mb-2">
              <strong>Bouncing Objects:</strong> Under ideal conditions, a bouncing ball can exhibit aspects of SHM
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Energy in Simple Harmonic Motion</h3>
          <p className="text-gray-300 mb-4">In SHM, energy constantly converts between potential and kinetic forms:</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              At maximum displacement (the extremes of the motion), the object has maximum potential energy and zero
              kinetic energy
            </li>
            <li className="mb-2">
              At the equilibrium position (the center of the motion), the object has maximum kinetic energy and zero
              potential energy
            </li>
            <li className="mb-2">
              The total energy remains constant in an ideal system (though in reality, and in our game, some energy is
              lost to friction and other forces)
            </li>
          </ul>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When the ball bounces between two elastic surfaces, it converts between kinetic energy (when
              moving) and potential energy (when momentarily stopped at the highest point), similar to a mass
              oscillating on a spring.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Simple Harmonic Motion in Kuso Physics</h3>
        <p className="text-gray-300 mb-4">
          Understanding simple harmonic motion can help you solve certain puzzles in our game:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">Predicting the height of bounces on elastic surfaces</li>
          <li className="mb-2">Understanding how the ball will oscillate between obstacles</li>
          <li className="mb-2">Using resonance effects to build up amplitude in certain puzzle configurations</li>
          <li className="mb-2">Timing your inputs to match the natural frequency of the ball's motion</li>
        </ul>
        <p className="text-gray-300">
          While our game doesn't perfectly simulate all aspects of simple harmonic motion, the principles are still
          useful for understanding how the ball will behave in various situations. By recognizing patterns of
          oscillation, you can better predict the ball's path and solve even the most challenging puzzles.
        </p>
      </>
    ),
    ja: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">単振動</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">単振動とは？</h3>
          <p className="text-gray-300 mb-4">
            単振動（SHM）は、復元力が物体に作用し、平衡位置の周りを行ったり来たりする周期的な運動の一種です。この種の運動は正弦波パターンによって特徴付けられ、振り子からバネ、音波まで、多くの物理系の基本となっています。
          </p>
          <p className="text-gray-300 mb-4">
            私たちの物理パズルゲームでは、ボールが弾性のある表面で跳ねたり、障害物の間で振動したりするとき、単振動の原理が適用されます。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：ボールが高い弾性を持つ表面で繰り返し跳ねるとき、エネルギー損失により各跳ねが前の跳ねよりわずかに低くなる単振動の一形態を示します。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">数学的記述</h3>
          <p className="text-gray-300 mb-4">
            単振動は正弦関数を使用して数学的に記述できます。SHMにおける物体の位置は次のように表すことができます：
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">x(t) = A × cos(ωt + φ)</p>
            <p className="text-gray-200 mt-2">ここで、Aは振幅、ωは角周波数、tは時間、φは位相定数です</p>
          </div>
          <p className="text-gray-300 mb-4">物体の速度と加速度はこの方程式から導出できます：</p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4 text-center">
            <p className="text-gray-200 font-mono">v(t) = -A × ω × sin(ωt + φ)</p>
            <p className="text-gray-200 font-mono mt-2">a(t) = -A × ω² × cos(ωt + φ) = -ω² × x(t)</p>
          </div>
          <p className="text-gray-300 mb-4">
            この最後の方程式は、SHMでは加速度が変位に比例するが反対方向であることを示しており、これが単振動の定義的特徴です。
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">単振動の例</h3>
          <p className="text-gray-300 mb-4">現実世界では、多くのシステムが単振動またはその近似を示します：</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>振り子：</strong>小さな角度では、振り子は単振動で揺れます
            </li>
            <li className="mb-2">
              <strong>バネ上の質量：</strong>バネがフックの法則に従うとき、SHMの古典的な例
            </li>
            <li className="mb-2">
              <strong>音波：</strong>音波における空気分子の振動はSHMの原理に従います
            </li>
            <li className="mb-2">
              <strong>跳ねる物体：</strong>理想的な条件下では、跳ねるボールはSHMの側面を示すことができます
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">単振動におけるエネルギー</h3>
          <p className="text-gray-300 mb-4">
            SHMでは、エネルギーは位置エネルギーと運動エネルギーの形態の間で常に変換されます：
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              最大変位（運動の極端な点）では、物体は最大の位置エネルギーとゼロの運動エネルギーを持ちます
            </li>
            <li className="mb-2">
              平衡位置（運動の中心）では、物体は最大の運動エネルギーとゼロの位置エネルギーを持ちます
            </li>
            <li className="mb-2">
              理想的なシステムでは総エネルギーは一定のままです（ただし、現実では、そして私たちのゲームでは、一部のエネルギーは摩擦やその他の力によって失われます）
            </li>
          </ul>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：ボールが2つの弾性のある表面の間で跳ねるとき、バネで振動する質量と同様に、運動エネルギー（動いているとき）と位置エネルギー（最高点で一時的に停止しているとき）の間で変換されます。
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Kuso Physicsにおける単振動</h3>
        <p className="text-gray-300 mb-4">単振動を理解することで、私たちのゲームの特定のパズルを解くのに役立ちます：</p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">弾性のある表面での跳ねの高さを予測する</li>
          <li className="mb-2">ボールが障害物の間でどのように振動するかを理解する</li>
          <li className="mb-2">特定のパズル構成で共鳴効果を利用して振幅を高める</li>
          <li className="mb-2">ボールの動きの自然な周波数に合わせて入力のタイミングを調整する</li>
        </ul>
        <p className="text-gray-300">
          私たちのゲームは単振動のすべての側面を完璧にシミュレートしているわけではありませんが、その原理はさまざまな状況でボールがどのように振る舞うかを理解するのに役立ちます。振動のパターンを認識することで、ボールの経路をより良く予測し、最も難しいパズルでも解くことができます。
        </p>
      </>
    ),
  }

  return <div className="article-content text-white">{language === "ja" ? content.ja : content.en}</div>
}
