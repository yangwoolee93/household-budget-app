import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export const CATEGORIES = [
  "식비",
  "교통비",
  "쇼핑",
  "의료비",
  "문화생활",
  "기타",
] as const;

export type Category = (typeof CATEGORIES)[number];

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id" | "createdAt">) => void;
  removeExpense: (id: string) => void;
  getTotalExpenses: () => number;
  getExpensesByCategory: (category: string) => Expense[];
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [],

      addExpense: (expenseData) => {
        const newExpense: Expense = {
          ...expenseData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          expenses: [newExpense, ...state.expenses],
        }));
      },

      removeExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },

      getTotalExpenses: () => {
        return get().expenses.reduce(
          (total, expense) => total + expense.amount,
          0
        );
      },

      getExpensesByCategory: (category) => {
        return get().expenses.filter(
          (expense) => expense.category === category
        );
      },
    }),
    { name: "expense-storage" }
  )
);
