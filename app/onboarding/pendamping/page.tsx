"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Check, Search, User, Bot, Send, Loader2, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
};

export default function OnboardingPendampingChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // User States
  const [age, setAge] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [parentFound, setParentFound] = useState<{ name: string; age: number } | null>(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      handleBotResponse("Halo! Senang bertemu dengan Anda. Saya asisten pendamping Lansat untuk mempermudah Anda memantau kesehatan keluarga. 😊", 0);
      handleBotResponse("Sebelum kita mulai, boleh tahu berapa usia Anda?", 1000);
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
        handleBotResponse("Baik, terima kasih. Sekarang, silakan masukkan kode unik 8 karakter dari orang tua yang ingin Anda dampingi.", 1000);
        setCurrentStep(1);
        break;
      case 1: // After Verification
        handleBotResponse("Hebat! Anda sekarang sudah terhubung. Anda bisa mulai memantau laporan aktivitas dan kesehatan harian mereka melalui dashboard.", 1000);
        setCurrentStep(2);
        break;
    }
  };

  const handleSearchParent = async () => {
    if (!uniqueCode || uniqueCode.length < 8) return;
    
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSearching(false);
    
    // Simulate finding parent
    const foundParent = { name: "Bapak Budi", age: 68 };
    setParentFound(foundParent);
    
    addMessage({
      id: Math.random().toString(),
      type: "user",
      content: `Kode: ${uniqueCode}`,
    });

    handleBotResponse(
      <div className="flex flex-col gap-4">
        <p>Saya menemukan akun yang cocok:</p>
        <div className="bg-white p-4 rounded-2xl border border-sage/20 w-full flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-sage" />
          </div>
          <div className="text-left">
            <p className="font-medium text-[#2F4F4F]">{foundParent.name}</p>
            <p className="text-xs text-[#2F4F4F]/50">{foundParent.age} Tahun</p>
          </div>
        </div>
        <p>Apakah ini data keluarga yang Anda cari?</p>
      </div>,
      500
    );
    setCurrentStep(1.5); // Waiting for confirmation
  };

  return (
    <div className="min-h-screen bg-[#FDFDF5] flex flex-col items-center justify-between h-screen overflow-hidden">
      {/* Header */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-6 border-b border-sage/10 bg-white/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-medium text-[#2F4F4F]">Persiapan Akun</h1>
            <p className="text-[10px] tracking-widest text-sage font-bold uppercase">Asisten Pendamping</p>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div ref={scrollRef} className="flex-1 w-full max-w-2xl overflow-y-auto px-6 py-8 space-y-6 scrollbar-none">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"} items-end gap-3`}
            >
              {msg.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-[#F5F5DC] flex items-center justify-center border border-[#8A9A5B]/20 flex-shrink-0">
                  <Bot className="w-4 h-4 text-[#8A9A5B]" />
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
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-sage/20">
                <Bot className="w-4 h-4 text-sage" />
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-sage/5 rounded-bl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="w-full max-w-2xl p-6 bg-white border-t border-sage/10 relative z-20">
        <div className="max-w-xl mx-auto">
          {currentStep === 0 && !isTyping && (
            <div className="flex gap-3">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && age && handleUserAnswer(`${age} Tahun`, () => nextStep(0))}
                className="flex-1 bg-[#FDFDF5] border border-sage/20 rounded-2xl px-6 py-4 outline-none focus:border-sage"
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
            <div className="flex gap-3">
              <input
                type="text"
                value={uniqueCode}
                onChange={(e) => setUniqueCode(e.target.value.toUpperCase())}
                maxLength={8}
                onKeyPress={(e) => e.key === "Enter" && uniqueCode.length === 8 && handleSearchParent()}
                className="flex-1 bg-[#FDFDF5] border border-sage/20 rounded-2xl px-6 py-4 outline-none focus:border-sage tracking-[0.3em] font-medium"
                placeholder="PRO88888"
              />
              <button
                disabled={uniqueCode.length < 8 || isSearching}
                onClick={handleSearchParent}
                className="btn-shiny w-14 h-14 bg-sage text-white rounded-2xl flex items-center justify-center disabled:opacity-50"
              >
                {isSearching ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </div>
          )}

          {currentStep === 1.5 && !isTyping && (
            <div className="flex gap-3">
              <button
                onClick={() => handleUserAnswer("Ya, betul sekali", () => nextStep(1))}
                className="btn-shiny flex-1 py-4 bg-sage text-white rounded-2xl font-medium"
              >
                Ya, Betul
              </button>
              <button
                onClick={() => {
                  setUniqueCode("");
                  setParentFound(null);
                  setCurrentStep(1);
                  addMessage({ id: Math.random().toString(), type: "user", content: "Bukan, kodenya salah" });
                  handleBotResponse("Maaf atas ketidaknyamanannya. Mari coba masukkan kembali kode uniknya.");
                }}
                className="flex-1 py-4 bg-white border border-sage/30 text-sage rounded-2xl font-medium"
              >
                Bukan
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <Link href="/" className="block">
              <button className="btn-shiny w-full py-5 bg-sage text-white rounded-2xl text-lg font-medium shadow-lg shadow-sage/20">
                Selesai & Masuk Beranda
              </button>
            </Link>
          )}
        </div>
      </div>
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
