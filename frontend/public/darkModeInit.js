/**
 * Dark mode initialization script that should be included in the HTML head
 * to prevent any flash of unstyled content (FOUC) before React loads
 */

(function initDarkMode() {
  // Check for saved theme preference, defaulting to dark mode
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme !== 'light';
  
  // Apply dark mode class immediately
  if (isDark) {
    document.documentElement.classList.add('dark');
    
    // Add some base styles for dark mode directly to prevent FOUC
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #121212;
        color: #e6e6e6;
      }
      .bg-white {
        background-color: #262626 !important;
      }
      .text-gray-900 {
        color: #e6e6e6 !important;
      }
      .text-gray-700 {
        color: #a3a3a3 !important;
      }
      .text-primary-600 {
        color: #3391ff !important;
      }
      .bg-primary-500, .bg-blue-600 {
        background-color: #3391ff !important;
      }
      .border, .border-gray-200 {
        border-color: #444444 !important;
      }
    `;
    document.head.appendChild(style);
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Store the theme preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
})();