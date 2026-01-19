import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';

// Load all components eagerly (no lazy loading)
import Hero from '../components/Hero';
import RobotShowcase from '../components/RobotShowcase';
import Features from '../components/Features';
import Stats from '../components/Stats';
import TargetClients from '../components/TargetClients';
import Testimonial from '../components/Testimonial';
import MissionLog from '../components/MissionLog';
import CtaSection from '../components/CtaSection';

const Home: React.FC = () => {
    const [showPreloader, setShowPreloader] = useState(() => {
        return !sessionStorage.getItem('vocalflow_intro_shown');
    });

    const handlePreloaderComplete = () => {
        setShowPreloader(false);
        sessionStorage.setItem('vocalflow_intro_shown', 'true');
    };

    if (showPreloader) {
        return <Preloader onComplete={handlePreloaderComplete} />;
    }

    return (
        <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#0F1C2E' }}>
            {/* All content loaded immediately - no lazy loading */}
            <Hero />
            <RobotShowcase />
            <Features />
            <Stats />
            <TargetClients />
            <Testimonial />
            <MissionLog />
            <CtaSection />
        </div>
    );
};

export default Home;
