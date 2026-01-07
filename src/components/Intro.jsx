import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Survey from './Survey';

const Intro = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xText = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 180]);

    return (
        <section ref={containerRef} style={{ position: 'relative', padding: '100px 0', overflow: 'hidden' }}>

            {/* Massive Kinetic Text Background */}
            <div style={{ position: 'absolute', top: '20%', width: '100%', opacity: 0.05, zIndex: 0, pointerEvents: 'none' }}>
                <motion.div style={{ x: xText, fontSize: '15vw', fontWeight: 900, whiteSpace: 'nowrap', fontFamily: 'var(--font-display)' }}>
                    MISSION PRINCIPLE VALUES
                </motion.div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>

                    {/* Sticky Text Column */}
                    <div style={{ gridColumn: 'span 5', position: 'relative' }}>
                        <div style={{ position: 'sticky', top: '150px' }}>
                            <span className="mono dashed-border" style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '13px' }}>
                                (02) NARRATIVE
                            </span>
                            <h2 style={{ fontSize: '64px', lineHeight: 0.9, marginTop: '40px', marginBottom: '40px' }}>
                                FROM<br />
                                OFFICE<br />
                                TO OCEAN
                            </h2>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <motion.div
                                    style={{ rotate: rotateShape, width: '40px', height: '40px', borderRadius: '50%', border: '1px dashed black' }}
                                    className="dashed-border"
                                />
                                <p className="mono" style={{ fontSize: '12px', maxWidth: '200px' }}>
                                    A story of transformation and finding true freedom beneath the surface.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scrolling Content Column */}
                    <div style={{ gridColumn: 'span 7' }}>
                        {/* Story Card 1 */}
                        <div
                            data-cursor-text="VIEW"
                            style={{
                                marginBottom: '100px',
                                border: '1px solid var(--color-black)',
                                padding: '40px',
                                borderRadius: '0px',
                                backgroundColor: 'var(--color-primary)'
                            }}
                        >
                            <h3 style={{ fontSize: '32px', marginBottom: '20px' }}>THE BEGINNING</h3>
                            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--color-dark-gray)' }}>
                                매일 새벽까지 야근하며 스트레스에 시달리던 평범한 직장인이었습니다.
                                숨 쉴 틈 없는 일상 속에서, 물속은 유일하게 온전한 나를 마주할 수 있는 공간이었습니다.
                            </p>
                        </div>

                        {/* Image Card with rounded corners */}
                        <div
                            style={{
                                marginBottom: '100px',
                                height: '600px',
                                width: '100%',
                                backgroundImage: 'url("https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '300px',
                                border: '1px solid var(--color-black)'
                            }}
                        />

                        {/* Story Card 2 */}
                        <div
                            data-cursor-text="READ"
                            style={{
                                border: '1px solid var(--color-black)',
                                padding: '40px',
                                borderRadius: '0px',
                                backgroundColor: 'var(--color-black)',
                                color: 'var(--color-primary)'
                            }}
                        >
                            <h3 style={{ fontSize: '32px', marginBottom: '20px', color: 'var(--color-accent)' }}>THE CHANGE</h3>
                            <p style={{ fontSize: '18px', lineHeight: 1.6 }}>
                                수영도 못 하고 물을 무서워하던 제가 프리다이빙을 통해 두려움을 극복하고 자유를 찾았습니다.
                                이제 그 경험을 여러분과 나누고 싶습니다.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Survey Section Integration */}
                <div style={{ marginTop: '100px' }}>
                    <Survey />
                </div>
            </div>
        </section>
    );
};

export default Intro;
