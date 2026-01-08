import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

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

    const xRaw = useTransform(scrollYProgress, [0, 1], ["500%", "-2600%"]);
    const xText = useSpring(xRaw, { stiffness: 60, damping: 20 });

    return (
        <section style={{ backgroundColor: '#121212', color: '#F0EEE9', padding: '150px 0', overflow: 'hidden' }}>
            <div className="container" ref={containerRef}>
                <div style={{ marginBottom: '100px' }}>
                    <div className="mono" style={{ border: '1px solid #F0EEE9', display: 'inline-block', padding: '8px 20px', borderRadius: '30px', marginBottom: '40px' }}>
                        (03) PERFORMANCE
                    </div>

                    <motion.div style={{ x: xText, fontSize: '18vw', lineHeight: 0.8, fontWeight: 900, whiteSpace: 'nowrap', fontFamily: 'var(--font-display)', willChange: 'transform' }}>
                        TRUSTED BY DIVERS
                    </motion.div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '60px', marginBottom: '150px' }}>
                    <Counter label="YEARS EXPERIENCE" value="07" />
                    <Counter label="SATISFACTION SCORE" value="4.9" />
                    <Counter label="SAFETY RATIO" value="1:3" />
                </div>

                {/* Reviews Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                    {[
                        "재촉하지 않고 침착하게 기다려주시는 강사님 덕분에 긴장이 풀렸어요.",
                        "충분히 제 자신을 믿고 맡길 수 있는 프리다이빙 체험이었어요!!!",
                        "강사님께서 매우 침착하시고 궁금한 점 모두 설명해 주십니다!",
                        "기초부터 차근차근 설명해 주셔서 어려운 점 하나도 없었고 또 말 재주도 좋으셔서 매우 재미있었습니다!",
                        "장비도 꼼꼼히 다 봐주시고 다이빙할때 한 명씩 호흡 잘 하는지 유심히 체크해 주시고 사진+영상도 너무 열심히 찍어주십니다!",
                        "무엇보다 강사님이랑 일정과 시간을 조율하여 맞출 수 있는게 가장 큰 매리트 였습니다!",
                        "강사님이 정말 정말 친절하셨어요. 프리다이빙 슈트 입는 방법부터 호흡법, 이퀼라이징까지 순차적으로 세세하게 알려주셨어요.",
                        "궁금한 점이 있나 계속 물어봐 주시고, 어렵다고 하는 저희를 다독여가며 친절히 알려주신 강사님 정말 감사합니다.",
                        "사진과 영상 실력이 거의 작가급이라 평생 소장용 인생샷을 건졌습니다."
                    ].map((review, i) => (
                        <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
                            <div className="mono" style={{ color: 'var(--color-accent)', fontSize: '12px', marginBottom: '10px' }}>
                                REVIEW {String(i + 1).padStart(2, '0')}
                            </div>
                            <p style={{ fontSize: '16px', lineHeight: 1.6, opacity: 0.8, wordBreak: 'keep-all' }}>
                                "{review}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
