import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    // HTML 요소에 dark 클래스 추가/제거
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      title={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};
