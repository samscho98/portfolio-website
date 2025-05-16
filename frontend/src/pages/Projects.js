import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/projects/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Try to fetch from the API endpoint first
        const response = await fetch('/api/projects');
        
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
          return;
        }
        
        // If API fails, try to fetch from local JSON fallback
        console.log('API fetch failed, trying local JSON...');
        const localResponse = await fetch('/src/data/projects.json');
        
        if (localResponse.ok) {
          const data = await localResponse.json();
          setProjects(data);
          return;
        }
        
        throw new Error('Failed to fetch projects data from both API and local JSON');
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        
        // Fallback to dummy data in case of error
        setProjects([
          {
            id: 1,
            title: "AI File Organizer",
            slug: "ai-file-organizer",
            tags: ["Python", "Flask"],
            description: "Organizes codebases for Claude AI analysis.",
            github: "https://github.com/samscho98/ai-organizer",
            private: false,
            featured: true
          },
          {
            id: 2,
            title: "E-Commerce Dashboard",
            slug: "ecommerce-dashboard",
            tags: ["React", "Node.js", "MongoDB"],
            description: "Analytics dashboard for online retail stores.",
            github: "https://github.com/samscho98/ecommerce-dashboard",
            private: false,
            featured: true
          },
          {
            id: 3,
            title: "Portfolio Website",
            slug: "portfolio-website",
            tags: ["React", "Flask", "Tailwind CSS"],
            description: "My personal portfolio website with dark mode support.",
            github: "https://github.com/samscho98/portfolio-website",
            private: false,
            featured: true
          },
          {
            id: 4,
            title: "Task Management API",
            slug: "task-management-api",
            tags: ["Python", "Flask", "PostgreSQL"],
            description: "RESTful API for task management applications.",
            github: "https://github.com/samscho98/task-api",
            private: false,
            featured: false
          },
          {
            id: 5,
            title: "Client CRM System",
            slug: "client-crm",
            tags: ["React", "PostgreSQL", "Express"],
            description: "Custom CRM solution for a marketing agency.",
            private: true,
            featured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'public' 
      ? projects.filter(project => !project.private)
      : projects.filter(project => project.private);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">My Projects</h1>
      
      {/* Filter Controls */}
      <div className="mb-8">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded transition-colors ${
              activeFilter === 'all' 
                ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setActiveFilter('public')}
            className={`px-4 py-2 rounded transition-colors ${
              activeFilter === 'public' 
                ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Public Projects
          </button>
          <button 
            onClick={() => setActiveFilter('private')}
            className={`px-4 py-2 rounded transition-colors ${
              activeFilter === 'private' 
                ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Private Projects
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded">
          No projects found for the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;