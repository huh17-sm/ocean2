import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Stats from './components/Stats'
import Courses from './components/Courses'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'

function App() {

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

    return (
        <div className="app-container">
            <div className="grain-overlay" />
            <CustomCursor />
            <Navbar />
            <main>
                <Hero />
                <Intro />
                <Stats />
                <Courses />
                <Contact />
            </main>
            <footer style={{ padding: '40px', textAlign: 'center' }}>
                <p className="mono" style={{ fontSize: '11px', opacity: 0.5 }}>&copy; 2026 Ocean Freediving based on BPCO Design.</p>
            </footer>
        </div>
    )
}

export default App
