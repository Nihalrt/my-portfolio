import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>
        Built with <span style={{ color: 'red' }}></span> in React. 
        <a 
          href="https://github.com/Nihalrt" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ marginLeft: '0.5rem' }}
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
