"use client";

import { motion } from "framer-motion";
import { Heart, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Back  */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-[#556B2F]/60 border-b border-[#556B2F]/10 pb-0.5 hover:text-[#556B2F] transition-colors">
              <ArrowLeft className="w-3 h-3" /> Kembali ke Beranda
            </button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8A9A5B] to-[#556B2F] flex items-center justify-center shadow-2xl shadow-[#8A9A5B]/20 mx-auto">
            <h2 className="text-white">ganti logo ler</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-light text-[#2F4F4F] mb-3 leading-tight">
            Selamat <span className="font-serif italic text-[#556B2F]">Datang Kembali</span>
          </h1>
          <p className="text-[#2F4F4F]/60 font-light text-sm">
            Masuk untuk memantau kesehatan Anda
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-4 bg-transparent border-b border-[#8A9A5B]/30 text-[#2F4F4F] placeholder-[#2F4F4F]/30 focus:border-[#8A9A5B] outline-none transition-all font-light text-lg"
                placeholder="Alamat Email"
                required
              />
              <Mail className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9A5B]/40 group-focus-within:text-[#8A9A5B] transition-colors" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-4 bg-transparent border-b border-[#8A9A5B]/30 text-[#2F4F4F] placeholder-[#2F4F4F]/30 focus:border-[#8A9A5B] outline-none transition-all font-light text-lg"
                placeholder="Kata Sandi"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-[#8A9A5B]/40 hover:text-[#556B2F]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#8A9A5B]/40 hover:text-[#556B2F]" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-between items-center"
          >
            <Link href="#" className="text-xs text-[#556B2F]/60 hover:text-[#556B2F] transition-colors font-medium underline underline-offset-4 decoration-[#556B2F]/10">
              Lupa kata sandi?
            </Link>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-4"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="btn-shiny w-full py-5 bg-[#8A9A5B] text-white rounded-xl text-lg font-medium shadow-[0_15px_30px_-5px_rgba(138,154,91,0.25)] hover:bg-[#556B2F] transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Menyambungkan..." : "Masuk ke Akun"}
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10"
        >
          <p className="text-[#2F4F4F]/50 text-sm font-light">
            Belum mempunyai akun?{" "}
            <Link href="/register">
              <span className="text-[#556B2F] font-semibold border-b border-[#556B2F]/20 hover:text-[#8A9A5B] transition-colors ml-1">
                Daftar Sekarang
              </span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
