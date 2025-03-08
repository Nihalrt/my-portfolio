import React from 'react';

const Projects = () => {
  return (
    <div>
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {/* Example Project Card 1 */}
        <div className="project-card">
          <h3>Inventory Management</h3>
          <p>
            A full-stack inventory management dashboard using React, Next.js, Redux, 
            and AWS for deployment. 
          </p>
          <a
            href="https://github.com/Nihalrt/inventory-management"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>

        {/* Example Project Card 2 */}
        <div className="project-card">
          <h3>Beat Blend</h3>
          <p>
            A music application for uploading, managing mp3 files, and creating playlists, 
            using React, Next.js, and Supabase.
          </p>
          <a
            href="https://github.com/Nihalrt/BeatBlend"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>

        {/* Example Project Card 3 */}
        <div className="project-card">
          <h3>Command Pipe Execution (C)</h3>
          <p>
            A custom command-line shell supporting I/O redirection, environment variable management, 
            and background job execution.
          </p>
          <a
            href="https://github.com/Nihalrt/Command-Pipe-Executor/blob/main/piping.c"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>

        {/* Example Project Card 4 */}
        <div className="project-card">
          <h3>Docker Optimizer</h3>
          <p>
            A Python-based tool analyzing Dockerfiles, identifying inefficiencies, 
            and suggesting optimizations for faster builds.
          </p>
          <a
            href="https://github.com/Nihalrt/docker-optimizer"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
