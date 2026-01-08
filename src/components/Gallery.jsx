import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Gallery = () => {
    const targetRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [scrollRange, setScrollRange] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Re-calculate scroll range on resize
    useEffect(() => {
        const handleResize = () => {
            if (scrollContainerRef.current) {
                const totalWidth = scrollContainerRef.current.scrollWidth;
                const windowWidth = window.innerWidth;
                const calculatedRange = totalWidth - windowWidth + 100; // Extra buffer
                setScrollRange(calculatedRange);
                setViewportWidth(windowWidth);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        // Small delay to ensure content is rendered
        const timer = setTimeout(handleResize, 100);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    const xRaw = useTransform(scrollYProgress, [0, 1], ["1%", `-${scrollRange}px`]);
    const x = useSpring(xRaw, { stiffness: 80, damping: 30 });

    const images = [
        { src: "/images/portfolio_1.png", title: "UNDERWATER DANCE" },
        { src: "/images/portfolio_2.png", title: "DEEP BLUE" },
        { src: "/images/portfolio_3.png", title: "LIGHT RAYS" },
        { src: "/images/course_l1.png", title: "FREEDOM" },
        { src: "/images/course_pro.png", title: "EXPLORATION" },
        { src: "/images/hero_bg.png", title: "SILENCE" }
    ];

    const isMobile = viewportWidth <= 768;

    return (
        <section ref={targetRef} style={{ height: '300vh', position: 'relative', backgroundColor: 'var(--color-dark-gray)' }} id="gallery">
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

                {/* Title Layer */}
                <div style={{ position: 'absolute', top: isMobile ? '60px' : '80px', left: isMobile ? '20px' : '40px', zIndex: 10 }}>
                    <h2 style={{ fontSize: 'clamp(40px, 8vw, 120px)', color: 'white', margin: 0, lineHeight: 0.85, fontWeight: 900 }}>PORTFOLIO</h2>
                    <p className="mono" style={{ color: 'var(--color-accent)', marginTop: '10px' }}>Scroll to explore</p>
                </div>

                <div style={{ position: 'absolute', bottom: isMobile ? '15vh' : '10vh', left: 0, width: '100%' }}>
                    <motion.div
                        ref={scrollContainerRef}
                        style={{ x, display: 'flex', gap: isMobile ? '20px' : '40px', paddingLeft: isMobile ? '20px' : '40px', alignItems: 'flex-start', width: 'max-content' }}
                    >
                        {images.map((img, i) => (
                            <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                                <div
                                    style={{
                                        width: 'min(600px, 85vw)',
                                        height: 'min(400px, 60vh)',
                                        aspectRatio: '3/2',
                                        overflow: 'hidden',
                                        borderRadius: '4px',
                                        backgroundColor: '#000'
                                    }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <h3 style={{ color: 'white', marginTop: '20px', fontSize: isMobile ? '20px' : '24px', fontWeight: 400 }}>{img.title}</h3>
                                <p className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>( 0{i + 1} )</p>
                            </div>
                        ))}

                        {/* End Card */}
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <div style={{
                                width: 'min(600px, 85vw)',
                                height: 'min(400px, 60vh)',
                                aspectRatio: '3/2',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#1a1a1a',
                                border: '1px dashed rgba(255,255,255,0.3)',
                                borderRadius: '4px'
                            }}>
                                <h3 style={{ color: 'white', fontSize: isMobile ? '24px' : '32px', marginBottom: '20px', textAlign: 'center', fontFamily: 'var(--font-display)' }}>
                                    READY FOR<br />YOUR SHOT?
                                </h3>
                                <a href="#contact" style={{
                                    padding: '15px 30px',
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    borderRadius: '30px',
                                    fontSize: '14px',
                                    fontFamily: 'var(--font-mono)'
                                }}>
                                    BOOK SESSION
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
