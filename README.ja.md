
# Kuso Physics

<p align="right">
  <a href="./README.md" style="margin-right: 10px;">🇺🇸 English</a>
  <a href="./README.ja.md">🇯🇵 日本語</a>
</p>

<img src="docs/kuso-physics-logo.png" alt="Kuso Physics ロゴ" width="200" height="200" align="right" style="margin-left: 20px;"/>

**Kuso Physics** は、環境を操作し、重力・摩擦・慣性といった物理法則を活用してボールをゴールへ導く物理パズルゲームです。

デモプレイ: https://kusogames.github.io/Kuso-Physics/

<!-- ![Kuso Physics バナー](./docs/banner.png) -->

<img src="docs/banner.png" alt="Kuso Physics バナー" width="420" height="auto" align="left" style="margin-right: 20px;"/>

---

## 🧪 Kuso Physics とは？

Kuso Physics は、リアルなボール挙動と工夫されたステージ構成が特徴の物理パズルゲームです。  
Shake モード（端末やマウスの動き）を使ってボールの進行方向に影響を与え、パズルを解いていきます。

---

## 🚀 開発者向け：始め方

このゲームは Next.js ベースで構築されたセルフホスト可能な Web アプリケーションです。

```bash
git clone https://github.com/KusoGames/Kuso-Physics.git
cd Kuso-Physics
npm install
npm run dev
````

これでローカルサーバーが立ち上がります。

ブラウザで `http://localhost:3000` にアクセスして、ゲームを楽しんでください！

## 🚀 セルフホスティング・ワンクリックデプロイ

このリポジトリは簡単にフォークして自分の環境で動かせます！

### 1. GitHubでForkする  
[![Fork this repo](https://img.shields.io/badge/Fork-Kuso%20Physics-blue?logo=github&style=for-the-badge)](https://github.com/KusoGames/Kuso-Physics/fork)

フォークすると自動でGitHub Actionsがビルド＆デプロイを走らせます。  
あとは自分のリポジトリの **Settings > Pages** で `gh-pages` ブランチを公開してください。

---

### 2. Vercelでワンクリックデプロイ  
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/KusoGames/Kuso-Physics)

Vercelアカウントがあればワンクリックでデプロイ可能です。

---

## 🎮 遊び方

1. **スタート** — Start ボタンを押してシミュレーションを開始します  
2. **誘導** — デバイスを振る、またはマウスを動かして力を加えます  
3. **ゴールを目指す** — 赤いリングにボールを到達させればクリア  
4. **やり直し** — 詰まったら Reset ボタンでやり直しましょう  

---

## 🕹️ 操作方法

### モバイル
- Shake モード：端末を振ってボールに力を与えます  
- タップでスタート／リセット、ズーム・パン可能（対応端末のみ）

### デスクトップ
- マウスをすばやく動かすと力が加わります（Shake モード）  
- クリック＆ドラッグで視点回転、ホイールでズーム

---

## 📦 ゲームモード

- **キャンペーンモード**：新しいギミックを学べる公式ステージ集  
- **カスタムレベル**：ユーザーが作成・共有したステージをプレイ  
- **レベルエディタ**：オリジナルのレベルを作成・公開可能  

---

## 🧠 攻略のヒント

- 勢いを活用しよう：下り坂でスピードをつけて登りを越える  
- ピンク/紫のバウンド面を使ってジャンプ力アップ  
- 激しく振りすぎず、繊細に操作しよう  
- 開始前にステージ構成をじっくり観察  
- ゲーム内の物理記事を読めば理解が深まる

---

## ❓ よくある質問

- **Q: Shake モードが効かない？**  
  A: モーション許可を有効にするか、デスクトップブラウザを試してください。

- **Q: レベルの保存や共有はできる？**  
  A: はい！レベルエディタで作成・コードやリンクで共有できます。

- **Q: オフラインでも遊べる？**  
  A: 初回読み込み後は多くの機能がオフラインでも動作します。

- **Q: ボールが詰まった！**  
  A: Reset ボタンを押して再試行しましょう。

---

## 📄 ライセンス

Kuso Physics は AGPL-3.0 ライセンスのもとで公開されています。
詳細は `LICENSE` ファイルをご覧ください。

商用ライセンスをご希望の場合は、プロジェクト運営者までご連絡ください。

---

## 📛 商標について

「Kuso Physics」は運営者により使用される **未登録商標** であり、**Kuso Games** ブランドの一部です。

> 「Kuso Physics」の名称、ロゴ、ブランディング要素は本プロジェクトの一部です。
> 誤解を招くような形での無断使用（公式との関係や承認を匂わせるものなど）は禁止されています。

詳細は [`trademarks.md`](./trademarks.md) をご覧ください。

---

## 💬 コミュニティ

* プロジェクトページ：[https://github.com/KusoGames/Kuso-Physics](https://github.com/KusoGames/Kuso-Physics)
* バグ報告や提案：[Issues](https://github.com/KusoGames/Kuso-Physics/issues)
* 質問・議論：[Discussions](https://github.com/KusoGames/Kuso-Physics/discussions)

---

カオスな物理の世界を楽しもう！🌌
