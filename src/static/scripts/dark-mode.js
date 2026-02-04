function getCurrentDarkModeSetting() {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    return 'dark';
  }
  return 'light';
}

function setDarkMode(darkMode) {
  if (darkMode) {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
    document.querySelectorAll('input[type="checkbox"].theme-toggle').forEach(function(element) {
      element.checked = true;
    });
  } else {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.querySelectorAll('input[type="checkbox"].theme-toggle').forEach(function(element) {
      element.checked = false;
    });
  }
  // Update Cal.com embed theme if present
  if (typeof window.updateCalTheme === 'function') {
    window.updateCalTheme();
  }
}

function toggleDarkMode() {
  if (getCurrentDarkModeSetting() === 'dark') {
    setDarkMode(false);
  } else {
    setDarkMode(true);
  }
}

function onReady(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Check for dark mode preference on page load
if (getCurrentDarkModeSetting() === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

onReady(function() {
  if (getCurrentDarkModeSetting() === 'dark') {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
})
