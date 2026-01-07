import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Counter = ({ value, label }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{ flex: 1, borderLeft: '1px dashed rgba(255,255,255,0.3)', paddingLeft: '30px' }}>
            <div className="mono" style={{ color: 'var(--color-accent)', marginBottom: '10px' }}>{label}</div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ fontSize: '80px', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-display)' }}
            >
                {value}
            </motion.div>
        </div>
    );
};

const Stats = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <section style={{ backgroundColor: '#121212', color: '#F0EEE9', padding: '150px 0', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ marginBottom: '100px' }}>
                    <div className="mono" style={{ border: '1px solid #F0EEE9', display: 'inline-block', padding: '8px 20px', borderRadius: '30px', marginBottom: '40px' }}>
                        (03) PERFORMANCE
                    </div>

                    <motion.div style={{ x: xText, fontSize: '12vw', lineHeight: 0.8, fontWeight: 900, whiteSpace: 'nowrap', fontFamily: 'var(--font-display)' }}>
                        TRUSTED BY DIVERS
                    </motion.div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '60px' }}>
                    <Counter label="YEARS EXPERIENCE" value="07" />
                    <Counter label="SATISFACTION SCORE" value="4.9" />
                    <Counter label="SAFETY RATIO" value="1:3" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
