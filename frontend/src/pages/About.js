import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              {/* Placeholder for profile image */}
              <div className="h-48 w-full md:w-48 bg-gray-200 flex items-center justify-center">
                <svg className="h-24 w-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">Sam Schonenberg</h2>
              <p className="text-gray-600 mb-4">Software Developer</p>
              <p className="text-gray-700 mb-4">
                Hi there! I'm a developer passionate about building AI tools, automation solutions, and creating clean, user-friendly designs. With experience in full-stack development, I enjoy tackling challenging problems and turning ideas into reality.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/samscho98" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/sams98/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">HTML5</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">CSS3</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React Router</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Python</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Flask</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">SQL</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">PostgreSQL</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">RESTful APIs</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">SQLAlchemy</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">AI & Tools</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Claude AI</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">ChatGPT</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Machine Learning</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Data Analysis</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Automation</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Developer Tools</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Git</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">GitHub</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">VS Code</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Docker</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">CI/CD</span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Render.com</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Background/Bio Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">My Background</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 mb-4">
              I started my journey in software development with a passion for solving real-world problems through technology. Over the years, I've worked on a variety of projects ranging from web applications to AI-powered tools that streamline workflows and improve productivity.
            </p>
            <p className="text-gray-700 mb-4">
              My experience includes building full-stack applications with React and Flask, developing automated solutions for data processing, and creating intuitive user interfaces that prioritize user experience.
            </p>
            <p className="text-gray-700">
              I'm particularly interested in the intersection of AI and web development, finding ways to leverage artificial intelligence to create more powerful and personalized web experiences.
            </p>
          </div>
        </section>
        
        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
          <p className="mb-6 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link 
            to="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors"
          >
            Let's Connect
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;