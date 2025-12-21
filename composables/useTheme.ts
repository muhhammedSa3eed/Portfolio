export const useTheme = () => {
  const theme = useState("theme", () => "dark");

  if (process.client) {
    const saved = localStorage.getItem("theme");
    if (saved) {
      theme.value = saved;
    }
  }

  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    if (process.client) {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
    }
  };

  return {
    theme: readonly(theme),
    setTheme,
  };
};
