"use client";

import { motion } from "framer-motion";
import { Heart, Mail, MapPin, Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EBF4DD]">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4">
          {/* Lanxia */}
          <div className="md:col-span-3 bg-white/60 backdrop-blur-xl p-8 rounded-xl border border-sage/10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-500">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold text-dark-slate tracking-tight">
                  Lansat
                </h2>
              </div>
              <p className="text-dark-slate/60 max-w-md leading-relaxed mb-10 text-lg font-medium">
                Membimbing langkah Anda di masa keemasan dengan ketenangan dan perhatian yang tulus. Menjaga kesehatan bukan lagi beban, melainkan perjalanan yang menyenangkan bersama keluarga.
              </p>
            </div>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a 
                  whileHover={{ y: -3, scale: 1.1 }}
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white border border-[#8A784E]/10 flex items-center justify-center text-[#8A784E] hover:bg-[#8A784E] hover:text-white transition-all shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 bg-sage p-10 md:p-12 rounded-xl text-white flex flex-col justify-between shadow-sm overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="font-bold text-sm mb-10 opacity-70 uppercase tracking-[0.2em]">Eksplorasi</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {["Program Latihan", "Layanan Konsultasi", "Event Komunitas", "Tentang Kami", "Pusat Bantuan", "Kontak"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/80 hover:text-white transition-all flex items-center justify-between group/link text-lg font-medium">
                      {item} 
                      <ArrowRight className="w-5 h-5 -translate-x-4 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="bg-white/40 backdrop-blur-md px-10 py-6 rounded-3xl border border-[#8A784E]/5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 rounded-full bg-[#8A784E]/10 border border-[#8A784E]/10">
               <span className="text-[10px] font-bold text-[#8A784E] uppercase tracking-widest">2025</span>
             </div>
             <p className="text-sm font-medium text-dark-slate/40">
               Lansat Indonesia • Dedikasi untuk Lansia Sehat
             </p>
          </div>
          <div className="flex gap-8">
            {["Kebijakan Privasi", "Syarat & Ketentuan"].map((text) => (
              <Link key={text} href="#" className="text-xs font-bold text-[#8A784E]/60 hover:text-[#8A784E] uppercase tracking-widest transition-colors">
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
