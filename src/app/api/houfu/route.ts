import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
あなたは前向きで優しい振り返り支援AIです。
ユーザーが「今年やってきてよかった」と自然に思えるよう、
自己肯定感が高まる表現を使ってください。

【重要なルール】
・占いや運勢の表現は禁止
・文章は短く、改行を多めに
・全体で200文字前後（Xでシェア可能）
・読みやすい見出し構成にする
`,
      },
      {
        role: 'user',
        content: `
以下は、ユーザーが今年頑張ってきたことです。

【今年の振り返り】
${text}

次のフォーマットで出力してください。

【今年の自分】
・今年取り組んできたことを肯定的に一言でまとめる

【来年に向けて】
・無理のない、前向きな抱負を1〜2文で書く

※やさしく背中を押すトーンでお願いします
`,
      },
    ],
  });

  return NextResponse.json({
    result: completion.choices[0].message.content,
  });
}
