import React, { useEffect, useRef, useState } from 'react'
import { skillImages } from '../skills'

export default function Skills() {
    const containerRef = useRef(null);
    const [skills, setSkills] = useState([]);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const animationRef = useRef(null);
    const [skillSize, setSkillSize] = useState(95);

    // Initialize skills with responsive positions
    const initializeSkills = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const { width, height } = container.getBoundingClientRect();
        setContainerDimensions({ width, height });

        // Calculate appropriate skill size
        const newSkillSize = calculateSkillSize(width, height);
        setSkillSize(newSkillSize);

        // Spacing factor to avoid clumping
        const numSkills = skillImages.length;
        const spacingFactor = Math.sqrt(width * height / numSkills) * 1.5;

        // Create a distribution that covers the entire container
        const initialSkills = skillImages.map((skill, index) => {
            // Use a deterministic but well-distributed pattern
            // This creates a more organic distribution than a strict grid
            const row = Math.floor(index / Math.sqrt(numSkills));
            const col = index % Math.ceil(Math.sqrt(numSkills));

            // Base position using golden ratio to avoid patterns
            const phi = (1 + Math.sqrt(5)) / 2;
            const theta = index * phi * Math.PI * 2;

            // Calculate distance from center (normalized from 0-1)
            const radius = Math.sqrt(index / numSkills);

            // Map to container dimensions with padding
            const padding = newSkillSize;
            const centerX = width / 2;
            const centerY = height / 2;

            // Mix radial and grid patterns for better distribution
            const x = centerX + Math.cos(theta) * radius * (width / 2 - padding) * 0.8 +
                (col - Math.sqrt(numSkills) / 2) * spacingFactor * 0.3;
            const y = centerY + Math.sin(theta) * radius * (height / 2 - padding) * 0.8 +
                (row - Math.sqrt(numSkills) / 2) * spacingFactor * 0.3;

            // Ensure position is within bounds
            const boundedX = Math.max(padding, Math.min(width - padding, x));
            const boundedY = Math.max(padding, Math.min(height - padding, y));

            return {
                id: index,
                x: boundedX,
                y: boundedY,
                vx: (Math.random() - 0.5) * 0.5, // Random velocity X
                vy: (Math.random() - 0.5) * 0.5, // Random velocity Y
                scale: 1,
                rotation: Math.random() * 20 - 10,
                skill: skill,
                // Store original relative position for responsiveness
                relativeX: (boundedX - padding) / (width - padding * 2),
                relativeY: (boundedY - padding) / (height - padding * 2)
            };
        });

        setSkills(initialSkills);
    };

    // Calculate appropriate skill size based on container dimensions and device
    const calculateSkillSize = (width, height) => {
        // Base size on container area and number of skills
        const area = width * height;
        const numSkills = skillImages.length;

        // Target approximately 1/20th of the container area per skill
        const targetSkillArea = Math.sqrt(area / (numSkills * 3));

        // Adjust for different screen sizes
        if (width < 640) { // Mobile
            return Math.max(45, Math.min(55, targetSkillArea * 0.8));
        } else if (width < 1024) { // Tablet
            return Math.max(60, Math.min(75, targetSkillArea * 0.9));
        } else { // Desktop
            return Math.max(75, Math.min(100, targetSkillArea * 1.0));
        }
    };

    // Initialize skills and handle window resize
    useEffect(() => {
        initializeSkills();

        // Add resize event listener with debounce
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (!containerRef.current) return;

                const container = containerRef.current;
                const { width, height } = container.getBoundingClientRect();

                // Calculate new skill size
                const newSkillSize = calculateSkillSize(width, height);
                setSkillSize(newSkillSize);

                setContainerDimensions({ width, height });

                // Reposition skills based on relative positions
                setSkills(prevSkills => {
                    return prevSkills.map(skill => {
                        // Use relative position to calculate new absolute position
                        const padding = newSkillSize;
                        const newX = padding + skill.relativeX * (width - padding * 2);
                        const newY = padding + skill.relativeY * (height - padding * 2);

                        return {
                            ...skill,
                            x: newX,
                            y: newY
                        };
                    });
                });
            }, 150); // Debounce timeout
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Handle pointer movement (consolidates mouse and touch events)
    useEffect(() => {
        const handlePointerMove = (e) => {
            if (!containerRef.current) return;

            // Prevent default to stop scrolling when interacting with the skills
            if (e.pointerType === 'touch') {
                e.preventDefault();
            }

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            setPointerPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('pointermove', handlePointerMove);

            // Enable pointer capture for smoother interactions
            container.addEventListener('pointerdown', (e) => {
                // Set pointer capture to track movement even outside the element
                container.setPointerCapture(e.pointerId);
            });
        }

        return () => {
            if (container) {
                container.removeEventListener('pointermove', handlePointerMove);
                container.removeEventListener('pointerdown', null);
            }
        };
    }, []);

    // Animation loop
    useEffect(() => {
        if (!containerRef.current || skills.length === 0) return;

        const { width, height } = containerDimensions;
        if (width === 0 || height === 0) return;

        const animate = () => {
            setSkills(prevSkills => {
                return prevSkills.map(skill => {
                    // Calculate distance from pointer
                    const dx = pointerPosition.x - skill.x;
                    const dy = pointerPosition.y - skill.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Water-like motion parameters
                    const maxForce = 3;
                    const forceRadius = 200;
                    let forceX = 0;
                    let forceY = 0;

                    // Apply force based on pointer position (like water current)
                    if (distance < forceRadius) {
                        const force = maxForce * (1 - distance / forceRadius);
                        forceX = (dx / distance) * force;
                        forceY = (dy / distance) * force;
                    }

                    // Natural drift - maintain original algorithm
                    let newVx = skill.vx * 0.98 + forceX * 0.02;
                    let newVy = skill.vy * 0.98 + forceY * 0.02;

                    // Add a slight wave motion
                    newVx += Math.sin(Date.now() * 0.001 + skill.id) * 0.03;
                    newVy += Math.cos(Date.now() * 0.001 + skill.id) * 0.03;

                    // Limit velocity
                    const maxVelocity = 2;
                    const velocityMagnitude = Math.sqrt(newVx * newVx + newVy * newVy);
                    if (velocityMagnitude > maxVelocity) {
                        newVx = (newVx / velocityMagnitude) * maxVelocity;
                        newVy = (newVy / velocityMagnitude) * maxVelocity;
                    }

                    // Update position
                    let newX = skill.x + newVx;
                    let newY = skill.y + newVy;

                    // Safe margin based on skill size
                    const margin = skillSize / 2;

                    // Bounce off walls with some damping
                    if (newX < margin || newX > width - margin) {
                        newVx *= -0.6;
                        newX = newX < margin ? margin : width - margin;
                    }

                    if (newY < margin || newY > height - margin) {
                        newVy *= -0.6;
                        newY = newY < margin ? margin : height - margin;
                    }

                    // Update relative position for responsiveness
                    const padding = skillSize / 2;
                    const newRelativeX = (newX - padding) / (width - padding * 2);
                    const newRelativeY = (newY - padding) / (height - padding * 2);

                    // Calculate scale based on pointer proximity (for hover effect)
                    let newScale = 1;
                    if (distance < 100) {
                        newScale = 1 + (1 - distance / 100) * 0.3;
                    }

                    // Update rotation based on velocity
                    const newRotation = skill.rotation + (newVx + newVy) * 0.2;

                    return {
                        ...skill,
                        x: newX,
                        y: newY,
                        vx: newVx,
                        vy: newVy,
                        scale: newScale,
                        rotation: newRotation,
                        relativeX: newRelativeX,
                        relativeY: newRelativeY
                    };
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [pointerPosition, skills.length, containerDimensions, skillSize]);

    return (
        <div
            className="container mx-auto py-12 sm:py-16 md:py-20 flex flex-col justify-center items-center"
            id="skills"
        >
            <h2 className="text-4xl sm:text-5xl text-center mb-8 sm:mb-12 md:mb-16 font-bold">Skills</h2>

            <div
                ref={containerRef}
                className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] rounded-lg overflow-hidden"
                style={{
                    background: 'transparent',
                    touchAction: 'none' // Prevents browser handling of all touch actions
                }}
            >
                {skills.map((item) => (
                    <div
                        key={item.id}
                        className="absolute flex flex-col items-center justify-center"
                        style={{
                            transform: `translate(${item.x - skillSize / 2}px, ${item.y - skillSize / 2}px) scale(${item.scale}) rotate(${item.rotation}deg)`,
                            transition: 'transform 0.1s ease-out',
                            width: `${skillSize}px`,
                            height: `${skillSize}px`,
                            willChange: 'transform'
                        }}
                    >
                        <div
                            className="bg-opacity-80 rounded-full p-2 shadow-lg w-full h-full flex items-center justify-center"
                            style={{
                                touchAction: 'none' // Prevents browser handling of touch gestures
                            }}
                        >
                            <img
                                src={item.skill.icon || item.skill}
                                alt={item.skill.name || `Skill ${item.id}`}
                                className="w-4/5 h-4/5 object-contain"
                                draggable="false" // Prevents image drag on mobile
                            />
                        </div>
                    </div>
                ))}

                <style>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(20px) rotate(5deg); }
                  }
                `}</style>
            </div>
        </div>
    );
}