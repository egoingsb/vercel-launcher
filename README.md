# Next.js Vercel All-in-One Template (One-Click Deploy)

이 템플릿은 Vercel AI Gateway, Supabase Integration, Vercel Blob을 클릭 한 번으로 설정하고 배포할 수 있도록 구성되어 있습니다.

## 🚀 One-Click Deploy 방법

아래 버튼을 클릭하여 본인의 GitHub 저장소로 복사하고 바로 배포할 수 있습니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fegoingsb%2Fvercel-launcher&project-name=vercel-launcher)

> [!IMPORTANT]
> 배포 화면에서 다음 설정을 진행하면 **OpenAI API Key 없이도** 서비스 구동이 가능합니다:
> 1. **AI Gateway**: Vercel Dashboard의 'AI' 탭에서 AI Gateway를 활성화하고 크레딧을 충전하세요.
> 2. **Supabase Integration**: Vercel 배포 설정 중 'Add Integration' 메뉴에서 Supabase를 선택하세요.
> 3. **Vercel Blob (Storage)**: 'Storage' 섹션에서 Vercel Blob을 추가하세요.

### 필수 환경 변수 (통합 기능을 사용하지 않을 경우에만 필요)
만약 Vercel AI Gateway Credits 대신 직접 API를 연동한다면 다음 변수가 필요합니다:
- `OPENAI_API_KEY`: OpenAI 직접 결제 시
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 연동 시
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob 사용 시 (스토리지 추가 시 자동 생성)

## Features

- **AI Chat**: Simple chat interface using Vercel AI SDK.
- **Database**: Connection check with Supabase.
- **File Upload**: Image upload using Vercel Blob.

## Local Development

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Run `npm run dev`.
