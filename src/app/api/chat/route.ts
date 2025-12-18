
import { vercel } from '@ai-sdk/vercel';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Vercel AI Gateway Provider를 사용하여 OpenAI API Key 없이 작동하게 합니다.
    const result = streamText({
        model: vercel.chatModel('gpt-4o'),
        messages,
    });

    return result.toTextStreamResponse();
}
