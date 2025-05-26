import { ThemeToggle } from "./components/ThemeToggle";
import { ExpenseForm } from "./components/ExpenseForm";
import { useExpenseStore } from "./stores/expenseStore";

function App() {
  const { expenses, getTotalExpenses } = useExpenseStore();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* 헤더 */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              💰 내 가계부
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 지출 추가 폼 */}
          <div>
            <ExpenseForm />
          </div>

          {/* 요약 정보 */}
          <div className="space-y-6">
            {/* 총 지출 카드 */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">📊 이번 달 총 지출</h2>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {getTotalExpenses().toLocaleString()}원
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                총 {expenses.length}건의 지출
              </p>
            </div>

            {/* 최근 지출 목록 */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">📝 최근 지출</h2>
              {expenses.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  아직 지출 내역이 없습니다.
                  <br />첫 번째 지출을 추가해보세요! 🎯
                </p>
              ) : (
                <div className="space-y-3">
                  {expenses.slice(0, 5).map((expense) => (
                    <div
                      key={expense.id}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{expense.description}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {expense.category} • {expense.date}
                        </div>
                      </div>
                      <div className="font-bold text-red-600 dark:text-red-400">
                        -{expense.amount.toLocaleString()}원
                      </div>
                    </div>
                  ))}
                  {expenses.length > 5 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                      +{expenses.length - 5}개 더 있음
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
