"use client";

import { useState, useMemo } from "react";

// ── BMI判定基準 ────────────────────────────────────────
// WHO基準 + 日本肥満学会（BMI25以上が肥満）
interface BmiCategory {
  label: string;
  labelJa: string;
  min: number;
  max: number;
  color: string;       // Tailwind bg
  border: string;      // Tailwind border
  text: string;        // Tailwind text
  barColor: string;    // Tailwind bg for bar
  emoji: string;
  advice: string;
}

const CATEGORIES: BmiCategory[] = [
  {
    label: "低体重（痩せ）",
    labelJa: "低体重（痩せ）",
    min: 0,
    max: 18.5,
    color: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    barColor: "bg-blue-400",
    emoji: "🔵",
    advice: "体重が標準より少ない状態です。栄養バランスの取れた食事を心がけましょう。",
  },
  {
    label: "普通体重",
    labelJa: "普通体重",
    min: 18.5,
    max: 25,
    color: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    barColor: "bg-green-400",
    emoji: "🟢",
    advice: "理想的な体重の範囲です。現在の生活習慣を維持しましょう。",
  },
  {
    label: "肥満（1度）",
    labelJa: "肥満（1度）",
    min: 25,
    max: 30,
    color: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    barColor: "bg-yellow-400",
    emoji: "🟡",
    advice: "やや体重が多い状態です。適度な運動と食生活の見直しをおすすめします。",
  },
  {
    label: "肥満（2度）",
    labelJa: "肥満（2度）",
    min: 30,
    max: 35,
    color: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    barColor: "bg-orange-400",
    emoji: "🟠",
    advice: "体重が多い状態です。医師や専門家に相談しながら生活習慣の改善を検討しましょう。",
  },
  {
    label: "肥満（3度）",
    labelJa: "肥満（3度）",
    min: 35,
    max: 40,
    color: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    barColor: "bg-red-400",
    emoji: "🔴",
    advice: "体重がかなり多い状態です。医師に相談のうえ、適切な対処を検討してください。",
  },
  {
    label: "肥満（4度）",
    labelJa: "肥満（4度）",
    min: 40,
    max: Infinity,
    color: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
    barColor: "bg-red-600",
    emoji: "🔴",
    advice: "体重が非常に多い状態です。早急に医師に相談することをおすすめします。",
  },
];

function getCategory(bmi: number): BmiCategory {
  return CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) ?? CATEGORIES[CATEGORIES.length - 1];
}

// ── 計算ロジック ───────────────────────────────────────
interface BmiResult {
  bmi: number;
  category: BmiCategory;
  // 理想体重（BMI=22が最も病気になりにくいとされる）
  idealWeight: number;
  // 標準体重上限・下限
  normalMin: number;
  normalMax: number;
  // 現在体重との差
  diffFromIdeal: number;
}

function calcBmi(heightCm: number, weightKg: number): BmiResult {
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  const category = getCategory(bmi);
  const idealWeight = 22 * h * h;
  const normalMin = 18.5 * h * h;
  const normalMax = 25 * h * h;
  const diffFromIdeal = weightKg - idealWeight;
  return { bmi, category, idealWeight, normalMin, normalMax, diffFromIdeal };
}

// BMIをゲージ上の位置(%)に変換 (BMI 10〜45のレンジ)
function bmiToPercent(bmi: number): number {
  const min = 10, max = 45;
  return Math.min(100, Math.max(0, ((bmi - min) / (max - min)) * 100));
}

// ── コンポーネント ────────────────────────────────────
export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo<BmiResult | null>(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h < 50 || h > 250 || w < 10 || w > 500) return null;
    return calcBmi(h, w);
  }, [height, weight]);

  const gaugePercent = result ? bmiToPercent(result.bmi) : null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-5">
      {/* 入力フォーム */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-5">身長・体重を入力</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* 身長 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">身長</label>
            <div className="relative">
              <input
                type="number"
                min="50"
                max="250"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
                className="w-full pl-4 pr-10 py-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition text-right"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">cm</span>
            </div>
          </div>
          {/* 体重 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">体重</label>
            <div className="relative">
              <input
                type="number"
                min="10"
                max="500"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="60"
                className="w-full pl-4 pr-10 py-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition text-right"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">kg</span>
            </div>
          </div>
        </div>
        {height && weight && !result && (
          <p className="text-red-500 text-xs mt-3">有効な身長（50〜250cm）と体重（10〜500kg）を入力してください。</p>
        )}
      </div>

      {/* 結果 */}
      {result && (
        <>
          {/* BMIメインカード */}
          <div className={`border rounded-2xl p-5 sm:p-6 shadow-sm ${result.category.color} ${result.category.border}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className={`text-xs font-semibold mb-1 ${result.category.text}`}>あなたのBMI</div>
                <div className={`text-5xl sm:text-6xl font-bold tabular-nums ${result.category.text}`}>
                  {result.bmi.toFixed(1)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-1">{result.category.emoji}</div>
                <div className={`text-base font-bold ${result.category.text}`}>{result.category.labelJa}</div>
              </div>
            </div>

            {/* ゲージバー */}
            <div className="mb-3">
              <div className="h-4 w-full bg-gradient-to-r from-blue-300 via-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-full relative overflow-visible">
                {gaugePercent !== null && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-gray-700 rounded-full shadow-md transition-all duration-300"
                    style={{ left: `${gaugePercent}%` }}
                  />
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1 px-0.5">
                <span>10</span>
                <span>18.5</span>
                <span>25</span>
                <span>35</span>
                <span>45+</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">{result.category.advice}</p>
          </div>

          {/* 詳細カード */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 理想体重 */}
            <div className="bg-white border border-teal-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-xs font-medium text-teal-600 mb-1">理想体重（BMI22）</div>
              <div className="text-3xl font-bold text-teal-700 tabular-nums">
                {result.idealWeight.toFixed(1)}
                <span className="text-base ml-0.5">kg</span>
              </div>
              <div className={`text-xs mt-1 font-medium ${result.diffFromIdeal > 0 ? "text-red-500" : "text-blue-500"}`}>
                {result.diffFromIdeal > 0 ? `+${result.diffFromIdeal.toFixed(1)}kg 超過` : `${result.diffFromIdeal.toFixed(1)}kg 不足`}
              </div>
            </div>

            {/* 標準体重下限 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-xs font-medium text-gray-500 mb-1">標準体重（下限）</div>
              <div className="text-3xl font-bold text-gray-700 tabular-nums">
                {result.normalMin.toFixed(1)}
                <span className="text-base ml-0.5">kg</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">BMI 18.5</div>
            </div>

            {/* 標準体重上限 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-xs font-medium text-gray-500 mb-1">標準体重（上限）</div>
              <div className="text-3xl font-bold text-gray-700 tabular-nums">
                {result.normalMax.toFixed(1)}
                <span className="text-base ml-0.5">kg</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">BMI 25.0</div>
            </div>
          </div>

          {/* BMI判定表 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">BMI判定基準（日本肥満学会）</h3>
            <div className="space-y-1.5">
              {CATEGORIES.filter((c) => c.max !== Infinity || c.min <= 40).map((cat) => {
                const isCurrent = result.category.label === cat.label;
                return (
                  <div
                    key={cat.label}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                      isCurrent ? `${cat.color} ${cat.border} border font-semibold` : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span className={isCurrent ? cat.text : "text-gray-700"}>{cat.label}</span>
                      {isCurrent && <span className={`text-xs px-1.5 py-0.5 rounded ${cat.color} ${cat.text}`}>← あなた</span>}
                    </div>
                    <span className="text-gray-500 text-xs tabular-nums">
                      {cat.max === Infinity ? `${cat.min}以上` : `${cat.min} 〜 ${cat.max}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 未入力ガイド */}
      {!result && !(height && weight) && (
        <div className="text-center text-gray-400 text-sm py-8">
          <div className="text-5xl mb-4">⚖️</div>
          <p>身長と体重を入力してください</p>
        </div>
      )}
    </div>
  );
}
