const THEME_KEY = 'theme-preference';
const THEME_TOGGLE_ID = 'theme-toggle';
const DARK_THEME_CLASS = 'dark'; // Assuming you'll use a class on <html> or <body> like <html data-theme="dark">

const getThemePreference = () => {
  const storedPreference = localStorage.getItem(THEME_KEY);
  if (storedPreference) {
    return storedPreference;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
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
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if no manual preference is set or if you want to always follow system
    // For now, let's assume manual override sticks.
    // If you want it to re-evaluate if localStorage is not set:
    // if (!localStorage.getItem(THEME_KEY)) {
    //   setTheme(e.matches ? 'dark' : 'light');
    // }
  });
});
