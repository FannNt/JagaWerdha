"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Lock, Eye, EyeOff, ArrowLeft, User, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowRoleModal(true);
  };

  const handleRoleSelect = (role: string) => {
    router.push(`/onboarding/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-sage border-b border-sage/10 pb-0.5 hover:text-sage transition-colors">
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sage to-sage/10 flex items-center justify-center shadow-2xl shadow-sage/20 mx-auto">
          <h2 className="text-white">ganti logo ler</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-light text-[#2F4F4F] mb-3 leading-tight">
            Mulai Hidup yang <span className="font-serif italic text-[#556B2F]">Lebih Bermakna</span>
          </h1>
          <p className="text-[#2F4F4F]/60 font-light text-sm max-w-[280px] mx-auto">
            Langkah kecil hari ini untuk kesehatan hari tua Anda nanti
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
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-0 py-4 bg-transparent border-b border-[#8A9A5B]/30 text-[#2F4F4F] placeholder-[#2F4F4F]/30 focus:border-[#8A9A5B] outline-none transition-all font-light text-lg"
                placeholder="Nama Lengkap"
                required
              />
              <User className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9A5B]/40 group-focus-within:text-[#8A9A5B] transition-colors" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
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
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-4 bg-transparent border-b border-[#8A9A5B]/30 text-[#2F4F4F] placeholder-[#2F4F4F]/30 focus:border-[#8A9A5B] outline-none transition-all font-light text-lg"
                placeholder="Buat Kata Sandi"
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

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-6"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="btn-shiny w-full py-5 bg-[#8A9A5B] text-white rounded-xl text-lg font-medium shadow-[0_15px_30px_-5px_rgba(138,154,91,0.25)] hover:bg-[#556B2F] transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Memproses..." : "Bergabung Sekarang"}
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
            Sudah bergabung sebelumnya?{" "}
            <Link href="/login">
              <span className="text-[#556B2F] font-semibold border-b border-[#556B2F]/20 hover:text-[#8A9A5B] transition-colors ml-1">
                Masuk di Sini
              </span>
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Role Selection Modal - Optimized */}
      <AnimatePresence>
        {showRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/[0.03] backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl shadow-[#8A9A5B]/10 p-10 md:p-14 text-center border border-[#8A9A5B]/5"
            >
              <h2 className="text-3xl font-light text-[#2F4F4F] mb-4">
                Pilih <span className="font-serif italic text-[#556B2F]">Peran Anda</span>
              </h2>
              <p className="text-[#2F4F4F]/60 font-light text-sm mb-12">
                Sesuaikan pengalaman Lansat Anda
              </p>

              <div className="grid gap-6">
                <button
                  onClick={() => handleRoleSelect("orangtua")}
                  className="group flex flex-col items-center p-8 bg-[#FDFDF5] rounded-[30px] border border-[#8A9A5B]/10 hover:border-[#8A9A5B]/40 transition-all text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#8A9A5B]/10 flex items-center justify-center mb-4 group-hover:bg-[#8A9A5B] group-hover:text-white transition-all">
                    <UserCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-medium text-[#556B2F] mb-1">Orang Tua</h3>
                  <p className="text-xs text-[#2F4F4F]/50 font-light">Saya ingin mengikuti panduan olahraga</p>
                </button>

                <button
                  onClick={() => handleRoleSelect("pendamping")}
                  className="group flex flex-col items-center p-8 bg-[#FDFDF5] rounded-[30px] border border-[#8A9A5B]/10 hover:border-[#8A9A5B]/40 transition-all text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#556B2F]/10 flex items-center justify-center mb-4 group-hover:bg-[#556B2F] group-hover:text-white transition-all">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-medium text-[#556B2F] mb-1">Pendamping</h3>
                  <p className="text-xs text-[#2F4F4F]/50 font-light">Saya ingin memantau kondisi orang tua</p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
