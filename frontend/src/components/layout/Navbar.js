import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  
  // Dark mode styles
  const styles = {
    nav: {
      backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
      boxShadow: isScrolled 
        ? theme === 'dark' 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : theme === 'dark'
          ? '0 1px 2px 0 rgba(0, 0, 0, 0.2)'
          : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    brand: {
      color: theme === 'dark' ? '#3391ff' : '#0066ff'
    },
    menuButton: {
      color: theme === 'dark' ? '#a3a3a3' : '#9ca3af'
    },
    mobileMenu: {
      backgroundColor: theme === 'dark' ? '#1e1e1e' : 'white',
    },
    logo: {
      height: '60px',
      marginRight: '10px'
    }
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // Handle scroll event to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  
  // NavLink class for desktop
  const getNavLinkClass = ({ isActive }) => {
    let baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    
    if (isActive) {
      return `${baseClasses} ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`;
    }
    
    return `${baseClasses} ${theme === 'dark' 
      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-800' 
      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
    }`;
  };
  
  // Mobile link classes
  const getMobileLinkClass = ({ isActive }) => {
    let baseClasses = "block px-3 py-2 rounded-md text-base font-medium transition-colors";
    
    if (isActive) {
      return `${baseClasses} ${theme === 'dark' 
        ? 'bg-gray-800 text-primary-400' 
        : 'bg-primary-50 text-primary-600'
      }`;
    }
    
    return `${baseClasses} ${theme === 'dark' 
      ? 'text-gray-300 hover:bg-gray-800 hover:text-primary-400' 
      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
    }`;
  };
  
  return (
    <nav className="sticky top-0 z-50 transition-shadow duration-300" style={styles.nav}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <img 
                src="/logo.png" 
                alt="Sam Schonenberg Logo" 
                style={styles.logo} 
                className="transition-opacity duration-300"
              />
              <span className="text-xl font-bold" style={styles.brand}>Sam Schonenberg</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={getNavLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
            <NavLink to="/projects" className={getNavLinkClass}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
            
            {/* Add Theme Toggle */}
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
              style={styles.menuButton}
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1" style={styles.mobileMenu}>
          <NavLink 
            to="/" 
            className={getMobileLinkClass}
            onClick={closeMenu}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={getMobileLinkClass}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink 
            to="/projects" 
            className={getMobileLinkClass}
            onClick={closeMenu}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/contact" 
            className={getMobileLinkClass}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;