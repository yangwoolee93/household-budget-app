# 🐻 Zustand 완전 가이드

> "작고, 빠르고, 확장 가능한 베어본 상태 관리 솔루션"

## 🌟 Zustand란?

Zustand는 **독일어로 "상태"**를 의미하는 단어로, React를 위한 **초경량 상태 관리 라이브러리**입니다.

### 🎯 왜 Zustand인가?

#### Redux와 비교

```typescript
// Redux - 복잡한 설정
// 1. Store 생성
// 2. Provider로 앱 감싸기
// 3. Reducer, Action 정의
// 4. useSelector, useDispatch 사용

// Zustand - 간단한 설정
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

#### 🏆 Zustand의 장점

- **🪶 초경량**: 번들 크기 2.9kb (gzipped)
- **🚀 빠른 설정**: Provider 불필요
- **🎨 직관적 API**: 훅 기반 사용법
- **🔧 TypeScript 친화적**: 완벽한 타입 지원
- **🎪 재미있음**: 곰 마스코트와 함께! 🐻

## 📦 설치 및 기본 사용법

### 설치

```bash
npm install zustand
# 또는
yarn add zustand
```

### 기본 스토어 생성

```typescript
import { create } from "zustand";

// 간단한 카운터 스토어
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

### 컴포넌트에서 사용

```typescript
const Counter = () => {
  // 특정 상태만 선택
  const count = useCounterStore((state) => state.count);
  const { increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

## 💰 가계부 앱용 Zustand 스토어 설계

### 지출 관리 스토어

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
}

interface ExpenseStore {
  expenses: Expense[];
  categories: string[];

  // 지출 관리
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  // 카테고리 관리
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;

  // 통계
  getTotalByType: (type: "income" | "expense") => number;
  getExpensesByCategory: () => Record<string, number>;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],
      categories: ["식비", "교통비", "쇼핑", "의료비", "기타"],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            { ...expense, id: Date.now().toString() },
          ],
        })),

      updateExpense: (id, updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          ),
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        })),

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),

      removeCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),

      getTotalByType: (type) => {
        const { expenses } = get();
        return expenses
          .filter((expense) => expense.type === type)
          .reduce((total, expense) => total + expense.amount, 0);
      },

      getExpensesByCategory: () => {
        const { expenses } = get();
        return expenses.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {} as Record<string, number>);
      },
    }),
    {
      name: "expense-storage", // localStorage 키
      partialize: (state) => ({
        expenses: state.expenses,
        categories: state.categories,
      }), // 저장할 데이터만 선택
    }
  )
);
```

### 테마 관리 스토어 (다크모드)

```typescript
interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,

      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),

      setTheme: (isDark) => set({ isDarkMode: isDark }),
    }),
    {
      name: "theme-storage",
    }
  )
);
```

## 🎨 실제 컴포넌트 사용 예시

### 지출 추가 폼

```typescript
const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { addExpense, categories } = useExpenseStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addExpense({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
      type: "expense",
    });

    // 폼 초기화
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="금액"
        className="w-full p-2 border rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
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
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        지출 추가
      </button>
    </form>
  );
};
```

### 지출 목록

```typescript
const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenseStore();

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex justify-between items-center p-3 border rounded"
        >
          <div>
            <span className="font-semibold">{expense.description}</span>
            <span className="text-sm text-gray-500 ml-2">
              {expense.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">
              {expense.amount.toLocaleString()}원
            </span>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
```

### 다크모드 토글

```typescript
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode
          ? "bg-yellow-400 text-gray-900"
          : "bg-gray-800 text-yellow-400"
      }`}
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
};
```

## 🚀 고급 기능

### 미들웨어 사용

```typescript
import { devtools } from "zustand/middleware";

// 개발자 도구 연동
const useStore = create(
  devtools(
    (set) => ({
      // 스토어 정의
    }),
    { name: "expense-store" } // DevTools에서 보일 이름
  )
);
```

### 비동기 액션

```typescript
const useExpenseStore = create((set, get) => ({
  isLoading: false,

  // 서버에서 데이터 가져오기
  fetchExpenses: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/expenses");
      const expenses = await response.json();
      set({ expenses, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error("Failed to fetch expenses:", error);
    }
  },
}));
```

### 선택적 구독 (성능 최적화)

```typescript
import { shallow } from "zustand/shallow";

// 여러 값을 선택할 때 불필요한 리렌더링 방지
const { expenses, categories } = useExpenseStore(
  (state) => ({
    expenses: state.expenses,
    categories: state.categories,
  }),
  shallow
);
```

## 🎵 바이브 코딩과 Zustand

### 왜 바이브 코딩에 완벽한가?

1. **🚀 빠른 시작**: Provider 설정 불필요
2. **🎨 직관적**: 훅 기반으로 자연스러운 사용법
3. **🔧 간단한 설정**: 보일러플레이트 최소화
4. **🎪 재미있음**: 곰 마스코트와 함께 즐거운 개발!

### 바이브 코딩 팁

```typescript
// ✅ 바이브 스타일 - 간단하고 직관적
const useExpenseStore = create((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),
}));

// ❌ 과도한 추상화 피하기
const useComplexStore = create((set) => ({
  // 복잡한 중첩 구조와 과도한 추상화...
}));
```

## 📚 더 알아보기

- [공식 문서](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [GitHub 저장소](https://github.com/pmndrs/zustand)
- [예제 모음](https://github.com/pmndrs/zustand/tree/main/examples)

---

**Remember**: Zustand는 "작은 곰"처럼 작지만 강력합니다! 🐻✨
