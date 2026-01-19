"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "../../../lib/utils";

export const SparklesCore = (props: {
    id?: string;
    className?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleColor?: string;
    particleDensity?: number;
}) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        speed,
        particleColor,
        particleDensity,
    } = props;
    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const generatedId = useId();

    return (
        <div className={cn("opacity-0 transition-opacity duration-1000", init && "opacity-100", className)}>
            {init && (
                <Particles
                    id={id || generatedId}
                    className={cn("h-full w-full")}
                    options={{
                        background: {
                            color: {
                                value: background || "transparent",
                            },
                        },
                        fullScreen: {
                            enable: false,
                            zIndex: 1,
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                                resize: {
                                    enable: true,
                                    delay: 0.5
                                },
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            bounce: {
                                horizontal: {
                                    value: 1,
                                },
                                vertical: {
                                    value: 1,
                                },
                            },
                            color: {
                                value: particleColor || "#ffffff",
                            },
                            links: {
                                color: particleColor || "#ffffff",
                                distance: 150,
                                enable: false,
                                opacity: 0.5,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: speed || 2,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    width: 400,
                                    height: 400,
                                },
                                value: particleDensity || 120,
                            },
                            opacity: {
                                value: { min: 0.1, max: 0.5 },
                                animation: {
                                    enable: true,
                                    speed: speed || 2,
                                    sync: false,
                                },
                            },
                            size: {
                                value: { min: minSize || 1, max: maxSize || 3 },
                                animation: {
                                    enable: false,
                                    speed: 4,
                                    sync: false
                                }
                            },
                            shape: {
                                type: "circle",
                            },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </div>
    );
};
