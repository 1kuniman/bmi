"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "お名前を入力してください。";
    if (!email.trim()) errs.email = "メールアドレスを入力してください。";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "正しいメールアドレスを入力してください。";
    if (!message.trim()) errs.message = "お問い合わせ内容を入力してください。";
    else if (message.trim().length < 10) errs.message = "10文字以上入力してください。";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setState("submitting");
    const subject = encodeURIComponent(`【BMI計算機】お問い合わせ: ${name}`);
    const body = encodeURIComponent(`お名前: ${name}\nメールアドレス: ${email}\n\n【内容】\n${message}`);
    window.location.href = `mailto:dora06290@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setState("success"); setName(""); setEmail(""); setMessage(""); }, 500);
  }

  if (state === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-bold text-green-800 mb-2">メールアプリが開きました</h3>
        <p className="text-green-700 text-sm">内容をご確認の上、送信してください。</p>
        <button onClick={() => setState("idle")} className="mt-4 text-sm text-green-600 hover:underline">フォームに戻る</button>
      </div>
    );
  }

  const inputClass = (err?: string) =>
    `w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${err ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">お名前 <span className="text-red-500 text-xs">必須</span></label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="山田 太郎" className={inputClass(errors.name)} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">メールアドレス <span className="text-red-500 text-xs">必須</span></label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" className={inputClass(errors.email)} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">お問い合わせ内容 <span className="text-red-500 text-xs">必須</span></label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="ご意見・ご要望・不具合報告など" className={`${inputClass(errors.message)} resize-y`} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        <p className="text-xs text-gray-400 mt-1 text-right">{message.length}文字</p>
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-all text-sm shadow-sm disabled:opacity-60"
      >
        {state === "submitting" ? "送信中..." : "送信する（メールアプリが開きます）"}
      </button>
      <p className="text-xs text-gray-400 text-center">直接の連絡先: dora06290@gmail.com</p>
    </form>
  );
}
