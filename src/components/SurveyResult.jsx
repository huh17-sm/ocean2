import React from 'react';
import { motion } from 'framer-motion';

const SurveyResult = ({ type, onReset }) => {
    const isTypeA = type === 'A';

    const resultData = {
        A: {
            title: "잠재적 시네마틱 다이버",
            subtitle: "공포형 + 기록 중심",
            diagnosis: "당신은 두려움보다 아름다움을 더 사랑하는 사람입니다. 7년 전, 물을 무서워하던 저와 가장 닮은 유형입니다.",
            prescription: "재촉하지 않고 침착하게 기다려 드리는 1:3 소수정예 케어가 당신의 공포를 설렘으로 바꿀 것입니다.",
            course: "원데이 인생샷 체험 또는 AIDA 1 입문 과정",
            benefit: "영상 작가급 강사가 직접 촬영하는 '시네마틱 수중 프로필' 및 모든 장비 무료 대여",
            color: "var(--color-accent)"
        },
        B: {
            title: "자유로운 오션 익스플로러",
            subtitle: "도전형 + 여행 중심",
            diagnosis: "당신은 일상의 스트레스를 바다의 자유로 치유하고 싶은 열망이 가득한 분입니다.",
            prescription: "단순한 교육을 넘어, 전 세계 바다를 누빌 수 있는 탄탄한 기초와 정규 라이선스 취득을 권장합니다.",
            course: "AIDA 1+2 자격증 통합 코스 및 해외 다이빙 투어 참여",
            benefit: "자격증 취득 후에도 평생 지속되는 매월 정기 무료 트레이닝 참여 권한 부여",
            color: "#4ade80" // 밝은 그린 계열 (도전/성장)
        }
    };

    const data = resultData[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashed-border"
            style={{
                padding: '60px 40px',
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-primary)',
                borderRadius: '0px',
                marginTop: '40px'
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span className="mono" style={{ color: data.color, fontSize: '14px', letterSpacing: '2px' }}>[당신을 위한 맞춤형 진단서]</span>
                <h2 style={{ fontSize: '48px', marginTop: '20px', color: 'var(--color-primary)' }}>{data.title}</h2>
                <p className="mono" style={{ opacity: 0.7 }}>{data.subtitle}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
                <div>
                    <h4 className="mono" style={{ color: data.color, marginBottom: '16px', fontSize: '12px' }}>DIAGNOSIS</h4>
                    <p style={{ fontSize: '20px', lineHeight: 1.6 }}>"{data.diagnosis}"</p>
                </div>
                <div>
                    <h4 className="mono" style={{ color: data.color, marginBottom: '16px', fontSize: '12px' }}>PRESCRIPTION</h4>
                    <p style={{ fontSize: '18px', opacity: 0.9 }}>{data.prescription}</p>
                </div>
            </div>

            <div className="dashed-border" style={{ padding: '30px', marginBottom: '40px', borderStyle: 'dashed', borderWidth: '1px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px' }}>
                    <div>
                        <h4 className="mono" style={{ color: data.color, marginBottom: '12px', fontSize: '12px' }}>RECOMMENDED COURSE</h4>
                        <p style={{ fontSize: '24px', fontWeight: 600 }}>{data.course}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h4 className="mono" style={{ color: data.color, marginBottom: '12px', fontSize: '12px' }}>SPECIAL BENEFIT</h4>
                        <p style={{ fontSize: '16px', opacity: 0.8 }}>{data.benefit}</p>
                    </div>
                </div>
            </div>

            {/* Trust Proof */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '30px' }}>
                    <span style={{ color: '#FFD700', fontSize: '20px' }}>★ 4.9/5.0</span>
                    <span style={{ opacity: 0.6, fontSize: '14px' }}>"작가급 사진 실력" - 수강생 후기</span>
                </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <a
                    href="#contact"
                    className="btn-primary"
                    style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-black)',
                        padding: '16px 32px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '16px',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}
                >
                    [진단 결과대로 상담하기]
                </a>
                <a
                    href="#contact"
                    className="btn-outline"
                    style={{
                        border: '1px solid var(--color-primary)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-primary)',
                        padding: '16px 32px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '16px',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}
                >
                    [맞춤 코스 바로 결제하기]
                </a>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button
                    onClick={onReset}
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', opacity: 0.4, cursor: 'pointer', textDecoration: 'underline' }}
                >
                    다시 테스트하기
                </button>
            </div>
        </motion.div>
    );
};

export default SurveyResult;
