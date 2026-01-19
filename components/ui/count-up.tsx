import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function CountUp({
    to,
    from = 0,
    delay = 0,
    className = "",
    decimals = 0,
}: {
    to: number;
    from?: number;
    delay?: number;
    className?: string;
    decimals?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(from);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 60,
        duration: 2 // Duration is not directly supported by useSpring in this way, handled by damping/stiffness, but let's stick to spring physics for natural feel
    });
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(to);
            }, delay * 1000);
        }
    }, [isInView, motionValue, to, delay]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                // Format with French locale for comma decimals
                ref.current.textContent = latest.toLocaleString("fr-FR", {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                });
            }
        });
    }, [springValue, decimals]);

    return <span className={className} ref={ref}>{from.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
}
