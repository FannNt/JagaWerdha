"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Activity, MessageSquare, ChevronRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";
import { useRef } from "react";

export default function LansiaDashboard() {
    const { data: session } = useSession();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

    const features = [
        {
            id: "scan",
            title: "Cek Gula Darah",
            tag: "Kesehatan Anda",
            desc: "Lakukan pemantauan glukosa harian secara instan melalui kamera ponsel Anda tanpa perlu rasa sakit.",
            icon: Activity,
            href: "/lansia/glukosa",
            theme: "text-sage",
            bg: "bg-[#F4F7EB]"
        },
        {
            id: "exercise",
            title: "Pelatih Olahraga",
            tag: "Kekuatan Otot",
            desc: "Latihan fisik ringan yang dipandu oleh asisten digital untuk menjaga mobilitas dan keseimbangan tubuh.",
            icon: Heart,
            href: "/lansia/olahraga",
            theme: "text-[#556B2F]",
            bg: "bg-[#EDF2E4]"
        },
        {
            id: "consult",
            title: "Konsultasi AI",
            tag: "Dukungan 24/7",
            desc: "Diskusi ringan seputar kesehatan Anda kapan saja dengan asisten cerdas yang ramah bagi lansia.",
            icon: MessageSquare,
            href: "/lansia/konsultasi",
            theme: "text-[#2F4F4F]",
            bg: "bg-[#E6EBDD]"
        }
    ];

    return (
        <div ref={containerRef} className="bg-[#FDFDF5] min-h-screen selection:bg-sage/20">
            <Navbar />

            {/* Hero Section - Direct from Image 2 */}
            <section className="relative h-screen flex flex-col justify-center px-10 md:px-24 overflow-hidden">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="max-w-4xl pt-20"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-10 bg-dark-slate" />
                        <span className="text-xs uppercase tracking-[0.4em] font-bold text-dark-slate">Eksperiens Lansat</span>
                    </div>

                    <h1 className="text-6xl md:text-[110px] font-medium text-dark-slate leading-[0.95] tracking-tight mb-12">
                        Menua dengan <br />
                        <span className="font-serif italic text-sage">Kecerdasan & Kekuatan</span>
                    </h1>

                    <div className="space-y-4 mb-16">
                        <p className="text-2xl md:text-3xl text-dark-slate/60 font-light">
                            Selamat datang, <span className="font-medium text-dark-slate">{session?.user?.name || "Bapak/Ibu"}</span>.
                        </p>
                        <p className="text-xl md:text-2xl text-dark-slate/50 max-w-2xl font-light leading-relaxed">
                            Kami telah merancang dashboard ini untuk memudahkan setiap langkah kesehatan Anda hari ini.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-dark-slate/30">Gulir Jelajahi</span>
                        <motion.div
                            animate={{ height: [40, 80, 40] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-px bg-dark-slate/20"
                        />
                    </div>
                </motion.div>

                {/* Dynamic Background Circle */}
                <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-sage/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* Feature Flow - Massive, Non-card Design */}
            <div className="pb-32">
                {features.map((feature, index) => (
                    <section
                        key={feature.id}
                        className={`relative min-h-[80vh] flex flex-col justify-center px-10 md:px-24 py-24 ${feature.bg} overflow-hidden`}
                    >
                        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-1 border-l-2 border-sage/20 pl-6 h-full flex flex-col justify-center">
                                <span className="text-3xl font-serif italic text-sage/40">0{index + 1}</span>
                            </div>

                            <div className="md:col-span-7">
                                <div className="flex items-center gap-3 mb-6">
                                    <feature.icon className={`w-6 h-6 ${feature.theme}`} />
                                    <span className={`text-xs uppercase tracking-[0.3em] font-black ${feature.theme} opacity-60`}>
                                        {feature.tag}
                                    </span>
                                </div>
                                <h2 className="text-5xl md:text-8xl font-light text-dark-slate mb-8 tracking-tighter transition-all">
                                    {feature.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-dark-slate/50 font-light leading-relaxed mb-12 max-w-xl">
                                    {feature.desc}
                                </p>

                                <Link href={feature.href}>
                                    <motion.button
                                        whileHover={{ x: 20 }}
                                        className={`flex items-center gap-6 group`}
                                    >
                                        <span className="text-2xl font-serif italic text-dark-slate border-b border-dark-slate/10 pb-2 group-hover:border-sage transition-all">
                                            Mulai Sekarang
                                        </span>
                                        <div className="w-16 h-16 rounded-full border border-dark-slate/10 flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-all">
                                            <ChevronRight className="w-8 h-8" />
                                        </div>
                                    </motion.button>
                                </Link>
                            </div>

                            <div className="hidden md:block md:col-span-4 opacity-5">
                                <feature.icon className="w-full h-full" />
                            </div>
                        </div>

                        {/* Subtle decorative text */}
                        <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[20vw] font-serif italic text-dark-slate/[0.02] pointer-events-none whitespace-nowrap">
                            {feature.title}
                        </div>
                    </section>
                ))}
            </div>

            {/* Footer - Elegant Summary */}
            <footer className="bg-dark-slate text-white/90 py-32 px-10 md:px-24">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="max-w-md">
                        <h2 className="text-5xl md:text-6xl font-serif italic text-sage mb-8">Lansat.</h2>
                        <p className="text-xl font-light leading-relaxed text-white/40 mb-12">
                            Privasi dan kenyamanan Anda adalah prioritas kami. Semua data kesehatan tersimpan secara aman melalui enkripsi tingkat tinggi.
                        </p>
                        <div className="flex gap-8">
                            <button className="text-xs uppercase tracking-widest font-bold border-b border-white/20 pb-2 hover:border-sage transition-all">Tentang Kami</button>
                            <button className="text-xs uppercase tracking-widest font-bold border-b border-white/20 pb-2 hover:border-sage transition-all">Pusat Bantuan</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-end text-right">
                        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-sage mb-2">Developed by</p>
                        <p className="text-2xl font-light tracking-tighter">Team JagaWerdha</p>
                        <div className="mt-20 flex flex-col items-end gap-2">
                            <span className="text-[10px] opacity-40 uppercase tracking-widest">© 2026 Lansat Project.</span>
                            <span className="text-[10px] opacity-40 uppercase tracking-widest">All health data is persisted via Prisma.</span>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic&family=Inter:wght@100..900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .font-serif {
          font-family: 'Instrument Serif', serif;
        }
      `}</style>
        </div>
    );
}
