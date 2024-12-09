// src/pages/ProjectDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProjectDetails() {
  const { id } = useParams();
  const project = useSelector((state) =>
    state.projects.find((proj) => proj.id === id)
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      {/* Додайте інші деталі проєкту та завдання */}
    </div>
  );
}

export default ProjectDetails;
