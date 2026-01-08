import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag, Instagram } from 'lucide-react';

const useWindowSize = () => {
    const [size, setSize] = React.useState({ width: window.innerWidth, height: window.innerHeight });
    React.useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
};

const Contact = () => {
    const { width: windowWidth } = useWindowSize();
    const isMobile = windowWidth <= 768;

    const socialLinks = [
        { name: 'KAKAOTALK', icon: <MessageCircle size={32} />, link: 'https://pf.kakao.com/_example', desc: '강습 상담 및 예약' },
        { name: 'SMART STORE', icon: <ShoppingBag size={32} />, link: 'https://smartstore.naver.com/example', desc: '자격증 과정 결제' },
        { name: 'INSTAGRAM', icon: <Instagram size={32} />, link: 'https://instagram.com/example', desc: '공식 채널' }
    ];

    return (
        <section id="contact" style={{ backgroundColor: 'var(--color-black)', color: '#ffffff', padding: isMobile ? '60px 0 100px 0' : '0 0 120px 0' }}>
            <div className="container" style={{ padding: isMobile ? '0 20px' : '0 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: isMobile ? '40px' : '20px' }}>
                    <div style={{ gridColumn: 'span 12', textAlign: isMobile ? 'center' : 'left', marginBottom: isMobile ? '10px' : '20px' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: isMobile ? '40px' : 'var(--fs-2xl)', marginBottom: '0px' }}
                        >
                            CONTACT
                        </motion.h2>
                        <p className="mono" style={{ opacity: 0.7, marginTop: '0px', fontSize: isMobile ? '12px' : 'inherit' }}>설렘 가득한 첫 걸음을 오션프리다이빙과 함께하세요.</p>
                    </div>

                    <div style={{ gridColumn: 'span 12' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: 'var(--color-accent)',
                                        color: 'var(--color-black)',
                                        borderColor: 'var(--color-accent)'
                                    }}
                                    style={{
                                        flex: 1,
                                        minWidth: '300px',
                                        maxWidth: '400px',
                                        padding: '50px 40px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        backgroundColor: 'rgba(255,255,255,0.08)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <div style={{ marginBottom: '30px', transform: 'scale(1.2)' }}>{social.icon}</div>
                                    <div className="mono" style={{
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        marginBottom: '10px',
                                        fontFamily: 'var(--font-display)',
                                        letterSpacing: '-0.02em'
                                    }}>
                                        {social.name}
                                    </div>
                                    <div style={{ fontSize: '15px', opacity: 0.7, fontWeight: 400 }}>{social.desc}</div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
