import React from 'react';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out using the form below
          or contact me directly at <a href="mailto:sam@schonenberg.dev" className="text-blue-600 hover:underline">sam@schonenberg.dev</a>.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-bold mb-4">Connect With Me</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <a 
                    href="mailto:sam@schonenberg.dev" 
                    className="text-blue-600 hover:underline"
                  >
                    sam@schonenberg.dev
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/in/sams98/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    linkedin.com/in/sams98
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">GitHub</h3>
                  <a 
                    href="https://github.com/samscho98" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    github.com/samscho98
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;