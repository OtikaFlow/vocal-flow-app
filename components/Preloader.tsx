import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                style={{ backgroundColor: '#0F1C2E' }}
            >
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
                        style={{ backgroundColor: 'rgba(172, 194, 239, 0.2)' }}
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Animated Voice Orb */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 360],
                        }}
                        transition={{
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                            rotate: {
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                        className="relative w-32 h-32"
                    >
                        {/* Outer Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-full border-2 border-primary-300"
                            style={{ boxShadow: '0 0 40px rgba(172, 194, 239, 0.6)' }}
                        />

                        {/* Middle Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.3,
                            }}
                            className="absolute inset-4 rounded-full border-2 border-accent-200"
                            style={{ boxShadow: '0 0 30px rgba(206, 232, 255, 0.6)' }}
                        />

                        {/* Inner Core */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.6,
                            }}
                            className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-300 to-accent-200"
                            style={{ boxShadow: '0 0 50px rgba(172, 194, 239, 0.8)' }}
                        />

                        {/* Particles */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.25,
                                    ease: "easeOut",
                                }}
                                className="absolute w-2 h-2 bg-primary-300 rounded-full"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                                    boxShadow: '0 0 10px rgba(172, 194, 239, 0.8)',
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* Brand Logo & Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center flex flex-col items-center gap-4"
                    >
                        {/* Logo with breathing animation */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 h-20 mb-2"
                        >
                            <img
                                src="/assets/logo.png"
                                alt="Vocal Flow Logo"
                                className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(172,194,239,0.3)]"
                            />
                        </motion.div>

                        <div>
                            <h1 className="font-display font-bold text-4xl text-white tracking-wider mb-2">
                                VOCAL <span className="text-primary-300">FLOW</span>
                            </h1>
                            <p className="font-tech text-sm text-text-200 uppercase tracking-widest">
                                IA Vocale Naturelle
                            </p>
                        </div>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary-300 to-accent-200"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Loading Text */}
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="font-tech text-xs text-primary-300 uppercase tracking-wider"
                    >
                        Chargement {Math.round(progress)}%
                    </motion.p>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-primary-300/30" />
                <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-primary-300/30" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-primary-300/30" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-primary-300/30" />
            </motion.div>
        </AnimatePresence>
    );
};

export default Preloader;
