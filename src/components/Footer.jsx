import React, { forwardRef } from 'react';

const Footer = forwardRef((props, ref) => {
    return (
        <footer
            ref={ref}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '40px',
                textAlign: 'center',
                backgroundColor: 'var(--color-primary)',
                zIndex: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '20vh' // Give it some substantial presence for the reveal effect
            }}
        >
            <div className="container">
                <p
                    className="mono"
                    style={{
                        fontSize: '11px',
                        opacity: 0.5,
                        color: 'var(--color-black)'
                    }}
                >
                    &copy; 2026 Ocean Freediving based on BPCO Design.
                </p>

                {/* Optional: Add some content to make the footer more substantial for the reveal effect */}
                <div
                    style={{
                        marginTop: '20px',
                        opacity: 0.3,
                        fontSize: 'var(--fs-2xl)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700
                    }}
                >
                    OCEAN FREEDIVING
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;
