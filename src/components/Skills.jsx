import React, { useEffect } from 'react'
import { skillImages } from '../skills'

export default function Skills() {
    useEffect(() => {
        const skills = document.querySelectorAll('.skill-item');
        // handle event listeners for each skill item so that they can be moved around
        skills.forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                skill.style.transform = 'scale(1.2)';
            });

            skill.addEventListener('mouseleave', () => {
                skill.style.transform = 'scale(1)';
            });

            skill.addEventListener('mousemove', (e) => {
                const xPos = e.clientX - skill.getBoundingClientRect().left - skill.clientWidth / 2;
                const yPos = e.clientY - skill.getBoundingClientRect().top - skill.clientHeight / 2;
                skill.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.2)`;
            });
        });

        // Clean up event listeners when the component unmounts
        return () => {
            skills.forEach(skill => {
                skill.removeEventListener('mouseenter', () => {});
                skill.removeEventListener('mouseleave', () => {});
                skill.removeEventListener('mousemove', () => {});
            });
        };
    }, []);

    return (
        <div className="container mx-auto mt-36 min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-4xl text-center">Skills</h2>
            <div className="skills-container mt-20">
                {skillImages.map((imageUrl, index) => (
                    <div className="skill-item" key={index}>
                        <img src={imageUrl} alt={`Skill ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
