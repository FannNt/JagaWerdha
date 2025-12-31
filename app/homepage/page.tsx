import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ScanSection from "@/app/components/ScanSection";
import EventSection from "@/app/components/EventSection";
import ConsultationSection from "@/app/components/ConsultationSection";
import Footer from "@/app/components/Footer";

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroSection />
            <ScanSection />
            <EventSection />
            <ConsultationSection />
            <Footer />
        </div>
    );
}
