# Next.js Vercel All-in-One Template (One-Click Deploy)

이 템플릿은 Vercel AI Gateway, Supabase Integration, Vercel Blob을 클릭 한 번으로 설정하고 배포할 수 있도록 구성되어 있습니다.

## 🚀 One-Click Deploy 방법

아래 버튼을 클릭하여 본인의 GitHub 저장소로 복사하고 바로 배포할 수 있습니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fegoingsb%2Fvercel-launcher&env=OPENAI_API_KEY&project-name=vercel-launcher)

> [!IMPORTANT]
> 배포 화면에서 다음 설정을 진행하면 더욱 완벽한 "원클릭" 경험을 얻을 수 있습니다:
> 1. **Supabase Integration**: Vercel 배포 설정 중 'Add Integration' 메뉴에서 Supabase를 선택하세요. 자동으로 DB 생성 및 환경 변수가 설정됩니다.
> 2. **Vercel Blob (Storage)**: 'Storage' 섹션에서 Vercel Blob을 추가하세요.
> 3. **AI Gateway**: Vercel Dashboard의 'AI' 탭에서 AI Gateway를 활성화하세요.

### 필수 환경 변수 (수동 설정 시)

만약 통합 기능을 사용하지 않는다면 다음 변수를 직접 입력해야 합니다:
- `OPENAI_API_KEY`: AI 기능을 위한 키
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 연동 시
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob 사용 시 (스토리지 추가 시 자동 생성)

## Features

- **AI Chat**: Simple chat interface using Vercel AI SDK.
- **Database**: Connection check with Supabase.
- **File Upload**: Image upload using Vercel Blob.

## Local Development

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Run `npm run dev`.
