import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* Logo or Name */}
        Sai Nihal
      </div>
      <div className="navbar-right">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  );
};

export default Navbar;
