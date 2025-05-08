import React, { useEffect, useRef, useState } from 'react'
import { skillImages } from '../skills'

export default function Skills() {
    const containerRef = useRef(null);
    const [skills, setSkills] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const animationRef = useRef(null);
    const [skillSize, setSkillSize] = useState(60);
    const [isDragging, setIsDragging] = useState(false);

    // Initialize skills with positions inside a circle
    const initializeSkills = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const { width, height } = container.getBoundingClientRect();
        setContainerDimensions({ width, height });

        // Calculate appropriate skill size
        const newSkillSize = calculateSkillSize(width, height);
        setSkillSize(newSkillSize);

        // Circle parameters
        const numSkills = skillImages.length;
        const centerX = width / 2;
        const centerY = height / 2;
        const padding = newSkillSize;

        // Calculate the radius of the circular container
        // Use the smaller dimension to ensure the circle fits within the container
        const maxRadius = Math.min(width, height) / 2 * 0.85 - padding;

        const initialSkills = skillImages.map((skill, index) => {
            // Use Vogel's method (sunflower seed arrangement) to fill circle
            // This creates a balanced distribution that fills the circle evenly
            const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle ~137.5 degrees
            const angle = index * goldenAngle;

            // Scale radius based on index to fill the circle more evenly
            // Square root distribution creates more uniform density
            const radiusFactor = Math.sqrt(index / numSkills);

            // Calculate position - this creates a filled circle pattern
            const radius = maxRadius * radiusFactor;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            // Parameters for floating animation
            const bobPhase = Math.random() * Math.PI * 2;
            const bobSpeed = 0.3 + Math.random() * 0.2;

            return {
                id: index,
                x: x,
                y: y,
                vx: 0,
                vy: 0,
                scale: 1,
                rotation: Math.random() * 10 - 5, // Subtle initial rotation
                skill: skill,
                // Store original position
                homeX: x,
                homeY: y,
                // Store relative position for responsiveness
                relativeAngle: angle,
                relativeRadius: radiusFactor,
                // Floating animation parameters
                bobPhase: bobPhase,
                bobSpeed: bobSpeed
            };
        });

        setSkills(initialSkills);
    };

    // Calculate appropriate skill size based on container dimensions and device
    const calculateSkillSize = (width, height) => {
        const area = width * height;
        const numSkills = skillImages.length;
        const targetSkillArea = Math.sqrt(area / (numSkills * 2));

        if (width < 640) { // Mobile
            return Math.max(40, Math.min(50, targetSkillArea * 0.6));
        } else if (width < 1024) { // Tablet
            return Math.max(50, Math.min(60, targetSkillArea * 0.7));
        } else { // Desktop
            return Math.max(60, Math.min(90, targetSkillArea));
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

                // Recalculate circular positions when resizing
                const centerX = width / 2;
                const centerY = height / 2;
                const padding = newSkillSize;
                const maxRadius = Math.min(width, height) / 2 * 0.85 - padding;

                setSkills(prevSkills => {
                    return prevSkills.map(skill => {
                        // Use stored relative angle and radius to recalculate position
                        const radius = maxRadius * skill.relativeRadius;
                        const newX = centerX + Math.cos(skill.relativeAngle) * radius;
                        const newY = centerY + Math.sin(skill.relativeAngle) * radius;

                        return {
                            ...skill,
                            x: newX,
                            y: newY,
                            homeX: newX,
                            homeY: newY
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

    // Handle mouse/touch movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const handleTouchMove = (e) => {
            if (!containerRef.current || !isDragging) return;

            e.preventDefault();

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const touch = e.touches[0];

            setMousePosition({
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            });
        };

        const handleTouchStart = () => {
            setIsDragging(true);
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('touchcancel', handleTouchEnd);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
                container.removeEventListener('touchcancel', handleTouchEnd);
            }
        };
    }, [isDragging]);

    // Animation loop
    useEffect(() => {
        if (!containerRef.current || skills.length === 0) return;

        const { width, height } = containerDimensions;
        if (width === 0 || height === 0) return;

        const animate = () => {
            const now = Date.now() * 0.001; // Current time in seconds

            setSkills(prevSkills => {
                return prevSkills.map(skill => {
                    // Calculate distance from mouse
                    const dx = mousePosition.x - skill.x;
                    const dy = mousePosition.y - skill.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Natural floating motion - gentle bobbing
                    const bobX = Math.sin(now * skill.bobSpeed + skill.bobPhase) * 3;
                    const bobY = Math.cos(now * skill.bobSpeed * 0.7 + skill.bobPhase * 1.3) * 5;

                    // Home position with bobbing
                    const floatHomeX = skill.homeX + bobX;
                    const floatHomeY = skill.homeY + bobY;

                    // Ripple effect - disperse away from cursor
                    const repelRadius = 150; // Distance where repulsion starts
                    const repelStrength = 0.2; // Strength of repulsion

                    // Calculate new velocities
                    let newVx = skill.vx;
                    let newVy = skill.vy;

                    // Apply repulsion force if mouse is close
                    if (distance < repelRadius) {
                        // Calculate repulsion force (stronger when closer)
                        const repelFactor = (1 - distance / repelRadius) * repelStrength;

                        // Add repulsion velocity (away from mouse)
                        newVx -= dx / distance * repelFactor * 10;
                        newVy -= dy / distance * repelFactor * 10;
                    }

                    // Return to home position (with damping)
                    const homeForceX = (floatHomeX - skill.x) * 0.05;
                    const homeForceY = (floatHomeY - skill.y) * 0.05;

                    // Update velocity with home attraction
                    newVx = newVx * 0.9 + homeForceX;
                    newVy = newVy * 0.9 + homeForceY;

                    // Calculate new position
                    let newX = skill.x + newVx;
                    let newY = skill.y + newVy;

                    // Keep skills within the circular container with some elasticity
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const dx2 = newX - centerX;
                    const dy2 = newY - centerY;
                    const distanceFromCenter = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    const maxRadius = Math.min(width, height) / 2 * 0.9;

                    if (distanceFromCenter > maxRadius - skillSize / 2) {
                        // Scale back to the edge of the circle with some elasticity
                        const angle = Math.atan2(dy2, dx2);
                        const adjustedRadius = maxRadius - skillSize / 2;
                        newX = centerX + Math.cos(angle) * adjustedRadius;
                        newY = centerY + Math.sin(angle) * adjustedRadius;

                        // Bounce off the circular boundary
                        const normalX = dx2 / distanceFromCenter;
                        const normalY = dy2 / distanceFromCenter;
                        const dotProduct = newVx * normalX + newVy * normalY;
                        newVx = (newVx - 2 * dotProduct * normalX) * 0.5;
                        newVy = (newVy - 2 * dotProduct * normalY) * 0.5;
                    }

                    // Scale based on mouse proximity (hover effect)
                    let newScale = 1;
                    if (distance < 80) {
                        newScale = 1 + (1 - distance / 80) * 0.3;
                    }

                    // Gentle rotation based on velocity and floating
                    const newRotation = skill.rotation * 0.95 + (newVx + newVy) * 0.3;

                    return {
                        ...skill,
                        x: newX,
                        y: newY,
                        vx: newVx,
                        vy: newVy,
                        scale: newScale,
                        rotation: newRotation
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
    }, [mousePosition, skills.length, containerDimensions, skillSize]);

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center"
            id="skills"
        >
            <h2 className="text-6xl text-center mt-36 reveal">Skills</h2>

            <div
                ref={containerRef}
                className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] mt-20 rounded-lg overflow-hidden reveal"
                style={{
                    background: 'transparent',
                    touchAction: 'none',
                    borderRadius: '12px'
                }}
            >
                {/* Render a visual circle container */}
                <div
                    className="absolute rounded-full"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: `${Math.min(containerDimensions.width, containerDimensions.height) * 0.9}px`,
                        height: `${Math.min(containerDimensions.width, containerDimensions.height) * 0.9}px`,
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: 'inset 0 0 30px rgba(255,255,255,0.05)',
                        backgroundColor: 'rgba(255,255,255,0.02)'
                    }}
                />

                {skills.map((item) => (
                    <div
                        key={item.id}
                        className="absolute flex flex-col items-center justify-center hover:z-10"
                        style={{
                            transform: `translate(${item.x - skillSize / 2}px, ${item.y - skillSize / 2}px) scale(${item.scale}) rotate(${item.rotation}deg)`,
                            transition: 'transform 0.05s linear',
                            width: `${skillSize}px`,
                            height: `${skillSize}px`,
                            willChange: 'transform'
                        }}
                    >
                        <div
                            className="bg-opacity-70 rounded-full p-2 shadow-md w-full h-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-opacity-90"
                        >
                            <img
                                src={item.skill.icon || item.skill}
                                alt={item.skill.name || `Skill ${item.id}`}
                                className="w-4/5 h-4/5 object-contain"
                                title={item.skill.name || `Skill ${item.id}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}