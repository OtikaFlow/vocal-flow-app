import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense, useEffect, useState, useRef } from 'react';
import Robot from './Robot';

export default function RobotShowcase() {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef(0); // Mutable ref for 60fps animation

    // Cache layout values to prevent thrashing
    const positionsRef = useRef<{
        statsTop: number | null;
        dynamicsTop: number | null;
        maxScroll: number;
    }>({ statsTop: null, dynamicsTop: null, maxScroll: 0 });

    const updatePositions = () => {
        const additionalFeaturesSection = document.getElementById('additional-features');
        const dynamicsSection = document.getElementById('feature-dynamics');

        positionsRef.current = {
            statsTop: additionalFeaturesSection ? additionalFeaturesSection.offsetTop : null,
            dynamicsTop: dynamicsSection ? dynamicsSection.offsetTop : null,
            maxScroll: document.documentElement.scrollHeight - window.innerHeight
        };
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            updatePositions();
        };

        handleResize();
        // Measure again after a small delay to ensure layout is settled (e.g. images loaded)
        const t1 = setTimeout(updatePositions, 500);
        const t2 = setTimeout(updatePositions, 2000);

        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            // Update global scroll progress (0 to 1) for the robot rotation
            const scrollPosition = window.scrollY;

            // USE CACHED SCROLL HEIGHT
            const cachedMaxScroll = positionsRef.current.maxScroll || (document.documentElement.scrollHeight - window.innerHeight);
            const progress = Math.max(0, Math.min(1, scrollPosition / cachedMaxScroll));
            scrollRef.current = progress;

            if (!containerRef.current) return;

            // USE CACHED POSITIONS
            const { statsTop, dynamicsTop } = positionsRef.current;

            // Retry cache if missing (e.g. late mount or first scroll before timeout)
            if (statsTop === null || dynamicsTop === null) {
                updatePositions();
                // If still null, return to avoid crash or wrong logic
                if (positionsRef.current.statsTop === null) return;
            }

            // Safe accessor after check
            const safeStatsTop = positionsRef.current.statsTop!;
            const safeDynamicsTop = positionsRef.current.dynamicsTop;

            // Default: Fully visible
            let newOpacity = 1;

            if (safeDynamicsTop !== null) {
                // --- FADE LOGIC REVISED ---
                // Start fading exactly from Top of "Dynamique Vocale Humaine"
                const fadeStart = safeDynamicsTop;

                // End fading exactly when Stats enters the screen (Bottom of viewport hits Stats Top)
                const fadeEnd = safeStatsTop - window.innerHeight;

                const fadeZone = fadeEnd - fadeStart;

                // CRITICAL: Once past fadeEnd, ALWAYS stay hidden (no reappearance)
                if (scrollPosition >= fadeEnd) {
                    newOpacity = 0;
                } else if (scrollPosition < fadeStart) {
                    // Before Dynamics section: Full Opacity
                    newOpacity = 1;
                } else {
                    // Inside Dynamics section approaching Stats: Progressive Fade
                    const fadeProgress = (scrollPosition - fadeStart) / fadeZone;
                    // Linear fade from 1 to 0
                    newOpacity = Math.max(0, 1 - fadeProgress);
                }
            } else {
                // Fallback if dynamics ID not found
                const fadeEnd = safeStatsTop - window.innerHeight;
                const fadeStart = fadeEnd - window.innerHeight;
                const fadeZone = fadeEnd - fadeStart;
                // Once past Stats, stay hidden
                if (scrollPosition >= fadeStart) {
                    newOpacity = 0;
                }
            }

            // Direct DOM update - No React Render!
            containerRef.current.style.opacity = newOpacity.toString();
            containerRef.current.style.visibility = newOpacity < 0.01 ? 'hidden' : 'visible';
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    return (
        <>
            {/* Robot 3D Fixe - Côté Droit avec animations 3D REELLES et entrée WOW */}
            {/* Mobile: Fond d'écran (z-0), Desktop: Côté droit (z-10) */}
            <div
                ref={containerRef}
                className="fixed inset-0 md:right-0 md:top-0 md:h-screen md:w-1/2 md:left-auto z-0 md:z-10 pointer-events-none"
                style={{
                    opacity: 1, // Start visible
                    transition: 'none', // Critical for scroll sync
                    // Animation d'entrée CSS pour le conteneur
                    animation: isMobile ? 'fadeIn 1.5s ease-out forwards' : 'slideInRight 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                }}
            >
                <style>{`
                    @keyframes slideInRight {
                        from { transform: translateX(100px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.9); }
                        to { opacity: 1; transform: scale(1); }
                    }
                `}</style>
                <div className={`w-full h-full ${isMobile ? 'opacity-40' : 'opacity-100'}`}> {/* Opacité réduite sur mobile pour lisibilité texte */}
                    <Canvas
                        dpr={[1, 1.5]} // Performance: Limit pixel ratio
                        camera={{
                            position: isMobile ? [0, 0.5, 6] : [2, 0, 6], // Mobile: Centré et un peu plus haut. Desktop: Décalé.
                            fov: isMobile ? 60 : 45
                        }}
                        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} // Optimized GL settings
                    >
                        <Environment preset="city" />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Suspense fallback={null}>
                            <Robot scrollProgress={scrollRef} />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </>
    );
}
