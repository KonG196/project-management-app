// src/pages/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
  const projects = useSelector((state) => state.projects);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
