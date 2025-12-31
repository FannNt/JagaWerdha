"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background selection:bg-sage/20 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[10%] left-[5%] w-64 h-64 bg-sage/5 rounded-full blur-[80px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-dark-olive/5 rounded-full blur-[100px] pointer-events-none" 
      />

      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 text-center mx-auto pt-20">
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-8 md:mb-10"
          >
            <div className="h-px w-6 md:w-8 bg-light-brown/30" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-sage">
              Pendamping Kesehatan Terpercaya
            </span>
            <div className="h-px w-6 md:w-8 bg-light-brown/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8 md:mb-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-sage leading-[1.1] tracking-tight">
              Kesehatan Terbaik di<br />
              <span className="font-serif font italic text-dark-olive">Masa Keemasan</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-base md:text-xl text-dark-slate/60 max-w-2xl leading-relaxed mb-12 md:mb-16 font-light"
          >
            Lansat menghadirkan panduan yang tenang dan terukur untuk menjaga kebugaran, 
            dirancang khusus agar nyaman bagi pandangan dan mudah diikuti oleh ayah dan ibu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <Link href="/register">
              <motion.button
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shiny group px-10 md:px-14 py-4 md:py-5 bg-sage text-white rounded-xl text-lg md:text-xl font-medium shadow-2xl shadow-sage/20 transition-all duration-300 flex items-center gap-3"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>         
            <Link href="/login">
              <span className="text-sm text-sage/60 border-b border-sage/10 pb-0.5 hover:text-sage transition-colors cursor-pointer capitalize font-medium">
                Sudah punya akun? Masuk
                </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

