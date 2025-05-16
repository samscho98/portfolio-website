import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const TestTailwind = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-4">
          Tailwind CSS Test
        </h1>
        
        <p className="text-gray-700 mb-6">
          If you can see this text in gray and the heading above in blue, 
          Tailwind CSS is working correctly!
        </p>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Red Tag</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Blue Tag</span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Green Tag</span>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Purple Tag</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded transition-colors">
              Primary Button
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors">
              Secondary Button
            </button>
          </div>
          
          <div className="mt-4">
            <button
              onClick={toggleTheme}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Toggle Theme: Current theme is {theme}
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This component is using various Tailwind CSS classes with dark mode support.
            If all styles are rendering correctly for both light and dark modes, Tailwind CSS is working!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;