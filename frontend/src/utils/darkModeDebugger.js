// This file contains utilities to help debug dark mode styling issues
// You can include it in your project during development and remove for production

// Create a button to toggle element highlighting
function createDarkModeDebugger() {
  const debugButton = document.createElement('button');
  debugButton.textContent = 'Debug Dark Mode';
  debugButton.style.position = 'fixed';
  debugButton.style.bottom = '20px';
  debugButton.style.right = '20px';
  debugButton.style.zIndex = '9999';
  debugButton.style.padding = '8px 16px';
  debugButton.style.backgroundColor = '#ff3366';
  debugButton.style.color = 'white';
  debugButton.style.border = 'none';
  debugButton.style.borderRadius = '4px';
  debugButton.style.cursor = 'pointer';
  
  let isDebugging = false;
  
  debugButton.addEventListener('click', () => {
    isDebugging = !isDebugging;
    
    if (isDebugging) {
      debugButton.textContent = 'Stop Debugging';
      highlightElements();
    } else {
      debugButton.textContent = 'Debug Dark Mode';
      removeHighlights();
    }
  });
  
  document.body.appendChild(debugButton);
}

// Highlight elements that might need dark mode styling
function highlightElements() {
  // Find all elements with specific classes that might need dark mode styling
  const elementsToCheck = [
    ...document.querySelectorAll('.bg-white'),
    ...document.querySelectorAll('.text-gray-900'),
    ...document.querySelectorAll('.text-gray-800'),
    ...document.querySelectorAll('.text-gray-700'),
    ...document.querySelectorAll('.text-gray-600'),
    ...document.querySelectorAll('.bg-gray-50'),
    ...document.querySelectorAll('.bg-gray-100'),
    ...document.querySelectorAll('.bg-gray-200'),
    ...document.querySelectorAll('[class*="bg-blue-"]'),
    ...document.querySelectorAll('[class*="text-blue-"]'),
    ...document.querySelectorAll('[class*="bg-primary-"]'),
    ...document.querySelectorAll('[class*="text-primary-"]'),
    ...document.querySelectorAll('.border'),
    ...document.querySelectorAll('.shadow-md'),
    ...document.querySelectorAll('.shadow-lg'),
  ];
  
  // Add outline to each element
  elementsToCheck.forEach(element => {
    element.dataset.debugDarkMode = 'true';
    element.style.outline = '2px solid red';
    
    // Create a label showing the element's classes
    const label = document.createElement('div');
    label.textContent = element.className;
    label.style.position = 'absolute';
    label.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    label.style.color = 'white';
    label.style.padding = '2px 5px';
    label.style.fontSize = '10px';
    label.style.zIndex = '9999';
    label.style.pointerEvents = 'none';
    label.className = 'debug-label';
    
    // Position the label near the element
    const rect = element.getBoundingClientRect();
    label.style.top = `${rect.top + window.scrollY}px`;
    label.style.left = `${rect.left + window.scrollX}px`;
    
    document.body.appendChild(label);
  });
  
  console.log(`Highlighted ${elementsToCheck.length} elements that might need dark mode styling`);
}

// Remove all highlights
function removeHighlights() {
  // Remove outlines
  document.querySelectorAll('[data-debug-dark-mode]').forEach(element => {
    element.style.outline = '';
    delete element.dataset.debugDarkMode;
  });
  
  // Remove labels
  document.querySelectorAll('.debug-label').forEach(label => {
    label.remove();
  });
  
  console.log('Removed all debugging highlights');
}

// Initialize the debugger when the page loads
window.addEventListener('DOMContentLoaded', () => {
  // Only create the debugger in development mode
  if (process.env.NODE_ENV === 'development') {
    createDarkModeDebugger();
  }
});

export { createDarkModeDebugger, highlightElements, removeHighlights };