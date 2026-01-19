import { cn } from "../../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const VolumeCardsGrid = ({
    items,
    className,
}: {
    items: {
        icon: React.ReactNode;
        volume: string;
        priceRange: string;
        description: string;
        color: string;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-primary-300/10 block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <div
                        className={cn(
                            "rounded-2xl h-full w-full p-6 overflow-hidden bg-white/5 border border-white/10 group-hover:border-primary-300/50 relative z-20 transition-colors duration-300",
                        )}
                        style={{
                            background: `linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`
                        }}
                    >
                        <div className="relative z-50 flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-primary-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <div className="font-tech text-xs text-primary-300 uppercase tracking-wider mb-2">{item.volume}</div>
                            <div className="font-display font-bold text-3xl text-white mb-3">
                                {item.priceRange}
                                <span className="text-lg text-text-200 font-normal">/min</span>
                            </div>
                            <p className="text-text-200 text-sm mt-auto">{item.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
