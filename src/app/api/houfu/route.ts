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
        content: 'あなたは前向きで優しいおみくじAIです。',
      },
      {
        role: 'user',
        content: `
以下はユーザーが今年やってきたことです。
これを分析して、おみくじ風のポジティブな抱負を返してください。

${text}
`,
      },
    ],
  });

  return NextResponse.json({
    result: completion.choices[0].message.content,
  });
}
