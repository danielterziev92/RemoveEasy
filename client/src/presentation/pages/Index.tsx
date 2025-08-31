import Header from "@/components/Header.tsx";
import HeroSection from "@/components/HeroSection.tsx";
import AboutSection from "@/components/AboutSection.tsx";
import ServicesSection from "@/components/ServicesSection.tsx";
import WhyChooseUsSection from "@/components/WhyChooseUsSection.tsx";
import ProcessSection from "@/components/ProcessSection.tsx";
import ReviewSection from "@/components/ui/ReviewSection.tsx";
import ContactSection from "@/components/ContactSection.tsx";

export default function Index() {
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
        </div>
    );
}