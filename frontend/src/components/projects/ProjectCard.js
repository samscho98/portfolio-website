import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ project }) => {
  const { id, title, slug, tags, description, github, private: isPrivate, featured } = project;
  const { theme } = useTheme();
  
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

  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow" style={cardStyle}>
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
      
      <p className="mb-4" style={descriptionStyle}>{description}</p>
      
      <div className="flex justify-between items-center">
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
  );
};

export default ProjectCard;