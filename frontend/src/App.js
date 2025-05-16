import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Theme Provider
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Test Component
import TestTailwind from './components/Tailwind/TestTailwind';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Clients from './pages/dashboard/Clients';
import ManageProjects from './pages/dashboard/ManageProjects';
import Invoices from './pages/dashboard/Invoices';

// CSS
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Add the test route - remove this later */}
              <Route path="/test-tailwind" element={<TestTailwind />} />
              
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              
              {/* Dashboard Routes - Will require auth in the future */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/clients" element={<Clients />} />
              <Route path="/dashboard/projects" element={<ManageProjects />} />
              <Route path="/dashboard/invoices" element={<Invoices />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;