import type { Metadata } from "next";
import Link from "next/link";
import BmiCalculator from "./components/BmiCalculator";
import AdSpace from "./components/AdSpace";

export const metadata: Metadata = {
  title: "BMI計算機 - 肥満度・理想体重を無料で計算",
  description:
    "身長・体重を入力するだけでBMI値・肥満度判定（痩せ・普通・肥満）・理想体重を即座に計算できる無料ツールです。WHO基準・日本肥満学会基準に対応。スマホでも使いやすいシンプルなデザイン。",
};

const navLinks = [
  { href: "/about", label: "運営者情報" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-teal-500 text-white w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">BMI</div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">BMI計算機</h1>
                <p className="text-xs text-gray-500">肥満度・理想体重を無料で計算</p>
              </div>
            </div>
            <nav className="flex gap-4 text-sm text-gray-600 flex-wrap">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-teal-600 transition-colors">{link.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ヘッダー下 広告 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      {/* メイン */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
            身長・体重を入力してBMIを計算
          </h2>
          <p className="text-sm text-gray-500">
            BMI（体格指数）・肥満度判定・理想体重（BMI22）・標準体重の範囲を即座に表示します。
          </p>
        </div>

        <BmiCalculator />

        {/* BMIとは */}
        <section className="mt-10 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-3">BMIとは</h3>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            <p>
              BMI（Body Mass Index：体格指数）は、体重と身長から算出される肥満度の指標です。
              世界的に広く使われており、日本肥満学会では<strong className="text-gray-800">BMI 25以上を肥満</strong>と定義しています。
            </p>
            <div className="bg-gray-50 rounded-lg p-3 font-mono text-center text-sm mt-2">
              BMI = 体重(kg) ÷ 身長(m)²
            </div>
            <p>
              <strong className="text-gray-800">理想体重</strong>はBMI=22を基準に計算しています。
              統計的にBMI22付近が最も生活習慣病のリスクが低いとされています。
            </p>
          </div>
        </section>

        <section className="mt-6 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">このツールでわかること</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
            {[
              { emoji: "📊", title: "BMI値", desc: "体重÷身長²で算出した体格指数" },
              { emoji: "🏷️", title: "肥満度判定", desc: "低体重・普通・肥満1〜4度の6段階判定" },
              { emoji: "⚖️", title: "理想体重", desc: "BMI=22を基準とした理想の体重" },
              { emoji: "📏", title: "標準体重の範囲", desc: "BMI18.5〜25の正常範囲の体重" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <div className="font-medium text-gray-700 mb-0.5">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* コンテンツ下 広告 */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-teal-600 transition-colors">{link.label}</Link>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} BMI計算機 - 肥満度・理想体重を無料で計算
          </p>
        </div>
      </footer>
    </div>
  );
}
