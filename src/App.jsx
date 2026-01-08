import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Stats from './components/Stats'
import Courses from './components/Courses'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function App() {
    const footerRef = useRef(null)
    const [footerHeight, setFooterHeight] = useState(0)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    useEffect(() => {
        const updateFooterHeight = () => {
            if (footerRef.current) {
                setFooterHeight(footerRef.current.offsetHeight)
            }
        }

        updateFooterHeight()
        window.addEventListener('resize', updateFooterHeight)

        return () => {
            window.removeEventListener('resize', updateFooterHeight)
        }
    }, [])

    return (
        <div className="app-container">
            <div className="grain-overlay" />
            <CustomCursor />
            <Navbar />

            {/* 
              Wrap main content in a relative container with z-index 1 
              to slide OVER the fixed footer (z-index 0).
              Add margin-bottom dynamically to reveal the footer.
            */}
            <main
                style={{
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'var(--color-primary)',
                    marginBottom: `${footerHeight}px`
                }}
            >
                <Hero />
                <Intro />
                <Stats />
                <Courses />
                <Gallery />
                <Contact />
            </main>

            <Footer ref={footerRef} />
        </div>
    )
}

export default App
