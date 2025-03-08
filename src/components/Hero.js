import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>
          Hey, I'm <span>Sai Nihal</span>
        </h1>
        <p>
          A passionate <strong>Software Engineer</strong> & <strong>Web Developer </strong> with experience in building modern, scalable web applications. 
          
        </p>
        <a
          href="https://github.com/Nihalrt"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-button"
        >
          Check Out My GitHub
        </a>
      </div>

      {/* Wave at the bottom of Hero */}
      <div className="wave">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.69,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ stroke: 'none', fill: '#0f0f0f' }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
