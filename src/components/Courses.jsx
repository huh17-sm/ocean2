import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CourseCard = ({ title, level, index }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const images = [
        '/images/course_l1.png',
        '/images/course_l2.png',
        '/images/course_l3.png',
        '/images/course_pro.png',
        '/images/course_deep.png'
    ];

    const courseDetails = [
        {
            desc: "프리다이빙의 기초를 배우는 과정으로, 물과의 친밀감을 높이고 호흡의 즐거움을 깨닫는 시간입니다.",
            highlights: ["이론: 생리학 및 안전", "호흡법 및 이완법", "스태틱(숨참기) 기초", "다이나믹(잠영) 입문"]
        },
        {
            desc: "본격적인 심해 다이빙을 시작하며, 압력 평형과 수심 적응을 통해 자유를 만끽하는 단계입니다.",
            highlights: ["수심 12-20m 도전", "프렌젤 이퀄라이징 완성", "레스큐 및 안전 기술", "다이빙 테크닉 교정"]
        },
        {
            desc: "고급 다이버를 위한 과정으로, 깊은 수심에서의 심리적 안정과 신체적 효율성을 극대화합니다.",
            highlights: ["수심 24-30m 도전", "마우스필 이퀄라이징 입문", "고급 안전 관리", "CO2 내성 강화 훈련"]
        },
        {
            desc: "최고의 기술을 전수하는 전문가 과정입니다. 교육자로서의 철학과 교수법을 심도 있게 다룹니다.",
            highlights: ["학생 관리 및 교수법", "기술 평가 및 피드백", "마케팅 및 센터 운영", "프로페셔널 다이빙 리더십"]
        },
        {
            desc: "이집트 다합 블루홀 등 세계적인 다이빙 스팟에서 진행되는 집중 트레이닝 위크입니다.",
            highlights: ["블루홀 투어링", "심해 적응 집중 훈련", "해외 다이빙 매너", "다국적 다이버 네트워크"]
        }
    ];

    return (
        <motion.div
            layout
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
                width: isExpanded ? '700px' : '400px',
                height: '500px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #000000',
                padding: '30px',
                display: 'flex',
                gap: '30px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <motion.div style={{ minWidth: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div className="mono" style={{ borderBottom: '1px solid black', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>(0{index + 1})</span>
                        <span>{level}</span>
                    </div>
                    <h3 style={{ fontSize: '38px', lineHeight: 1, marginBottom: '20px' }}>{title}</h3>
                </div>

                <div style={{ width: '100%', height: '220px', overflow: 'hidden', border: '1px solid #eee' }}>
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src={images[index]}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div style={{ marginTop: '15px' }}>
                    <span className="mono" style={{ fontSize: '13px', textDecoration: 'underline' }}>
                        {isExpanded ? "< 접기" : "< 자세히보기 >"}
                    </span>
                </div>
            </motion.div>

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <p style={{ fontSize: '18px', lineHeight: 1.4, marginBottom: '30px', color: '#333' }}>
                        {courseDetails[index].desc}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {courseDetails[index].highlights.map((item, i) => (
                            <li key={i} style={{
                                marginBottom: '12px',
                                borderLeft: '3px solid black',
                                paddingLeft: '15px',
                                fontSize: '14px',
                                fontWeight: 500
                            }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.div>
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
