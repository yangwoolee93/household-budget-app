# 🚀 가계부 앱 개발 시작하기

> 바이브 코딩으로 30분 만에 첫 번째 기능 만들기!

## 🎯 지금 바로 시작하는 방법

> 🐳 **도커 사용을 추천합니다!** 환경 설정 없이 바로 시작할 수 있어요.  
> 자세한 내용은 **[DOCKER_SETUP.md](./DOCKER_SETUP.md)**를 확인하세요!

### Option 1: 도커 환경에서 시작 (추천) 🐳

```bash
# 1. 도커 환경 시작
docker-compose up -d

# 2. 컨테이너 접속
docker-compose exec app bash

# 3. 프로젝트 생성 (컨테이너 내부에서)
npm create electron-vite@latest budget-app -- --template react-ts
cd budget-app

# 4. 의존성 설치
npm install
npm install zustand better-sqlite3 @types/better-sqlite3
npm install lucide-react date-fns

# 5. Tailwind CSS 설치
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 6. 개발 서버 시작
npm run dev
```

### Option 2: 완전 새로 시작 (로컬 환경) ⭐

```bash
# 1. 새 폴더에서 프로젝트 생성
cd ..
mkdir my-budget-app
cd my-budget-app

# 2. Electron + React + TypeScript 프로젝트 생성
npm create electron-vite@latest . -- --template react-ts

# 3. 의존성 설치
npm install

# 4. 가계부 앱용 추가 패키지 설치
npm install zustand better-sqlite3 @types/better-sqlite3
npm install lucide-react date-fns

# 5. Tailwind CSS 설치
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 6. 개발 서버 시작
npm run dev
```

### Option 3: 현재 폴더에서 계속 (문서 보존) 📁

```bash
# 현재 위치: household-budget-app/ (docs/ 폴더가 있는 곳)

# 1. 프로젝트 생성 (현재 폴더에 budget-app 서브폴더 생성)
npm create electron-vite@latest budget-app -- --template react-ts
cd budget-app

# 2. 의존성 설치
npm install
npm install zustand better-sqlite3 @types/better-sqlite3
npm install lucide-react date-fns

# 3. Tailwind CSS 설치
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. 개발 서버 시작
npm run dev
```

**📁 현재 폴더 구조 (Option 3 선택 시):**

```
household-budget-app/
├── docs/                    # 📚 모든 문서들 (정리됨!)
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── VIBE_CODING_RULES.md
│   ├── ZUSTAND_GUIDE.md
│   ├── TODO.md
│   └── TECH_STACK_DECISION.md
└── budget-app/              # 🚀 실제 앱 개발 폴더
    ├── src/
    ├── package.json
    └── ...
```

## 🛠️ 초기 설정 (5분)

### 1. Tailwind CSS 설정

```typescript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 다크모드 지원
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 2. CSS 파일 업데이트

```css
/* src/style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 기본 스타일 */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
}
```

### 3. 기본 폴더 구조 생성

```
src/
├── components/          # React 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   ├── forms/          # 폼 컴포넌트
│   └── layout/         # 레이아웃 컴포넌트
├── stores/             # Zustand 스토어
├── lib/                # 유틸리티 함수
├── types/              # TypeScript 타입
└── database/           # 데이터베이스 관련
```

## 🎯 첫 번째 목표: Phase 1A 완성 (30분)

### 1단계: 테마 스토어 만들기 (5분)

```typescript
// src/stores/themeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    { name: "theme-storage" }
  )
);
```

### 2단계: 기본 레이아웃 만들기 (10분)

```typescript
// src/components/layout/Layout.tsx
import { useThemeStore } from "../../stores/themeStore";
import { Moon, Sun } from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* 헤더 */}
        <header className="bg-blue-600 dark:bg-blue-800 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">💰 내 가계부</h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </div>
  );
};
```

### 3단계: 지출 스토어 만들기 (10분)

```typescript
// src/stores/expenseStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ExpenseStore {
  expenses: Expense[];
  categories: string[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenses: [],
      categories: ["식비", "교통비", "쇼핑", "의료비", "기타"],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            { ...expense, id: Date.now().toString() },
            ...state.expenses,
          ],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
    }),
    { name: "expense-storage" }
  )
);
```

### 4단계: 지출 추가 폼 만들기 (5분)

```typescript
// src/components/forms/ExpenseForm.tsx
import { useState } from "react";
import { useExpenseStore } from "../../stores/expenseStore";
import { Plus } from "lucide-react";

export const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { addExpense, categories } = useExpenseStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    addExpense({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    });

    // 폼 초기화
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4"
    >
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Plus size={20} />
        지출 추가
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액"
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option value="">카테고리 선택</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg font-medium"
      >
        추가하기
      </button>
    </form>
  );
};
```

## 🎉 첫 번째 성공 확인!

### App.tsx 업데이트

```typescript
// src/App.tsx
import { Layout } from "./components/layout/Layout";
import { ExpenseForm } from "./components/forms/ExpenseForm";

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <ExpenseForm />

        {/* 임시 성공 메시지 */}
        <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
            🎉 축하합니다!
          </h2>
          <p className="mt-2 text-green-700 dark:text-green-300">
            Phase 1A 기본 구조가 완성되었습니다!
            <br />
            다크모드 토글과 지출 추가 기능이 동작합니다.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default App;
```

## 🚀 다음 단계 선택

### 즉시 계속하고 싶다면:

1. **지출 목록 표시** - Phase 1B로 진행
2. **SQLite 연동** - 실제 데이터베이스 사용
3. **더 예쁜 UI** - Shadcn/ui 컴포넌트 추가

### 잠시 쉬고 싶다면:

- 현재까지 만든 것을 테스트해보기
- 다크모드 토글 확인
- 지출 추가 기능 테스트

## 💡 바이브 코딩 팁

### ✅ 지금까지 잘한 것들:

- 30분 만에 동작하는 앱 완성!
- 다크모드 + 지출 추가 기능 구현
- Zustand로 간단한 상태 관리

### 🎯 다음 목표:

- 지출 목록 표시하기
- 삭제 기능 추가하기
- 더 예쁜 디자인 적용하기

---

**어떤 방향으로 진행하고 싶으신가요?** 🤔

1. 바로 Phase 1B 계속하기
2. 현재 코드 정리하고 개선하기
3. SQLite 데이터베이스 연동하기
4. UI 디자인 개선하기
