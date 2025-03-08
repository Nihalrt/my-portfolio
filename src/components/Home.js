import React from 'react';

const Home = () => {
  return (
    <div className="home-container fade-in">
      <h1 className="home-title">Hi, my name is <span style={{ color: '#ffdf00' }}>Sai Nihal Diddi</span></h1>
      <h2 className="home-subtitle">I build things for the web</h2>
      <p style={{ marginBottom: '2rem' }}>
        I'm a software engineer specializing in building exceptional digital experiences. 
        Currently exploring cloud technologies like AWS & GCP, and building human-centered products.
      </p>
      <a 
        href="https://github.com/Nihalrt" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{
          backgroundColor: '#ff5f6d',
          color: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: '5px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Check out my GitHub
      </a>
    </div>
  );
};

export default Home;
