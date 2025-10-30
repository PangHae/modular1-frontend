# Modular1 - 알고리즘 트레이딩 플랫폼

> 코딩 없이 드래그 앤 드롭으로 매매 전략을 만들고, 실시간으로 자동 실행하는 노코드 플랫폼

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [주요 컴포넌트](#주요-컴포넌트)
- [API 구조](#api-구조)
- [개발 가이드](#개발-가이드)

## 🚀 프로젝트 소개

Modular1은 블록 기반의 노코드 알고리즘 트레이딩 플랫폼입니다. 사용자는 복잡한 프로그래밍 지식 없이도 직관적인 드래그 앤 드롭 인터페이스를 통해 투자 전략을 생성하고 자동으로 실행할 수 있습니다.

### 핵심 가치

- **노코드**: 프로그래밍 지식 없이도 전략 생성 가능
- **블록 기반**: 직관적인 드래그 앤 드롭 인터페이스
- **실시간 실행**: 생성한 전략을 즉시 자동 매매 실행
- **템플릿 제공**: 검증된 전략 템플릿으로 빠른 시작

## ✨ 주요 기능

### 1. 대시보드

- **계좌 요약**: 실시간 계좌 정보 및 수익률 표시
- **포트폴리오 차트**: 시각적인 수익률 추이 분석
- **종목별 수익률**: 보유 종목별 상세 수익률 정보
- **거래 내역**: 최근 실행된 거래 내역 조회

### 2. 전략 관리

- **전략 생성**: 블록 기반 전략 생성 도구
- **전략 실행/중지**: 원클릭으로 전략 활성화/비활성화
- **전략 모니터링**: 실시간 전략 성과 추적
- **전략 템플릿**: 검증된 전략 템플릿 제공

### 3. 블록 시스템

- **논리 블록**: AND/OR 조건 블록
- **기본 지표**: 가격, 체결, 거래량, 변화율 블록
- **모멘텀 지표**: RSI, MACD, 스토캐스틱 등
- **볼린저 밴드**: 상/하단선 돌파 전략
- **이동평균**: EMA, MA 크로스 전략
- **VWAP**: 거래량 가중 평균가 전략

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript 5
- **UI Library**: shadcn
- **State Management**: TanStack Query (React Query)
- **Drag & Drop**: @dnd-kit
- **Package Manager**: pnpm

### Development Tools

- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint
- **Containerization**: Docker

## 📁 프로젝트 구조

```
src/
├── @types/                 # TypeScript 타입 정의
│   ├── accounts.ts
│   ├── strategy.ts
│   └── ...
├── app/                    # Next.js App Router
│   ├── (authorized)/      # 인증된 사용자 전용 페이지
│   │   ├── dashboard/     # 대시보드
│   │   └── strategies/    # 전략 관리
│   ├── auth/              # 인증 페이지
│   └── layout.tsx
├── components/            # 재사용 가능한 컴포넌트
│   ├── Blocks/           # 블록 시스템 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   ├── layouts/          # 레이아웃 컴포넌트
│   └── ui/               # UI 기본 컴포넌트
├── containers/           # 페이지별 컨테이너 컴포넌트
├── hooks/               # 커스텀 훅
│   ├── api/            # API 관련 훅
│   └── contexts/       # Context 훅
├── services/           # API 서비스
├── constants/          # 상수 정의
└── lib/               # 유틸리티 함수
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js 22+
- pnpm

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작
pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### Docker 실행

```bash
# Docker 이미지 빌드
docker build -t modular1-frontend .

# Docker 컨테이너 실행
docker run -p 3000:3000 modular1-frontend
```

## 🧩 주요 컴포넌트

### 블록 시스템

- **BlockAccordion**: 블록 카테고리별 아코디언 UI
- **StrategyConfiguration**: 드래그 앤 드롭 전략 구성 인터페이스
- **CreateStrategyProvider**: 전략 생성 상태 관리

### 대시보드

- **PortfolioChart**: 포트폴리오 수익률 차트
- **TopProfitRate**: 수익률 Top 10 종목
- **ProfitRatePerStock**: 종목별 수익률
- **RecentExecutions**: 최근 거래 내역

### 전략 관리

- **StrategyCard**: 전략 카드 컴포넌트
- **StrategyDetail**: 전략 상세 정보
- **StrategyMenu**: 전략 실행/중지/삭제 메뉴

## 🔌 API 구조

### 서비스별 API 엔드포인트

- **인증 서비스**: `/api/v1/auth/*`
- **전략 서비스**: `/api/v1/strategies/*`
- **계좌 서비스**: `/api/v1/accounts/*`
- **거래 서비스**: `/api/v1/trade/*`
- **종목 서비스**: `/api/v1/stocks/*`

### 주요 API 훅

- `useAccountInfo`: 계좌 정보 조회
- `useAccountProfitRate`: 수익률 데이터 조회
- `useStrategies`: 전략 목록 조회
- `useRunStrategy`: 전략 실행
- `useStopStrategy`: 전략 중지

## 🛠 개발 가이드

### 코드 스타일

- ESLint + Prettier 설정 준수
- TypeScript strict 모드 사용
- 컴포넌트는 함수형 컴포넌트 사용
- 커스텀 훅으로 로직 분리

### 커밋 컨벤션

```
type(scope): description

feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 설정 변경
```

### 폴더 구조 규칙

- 컴포넌트는 PascalCase
- 훅은 camelCase (use 접두사)
- 타입 정의는 @types 폴더에 분리
- API 관련 로직은 services 폴더에 분리
