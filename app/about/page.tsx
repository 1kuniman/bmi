import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";

export const metadata: Metadata = {
  title: "運営者情報 | BMI計算機",
  description: "BMI計算機の運営者情報ページです。サイトの運営者・目的・連絡先についてご案内しています。",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">運営者情報</h1>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm sm:text-base">
          <tbody>
            {[
              { label: "サイト名", value: "BMI計算機 - 肥満度・理想体重を無料で計算" },
              { label: "サイトURL", value: "https://bmi-keisan.vercel.app" },
              { label: "運営者名", value: "Kunimoto Ikkei" },
              { label: "メールアドレス", value: <a href="mailto:dora06290@gmail.com" className="text-teal-600 hover:underline">dora06290@gmail.com</a> },
              { label: "開設年", value: "2025年" },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <th className="text-left px-5 py-4 font-medium text-gray-600 w-36 sm:w-44 border-b border-gray-100 align-top">{row.label}</th>
                <td className="px-5 py-4 text-gray-800 border-b border-gray-100">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">サイトについて</h2>
        <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
          <p>「BMI計算機」は、身長と体重を入力するだけでBMI値・肥満度判定・理想体重を即座に計算できる無料のオンラインツールです。</p>
          <p>入力された身長・体重はサーバーへ送信されず、すべてブラウザ上で処理されるため、プライバシーを守りながら安心してご利用いただけます。</p>
          <p>スマートフォン・タブレット・PCなど、あらゆるデバイスに対応したレスポンシブデザインを採用しています。</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">主な機能</h2>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          {[
            "BMI値のリアルタイム計算",
            "肥満度判定（低体重・普通・肥満1〜4度の6段階）",
            "理想体重の表示（BMI22基準）",
            "標準体重の範囲（下限・上限）の表示",
            "ゲージバーによるBMI位置の視覚的表示",
            "日本肥満学会基準の判定表",
            "スマートフォン対応のレスポンシブデザイン",
            "完全無料・会員登録不要・データ送信なし",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-teal-500 mt-0.5 flex-shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">免責事項</h2>
        <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
          <p>当サイトの計算結果はBMIによる参考値であり、医学的な診断ではありません。健康に関する判断は医師や専門家にご相談ください。</p>
          <p>BMIは体脂肪率を直接測定するものではなく、筋肉量が多い方など体型によっては実態と異なる場合があります。</p>
          <p>当サイトの利用によって生じたいかなる損害についても、運営者は責任を負いかねます。</p>
        </div>
      </section>

      <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 text-center">
        <p className="text-gray-700 text-sm mb-3">ご意見・ご要望・ご質問はお気軽にどうぞ。</p>
        <Link href="/contact" className="inline-block bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
          お問い合わせはこちら
        </Link>
      </div>
    </SiteLayout>
  );
}
