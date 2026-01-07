import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingBag, Instagram } from 'lucide-react';

const Contact = () => {
    const socialLinks = [
        { name: 'KAKAOTALK', icon: <MessageCircle size={20} />, link: '#', desc: '강습 상담 및 예약' },
        { name: 'SMART STORE', icon: <ShoppingBag size={20} />, link: '#', desc: '자격증 과정 결제' },
        { name: 'INSTAGRAM', icon: <Instagram size={20} />, link: '#', desc: '공식 채널' }
    ];

    return (
        <section id="contact" style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '120px 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '60px' }}>
                    <div style={{ gridColumn: 'span 12', textAlign: 'center', marginBottom: '40px' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: 'var(--fs-2xl)', marginBottom: '20px' }}
                        >
                            READY TO DIVE?
                        </motion.h2>
                        <p className="mono" style={{ opacity: 0.7 }}>설렘 가득한 첫 걸음을 오션프리다이빙과 함께하세요.</p>
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
                                    whileHover={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-black)' }}
                                    style={{
                                        flex: 1,
                                        minWidth: '280px',
                                        maxWidth: '350px',
                                        padding: '40px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'var(--transition-normal)'
                                    }}
                                >
                                    <div style={{ marginBottom: '20px' }}>{social.icon}</div>
                                    <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>{social.name}</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', opacity: 0.6 }}>{social.desc}</div>
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
