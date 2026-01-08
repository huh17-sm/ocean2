import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, animate, useMotionValue } from 'framer-motion';

const useWindowSize = () => {
    const [size, setSize] = React.useState({ width: window.innerWidth, height: window.innerHeight });
    React.useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
};

const CourseCard = ({ title, level, index, isExpanded, onToggle, isAnyExpanded, ...props }) => {
    const isOtherExpanded = isAnyExpanded && !isExpanded;

    const images = [
        '/images/course_l1.png',
        '/images/course_l2.png',
        '/images/course_l3.png',
        '/images/course_pro.png',
        '/images/course_deep.png'
    ];

    const courseDetails = [
        {
            desc: "프리다이빙의 기초를 배우는 과정으로, 물과의 친밀감을 높이고 호흡의 즐거움을 깨닫는 시간입니다. 물속에서의 편안함을 찾는 첫 걸음입니다.",
            highlights: ["이론: 생리학 및 안전", "호흡법 및 이완법", "스태틱(숨참기) 기초", "다이나믹(잠영) 입문"]
        },
        {
            desc: "본격적인 심해 다이빙을 시작하며, 압력 평형과 수심 적응을 통해 자유를 만끽하는 단계입니다. 더 깊은 바다와 만나는 설렘을 경험하세요.",
            highlights: ["수심 12-20m 도전", "프렌젤 이퀄라이징 완성", "레스큐 및 안전 기술", "다이빙 테크닉 교정"]
        },
        {
            desc: "고급 다이버를 위한 과정으로, 깊은 수심에서의 심리적 안정과 신체적 효율성을 극대화합니다. 한계를 넘어서는 다이빙의 미학을 배웁니다.",
            highlights: ["수심 24-30m 도전", "마우스필 이퀄라이징 입문", "고급 안전 관리", "CO2 내성 강화 훈련"]
        },
        {
            desc: "최고의 기술을 전수하는 전문가 과정입니다. 교육자로서의 철학과 교수법을 심도 있게 다룹니다. 진정한 바다의 리더로 거듭나는 과정입니다.",
            highlights: ["학생 관리 및 교수법", "기술 평가 및 피드백", "마케팅 및 센터 운영", "프로페셔널 다이빙 리더십"]
        },
        {
            desc: "이집트 다합 블루홀 등 세계적인 다이빙 스팟에서 진행되는 집중 트레이닝 위크입니다. 전 세계 다이버들과의 교류와 성장이 함께합니다.",
            highlights: ["블루홀 투어링", "심해 적응 집중 훈련", "해외 다이빙 매너", "다국적 다이버 네트워크"]
        }
    ];

    // Parallax
    const parallaxX = useTransform(props.parentX || new useMotionValue(0), value => {
        // Fallback for safety
        const val = parseFloat(value) || 0;
        return `${val * 0.05}px`;
    });

    return (
        <motion.div
            layout
            onClick={onToggle}
            initial={false}
            animate={{
                width: isExpanded ? '800px' : '300px',
                scale: isOtherExpanded ? 0.95 : 1,
                opacity: isOtherExpanded ? 0.5 : 1,
            }}
            whileHover={!isExpanded && !isOtherExpanded ? { y: -15, transition: { duration: 0.3, ease: "easeOut" } } : {}}
            style={{
                height: '520px',
                backgroundColor: '#fff',
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: isExpanded ? 'row' : 'column',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '6px',
                boxShadow: isExpanded ? '0 40px 80px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.05)',
                flexShrink: 0,
                transformOrigin: 'center center'
            }}
            transition={{
                type: "spring",
                stiffness: 180,
                damping: 30,
                mass: 1.2,
                layout: { duration: 0.6, type: "spring", stiffness: 180, damping: 30 }
            }}
        >
            {/* Image Section */}
            <motion.div
                layout="position"
                style={{
                    width: isExpanded ? '400px' : '100%',
                    height: isExpanded ? '100%' : '300px',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#111'
                }}
            >
                <motion.img
                    src={images[index]}
                    style={{
                        width: '120%',
                        height: '110%',
                        x: isExpanded ? 0 : parallaxX,
                        objectFit: 'cover',
                        filter: isExpanded ? 'none' : 'grayscale(10%) brightness(90%) contrast(1.1)',
                        scale: isExpanded ? 1.1 : 1
                    }}
                    transition={{ duration: 0.8 }}
                />
                {!isExpanded && (
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                        pointerEvents: 'none'
                    }} />
                )}
            </motion.div>

            {/* Content Section */}
            <motion.div
                layout
                style={{
                    flex: 1,
                    padding: isExpanded ? '50px' : '20px', // Reduced padding for collapsed
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    position: 'relative',
                    zIndex: 2,
                    minWidth: 0
                }}
            >
                <div style={{ minWidth: 0 }}>
                    <div
                        className="mono"
                        style={{
                            fontSize: '10px',
                            marginBottom: '6px',
                            color: '#888',
                            display: 'flex',
                            justifyContent: 'space-between',
                            letterSpacing: '0.1em'
                        }}
                    >
                        <span>(0{index + 1})</span>
                        <span>{level}</span>
                    </div>

                    <h3
                        style={{
                            fontSize: isExpanded ? '28px' : '18px',
                            lineHeight: 1.2,
                            fontWeight: 900,
                            marginBottom: '20px',
                            color: '#000',
                            textTransform: 'uppercase',
                            wordBreak: 'keep-all',
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                            width: isExpanded ? '100%' : 'auto',
                            transition: 'font-size 0.3s ease'
                        }}
                    >
                        {title}
                    </h3>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            delay: 0.2,
                                            staggerChildren: 0.1,
                                            delayChildren: 0.2
                                        }
                                    }
                                }}
                            >
                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                    }}
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.6,
                                        marginBottom: '30px',
                                        color: '#444',
                                        fontWeight: 400,
                                        wordBreak: 'keep-all'
                                    }}
                                >
                                    {courseDetails[index].desc}
                                </motion.p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    {courseDetails[index].highlights.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            variants={{
                                                hidden: { opacity: 0, x: -10 },
                                                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                                            }}
                                            style={{
                                                padding: '10px 12px',
                                                border: '1px solid #eee',
                                                borderRadius: '2px',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            <span style={{ width: '4px', height: '4px', backgroundColor: '#000', borderRadius: '50%' }} />
                                            {item}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div
                    style={{
                        marginTop: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}
                >
                    <span className="mono" style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        padding: '6px 14px',
                        border: '1px solid #eee',
                        borderRadius: '20px',
                        backgroundColor: isExpanded ? '#000' : 'transparent',
                        color: isExpanded ? '#fff' : '#000',
                        transition: 'all 0.3s ease'
                    }}>
                        {isExpanded ? "Close" : "DETAILS →"}
                    </span>
                    {isExpanded && (
                        <a
                            href="#contact"
                            onClick={(e) => e.stopPropagation()}
                            className="mono"
                            style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '6px 14px',
                                border: '1px solid var(--color-accent)',
                                borderRadius: '20px',
                                backgroundColor: 'var(--color-accent)',
                                color: '#000',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            BOOK NOW
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div >
    );
};

const Courses = () => {
    const targetRef = useRef(null);
    const carouselRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const isMobile = windowWidth <= 768;
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Inertial scrolling setup
    const xRaw = useTransform(scrollYProgress, [0, 1], ["0px", `-${width}px`]);
    const x = useSpring(xRaw, { stiffness: 100, damping: 30, mass: 0.5 });

    const handleToggle = (index) => {
        const isOpening = expandedIndex !== index;
        setExpandedIndex(isOpening ? index : null);

        if (isOpening) {
            // Spring animate scroll to center the card
            // Approximate position calculation
            const cardWidth = 300;
            const gap = 40;
            const paddingLeft = isMobile ? windowWidth * 0.05 : windowWidth * 0.5;
            const cardCenter = paddingLeft + (index * (cardWidth + gap)) + (800 / 2); // 800 is expanded width

            // We want cardCenter to be at windowWidth / 2
            // Since x is scroll-driven, we need to find the scroll position
            // This is a bit complex due to layout shift, but animate scroll feels best
            const sectionTop = targetRef.current.offsetTop;
            const sectionHeight = targetRef.current.offsetHeight;
            const viewHeight = window.innerHeight;

            // Calculate target progress
            // x = -width * progress => progress = -x / width
            // targetX = (windowWidth / 2) - cardCenter
            const targetX = (windowWidth / 2) - cardCenter;
            const targetProgress = Math.max(0, Math.min(1, -targetX / width));
            const targetScrollY = sectionTop + targetProgress * (sectionHeight - viewHeight);

            animate(window.scrollY, targetScrollY, {
                type: 'spring',
                stiffness: 60,
                damping: 20,
                onUpdate: (latest) => window.scrollTo(0, latest)
            });
        }
    };

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                // Calculate total scrollable distance: content width - viewport width
                const scrollDistance = carouselRef.current.scrollWidth - window.innerWidth;
                // Add a little extra padding for safety/aesthetics
                setWidth(scrollDistance + 100);
            }
        };

        // Initial update
        updateWidth();

        // Update on resize
        window.addEventListener('resize', updateWidth);

        // Optional: Update on card click (expansion) - simplistic approach:
        // Set a timeout to allow layout animation to finish, then remeasure
        const observer = new ResizeObserver(updateWidth);
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => {
            window.removeEventListener('resize', updateWidth);
            observer.disconnect();
        };
    }, []);

    return (

        <section id="courses" style={{ backgroundColor: '#fcfcfc' }}>
            <div ref={targetRef} style={{ height: '250vh', position: 'relative' }}>
                <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', backgroundColor: '#fcfcfc' }}>
                    {/* Fixed Title Layer */}
                    <div style={{
                        position: 'absolute',
                        top: isMobile ? '120px' : '50px',
                        left: '5vw',
                        zIndex: 1,
                        width: '90vw'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '40px' : 'min(9vw, 90px)',
                            lineHeight: 1,
                            margin: 0,
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            color: '#000'
                        }}>
                            CURRICULUM
                        </h2>
                        <p className="mono" style={{
                            fontSize: isMobile ? '11px' : '13px',
                            maxWidth: isMobile ? '280px' : '400px',
                            opacity: 0.6,
                            marginTop: isMobile ? '8px' : '12px',
                            lineHeight: 1.4
                        }}>
                            Discover your potential in the deep blue.
                            {isMobile ? "" : " We provide professional courses from beginner to instructor."}
                        </p>
                    </div>

                    {/* Horizontal Track Layer */}
                    <div style={{ position: 'absolute', bottom: '6vh', left: 0, width: '100%', zIndex: 5 }}>
                        <motion.div
                            ref={carouselRef}
                            style={{ x, display: 'flex', gap: '40px', paddingLeft: isMobile ? '5vw' : '50vw', paddingRight: '5vw', alignItems: 'flex-end', width: 'max-content' }}
                        >
                            {[
                                { title: "LEVEL 1 DISCOVERY", level: "BEGINNER" },
                                { title: "LEVEL 2 ADVENTURE", level: "AIDA 2" },
                                { title: "LEVEL 3 MASTER", level: "AIDA 3" },
                                { title: "INSTRUCTOR", level: "PRO" },
                                { title: "DEEP WEEK", level: "EGYPT" }
                            ].map((card, i) => (
                                <CourseCard
                                    key={i}
                                    index={i}
                                    title={card.title}
                                    level={card.level}
                                    isExpanded={expandedIndex === i}
                                    isAnyExpanded={expandedIndex !== null}
                                    onToggle={() => handleToggle(i)}
                                    parentX={x}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Courses;
