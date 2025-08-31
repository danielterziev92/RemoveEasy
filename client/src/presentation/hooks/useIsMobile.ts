import {useEffect, useState} from "react";

const MOBILE_BREAKPOINT = 768

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => {
        // Lazy initial state
        if (typeof window !== 'undefined') {
            return window.innerWidth < MOBILE_BREAKPOINT;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const onChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        mql.addEventListener("change", onChange);

        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
}