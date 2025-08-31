import Header from "@/components/Header.tsx";
import HeroSection from "@/components/HeroSection.tsx";

export default function Index() {
    return (
        <div className={"min-h-screen"}>
            <Header/>
            <HeroSection/>
        </div>
    );
}