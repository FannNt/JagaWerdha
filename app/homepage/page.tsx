import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/Homepage/HeroSection";
import ScanSection from "@/app/components/Homepage/ScanSection";
import EventSection from "@/app/components/Homepage/EventSection";
import ConsultationSection from "@/app/components/Homepage/ConsultationSection";
import Footer from "@/app/components/Homepage/Footer";

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
