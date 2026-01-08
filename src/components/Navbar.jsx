import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const navItems = [
        { name: 'HOME', link: '#' },
        { name: 'CURRICULUM', link: '#courses' },
        { name: 'GALLERY', link: '#gallery' },
        { name: 'CONTACT', link: '#contact' }
    ];

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: isMobile ? '20px' : '20px 40px',
                zIndex: 1000,
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'minmax(200px, 1fr) auto minmax(200px, 1fr)',
                alignItems: 'start',
                justifyItems: isMobile ? 'center' : 'start',
                pointerEvents: 'none' // Allow clicking items through the container
            }}
        >
            {/* Left Brand */}
            {!isMobile && (
                <motion.div
                    style={{ pointerEvents: 'auto' }}
                    variants={{
                        visible: { y: 0, opacity: 1 },
                        hidden: { y: -20, opacity: 0 }
                    }}
                    animate={hidden ? "hidden" : "visible"}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    <div className="mono" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                        Ocean Freediving<br />
                        We share<br />
                        your pleasure
                    </div>
                </motion.div>
            )}

            {/* Pill Navigation */}
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -20, opacity: 0 }
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{
                    border: '1px dashed var(--color-black)',
                    borderRadius: '50px',
                    padding: isMobile ? '8px 16px' : '8px 24px',
                    backgroundColor: 'rgba(240, 238, 233, 0.8)',
                    backdropFilter: 'blur(5px)',
                    pointerEvents: 'auto',
                    justifySelf: 'center' // Always center the nav itself relative to its grid cell
                }}
            >
                <ul style={{ display: 'flex', listStyle: 'none', gap: isMobile ? '16px' : '24px', margin: 0, padding: 0 }}>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.link}
                                className="mono"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--color-black)',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    padding: '4px 8px',
                                    borderRadius: '12px'
                                }}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.nav>

            {/* Right Info */}
            {!isMobile && (
                <motion.div
                    style={{ pointerEvents: 'auto', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '40px', justifySelf: 'end' }}
                    variants={{
                        visible: { y: 0, opacity: 1 },
                        hidden: { y: -20, opacity: 0 }
                    }}
                    animate={hidden ? "hidden" : "visible"}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    <div className="mono" style={{ fontSize: '12px' }}>Professional Courses</div>
                    <div className="mono" style={{ fontSize: '12px' }}>Seoul, Korea</div>
                </motion.div>
            )}
        </header>
    );
};

export default Navbar;
