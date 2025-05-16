import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Try to fetch from the API endpoint first
        const response = await fetch(`/api/projects/${slug}`);
        
        if (response.ok) {
          const data = await response.json();
          setProject(data);
          return;
        }
        
        // If API fails, try to fetch from local JSON fallback
        console.log('API fetch failed, trying local JSON...');
        const localResponse = await fetch('/src/data/projects.json');
        
        if (localResponse.ok) {
          const data = await localResponse.json();
          const foundProject = data.find(p => p.slug === slug);
          
          if (!foundProject) {
            throw new Error('Project not found');
          }
          
          setProject(foundProject);
          return;
        }
        
        throw new Error('Failed to fetch project data from both API and local JSON');
      } catch (err) {
        console.error('Error fetching project:', err);
        
        // Check if the error is "Project not found"
        if (err.message === 'Project not found') {
          setError('Project not found');
        } else {
          setError('Failed to load project. Please try again later.');
        }
        
        // Fallback to dummy data for the specific slug
        const dummyProjects = [
          {
            id: 1,
            title: "AI File Organizer",
            slug: "ai-file-organizer",
            tags: ["Python", "Flask"],
            description: "Organizes codebases for Claude AI analysis.",
            github: "https://github.com/samscho98/ai-organizer",
            private: false,
            featured: true,
            content: "# AI File Organizer\n\nThis project helps developers organize their codebases for AI analysis. It automatically scans through your project directories, identifies key components, and generates a structured representation that makes it easier for AI assistants to understand your codebase.\n\n## Features\n\n- Automatic file organization\n- Code structure analysis\n- Intelligent categorization\n- Integration with Claude AI\n\n## Technical Details\n\nBuilt with Python and Flask, the application uses advanced text processing algorithms to parse and organize code files."
          },
          {
            id: 2,
            title: "E-Commerce Dashboard",
            slug: "ecommerce-dashboard",
            tags: ["React", "Node.js", "MongoDB"],
            description: "Analytics dashboard for online retail stores.",
            github: "https://github.com/samscho98/ecommerce-dashboard",
            private: false,
            featured: true,
            content: "# E-Commerce Dashboard\n\nA comprehensive analytics solution for online retail businesses. This dashboard provides real-time insights into sales, customer behavior, and inventory management.\n\n## Features\n\n- Real-time sales tracking\n- Customer behavior analysis\n- Inventory management\n- Customizable reports\n\n## Technical Details\n\nBuilt with a React frontend, Node.js backend, and MongoDB for data storage. Uses Chart.js for data visualization."
          },
          {
            id: 3,
            title: "Portfolio Website",
            slug: "portfolio-website",
            tags: ["React", "Flask", "Tailwind CSS"],
            description: "My personal portfolio website with dark mode support.",
            github: "https://github.com/samscho98/portfolio-website",
            private: false,
            featured: true,
            content: "# Portfolio Website\n\nThis project is my personal portfolio website, designed to showcase my work and skills as a developer. It features a clean, responsive design with dark mode support.\n\n## Features\n\n- Responsive Design\n- Dark Mode Support\n- Project Showcase\n- Contact Form\n\n## Technical Details\n\nThe portfolio uses React for the frontend and Flask for the backend API. The site is deployed on Render.com."
          },
          {
            id: 4,
            title: "Task Management API",
            slug: "task-management-api",
            tags: ["Python", "Flask", "PostgreSQL"],
            description: "RESTful API for task management applications.",
            github: "https://github.com/samscho98/task-api",
            private: false,
            featured: false,
            content: "# Task Management API\n\nA robust RESTful API built for task management applications, providing endpoints for task creation, organization, assignment, and team collaboration.\n\n## Features\n\n- User Authentication\n- Task Management\n- Task Organization\n- Team Collaboration\n\n## Technical Details\n\nBuilt with Python Flask and PostgreSQL, this API follows RESTful principles and incorporates modern authentication practices."
          },
          {
            id: 5,
            title: "Client CRM System",
            slug: "client-crm",
            tags: ["React", "PostgreSQL", "Express"],
            description: "Custom CRM solution for a marketing agency.",
            private: true,
            featured: false,
            content: "# Client CRM System\n\nA private project developed for a marketing agency to manage their client relationships, campaigns, and analytics in one place.\n\n*This is a private client project — detailed write-up available upon request.*\n\n## My Contribution\n\nI designed and implemented the full-stack solution, including:\n\n- Client database architecture\n- Campaign management tools\n- Reporting and analytics dashboard\n- Integration with existing marketing tools\n\n## Technologies Used\n\nReact, PostgreSQL, Express, and various marketing APIs for integration purposes."
          }
        ];
        
        const foundProject = dummyProjects.find(p => p.slug === slug);
        if (foundProject) {
          setProject(foundProject);
          // Clear error if we found a fallback project
          setError(null);
        } else {
          setError('Project not found');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [slug]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          {error}
        </div>
        <Link 
          to="/projects" 
          className="mt-4 inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Projects
        </Link>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded">
          Project not found
        </div>
        <Link 
          to="/projects" 
          className="mt-4 inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Projects
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/projects" 
        className="mb-4 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        &larr; Back to Projects
      </Link>
      
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h1>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags && project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{project.description}</p>
        
        {!project.private && project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mb-6 inline-block bg-gray-800 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-800 text-white px-4 py-2 rounded"
          >
            View on GitHub
          </a>
        )}
        
        <div className="prose dark:prose-invert max-w-none mt-6">
          {project.content ? (
            <ReactMarkdown>{project.content}</ReactMarkdown>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No detailed content available for this project.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;