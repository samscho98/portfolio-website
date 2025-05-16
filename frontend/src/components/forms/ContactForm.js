import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter your name'
      });
      return false;
    }
    
    if (!formData.email.trim()) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter your email'
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter a valid email address'
      });
      return false;
    }
    
    if (!formData.message.trim()) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter a message'
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      // In development, we'll simulate a successful submission
      // In production, this would call the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit the form. Please try again later.');
      }
      
      // Clear the form on success
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prevState => ({
          ...prevState,
          isSuccess: false
        }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // In development, simulate success even if the API isn't ready
      if (process.env.NODE_ENV === 'development') {
        // Clear the form on simulated success
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          errorMessage: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prevState => ({
            ...prevState,
            isSuccess: false
          }));
        }, 5000);
        
        return;
      }
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: error.message || 'Something went wrong. Please try again later.'
      });
    }
  };
  
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-8 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Get in Touch</h2>
      
      {formStatus.isSuccess && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded mb-6 flex items-start">
          <svg className="h-5 w-5 mr-2 mt-0.5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Thank you for your message! I'll get back to you as soon as possible.</span>
        </div>
      )}
      
      {formStatus.isError && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6 flex items-start">
          <svg className="h-5 w-5 mr-2 mt-0.5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{formStatus.errorMessage}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Name*
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email*
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            required
          />
        </div>
        
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Message*
          </label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            rows="5" 
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className={`w-full bg-primary-600 dark:bg-primary-700 hover:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors ${
            formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={formStatus.isSubmitting}
        >
          {formStatus.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;