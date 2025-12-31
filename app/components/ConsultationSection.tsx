"use client";
import * as motion from "framer-motion/client";
import { MessageSquare, Sparkles, Heart, Apple, Moon, Activity, ArrowRight } from "lucide-react";

export default function ConsultationSection() {
    const topics = [
        { icon: Apple, label: "Gizi & Nutrisi" },
        { icon: Moon, label: "Pola Istirahat" },
        { icon: Activity, label: "Aktivitas Harian" },
        { icon: Heart, label: "Kesehatan Mental" },
    ];

    return (
        <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">            
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-20"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-px w-8 bg-light-brown/30" />
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-sage">Pendamping 24/7</span>
                        <div className="h-px w-8 bg-light-brown/30" />
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-dark-slate mb-8 tracking-tight leading-tight">
                        Konsultasi Personal <br />
                        <span className="font-serif italic text-sage">Hanya Untuk Anda</span>
                    </h2>

                    <p className="text-base md:text-lg text-dark-slate/60 font-light leading-relaxed max-w-2xl mx-auto">
                        Tanyakan apa saja seputar kesehatan harian Anda. Asisten cerdas kami siap 
                        menangani kekhawatiran Anda dengan empati dan data yang akurat.
                    </p>
                </motion.div>

                {/* Kategori */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 w-full">
                    {topics.map((topic, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-6 bg-white/40 rounded-3xl border border-sage/10 backdrop-blur-sm group hover:bg-white transition-all shadow-sm"
                        >
                            <topic.icon className="w-6 h-6 text-sage/60 group-hover:text-sage mx-auto mb-3 transition-colors" />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-slate/40 group-hover:text-dark-slate transition-colors">
                                {topic.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <button className="btn-shiny flex items-center gap-3 px-10 md:px-12 py-4 md:py-5 bg-sage text-white rounded-xl text-lg font-bold shadow-2xl shadow-sage/20 transition-all">
                        Mulai Konsultasi
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
