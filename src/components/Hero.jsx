import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section ref={containerRef} style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Background Image Layer */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    y: yImage,
                    scale: scaleImage,
                    zIndex: 0,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) contrast(1.2)'
                }}
            />

            {/* Overlay to ensure text readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(240, 238, 233, 0.2)', zIndex: 1 }} />

            {/* Kinetic Typography Layer */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    y: yText,
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'var(--fs-hero)',
                        lineHeight: 0.85,
                        color: 'transparent',
                        WebkitTextStroke: '2px var(--color-black)',
                        marginBottom: '20px'
                    }}
                >
                    OCEAN
                </motion.h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    padding: '0 40px',
                    marginTop: '60px'
                }}>
                    <div className="mono" style={{ textAlign: 'left', fontSize: '13px' }}>
                        (01)<br />
                        INTRODUCING<br />
                        FREEDIVING
                    </div>

                    <div style={{ maxWidth: '400px', textAlign: 'left' }}>
                        <p style={{ fontSize: '24px', fontWeight: 500, lineHeight: 1.2 }}>
                            We specialize in creating distinctive underwater experiences that leave a lasting impression.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Floating Sparkle/Star Icons */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '60px',
                    height: '60px',
                    zIndex: 2
                }}
            >
                <svg viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
                    <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
                </svg>
            </motion.div>
        </section>
    );
};

export default Hero;
