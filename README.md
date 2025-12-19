# Next.js Vercel All-in-One Template

Vercel AI Gateway + Supabase + Blob Storage를 간편하게 배포할 수 있는 템플릿입니다.

## 🚀 배포 방법

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fegoingsb%2Fvercel-launcher&project-name=vercel-launcher)

### 배포 후 설정 (3단계)

**1단계: Supabase 연결**
- Vercel Dashboard → Settings → Integrations → Browse Marketplace
- "Supabase" 검색 → Install → 계정 연결
- 환경변수 자동 주입: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**2단계: Blob Storage 추가**
- Vercel Dashboard → Storage → Create Database → Blob
- 환경변수 자동 주입: `BLOB_READ_WRITE_TOKEN`

**3단계: AI Gateway 활성화**
- Vercel Dashboard → AI 탭 → AI Gateway 활성화
- 크레딧 충전 (월 $5 무료 제공)

> ⚠️ 설정 완료 후 **Deployments → Redeploy** 클릭하여 재배포하세요.

## 기능

| 기능 | 설명 |
|------|------|
| 💬 AI Chat | Vercel AI SDK를 이용한 채팅 |
| 🗄️ Database | Supabase 연결 상태 확인 |
| 📁 File Upload | Vercel Blob 이미지 업로드 |

## 로컬 개발

```bash
npm install
cp .env.example .env.local  # 환경변수 설정
npm run dev
```

## 문서

- [Vercel Template 개발자 가이드](./docs/VERCEL_TEMPLATE_GUIDE.md)
