import Header from "@/components/Header.tsx";
import HeroSection from "@/components/HeroSection.tsx";
import AboutSection from "@/components/AboutSection.tsx";
import ServicesSection from "@/components/ServicesSection.tsx";
import WhyChooseUsSection from "@/components/WhyChooseUsSection.tsx";
import ProcessSection from "@/components/ProcessSection.tsx";
import ReviewSection from "@/components/ReviewSection.tsx";
import ContactSection from "@/components/ContactSection.tsx";
import Footer from "@/components/Footer.tsx";
import {useEffect} from "react";

export default function Index() {
    useEffect(() => {
        const handleHashNavigation = () => {
            const hash = window.location.hash;
            if (hash) {
                const elementId = hash.substring(1);
                const element = document.getElementById(elementId);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        };

        handleHashNavigation();

        window.addEventListener('hashchange', handleHashNavigation);

        return () => {
            window.removeEventListener('hashchange', handleHashNavigation);
        };
    }, []);

    return (
        <div className={"min-h-screen"}>
            <Header/>
            <HeroSection/>
            <AboutSection/>
            <ServicesSection/>
            <WhyChooseUsSection/>
            <ProcessSection/>
            <ReviewSection/>
            <ContactSection/>
            <Footer/>
        </div>
    );
}