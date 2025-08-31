import {ABOUT_SECTION_KEYS} from "@/application/messages/messages.ts";

import AnimatedCounter from "@/components/AnimatedCounter.tsx";

import useTranslation from "@/hooks/useTranslation.ts";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver.ts";


export default function AboutSection() {
    const {t} = useTranslation();
    const {ref, isIntersecting} = useIntersectionObserver({
        threshold: 0.3,
        triggerOnce: true
    });

    return (
        <section
            id="about"
            className="section-padding bg-white"
            ref={ref}
        >
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {t(ABOUT_SECTION_KEYS.aboutTitle)}
                        </h2>

                        <div className="space-y-4 text-gray-700">
                            <p>
                                {t(ABOUT_SECTION_KEYS.foundedDescription)}
                            </p>

                            <p>
                                {t(ABOUT_SECTION_KEYS.missionDescription)}
                            </p>

                            <p>
                                {t(ABOUT_SECTION_KEYS.teamDescription)}
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <AnimatedCounter
                                endValue={5000}
                                suffix="+"
                                label={t(ABOUT_SECTION_KEYS.successfulMoves)}
                                trigger={isIntersecting}
                                duration={2000}
                            />

                            <AnimatedCounter
                                endValue={8}
                                suffix="+"
                                label={t(ABOUT_SECTION_KEYS.yearsExperience)}
                                trigger={isIntersecting}
                                duration={1500}
                            />
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <div className="relative rounded-lg overflow-hidden h-80 md:h-96 shadow-lg">
                            <img
                                src="/images/c4abfbfc-1ac0-4bfb-aafe-63f6760a059a.png"
                                alt={t(ABOUT_SECTION_KEYS.teamAltText)}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-10">
                                <div className="px-4 py-2 text-center">
                                    <p className="font-bold text-xl md:text-2xl lg:text-3xl text-primary"
                                       style={{
                                           textShadow: '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white',
                                       }}>
                                        {t(ABOUT_SECTION_KEYS.slogan)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}