"use client";

import { useMemo, useState } from "react";

type Answer = { label: string; key: string; score: number };
type Question = { title: string; answers: Answer[] };

const questions: Question[] = [
  {
    title: "今、いちばん心に近いテーマは？",
    answers: [
      { label: "恋愛・人間関係", key: "love", score: 2 },
      { label: "仕事・成功", key: "work", score: 4 },
      { label: "心身の休息", key: "heal", score: 6 },
      { label: "新しい一歩", key: "change", score: 8 },
    ],
  },
  {
    title: "最近の自分に近い状態は？",
    answers: [
      { label: "考えすぎてしまう", key: "heal", score: 3 },
      { label: "自信を取り戻したい", key: "work", score: 5 },
      { label: "誰かとの絆を深めたい", key: "love", score: 7 },
      { label: "流れを変えたい", key: "change", score: 9 },
    ],
  },
  {
    title: "心が落ち着く色は？",
    answers: [
      { label: "やさしいピンク", key: "love", score: 2 },
      { label: "澄んだブルー", key: "heal", score: 4 },
      { label: "深いパープル", key: "change", score: 6 },
      { label: "輝くゴールド", key: "work", score: 8 },
    ],
  },
  {
    title: "大切にしたい感覚は？",
    answers: [
      { label: "安心", key: "heal", score: 1 },
      { label: "ときめき", key: "love", score: 3 },
      { label: "達成感", key: "work", score: 5 },
      { label: "自由", key: "change", score: 7 },
    ],
  },
  {
    title: "今ほしい後押しは？",
    answers: [
      { label: "自分を信じる力", key: "work", score: 2 },
      { label: "穏やかに整える力", key: "heal", score: 4 },
      { label: "愛を受け取る力", key: "love", score: 6 },
      { label: "決断して進む力", key: "change", score: 8 },
    ],
  },
];

const results = [
  ["静かな羅針盤", "心を整え、本来のリズムを取り戻す時", "答えを急ぐより、静かな時間の中で自分の本音を確かめて。小さな安心を積み重ねるほど、進む方向が自然に見えてきます。", "今日は予定をひとつ減らし、深呼吸する時間をつくる", "ミストブルー", ["アクアマリン", "ムーンストーン", "水晶"]],
  ["愛を育てる人", "やさしさを循環させる時", "あなたの思いやりは、周囲を温める大切な才能です。相手に合わせすぎず、自分の気持ちも同じように大切にしましょう。", "感謝をひとつ言葉にして伝える", "ローズピンク", ["ローズクォーツ", "ロードクロサイト", "水晶"]],
  ["光を集める挑戦者", "自信を行動に変える時", "準備はすでに整っています。完璧になるのを待たず、できることから始めることで運の流れが動き出します。", "今日中に最初の一歩だけ終える", "サンゴールド", ["ルチルクォーツ", "タイガーアイ", "シトリン"]],
  ["変化の旅人", "古い流れを手放し、新しい扉を開く時", "変化への不安は、成長の入口に立っている証です。過去の正解より、今の自分が心地よい選択を信じてください。", "やめたい習慣をひとつ書き出す", "アメジスト", ["ラピスラズリ", "アメジスト", "ラブラドライト"]],
  ["穏やかな守り手", "安心できる土台を整える時", "誰かを支える力が強いぶん、自分の疲れを後回しにしがちです。まず自分を満たすことが、長くやさしくいられる秘訣です。", "温かい飲み物をゆっくり味わう", "セージグリーン", ["アベンチュリン", "翡翠", "水晶"]],
  ["縁を結ぶ灯", "言葉でつながりを深める時", "遠慮して飲み込んだ気持ちがあるなら、やわらかな言葉で伝えてみて。誠実な一言が、止まっていた関係を動かします。", "伝えたいことを短い文章にする", "ピーチピンク", ["インカローズ", "ローズクォーツ", "アクアマリン"]],
  ["未来を描く設計者", "目標を具体的な形にする時", "大きな目標も、期限と小さな行動に分ければ現実になります。あなたの計画力を信じて、まず一週間の地図を描きましょう。", "今週やることを3つに絞る", "ネイビー", ["ソーダライト", "ラピスラズリ", "ルチルクォーツ"]],
  ["しなやかな再生者", "疲れをほどき、力を蓄える時", "立ち止まることは後退ではありません。今は心と身体を休ませるほど、次に動くための力が戻ってきます。", "眠る30分前に画面を閉じる", "ラベンダー", ["アメジスト", "チャロアイト", "水晶"]],
  ["情熱の火種", "好きという気持ちを育てる時", "心が動くことには、あなたの未来につながるヒントがあります。周囲の評価より、自分の好奇心を一歩だけ優先して。", "気になっていることを10分試す", "ガーネットレッド", ["ガーネット", "カーネリアン", "サンストーン"]],
  ["豊かさの受け手", "努力の実りを受け取る時", "謙遜しすぎず、これまで積み重ねたことを認めてください。受け取る準備ができた時、次の機会も巡ってきます。", "できたことを3つ書き出す", "シャンパンゴールド", ["シトリン", "ルチルクォーツ", "ペリドット"]],
  ["真実を見つめる瞳", "迷いを整理し、優先順位を決める時", "情報を増やすより、何を大切にしたいかを決めることが先です。基準がひとつ定まれば、選択は驚くほど軽くなります。", "譲れない条件をひとつ決める", "ディープブルー", ["ラピスラズリ", "ソーダライト", "オニキス"]],
  ["月明かりの共感者", "感受性を味方にする時", "人の気持ちを察する力は才能です。ただし、すべてを背負う必要はありません。自分と相手の境界をやさしく保ちましょう。", "ひとりで過ごす静かな時間を予約する", "パールホワイト", ["ムーンストーン", "ラブラドライト", "水晶"]],
  ["突破口を開く人", "迷いより決断を選ぶ時", "今必要なのは完璧な答えではなく、進みながら確かめる勇気です。小さな決断が停滞を破る鍵になります。", "保留中のことをひとつ決める", "オレンジ", ["カーネリアン", "タイガーアイ", "ガーネット"]],
  ["調和を奏でる人", "違いをつなぎ、心地よい関係を作る時", "どちらかを否定せず、共通点を見つけることがあなたの強みです。無理な我慢ではなく、双方が楽になる形を探して。", "相手と自分の共通の願いを考える", "ミントグリーン", ["アベンチュリン", "アクアマリン", "ローズクォーツ"]],
  ["大地に根を張る人", "暮らしと足元を整える時", "未来への不安は、目の前を整えることで小さくなります。生活、時間、お金の順に見直すと安心が戻ります。", "机の上を5分だけ整える", "アースブラウン", ["スモーキークォーツ", "オニキス", "翡翠"]],
  ["直感の案内人", "心に浮かぶ小さなサインを信じる時", "理屈では説明できなくても、何度も気になることには意味があります。記録して眺めると、あなたらしい答えが見えてきます。", "最初に浮かんだ答えをメモする", "ミスティックパープル", ["ラブラドライト", "アメジスト", "ラピスラズリ"]],
  ["希望を運ぶ風", "軽やかに可能性を広げる時", "ひとつの道に固執せず、別の方法を試してみましょう。環境を少し変えるだけで、新しい発想と縁が入ってきます。", "いつもと違う道を選ぶ", "スカイブルー", ["ターコイズ", "アクアマリン", "アマゾナイト"]],
  ["自分を愛する花", "ありのままの価値を認める時", "欠点を直してから幸せになる必要はありません。今の自分にかけるやさしい言葉が、表情と選択を変えていきます。", "鏡の自分に労いの言葉をかける", "ブロッサムピンク", ["ローズクォーツ", "ロードクロサイト", "ムーンストーン"]],
  ["実りを育てる職人", "丁寧な継続が成果につながる時", "派手な変化より、毎日の小さな積み重ねが強い運を作ります。比べず、昨日の自分より少し前へ進めば十分です。", "15分だけ集中する時間を作る", "フォレストグリーン", ["翡翠", "タイガーアイ", "ルチルクォーツ"]],
  ["夜明けを迎える人", "一区切りを越え、新しい周期へ進む時", "ここまでよく歩いてきました。終わったものに感謝して手放すことで、次に必要な出会いと機会が入る余白が生まれます。", "もう役目を終えた物をひとつ手放す", "オーロラ", ["水晶", "ラブラドライト", "サンストーン"]],
] as const;

function lifePath(date: string) {
  let sum = date.replace(/\D/g, "").split("").reduce((n, x) => n + Number(x), 0);
  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    sum = String(sum).split("").reduce((n, x) => n + Number(x), 0);
  }
  return sum || 1;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [date, setDate] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [resultIndex, setResultIndex] = useState<number | null>(null);

  const progress = useMemo(() => (step / questions.length) * 100, [step]);

  function choose(answer: Answer) {
    const next = [...answers, answer];
    setAnswers(next);
    if (step === questions.length - 1) {
      const score = next.reduce((n, a) => n + a.score, lifePath(date) * 3);
      setResultIndex(score % results.length);
    } else {
      setStep(step + 1);
    }
  }

  function reset() {
    setStarted(false);
    setDate("");
    setStep(0);
    setAnswers([]);
    setResultIndex(null);
  }

  const result = resultIndex === null ? null : results[resultIndex];
  const imageNo = resultIndex === null ? 1 : ((resultIndex * 7 + lifePath(date)) % 11) + 1;
  const imagePath = `/stones/${String(imageNo).padStart(3, "0")}.png`;

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={reset}>
          <span className="brand-mark">✦</span>
          <span>Stone Compass</span>
        </a>
        <span className="header-note">天然石が導く、わたしの現在地</span>
      </header>

      {!started && !result && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">NUMEROLOGY × STONE MESSAGE</p>
              <h1>
                心の方角を知れば、
                <br />
                次の一歩は軽くなる。
              </h1>
              <p className="lead">
                誕生日から導く数秘と、今の気持ちを映す5つの質問。
                あなたの現在地に寄り添う天然石とメッセージをお届けします。
              </p>
              <button className="primary" onClick={() => setStarted(true)}>
                無料で診断をはじめる <span>→</span>
              </button>
              <p className="micro">所要時間 約1分・登録不要</p>
            </div>
            <div className="hero-art">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="crystal">✧</div>
              <div className="compass">
                <span>N</span>
                <b>✦</b>
                <span>S</span>
              </div>
            </div>
          </section>

          <section className="how">
            <p className="section-kicker">STONE COMPASSについて</p>
            <h2>偶然ではなく、ルールから導く診断</h2>
            <div className="feature-grid">
              <article><span>01</span><h3>誕生日数秘</h3><p>生年月日の数字から、あなたが持つ基本的な性質を読み解きます。</p></article>
              <article><span>02</span><h3>現在のテーマ</h3><p>5つの質問から、今いちばん意識したい方向を整理します。</p></article>
              <article><span>03</span><h3>天然石の提案</h3><p>診断結果に合わせて、3つの石とブレスレットをご提案します。</p></article>
            </div>
          </section>
        </>
      )}

      {started && !result && (
        <section className="diagnosis">
          <div className="diagnosis-card">
            {step === 0 && answers.length === 0 && !date ? (
              <>
                <p className="step-label">はじめに</p>
                <h2>あなたの誕生日を教えてください</h2>
                <p className="support">数秘術の基本となるライフパスナンバーを算出します。</p>
                <input
                  aria-label="誕生日"
                  className="date-input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <button className="primary full" disabled={!date} onClick={() => setAnswers([{ label: "birth", key: "birth", score: 0 }])}>
                  質問へ進む
                </button>
              </>
            ) : (
              <>
                <div className="progress"><span style={{ width: `${progress}%` }} /></div>
                <p className="step-label">QUESTION {step + 1} / {questions.length}</p>
                <h2>{questions[step].title}</h2>
                <div className="answer-list">
                  {questions[step].answers.map((answer) => (
                    <button key={answer.label} onClick={() => choose(answer)}>
                      <span>{answer.label}</span><b>→</b>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {result && (
        <section className="result-wrap">
          <div className="result-heading">
            <p className="eyebrow">YOUR STONE COMPASS</p>
            <p className="result-number">Life Path {lifePath(date)}・Design {String(imageNo).padStart(3, "0")}</p>
            <h1>{result[0]}</h1>
            <p>{result[1]}</p>
          </div>
          <div className="result-grid">
            <div className="bracelet-card">
              <img src={imagePath} alt={`診断結果に合わせたブレスレット デザイン${String(imageNo).padStart(3, "0")}`} />
              <div className="image-caption"><span>あなたへのブレスレット</span><b>DESIGN {String(imageNo).padStart(3, "0")}</b></div>
            </div>
            <div className="message-card">
              <p className="section-kicker">今のあなたへのメッセージ</p>
              <p className="message">{result[2]}</p>
              <div className="action-box"><span>今日の小さな一歩</span><b>{result[3]}</b></div>
              <div className="color-row"><span>ラッキーカラー</span><b>{result[4]}</b></div>
              <div className="stone-list">
                <span>おすすめの天然石</span>
                {result[5].map((stone, i) => <b key={stone}><i>{i + 1}</i>{stone}</b>)}
              </div>
            </div>
          </div>
          <div className="result-actions">
            <button className="primary" onClick={() => window.print()}>結果を保存する</button>
            <button className="secondary" onClick={reset}>もう一度診断する</button>
          </div>
          <p className="disclaimer">天然石は、日々の気持ちを整えるお守りとしてご提案しています。医療的な効果を示すものではありません。</p>
        </section>
      )}

      <footer>
        <span>✦ Stone Compass</span>
        <small>© 2026 Stone Compass</small>
      </footer>
    </main>
  );
}
