import { useRef, useState, useEffect, RefObject } from 'react';

export function useDraggableScroll(ref: RefObject<HTMLElement>, options: { direction?: 'horizontal' | 'vertical' | 'both' } = { direction: 'horizontal' }) {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            setStartX(e.pageX - element.offsetLeft);
            setStartY(e.pageY - element.offsetTop);
            setScrollLeft(element.scrollLeft);
            setScrollTop(element.scrollTop);
            element.style.cursor = 'grabbing';
            element.style.userSelect = 'none';
        };

        const handleMouseLeave = () => {
            setIsDragging(false);
            element.style.cursor = 'grab';
            element.style.removeProperty('user-select');
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            element.style.cursor = 'grab';
            element.style.removeProperty('user-select');
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();

            if (options.direction === 'horizontal' || options.direction === 'both') {
                const x = e.pageX - element.offsetLeft;
                const walkX = (x - startX) * 2; // Scroll-fast multiplier
                element.scrollLeft = scrollLeft - walkX;
            }

            if (options.direction === 'vertical' || options.direction === 'both') {
                const y = e.pageY - element.offsetTop;
                const walkY = (y - startY) * 2;
                element.scrollTop = scrollTop - walkY;
            }
        };

        element.addEventListener('mousedown', handleMouseDown as any);
        element.addEventListener('mouseleave', handleMouseLeave as any);
        element.addEventListener('mouseup', handleMouseUp as any);
        element.addEventListener('mousemove', handleMouseMove as any);

        // Set initial cursor
        element.style.cursor = 'grab';

        return () => {
            element.removeEventListener('mousedown', handleMouseDown as any);
            element.removeEventListener('mouseleave', handleMouseLeave as any);
            element.removeEventListener('mouseup', handleMouseUp as any);
            element.removeEventListener('mousemove', handleMouseMove as any);
            element.style.cursor = '';
            element.style.removeProperty('user-select');
        };
    }, [ref, isDragging, startX, startY, scrollLeft, scrollTop, options.direction]);

    return { isDragging };
}
