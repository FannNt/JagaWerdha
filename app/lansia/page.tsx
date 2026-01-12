"use client";

import { Heart, Activity, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";

export default function LansiaDashboard() {
    const { data: session } = useSession();

    const features = [
        {
            id: "scan",
            title: "Cek Gula Darah",
            desc: "Pantau gula darah harian Anda dengan mudah.",
            icon: Activity,
            href: "/lansia/glukosa",
            color: "text-sage",
            bgColor: "bg-dark-olive/10"
        },
        {
            id: "exercise",
            title: "Pelatih Olahraga",
            desc: "Panduan latihan fisik ringan untuk kebugaran.",
            icon: Heart,
            href: "/lansia/olahraga",
            color: "text-sage",
            bgColor: "bg-sage/10"
        },
        {
            id: "consult",
            title: "Konsultasi AI",
            desc: "Tanya jawab seputar kesehatan kapan saja.",
            icon: MessageSquare,
            href: "/lansia/konsultasi",
            color: "text-primary-dark", 
            bgColor: "bg-primary/10"
        }
    ];

    return (
        <div className="bg-background min-h-screen font-sans text-dark-slate">
            <Navbar />
        
            <main className="max-w-6xl mx-auto px-6 pt-38 pb-20">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif italic text-sage mb-4">
                        Selamat Datang, {session?.user?.name || "Bapak/Ibu"}
                    </h1>
                    <p className="text-lg text-dark-slate/60 font-light">
                        Pilih aktivitas yang ingin Anda lakukan hari ini.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Link href={feature.href} key={feature.id} className="group">
                            <div className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-sage/10 shadow-sm hover:shadow-xl hover:shadow-sage/10 transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1">
                                <div className={`w-20 h-20 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className={`w-10 h-10 ${feature.color}`} />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-dark-slate mb-3 group-hover:text-sage transition-colors">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-dark-slate/60 leading-relaxed mb-8 text-sm flex-grow">
                                    {feature.desc}
                                </p>

                                <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${feature.color}`}>
                                    <span>Mulai</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="text-center py-8 text-dark-slate/40 text-xs uppercase tracking-widest">
                © 2026 Jaga Werdha
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic&family=Inter:wght@300;400;500;600&display=swap');
                
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
