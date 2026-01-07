import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CourseCard = ({ title, level, index }) => {
    return (
        <div
            style={{
                width: '400px',
                height: '500px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #000000',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
            }}
            data-cursor-text="EXPLORE"
        >
            <div>
                <div className="mono" style={{ borderBottom: '1px solid black', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>(0{index + 1})</span>
                    <span>{level}</span>
                </div>
                <h3 style={{ fontSize: '42px', lineHeight: 1 }}>{title}</h3>
            </div>

            <div style={{ width: '100%', height: '200px', overflow: 'hidden', border: '1px solid #eee' }}>
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={`https://source.unsplash.com/random/400x300?ocean,${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

const Courses = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} style={{ height: '300vh', position: 'relative' }} id="courses">
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', width: '100%' }}>
                    <h2 style={{ fontSize: '12vw', lineHeight: 0.8, marginBottom: '60px', whiteSpace: 'nowrap' }}>
                        CURRICULUM
                    </h2>

                    <motion.div style={{ x, display: 'flex', gap: '40px' }}>
                        <CourseCard title="LEVEL 1 DISCOVERY" level="BEGINNER" index={0} />
                        <CourseCard title="LEVEL 2 ADVENTURE" level="AIDA 2" index={1} />
                        <CourseCard title="LEVEL 3 MASTER" level="AIDA 3" index={2} />
                        <CourseCard title="INSTRUCTOR" level="PRO" index={3} />
                        <CourseCard title="DEEP WEEK" level="ECYPT" index={4} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Courses;
