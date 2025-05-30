# 💰 가계부 앱 프로젝트

> 바이브 코딩으로 만드는 심플하고 실용적인 가계부 앱

## 📁 프로젝트 구조

```
household-budget-app/
├── docs/                    # 📚 프로젝트 문서들
│   ├── README.md           # 상세한 프로젝트 개요
│   ├── GETTING_STARTED.md  # 🎯 개발 시작 가이드
│   ├── DEVELOPMENT_LOG.md  # 📈 개발 진행 로그 (NEW!)
│   ├── DOCKER_SETUP.md     # 🐳 도커 환경 가이드
│   ├── VIBE_CODING_RULES.md # 바이브 코딩 원칙
│   ├── ZUSTAND_GUIDE.md    # Zustand 사용법
│   ├── TODO.md             # 개발 진행 상황
│   └── TECH_STACK_DECISION.md # 기술 스택 선택 이유
└── budget-app/             # 🚀 실제 앱 개발 폴더 ✅ 완성!
    ├── src/
    │   ├── components/     # React 컴포넌트
    │   ├── stores/         # Zustand 스토어
    │   └── App.tsx         # 메인 앱
    ├── package.json
    └── ...
```

## 🚀 빠른 시작

### 🎉 Phase 1A 완료!

**Phase 1A가 이미 완성되었습니다!** 🎯  
현재 `budget-app/` 폴더에서 완전히 작동하는 가계부 앱이 실행 중입니다.

#### ✅ 완성된 기능들

- 다크모드 토글
- 지출 추가 기능 (금액, 카테고리, 설명, 날짜)
- 실시간 통계 (총 지출, 건수)
- 최근 지출 목록
- 완전한 반응형 UI

### 1️⃣ 현재 앱 실행하기

```bash
cd budget-app
npm run dev:web
# http://localhost:5173 에서 확인
```

### 2️⃣ 문서 읽기

**[📋 docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - 개발 가이드  
**[📈 docs/DEVELOPMENT_LOG.md](./docs/DEVELOPMENT_LOG.md)** - 진행 상황 로그

### 2️⃣ 바로 개발 시작 (도커 사용) 🐳

```bash
# 도커 환경 시작
docker-compose up -d

# 컨테이너 접속
docker-compose exec app bash

# 프로젝트 생성 (컨테이너 내부에서)
npm create electron-vite@latest budget-app -- --template react-ts
cd budget-app
npm install
npm install zustand better-sqlite3 @types/better-sqlite3 lucide-react date-fns
npm install -D tailwindcss postcss autoprefixer

# 개발 서버 시작
npm run dev
```

### 2️⃣-B 로컬 환경에서 시작 (도커 없이)

```bash
# 현재 폴더에서 앱 생성
npm create electron-vite@latest budget-app -- --template react-ts
cd budget-app

# 의존성 설치
npm install
npm install zustand better-sqlite3 @types/better-sqlite3 lucide-react date-fns
npm install -D tailwindcss postcss autoprefixer

# 개발 서버 시작
npm run dev
```

## 🎯 프로젝트 목표

- **실용적인 가계부 앱** - 실제로 사용하고 싶은 앱 만들기
- **바이브 코딩 실습** - 빠른 프로토타이핑과 점진적 개선
- **최신 기술 스택** - Electron + React + Zustand + SQLite

## 📚 주요 문서

| 문서                                                       | 설명                                  |
| ---------------------------------------------------------- | ------------------------------------- |
| [📋 GETTING_STARTED.md](./docs/GETTING_STARTED.md)         | **개발 시작 가이드** - Phase 1A 완료! |
| [📈 DEVELOPMENT_LOG.md](./docs/DEVELOPMENT_LOG.md)         | **개발 진행 로그** - 문제 해결 기록   |
| [🐳 DOCKER_SETUP.md](./docs/DOCKER_SETUP.md)               | **도커 환경 설정** - 환경 통일        |
| [📖 README.md](./docs/README.md)                           | 프로젝트 상세 개요                    |
| [⚡ VIBE_CODING_RULES.md](./docs/VIBE_CODING_RULES.md)     | 바이브 코딩 철학과 규칙               |
| [🐻 ZUSTAND_GUIDE.md](./docs/ZUSTAND_GUIDE.md)             | Zustand 상태 관리 가이드              |
| [✅ TODO.md](./docs/TODO.md)                               | 개발 진행 상황 체크리스트             |
| [🛠️ TECH_STACK_DECISION.md](./docs/TECH_STACK_DECISION.md) | 기술 스택 선택 이유                   |

## 🌟 바이브 코딩 철학

- **빠른 프로토타이핑** > 완벽한 설계
- **실용적 선택** > 이론적 완벽함
- **점진적 개선** > 한번에 완성
- **재미있게 코딩** > 스트레스 받으며 개발

---

**🎯 지금 바로 시작하려면 [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md)를 확인하세요!**
