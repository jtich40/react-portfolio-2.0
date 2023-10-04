import React from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../../projects'

export default function Projects() {
  return (
    <div className="min-h-screen" id="projects">
      <h1 className="text-center text-6xl mt-36 reveal">Projects</h1>
      {projects.map(project => (
        <ProjectCard 
        key={project.name}
        description={project.description}
        demo={project.demo}
        github={project.github}
        deployment={project.deployment}
        />
      ))}
    </div>
  )
}