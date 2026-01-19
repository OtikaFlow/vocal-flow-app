"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

type Direction = "up" | "down" | "left" | "right";

export const ScrollReveal = ({
    children,
    className,
    direction = "up",
    delay = 0,
    duration = 0.5,
    blur = false,
}: {
    children: React.ReactNode;
    className?: string;
    direction?: Direction;
    delay?: number;
    duration?: number;
    blur?: boolean;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            filter: blur ? "blur(10px)" : "none",
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            transition: {
                duration: duration,
                delay: delay,
                ease: "easeOut" as any,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
