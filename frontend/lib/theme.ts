export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "site-theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
