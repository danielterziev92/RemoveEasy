import {useEffect, useRef, useState} from "react";

interface UseCountAnimationOptions {
    start?: number;
    end: number;
    duration?: number;
    suffix?: string;
    trigger?: boolean;
}

export function useCountAnimation({
                                      start = 0,
                                      end,
                                      duration = 2000,
                                      suffix = '',
                                      trigger = true
                                  }: UseCountAnimationOptions) {
    const [count, setCount] = useState(start);
    const [isAnimating, setIsAnimating] = useState(false);
    const frameRef = useRef<number | undefined>(undefined);
    const startTimeRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!trigger) return;

        setIsAnimating(true);
        startTimeRef.current = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - (startTimeRef.current || now);
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smoother animation
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
            const easedProgress = easeOutCubic(progress);

            const currentCount = Math.floor(start + (end - start) * easedProgress);
            setCount(currentCount);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setCount(end);
                setIsAnimating(false);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [start, end, duration, trigger]);

    const displayValue = count === end && suffix ? `${count}${suffix}` : count.toString();

    return {count, displayValue, isAnimating};
}
