import React from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../../projects'


export default function Projects() {
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl mt-36">Projects</h1>
      {projects.map(project => (
        <ProjectCard 
        key={project.name}
        // name={project.name}
        description={project.description}
        demo={project.demo}
        github={project.github}
        deployment={project.deployment}
        />
      ))}
    </div>
  )
}
