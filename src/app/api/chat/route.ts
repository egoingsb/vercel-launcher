
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Vercel AI Gateway 활성화 시, 환경 변수를 통해 자동으로 게이트웨이를 통과하게 설정할 수 있습니다.
    // 또는 명시적으로 게이트웨이 설정을 추가할 수 있습니다.
    const result = streamText({
        model: openai('gpt-4o'), // 또는 사용자가 원하는 모델
        messages,
    });

    return result.toTextStreamResponse();
}
