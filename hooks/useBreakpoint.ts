import { useState, useEffect } from 'react';

// Breakpoints mobile-first
const breakpoints = {
    sm: 640,   // Mobile large
    md: 768,   // Tablet
    lg: 1024,  // Desktop
    xl: 1280,  // Large desktop
    '2xl': 1536 // Extra large
};

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        // Set initial value
        setMatches(media.matches);

        // Create event listener
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

        // Add listener
        media.addEventListener('change', listener);

        // Cleanup
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
};

export const useBreakpoint = () => {
    const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
    const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
    const isLg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
    const isXl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
    const is2Xl = useMediaQuery(`(min-width: ${breakpoints['2xl']}px)`);

    return {
        isMobile: !isSm,
        isTablet: isSm && !isLg,
        isDesktop: isLg,
        isSm,
        isMd,
        isLg,
        isXl,
        is2Xl
    };
};

export default useBreakpoint;
