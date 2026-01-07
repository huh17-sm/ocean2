import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

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
        { name: 'PROJECTS', link: '#courses' },
        { name: 'CONTACT', link: '#contact' }
    ];

    return (
        <>
            {/* Top Left Brand */}
            <div style={{ position: 'fixed', top: '20px', left: '40px', zIndex: 1000 }}>
                <div className="mono" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                    Ocean Freediving<br />
                    We share<br />
                    your pleasure
                </div>
            </div>

            {/* Top Right Info */}
            <div style={{ position: 'fixed', top: '20px', right: '40px', zIndex: 1000, display: 'flex', gap: '40px' }}>
                <div className="mono" style={{ fontSize: '12px' }}>Creativity_agency</div>
                <div className="mono" style={{ fontSize: '12px' }}>Seoul, Korea</div>
            </div>

            {/* Centered Pill Navigation */}
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: -100 }
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    border: '1px dashed var(--color-black)',
                    borderRadius: '50px',
                    padding: '8px 24px',
                    backgroundColor: 'rgba(240, 238, 233, 0.8)',
                    backdropFilter: 'blur(5px)'
                }}
            >
                <ul style={{ display: 'flex', listStyle: 'none', gap: '24px' }}>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.link}
                                className="mono"
                                data-cursor-text="CLICK"
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
        </>
    );
};

export default Navbar;
