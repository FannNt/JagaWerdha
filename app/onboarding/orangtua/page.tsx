"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Check, Copy, Plus, Send, User, Bot, Calendar, Activity } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
  delay?: number;
};

const presetDiseases = ["Diabetes", "Hipertensi", "Jantung", "Stroke", "Asma", "Arthritis"];

export default function OnboardingOrangTuaChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // User Data State
  const [age, setAge] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [customDisease, setCustomDisease] = useState("");
  const [q1, setQ1] = useState(""); // Frequency
  const [q2, setQ2] = useState(""); // Breathless
  const [q3, setQ3] = useState(""); // Goal
  const [uniqueCode] = useState(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  });
  const [copied, setCopied] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      handleBotResponse("Halo! Saya asisten Lansat Anda. Senang sekali bisa membantu Anda memulai perjalanan hidup sehat. 😊", 0);
      handleBotResponse("Sebelum kita mulai, saya ingin mengenal Anda sedikit lebih baik. Berapa usia Anda saat ini?", 1000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleBotResponse = (content: string | React.ReactNode, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: Math.random().toString(),
        type: "bot",
        content,
      });
    }, delay);
  };

  const handleUserAnswer = (content: string, nextAction: () => void) => {
    addMessage({
      id: Math.random().toString(),
      type: "user",
      content,
    });
    nextAction();
  };

  const nextStep = (step: number) => {
    switch (step) {
      case 0: // After Age
        handleBotResponse("Terima kasih. Selanjutnya, apakah Anda memiliki riwayat penyakit tertentu yang perlu kami ketahui?", 1000);
        setCurrentStep(1);
        break;
      case 1: // After Medical History
        handleBotResponse("Baik, catatan kesehatan Anda sudah saya simpan. Sekarang, ada 3 pertanyaan singkat mengenai aktivitas olahraga Anda.", 1000);
        handleBotResponse("Pertama: Seberapa sering Anda beraktivitas fisik (seperti jalan santai) dalam seminggu terakhir?", 2000);
        setCurrentStep(2);
        break;
      case 2: // After Q1
        handleBotResponse("Mengerti. Pertanyaan kedua: Apakah Anda sering merasa sesak napas saat berjalan kaki selama 10 menit?", 1000);
        setCurrentStep(3);
        break;
      case 3: // After Q2
        handleBotResponse("Terakhir: Apa tujuan utama Anda ingin berolahraga?", 1000);
        setCurrentStep(4);
        break;
      case 4: // Final
        handleBotResponse("Luar biasa! Terima kasih atas informasinya. Semua data telah kami sesuaikan untuk program latihan Anda.", 1000);
        handleBotResponse(
          <div className="flex flex-col items-center gap-4">
            <span>Pendaftaran selesai! Ini adalah kode unik Anda untuk dibagikan kepada pendamping/anak Anda:</span>
            <div className="bg-white p-4 rounded-2xl border border-[#8A9A5B]/20 w-full flex items-center justify-between shadow-sm mt-2 relative overflow-hidden group">
              <span className="text-2xl font-bold tracking-widest text-[#556B2F]">{uniqueCode}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(uniqueCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-2 text-[#8A9A5B] hover:bg-[#8A9A5B]/10 rounded-xl transition-colors"
              >
                <div className="relative w-5 h-5">
                   <Copy className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
                   <Check className={`w-5 h-5 absolute inset-0 transition-all duration-300 text-green-500 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                </div>
              </button>
            </div>
          </div>, 
          2000
        );
        setCurrentStep(5);
        setIsComplete(true);
        break;
    }
  };

  const toggleDisease = (disease: string) => {
    setSelectedDiseases(prev => 
      prev.includes(disease) ? prev.filter(d => d !== disease) : [...prev, disease]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDF5] flex flex-col items-center justify-between h-screen overflow-hidden">
      {/* Header */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-6 border-b border-sage/10 bg-white/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-medium text-dark-slate">Persiapan Akun</h1>
            <p className="text-[10px] tracking-widest text-sage font-bold uppercase">Asisten Lansat</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 w-full max-w-2xl overflow-y-auto px-6 py-8 space-y-6 scrollbar-none">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"} items-end gap-3`}
            >
              {msg.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-sage/20 flex-shrink-0">
                  <Bot className="w-4 h-4 text-sage" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.type === "bot"
                    ? "bg-white text-dark-slate shadow-sm border border-sage/5 rounded-bl-none"
                    : "bg-sage text-white shadow-sage/20 shadow-lg rounded-br-none"
                }`}
              >
                {msg.content}
              </div>
              {msg.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-sage/20 flex-shrink-0">
                  <User className="w-4 h-4 text-sage" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#F5F5DC] flex items-center justify-center border border-[#8A9A5B]/20">
                <Bot className="w-4 h-4 text-[#8A9A5B]" />
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#8A9A5B]/5 rounded-bl-none">
                <div className="flex gap-1">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input / Control Area */}
      <div className="w-full max-w-2xl p-6 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)] border-t border-sage/10 relative z-20">
        <div className="max-w-xl mx-auto">
          {currentStep === 0 && !isTyping && (
            <div className="flex gap-3">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && age && handleUserAnswer(`${age} Tahun`, () => nextStep(0))}
                className="flex-1 bg-white border border-sage/20 rounded-2xl px-6 py-4 outline-none focus:border-sage transition-all"
                placeholder="Masukkan usia Anda..."
              />
              <button
                disabled={!age}
                onClick={() => handleUserAnswer(`${age} Tahun`, () => nextStep(0))}
                className="btn-shiny w-14 h-14 bg-[#8A9A5B] text-white rounded-2xl flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          )}

          {currentStep === 1 && !isTyping && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {presetDiseases.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleDisease(d)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      selectedDiseases.includes(d)
                        ? "bg-sage border-sage text-white"
                        : "bg-white border-sage/20 text-sage/60"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={customDisease}
                  onChange={(e) => setCustomDisease(e.target.value)}
                  className="flex-1 bg-[#FDFDF5] border border-[#8A9A5B]/20 rounded-2xl px-6 py-4 outline-none focus:border-[#8A9A5B] text-sm"
                  placeholder="Kondisi lain (jika ada)..."
                />
                <button
                  onClick={() => {
                    const finalSelection = [...selectedDiseases];
                    if (customDisease) finalSelection.push(customDisease);
                    const ans = finalSelection.length > 0 ? finalSelection.join(", ") : "Tidak ada";
                    handleUserAnswer(ans, () => nextStep(1));
                  }}
                  className="btn-shiny px-8 bg-[#8A9A5B] text-white rounded-2xl text-sm font-medium"
                >
                  Kirim
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && !isTyping && (
            <div className="grid grid-cols-2 gap-3">
              {["Hampir Setiap Hari", "3-4 Kali Seminggu", "1-2 Kali Seminggu", "Jarang Sekali"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleUserAnswer(opt, () => nextStep(2))}
                  className="p-4 bg-white border border-[#8A9A5B]/20 rounded-2xl text-xs text-[#2F4F4F] hover:bg-[#8A9A5B]/5 transition-all text-center"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && !isTyping && (
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleUserAnswer("Ya, sering", () => nextStep(3))}
                className="btn-shiny flex-1 py-4 bg-[#8A9A5B] text-white rounded-2xl font-medium"
              >
                Ya
              </button>
              <button
                onClick={() => handleUserAnswer("Tidak pernah", () => nextStep(3))}
                className="flex-1 py-4 bg-white border border-[#8A9A5B]/30 text-[#8A9A5B] rounded-2xl font-medium"
              >
                Tidak
              </button>
            </div>
          )}

          {currentStep === 4 && !isTyping && (
            <div className="flex gap-3">
              <input
                type="text"
                value={q3}
                onChange={(e) => setQ3(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && q3 && handleUserAnswer(q3, () => nextStep(4))}
                className="flex-1 bg-[#FDFDF5] border border-[#8A9A5B]/20 rounded-2xl px-6 py-4 outline-none focus:border-[#8A9A5B] text-sm"
                placeholder="Contoh: Menjaga kelenturan tubuh..."
              />
              <button
                disabled={!q3}
                onClick={() => handleUserAnswer(q3, () => nextStep(4))}
                className="btn-shiny w-14 h-14 bg-[#8A9A5B] text-white rounded-2xl flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <Link href="/" className="block">
              <button className="btn-shiny w-full py-5 bg-sage text-white rounded-2xl text-lg font-medium shadow-lg shadow-sage/20">
                Selesai & Masuk Beranda
              </button>
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%" }}
            className="fixed bottom-24 left-1/2 p-4 bg-[#2F4F4F] text-white rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-sm">Kode Berhasil Disalin!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
