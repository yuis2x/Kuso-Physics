"use client"

import { useLanguage } from "@/lib/language-context"

export default function FrictionArticle() {
  const { t, language } = useLanguage()

  // Content based on language
  const content = {
    en: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">Friction and Collisions</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Understanding Friction</h3>
          <p className="text-gray-300 mb-4">
            Friction is a force that opposes the relative motion or tendency of motion between two surfaces in contact.
            It's what makes objects slow down when sliding across a surface and what allows us to walk without slipping.
          </p>
          <p className="text-gray-300 mb-4">
            In our physics puzzle game, friction plays a crucial role in determining how the ball interacts with
            different surfaces. Some surfaces have high friction, causing the ball to slow down quickly, while others
            have low friction, allowing the ball to slide more freely.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When the ball rolls along a surface with high friction, it will slow down more quickly than
              on a surface with low friction. This affects how you plan the ball's path to the goal.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Types of Friction</h3>
          <p className="text-gray-300 mb-4">In physics, we typically distinguish between several types of friction:</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>Static Friction:</strong> Prevents objects from starting to move when at rest
            </li>
            <li className="mb-2">
              <strong>Kinetic Friction:</strong> Opposes motion once an object is already moving
            </li>
            <li className="mb-2">
              <strong>Rolling Friction:</strong> Occurs when an object rolls along a surface
            </li>
            <li className="mb-2">
              <strong>Fluid Friction:</strong> Resistance experienced by objects moving through liquids or gases
            </li>
          </ul>
          <p className="text-gray-300 mb-4">
            In our game, we primarily model kinetic and rolling friction as the ball interacts with surfaces.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Collisions and Energy Transfer</h3>
          <p className="text-gray-300 mb-4">
            When objects collide, energy is transferred between them. How much energy is transferred and how the objects
            behave after the collision depends on the elasticity of the collision.
          </p>
          <p className="text-gray-300 mb-4">In physics, we categorize collisions as:</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>Elastic Collisions:</strong> Total kinetic energy is conserved (like billiard balls)
            </li>
            <li className="mb-2">
              <strong>Inelastic Collisions:</strong> Some kinetic energy is converted to other forms (like heat or
              sound)
            </li>
            <li className="mb-2">
              <strong>Perfectly Inelastic Collisions:</strong> Objects stick together after colliding
            </li>
          </ul>
          <p className="text-gray-300 mb-4">
            In our game, the "bounce" property of surfaces determines how elastic collisions are. Surfaces with high
            bounce values create more elastic collisions, while those with low bounce values create more inelastic
            collisions.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              Game Example: When the ball hits a surface with a high bounce value (like a trampoline), it will rebound
              with most of its energy preserved. When it hits a surface with a low bounce value, it will lose more
              energy and not bounce as high.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Friction and Collisions in Kuso Physics</h3>
        <p className="text-gray-300 mb-4">
          In our game, we've implemented these physics concepts to create interesting gameplay mechanics:
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">
            Different surfaces have different friction coefficients, affecting how the ball moves across them
          </li>
          <li className="mb-2">The bounce property determines how much energy is preserved in collisions</li>
          <li className="mb-2">
            Combining surfaces with different properties creates complex puzzles that require understanding these
            physics principles
          </li>
          <li className="mb-2">
            In the level editor, you can adjust these properties to create your own physics challenges
          </li>
        </ul>
        <p className="text-gray-300">
          Understanding friction and collisions allows you to predict how the ball will interact with different surfaces
          in the game. This knowledge is essential for solving the more complex puzzles, where you need to use specific
          surface properties to guide the ball along the correct path.
        </p>
      </>
    ),
    ja: (
      <>
        <h2 className="text-2xl font-bold text-white mb-4">摩擦と衝突</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">摩擦の理解</h3>
          <p className="text-gray-300 mb-4">
            摩擦は、接触している2つの表面間の相対運動または運動の傾向に反対する力です。
            これは、物体が表面を滑るときに減速させるものであり、私たちが滑らずに歩くことを可能にするものです。
          </p>
          <p className="text-gray-300 mb-4">
            私たちの物理パズルゲームでは、摩擦はボールが異なる表面とどのように相互作用するかを決定する上で重要な役割を果たします。
            一部の表面は摩擦が高く、ボールがすぐに減速しますが、他の表面は摩擦が低く、ボールがより自由に滑ることができます。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：ボールが摩擦の高い表面を転がると、摩擦の低い表面よりも速く減速します。
              これは、ボールの目標への経路を計画する方法に影響します。
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">摩擦の種類</h3>
          <p className="text-gray-300 mb-4">物理学では、通常、いくつかの種類の摩擦を区別します：</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>静止摩擦：</strong>静止しているときに物体が動き始めるのを防ぎます
            </li>
            <li className="mb-2">
              <strong>動摩擦：</strong>物体がすでに動いているときに運動に反対します
            </li>
            <li className="mb-2">
              <strong>転がり摩擦：</strong>物体が表面に沿って転がるときに発生します
            </li>
            <li className="mb-2">
              <strong>流体摩擦：</strong>液体やガスを通過する物体が経験する抵抗
            </li>
          </ul>
          <p className="text-gray-300 mb-4">
            私たちのゲームでは、ボールが表面と相互作用するときに、主に動摩擦と転がり摩擦をモデル化しています。
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">衝突とエネルギー伝達</h3>
          <p className="text-gray-300 mb-4">
            物体が衝突すると、それらの間でエネルギーが伝達されます。どれだけのエネルギーが伝達され、
            衝突後に物体がどのように振る舞うかは、衝突の弾性に依存します。
          </p>
          <p className="text-gray-300 mb-4">物理学では、衝突を次のように分類します：</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4">
            <li className="mb-2">
              <strong>弾性衝突：</strong>全運動エネルギーが保存される（ビリヤードボールのように）
            </li>
            <li className="mb-2">
              <strong>非弾性衝突：</strong>一部の運動エネルギーが他の形態（熱や音など）に変換される
            </li>
            <li className="mb-2">
              <strong>完全非弾性衝突：</strong>衝突後に物体がくっつく
            </li>
          </ul>
          <p className="text-gray-300 mb-4">
            私たちのゲームでは、表面の「バウンス」特性が衝突の弾性をどの程度にするかを決定します。バウンス値が高い表面は
            より弾性的な衝突を生み出し、バウンス値が低い表面はより非弾性的な衝突を生み出します。
          </p>
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-200 italic">
              ゲームの例：ボールがバウンス値の高い表面（トランポリンのような）に当たると、そのエネルギーのほとんどが保存された状態で跳ね返ります。
              バウンス値の低い表面に当たると、より多くのエネルギーを失い、そこまで高く跳ね返りません。
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Kuso Physicsにおける摩擦と衝突</h3>
        <p className="text-gray-300 mb-4">
          私たちのゲームでは、興味深いゲームプレイメカニクスを作成するためにこれらの物理概念を実装しました：
        </p>
        <ul className="list-disc pl-6 text-gray-300 mb-6">
          <li className="mb-2">
            異なる表面には異なる摩擦係数があり、ボールがそれらの上をどのように移動するかに影響します
          </li>
          <li className="mb-2">バウンス特性は、衝突でどれだけのエネルギーが保存されるかを決定します</li>
          <li className="mb-2">
            異なる特性を持つ表面を組み合わせることで、これらの物理原理の理解を必要とする複雑なパズルが作成されます
          </li>
          <li className="mb-2">レベルエディタでは、これらの特性を調整して独自の物理チャレンジを作成できます</li>
        </ul>
        <p className="text-gray-300">
          摩擦と衝突を理解することで、ゲーム内でボールが異なる表面とどのように相互作用するかを予測できます。
          この知識は、ボールを正しい経路に沿って導くために特定の表面特性を使用する必要がある、
          より複雑なパズルを解くために不可欠です。
        </p>
      </>
    ),
  }

  return <div className="article-content text-white">{language === "ja" ? content.ja : content.en}</div>
}
