"use client";

import { motion } from "framer-motion";
import { Activity, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const exercises = [
    {
        id: "marching",
        name: "Jalan di Tempat",
        desc: "Tingkatkan stamina dan koordinasi dengan gerakan ringan.",
        tag: "Kardio Ringan",
        color: "text-sage",
        href: "/lansia/olahraga/marching"
    },
    {
        id: "knee-lifts",
        name: "Angkat Lutut",
        desc: "Latih fleksibilitas pinggul secara perlahan.",
        tag: "Mobilitas",
        color: "text-dark-olive",
        href: "/lansia/olahraga/knee-lifts"
    },
    {
        id: "arm-circles",
        name: "Putar Lengan",
        desc: "Jaga kelenturan sendi bahu Anda.",
        tag: "Fleksibilitas",
        color: "text-[#2F4F4F]",
        href: "/lansia/olahraga/arm-circles"
    },
    {
        id: "sit-to-stand",
        name: "Duduk Berdiri",
        desc: "Latih kekuatan otot kaki dan keseimbangan tubuh.",
        tag: "Kekuatan",
        color: "text-[#556B2F]",
        href: "/lansia/olahraga/sit-to-stand"
    },
];

export default function ExerciseSelection() {
    return (
        <div className="min-h-screen bg-[#FDFDF5]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-10 md:px-24 pt-40 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-10 bg-sage" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-sage">Pendamping Olahraga</span>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-light text-dark-slate leading-[0.95] tracking-tighter mb-12">
                        Gerak Tubuh, <br />
                        <span className="font-serif italic text-sage leading-tight">Jiwa Berdaya</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-dark-slate/50 max-w-2xl font-light leading-relaxed">
                        Pilih latihan yang sesuai dengan kondisi fisik Anda hari ini. Semua gerakan didesain aman untuk usia lanjut.
                    </p>
                    <Link href="/lansia/olahraga/riwayat" className="inline-block mt-8">
                        <button className="px-8 py-4 bg-sage/10 text-sage rounded-[32px] text-lg font-bold hover:bg-sage/20 transition-all flex items-center gap-3">
                            <Activity className="w-5 h-5" />
                            Lihat Riwayat Latihan
                        </button>
                    </Link>
                </motion.div>

                <div className="space-y-0 divide-y divide-sage/10 border-y border-sage/10">
                    {exercises.map((ex, i) => (
                        <motion.div
                            key={ex.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-sage/[0.02] px-6 transition-all"
                        >
                            <div className="max-w-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Activity className={`w-4 h-4 ${ex.color}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${ex.color} opacity-60`}>{ex.tag}</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-light text-dark-slate mb-4 tracking-tight">{ex.name}</h3>
                                <p className="text-lg text-dark-slate/40 font-light">{ex.desc}</p>
                            </div>
                            <Link href={ex.href}>
                                <button className="flex items-center gap-6 group/btn">
                                    <span className="text-xl font-serif italic text-dark-slate border-b border-dark-slate/10 pb-2 group-hover/btn:border-sage transition-all">
                                        Pilih Latihan
                                    </span>
                                    <div className="w-16 h-16 rounded-full border border-dark-slate/10 flex items-center justify-center group-hover/btn:bg-sage group-hover/btn:text-white transition-all">
                                        <ChevronRight className="w-8 h-8" />
                                    </div>
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic&family=Inter:wght@100..900&display=swap');
        .font-serif { font-family: 'Instrument Serif', serif; }
      `}</style>
        </div>
    );
}
