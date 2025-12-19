# Vercel Template 개발자 가이드

## 템플릿이란?

Vercel Template은 다른 개발자가 **"Deploy" 버튼 클릭 한 번**으로 프로젝트를 복사하고 배포할 수 있게 해주는 스타터 킷입니다.

## 핵심 개념

### 1. Deploy 버튼 작동 방식

```
사용자가 버튼 클릭
       ↓
GitHub에 새 저장소 생성 (Clone, Fork 아님)
       ↓
Vercel 프로젝트 자동 생성 및 배포
```

> ⚠️ **주의**: Clone 방식이므로 원본 저장소와 연결이 끊어집니다. 사용자가 업데이트를 받으려면 수동으로 Sync해야 합니다.

### 2. Deploy 버튼 URL 구조

```
https://vercel.com/new/clone?repository-url={저장소URL}&env={환경변수}&project-name={프로젝트명}
```

| 파라미터 | 설명 | 예시 |
|----------|------|------|
| `repository-url` | GitHub 저장소 URL (인코딩 필요) | `https%3A%2F%2Fgithub.com%2Fuser%2Frepo` |
| `env` | 사용자에게 입력받을 환경변수 | `OPENAI_API_KEY,DATABASE_URL` |
| `project-name` | 기본 프로젝트 이름 | `my-app` |

### 3. Vercel Integration 활용

배포 시 자동으로 연결 가능한 서비스들:

| 서비스 | 자동 환경변수 | 사용자 행동 |
|--------|--------------|-------------|
| **Supabase** | `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Integration 연결 클릭 |
| **Vercel Blob** | `BLOB_READ_WRITE_TOKEN` | Storage에서 추가 |
| **Vercel KV** | `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Storage에서 추가 |
| **Vercel Postgres** | `POSTGRES_URL` | Storage에서 추가 |

### 4. AI Gateway

- Vercel에 배포된 앱은 **OIDC 토큰**으로 자동 인증됨
- 사용자가 별도 API Key 없이 AI 사용 가능 (크레딧 충전 필요)
- `@ai-sdk/vercel` 패키지의 `vercel()` 프로바이더 사용

```typescript
import { vercel } from '@ai-sdk/vercel';
import { streamText } from 'ai';

const result = streamText({
  model: vercel('gpt-4o'),
  messages,
});
```

## 템플릿 제출 방법

1. **제출 페이지**: [vercel.com/templates/submit](https://vercel.com/templates/submit)
2. **필요 정보**:
   - GitHub 저장소 URL
   - 라이브 데모 URL
   - 설명, 카테고리
3. **비용**: 무료 (수수료 없음)
4. **검토**: Vercel 팀 승인 후 마켓플레이스 게시

## 템플릿 품질 체크리스트

- [ ] `README.md`에 Deploy 버튼 포함
- [ ] 필요한 환경변수 명시
- [ ] 라이브 데모 정상 작동
- [ ] 빌드 에러 없음
- [ ] Integration 연결 안내 포함

## 한계점

| 항목 | 가능 여부 |
|------|----------|
| 코드 자동 복사 | ✅ |
| 환경변수 입력 안내 | ✅ |
| Integration 자동 연결 | ❌ (사용자 클릭 필요) |
| 원본 저장소 자동 동기화 | ❌ (수동 Sync 필요) |
| 유료 템플릿 판매 | ❌ |
