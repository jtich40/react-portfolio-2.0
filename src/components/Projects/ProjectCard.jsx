import React from 'react';

export default function ProjectCard({
    name,
    description,
    demo,
    github,
    deployment,
}) {
    return (
        <div className="flex flex-col items-center reveal">
            <div className="mt-20 relative">
                <div className="card w-100 h-100 image-full relative group mx-4">
                    <figure>
                        <img
                            src={demo}
                            alt={name}
                            className="z-10 transition-opacity duration-300 object-cover group-hover:opacity-50"
                        />
                    </figure>
                    <div className="card-body text-center absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 z-20 group-hover:opacity-100">
                        <p className="text-stone-200 pt-28">{description}</p>
                    </div>
                </div>
                <div className="flex justify-center mt-5 space-x-5">
                    <a
                        href={deployment}
                        target="_blank"
                        rel="noreferrer"
                        className="btn bg-code-green text-black hover:text-white"
                    >
                        View App
                    </a>
                    <a
                        href={github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn bg-code-green text-black hover:text-white"
                    >
                        View GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
