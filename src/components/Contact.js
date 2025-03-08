import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Me</h2>
      <p className="contact-text">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of 
        your vision. Let's connect!
      </p>
      <div className="contact-links">
        <a href="mailto:sainihaldiddi@uvic.ca">Email Me</a>
        <a 
          href="https://www.linkedin.com/in/sai-nihal-diddi-2444471bb/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Contact;
