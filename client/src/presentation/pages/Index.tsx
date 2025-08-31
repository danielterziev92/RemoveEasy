import Header from "@/components/Header.tsx";
import HeroSection from "@/components/HeroSection.tsx";
import AboutSection from "@/components/AboutSection.tsx";
import ServicesSection from "@/components/ServicesSection.tsx";

export default function Index() {
    return (
        <div className={"min-h-screen"}>
            <Header/>
            <HeroSection/>
            <AboutSection/>
            <ServicesSection/>
        </div>
    );
}