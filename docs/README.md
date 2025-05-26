# 💰 가계부 앱 (Household Budget App)

> 바이브 코딩으로 만드는 심플하고 실용적인 가계부 앱

## 🎯 프로젝트 개요

개인 가계부 관리를 위한 데스크톱 앱입니다. 복잡한 기능보다는 **실제로 사용하고 싶은** 앱을 만드는 것이 목표입니다.

### 🌟 바이브 코딩 철학

- **빠른 프로토타이핑** > 완벽한 설계
- **실용적 선택** > 이론적 완벽함
- **점진적 개선** > 한번에 완성
- **재미있게 코딩** > 스트레스 받으며 개발

## 🚀 빠른 시작

### 📖 문서 구조

```
docs/
├── README.md                 # 이 파일 (프로젝트 개요)
├── GETTING_STARTED.md        # 🎯 개발 시작 가이드 (여기서 시작!)
├── VIBE_CODING_RULES.md      # 바이브 코딩 원칙과 규칙
├── ZUSTAND_GUIDE.md          # Zustand 사용법과 예시
├── TODO.md                   # 개발 진행 상황 체크리스트
└── TECH_STACK_DECISION.md    # 기술 스택 선택 이유
```

### 🎯 지금 바로 시작하기

**[📋 GETTING_STARTED.md](./GETTING_STARTED.md)** 파일을 보고 30분 만에 첫 번째 기능을 완성해보세요!

## 🛠️ 기술 스택 (확정)

### 🖥️ 데스크톱 앱

- **Electron** - 크로스 플랫폼 데스크톱 앱
- **React** + **TypeScript** - UI 개발
- **Tailwind CSS** - 스타일링
- **Vite** - 빌드 도구

### 📊 상태 관리 & 데이터

- **Zustand** - 간단한 상태 관리 (Redux보다 10배 쉬움!)
- **SQLite** + **better-sqlite3** - 로컬 데이터베이스
- **Zustand persist** - 로컬 스토리지 자동 저장

### 🎨 UI/UX

- **Lucide React** - 아이콘
- **date-fns** - 날짜 처리
- **Shadcn/ui** (추후) - 고급 UI 컴포넌트

## 📋 개발 단계

### Phase 1A: 기본 기능 (30분) ✅

- [x] 프로젝트 설정
- [x] 다크모드 토글
- [x] 지출 기록 기능
- [x] 카테고리 분류

### Phase 1B: 목록 관리 (30분)

- [ ] 지출 목록 표시
- [ ] 지출 삭제 기능
- [ ] 간단한 필터링

### Phase 1C: 기본 통계 (30분)

- [ ] 월별 총 지출
- [ ] 카테고리별 지출
- [ ] 간단한 차트

### Phase 2A: 데이터베이스 (1시간)

- [ ] SQLite 연동
- [ ] 데이터 마이그레이션
- [ ] 백업/복원 기능

### Phase 2B: 고급 기능 (2시간)

- [ ] 수입 기록
- [ ] 예산 설정
- [ ] 월별/연별 리포트

### Phase 3: 확장 기능 (추후)

- [ ] 데이터 내보내기 (CSV, Excel)
- [ ] 다중 계정 지원
- [ ] 클라우드 동기화 (선택사항)

## 🎨 핵심 기능

### 💸 지출 관리

- 빠른 지출 기록 (금액, 카테고리, 메모)
- 카테고리별 분류 (식비, 교통비, 쇼핑 등)
- 지출 내역 검색 및 필터링

### 📊 통계 및 분석

- 월별/주별 지출 트렌드
- 카테고리별 지출 비율
- 예산 대비 지출 현황

### 🎯 사용자 경험

- 다크모드 지원
- 직관적인 UI/UX
- 빠른 데이터 입력

## 🔧 개발 환경

### 요구사항

- Node.js 18+
- npm 또는 yarn
- Git

### 로컬 개발

```bash
# 프로젝트 생성 및 시작
npm create electron-vite@latest budget-app -- --template react-ts
cd budget-app
npm install

# 가계부 앱용 패키지 설치
npm install zustand better-sqlite3 @types/better-sqlite3
npm install lucide-react date-fns

# Tailwind CSS 설치
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 개발 서버 시작
npm run dev
```

## 📚 참고 문서

- **[바이브 코딩 규칙](./VIBE_CODING_RULES.md)** - 개발 철학과 코딩 스타일
- **[Zustand 가이드](./ZUSTAND_GUIDE.md)** - 상태 관리 라이브러리 사용법
- **[기술 스택 결정](./TECH_STACK_DECISION.md)** - 왜 이 기술들을 선택했는지
- **[TODO 리스트](./TODO.md)** - 개발 진행 상황 추적

## 🤝 기여하기

바이브 코딩 정신에 맞게:

1. **일단 만들어보기** - 완벽하지 않아도 OK
2. **작은 단위로 커밋** - 자주 저장하기
3. **재미있게 개발** - 스트레스 받지 말기

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

**🎯 지금 바로 시작하려면 [GETTING_STARTED.md](./GETTING_STARTED.md)를 확인하세요!**
