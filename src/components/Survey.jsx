import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SurveyResult from './SurveyResult';

const questions = [
    {
        id: 1,
        question: "수중에 있을 때 본인의 심리를 색깔로 표현한다면?",
        options: [
            { text: "짙은 남색: 물에 닿는 것도 긴장되고 무서워요.", value: 'A' },
            { text: "투명한 하늘색: 튜브가 있으면 즐겁지만 깊은 곳은 망설여져요.", value: 'A' },
            { text: "깊은 에메랄드: 인어처럼 자유롭게 바다를 유영하고 싶어요.", value: 'B' }
        ]
    },
    {
        id: 2,
        question: "다이빙을 통해 가장 얻고 싶은 '선물'은 무엇인가요?",
        options: [
            { text: "기록의 순간: 영화 속 주인공 같은 인생 사진과 영상", value: 'A' },
            { text: "비움의 순간: 잡념을 끄고 내 호흡에만 집중하는 고요함", value: 'B' },
            { text: "도전의 순간: 한계를 넘어 더 깊은 바다와 마주하는 성취감", value: 'B' }
        ]
    },
    {
        id: 3,
        question: "새로운 도전을 망설이게 하는 가장 큰 '벽'은 무엇인가요?",
        options: [
            { text: "안전: 수영을 못 하는데 정말 가능할지 걱정돼요.", value: 'A' },
            { text: "장비: 전문 장비 구매 비용이 부담스러워요.", value: 'B' },
            { text: "시간: 바쁜 일상 속에서 일정을 맞추기 힘들어요.", value: 'B' }
        ]
    }
];

const Survey = () => {
    const [step, setStep] = useState(0); // 0: intro, 1~3: questions, 4: result
    const [answers, setAnswers] = useState([]);
    const [resultType, setResultType] = useState(null);

    const handleStart = () => {
        console.log("Survey started");
        setStep(1);
    };

    const handleAnswer = (value) => {
        console.log("Answered:", value);
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step < questions.length) {
            setStep(step + 1);
        } else {
            // Calculate result
            const countA = newAnswers.filter(a => a === 'A').length;
            const res = countA >= 2 ? 'A' : 'B';
            console.log("Result calculated:", res);
            setResultType(res);
            setStep(questions.length + 1);
        }
    };

    const resetSurvey = () => {
        setStep(0);
        setAnswers([]);
        setResultType(null);
    };

    return (
        <div style={{ marginTop: '100px', position: 'relative', minHeight: '500px', zIndex: 10 }}>
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ textAlign: 'center', padding: '100px 40px', border: '1px solid var(--color-black)' }}
                    >
                        <h3 style={{ fontSize: '42px', marginBottom: '20px', lineHeight: 1.2 }}>
                            7년 차 프리다이빙 강사가 제안하는<br />
                            <span style={{ color: 'var(--color-accent)', WebkitTextStroke: '1px black' }}>'나의 다이빙 잠재력 확인하기'</span>
                        </h3>
                        <p style={{ fontSize: '18px', opacity: 0.7, marginBottom: '40px', fontWeight: 500 }}>
                            "수영을 못해도, 물이 무서워도 괜찮습니다. <br />
                            당신의 두려움이 설렘으로 바뀌는 가장 빠른 길을 찾아 드립니다."
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--color-accent)', color: 'var(--color-black)' }}
                            whileTap={{ scale: 0.95 }}
                            data-cursor-text="START"
                            onClick={handleStart}
                            style={{
                                padding: '24px 60px',
                                fontSize: '20px',
                                fontWeight: 900,
                                backgroundColor: 'var(--color-black)',
                                color: 'var(--color-primary)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                        >
                            테스트 시작하기
                        </motion.button>
                    </motion.div>
                )}

                {step > 0 && step <= questions.length && (
                    <motion.div
                        key={`q-${step}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ padding: '60px 0' }}
                    >
                        <div style={{ marginBottom: '40px' }}>
                            <span className="mono" style={{ fontSize: '14px', opacity: 0.5 }}>Step {step} / {questions.length}</span>
                            <h3 style={{ fontSize: '36px', marginTop: '10px' }}>{questions[step - 1].question}</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {questions[step - 1].options.map((option, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(option.value)}
                                    className="dashed-border"
                                    style={{
                                        padding: '24px 32px',
                                        cursor: 'pointer',
                                        fontSize: '18px',
                                        backgroundColor: 'transparent',
                                        transition: 'background-color 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <span>{option.text}</span>
                                    <span style={{ opacity: 0.3 }}>→</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step > questions.length && (
                    <SurveyResult type={resultType} onReset={resetSurvey} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Survey;
