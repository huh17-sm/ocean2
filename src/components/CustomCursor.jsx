import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [cursorText, setCursorText] = useState('');
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Smooth mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            // Check for interactive elements
            const tagName = target.tagName.toLowerCase();
            const isClickable = tagName === 'a' || tagName === 'button' || target.closest('a') || target.closest('button');

            // Check for specific data-cursor attributes
            const customText = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

            if (customText) {
                setCursorText(customText);
                setIsHovering(true);
            } else if (isClickable) {
                setCursorText('');
                setIsHovering(true);
            } else {
                setCursorText('');
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, isVisible]);

    if (isMobile) return null;

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: smoothX,
                top: smoothY,
                translateX: '-50%',
                translateY: '-50%',
                width: isHovering ? 60 : 12,
                height: isHovering ? 60 : 12,
                backgroundColor: isHovering ? 'var(--color-accent)' : 'var(--color-black)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mixBlendMode: isHovering ? 'difference' : 'normal',
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
        >
            {isHovering && (
                <span className="mono" style={{
                    fontSize: '10px',
                    color: 'var(--color-black)',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                }}>
                    {cursorText}
                </span>
            )}
        </motion.div>
    );
};

export default CustomCursor;
