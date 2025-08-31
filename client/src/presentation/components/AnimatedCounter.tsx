import {Card} from "@/components/ui/card.tsx";

import {useCountAnimation} from "@/hooks/useCountAnimation.ts";

interface AnimatedCounterProps {
    endValue: number;
    suffix?: string;
    label: string;
    trigger: boolean;
    duration?: number;
}

export default function AnimatedCounter({
                                            endValue,
                                            suffix = '',
                                            label,
                                            trigger,
                                            duration = 2000
                                        }: AnimatedCounterProps) {
    const {displayValue, isAnimating} = useCountAnimation({
        start: 1,
        end: endValue,
        duration,
        suffix,
        trigger
    });

    return (
        <Card className="p-4 text-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
            <p className={`text-4xl font-bold text-primary transition-all duration-300 ${
                isAnimating ? 'scale-105' : 'scale-100'
            }`}>
                {displayValue}
            </p>
            <p className="text-sm mt-1">{label}</p>
        </Card>
    );
}
