"use client";
import * as motion from "framer-motion/client";
import { Scan, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ScanSection() {
    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 bg-sage/10 rounded-2xl border border-sage/20 flex items-center justify-center mb-8 relative group"
                >
                    <Scan className="w-8 h-8 text-sage group-hover:scale-110 transition-transform" />
                    <motion.div 
                        animate={{ top: ["10%", "90%", "10%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-3 right-3 h-0.5 bg-sage/60 blur-[1px]"
                    />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div className="w-8 h-px bg-light-brown/20" />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-sage">Analisis Kesehatan AI</span>
                    <div className="w-8 h-px bg-light-brown/20" />
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl lg:text-6xl font-light text-dark-slate mb-8 leading-[1.15]"
                >
                    Pahami Kondisi <br />
                    <span className="font-serif italic text-sage tracking-tight">Otot & Sendi Anda</span>
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-base md:text-lg text-dark-slate/60 font-light leading-relaxed mb-16 max-w-2xl"
                >
                    AI Lansat membimbing Anda melalui panduan visual untuk mendeteksi area sensitif 
                    dan memberikan rekomendasi aktivitas yang paling aman untuk tubuh.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-16 w-full max-w-2xl">
                    {[
                        { title: "Deteksi Gerak", desc: "Akurasi tinggi pemindaian AI" },
                        { title: "Titik Pegal", desc: "Identifikasi area sensitif" },
                        { title: "Saran Aktivitas", desc: "Latihan yang dipersonalisasi" },
                        { title: "Laporan Instan", desc: "Hasil analisis dalam hitungan detik" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="p-6 bg-white/40 rounded-[24px] border border-sage/10 text-center backdrop-blur-sm group hover:bg-white transition-all shadow-sm"
                      >
                        <h4 className="text-sm font-bold text-dark-slate mb-1">{item.title}</h4>
                        <p className="text-[11px] text-dark-slate/40 flex items-center justify-center gap-1">
                            <Sparkles className="w-3 h-3 text-sage/40" />
                            {item.desc}
                        </p>
                      </motion.div>
                    ))}
                </div>

                <Link href="/register">
                    <motion.button 
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-shiny px-10 md:px-12 py-4 bg-sage text-white rounded-xl text-lg font-medium shadow-2xl shadow-sage/20 flex items-center gap-3 transition-all"
                    >
                        Coba Scanning Sekarang
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </Link>
            </div>
        </section>
    );
}
