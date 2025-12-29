'use client';

import { useState } from 'react';

const MAX_TWEET_LENGTH = 280;

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // 抱負を唱える
  const submit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/houfu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult('⚠️ エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  // 🔁 リセット（結果＋入力文を両方クリア）
  const reset = () => {
    setResult('');
    setText('');
  };

  // 🔤 X用シェア文章を生成（280文字制限）
  const buildShareText = (content: string) => {
    const baseText = `🌸 ポジティブAI抱負 🌸\n\n${content}`;

    if (baseText.length <= MAX_TWEET_LENGTH) {
      return baseText;
    }

    return baseText.slice(0, MAX_TWEET_LENGTH - 1) + '…';
  };

  // Xでシェア
  const shareToX = () => {
    const shareText = buildShareText(result);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* タイトル */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-emerald-700">
            🌸 ポジティブAI抱負 🌸
          </h1>
          <p className="text-sm text-gray-500">
            今年を振り返って、前向きな抱負を言葉にしてみましょう
          </p>
        </div>

        {/* 入力欄 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            今年やってきたこと
          </label>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            rows={5}
            placeholder="例：仕事を頑張った、勉強を続けた、人間関係を大切にした…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="text-right text-xs text-gray-400">
            {text.length} 文字
          </div>
        </div>

        {/* 実行ボタン */}
        <button
          onClick={submit}
          disabled={loading || !text.trim()}
          className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${
              loading || !text.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
        >
          {loading ? '文章を整理中…' : '🌟 抱負を言葉にする'}
        </button>

        {/* 結果表示 */}
        {result && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-gray-800 leading-relaxed whitespace-pre-wrap">
              {result}
            </div>

            <div className="text-right text-xs text-gray-400">
              シェア文字数：{buildShareText(result).length} / 280
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={shareToX}
                className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
              >
                📤 Xでシェア
              </button>

              <button
                onClick={reset}
                className="w-full py-2 rounded-lg border border-emerald-400 text-emerald-600 hover:bg-emerald-50 transition"
              >
                🔁 リセットする
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
