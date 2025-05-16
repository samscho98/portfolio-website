import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ project }) => {
  const { id, title, slug, tags, description, github, private: isPrivate, featured, image_url } = project;
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);
  
  // Use inline styling to ensure dark mode works consistently
  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#262626' : 'white',
    color: theme === 'dark' ? '#e6e6e6' : 'inherit',
    borderColor: theme === 'dark' ? '#444444' : '#e5e7eb',
  };
  
  const titleStyle = {
    color: theme === 'dark' ? '#e6e6e6' : '#111827',
  };
  
  const descriptionStyle = {
    color: theme === 'dark' ? '#a3a3a3' : '#4b5563',
  };
  
  const tagStyle = {
    backgroundColor: theme === 'dark' ? 'rgba(51, 145, 255, 0.2)' : '#dbeafe',
    color: theme === 'dark' ? '#93c5fd' : '#1e40af',
  };
  
  const linkStyle = {
    color: theme === 'dark' ? '#3391ff' : '#2563eb',
  };
  
  const buttonStyle = {
    backgroundColor: theme === 'dark' ? '#3391ff' : '#2563eb',
    color: 'white',
  };

  const placeholderColor = {
    color: theme === 'dark' ? '#888888' : '#cccccc',
  };

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col" style={cardStyle}>
      {/* Image section with error handling */}
      <div className="h-48 w-full overflow-hidden">
        {image_url && !imageError ? (
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            onError={handleImageError}
          />
        ) : (
          <div 
            className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          >
            {/* Placeholder SVG or icon */}
            <svg 
              className="h-16 w-16" 
              style={placeholderColor} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2" style={titleStyle}>{title}</h3>
        
        <div className="mb-3 flex flex-wrap gap-2">
          {tags && tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded"
              style={tagStyle}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="mb-4 flex-grow" style={descriptionStyle}>{description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="space-x-2">
            {isPrivate ? (
              <span className="text-sm italic" style={{color: theme === 'dark' ? '#a3a3a3' : '#6b7280'}}>
                Private client project — write-up available upon request.
              </span>
            ) : (
              github && (
                <a 
                  href={github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors"
                  style={linkStyle}
                >
                  GitHub Repository
                </a>
              )
            )}
          </div>
          
          <Link 
            to={`/project/${slug}`} 
            className="px-4 py-2 rounded transition-colors"
            style={buttonStyle}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;