import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/projects/ProjectCard';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  
  // Dark mode styles
  const styles = {
    container: {
      backgroundColor: theme === 'dark' ? '#121212' : '#f9fafb',
      color: theme === 'dark' ? '#e6e6e6' : 'inherit',
    },
    heading: {
      color: theme === 'dark' ? '#ffffff' : '#111827',
    },
    subheading: {
      color: theme === 'dark' ? '#a3a3a3' : '#4b5563',
    },
    link: {
      color: theme === 'dark' ? '#3391ff' : '#2563eb',
    },
    ctaSection: {
      backgroundColor: theme === 'dark' ? 'rgba(51, 145, 255, 0.1)' : '#eff6ff',
    },
    button: {
      backgroundColor: theme === 'dark' ? '#3391ff' : '#2563eb',
      color: 'white',
    },
    spinner: {
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.2)',
      borderTopColor: theme === 'dark' ? '#3391ff' : '#2563eb',
    }
  };
  
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        // Try to fetch from the API endpoint first
        const response = await fetch('/api/projects/featured');
        
        if (response.ok) {
          const data = await response.json();
          setFeaturedProjects(data);
          return;
        }
        
        // If API fails, try to fetch from local JSON fallback
        console.log('API fetch failed, trying local JSON...');
        const localResponse = await fetch('/src/data/projects.json');
        
        if (localResponse.ok) {
          const data = await localResponse.json();
          // Filter for featured projects
          const featured = data.filter(project => project.featured);
          setFeaturedProjects(featured.slice(0, 3)); // Limit to 3 featured projects
          return;
        }
        
        throw new Error('Failed to fetch projects data from both API and local JSON');
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        
        // Fallback to dummy data if both API and local JSON fail
        setFeaturedProjects([
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
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProjects();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12" style={styles.container}>
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={styles.heading}>
          Hi, I'm Sam Schonenberg
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={styles.subheading}>
          A developer focused on AI tools, automation, and clean design.
        </p>
      </section>
      
      {/* Featured Projects Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={styles.heading}>Featured Projects</h2>
          <Link 
            to="/projects" 
            className="hover:underline"
            style={styles.link}
          >
            View all projects &rarr;
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={styles.spinner}></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
      
      {/* CTA Section */}
      <section className="rounded-lg p-8 text-center" style={styles.ctaSection}>
        <h2 className="text-2xl font-bold mb-4" style={styles.heading}>Let's Work Together</h2>
        <p className="mb-6 max-w-xl mx-auto" style={styles.subheading}>
          I'm currently available for freelance work. If you have a project 
          that needs attention or just want to chat about possibilities, 
          feel free to get in touch.
        </p>
        <Link 
          to="/contact" 
          className="px-6 py-3 rounded-lg inline-block transition-colors"
          style={styles.button}
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default Home;