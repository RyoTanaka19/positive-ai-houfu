'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const submit = async () => {
    const res = await fetch('/api/houfu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-center">
          🌸 ポジティブAI抱負 🌸
        </h1>

        <textarea
          className="w-full p-3 border rounded"
          rows={5}
          placeholder="今年やってきたことを書いてください"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600"
        >
          おみくじを引く
        </button>

        {result && <div className="bg-white p-4 rounded shadow">{result}</div>}
      </div>
    </main>
  );
}
