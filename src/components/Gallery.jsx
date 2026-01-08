import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Gallery = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-210%"]);

    const images = [
        { src: "/images/portfolio_1.png", title: "UNDERWATER DANCE" },
        { src: "/images/portfolio_2.png", title: "DEEP BLUE" },
        { src: "/images/portfolio_3.png", title: "LIGHT RAYS" },
        { src: "/images/course_l1.png", title: "FREEDOM" },
        { src: "/images/course_pro.png", title: "EXPLORATION" },
        { src: "/images/hero_bg.png", title: "SILENCE" }
    ];

    return (
        <section ref={targetRef} style={{ height: '300vh', position: 'relative', backgroundColor: 'var(--color-dark-gray)' }} id="gallery">
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

                {/* Title Layer */}
                <div style={{ position: 'absolute', top: '80px', left: '40px', zIndex: 10 }}>
                    <h2 style={{ fontSize: 'clamp(40px, 8vw, 120px)', color: 'white', margin: 0, lineHeight: 0.85, fontWeight: 900 }}>PORTFOLIO</h2>
                    <p className="mono" style={{ color: 'var(--color-accent)', marginTop: '10px' }}>Scroll to explore</p>
                </div>

                <div style={{ position: 'absolute', bottom: '10vh', left: 0, width: '100%' }}>
                    <motion.div style={{ x, display: 'flex', gap: '40px', paddingLeft: '40px', alignItems: 'flex-start' }}>
                        {images.map((img, i) => (
                            <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                                <div
                                    style={{
                                        width: '600px',
                                        height: '400px',
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
                                <h3 style={{ color: 'white', marginTop: '20px', fontSize: '24px', fontWeight: 400 }}>{img.title}</h3>
                                <p className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>( 0{i + 1} )</p>
                            </div>
                        ))}

                        {/* End Card */}
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <div style={{
                                width: '600px',
                                height: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#1a1a1a',
                                border: '1px dashed rgba(255,255,255,0.3)',
                                borderRadius: '4px'
                            }}>
                                <h3 style={{ color: 'white', fontSize: '32px', marginBottom: '20px', textAlign: 'center', fontFamily: 'var(--font-display)' }}>
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
