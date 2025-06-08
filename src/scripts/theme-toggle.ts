const THEME_KEY = 'theme-preference';
const THEME_TOGGLE_ID = 'theme-toggle';
const DARK_THEME_CLASS = 'dark'; // Clase utilizada en <html data-theme="dark">

type Theme = 'light' | 'dark';

const getThemePreference = (): Theme => {
  const storedPreference = localStorage.getItem(THEME_KEY) as Theme | null;
  if (storedPreference) {
    return storedPreference;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme); // Apply to <html>
  // Or if you prefer a class:
  // document.documentElement.classList.toggle(DARK_THEME_CLASS, theme === 'dark');

  const toggleButton = document.getElementById(THEME_TOGGLE_ID);
  if (toggleButton) {
    toggleButton.setAttribute('aria-pressed', theme === 'dark');
    // Optional: Change icon based on theme
    const icon = toggleButton.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
};

const toggleTheme = () => {
  const currentTheme = getThemePreference();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const initialTheme = getThemePreference();
  setTheme(initialTheme);

  const toggleButton = document.getElementById(THEME_TOGGLE_ID);
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleTheme);
  }

  // Listen for system theme changes (optional, but good for consistency)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }
  });
});
