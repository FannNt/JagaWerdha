"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Send, Bot, User, Sparkles, MessageSquare, Plus, X } from "lucide-react";
import {
    startChatSessionAction,
    sendChatMessageAction,
    getUserChatSessionsAction,
    getChatHistoryAction
} from "@/actions/chat";
import Navbar from "@/app/components/Navbar";

export default function ChatConsultation() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [activeSession, setActiveSession] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadSessions();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const loadSessions = async () => {
        const res = await getUserChatSessionsAction();
        if (res.success) {
            setSessions(res.data);
            if (res.data.length > 0 && !activeSession) {
                handleSelectSession(res.data[0]);
            }
        }
    };

    const handleSelectSession = async (session: any) => {
        setActiveSession(session);
        const res = await getChatHistoryAction(session.id);
        if (res.success) {
            setMessages(res.data.messages);
        }
    };

    const handleStartNew = async () => {
        const res = await startChatSessionAction();
        if (res.success) {
            setSessions([res.data, ...sessions]);
            setActiveSession(res.data);
            setMessages([]);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !activeSession || isLoading) return;

        const userMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        const res = await sendChatMessageAction(activeSession.id, input);
        setIsTyping(false);

        if (res.success) {
            setMessages(prev => [...prev, res.data]);
        }
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDF5] flex flex-col h-screen overflow-hidden">
            <Navbar />

            {/*  */}
            <div className="flex-1 flex flex-col pt-32 h-full">
                {/* Elegant Minimal Header */}
                <div className="px-10 md:px-24 mb-6 flex justify-between items-end shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-sage" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-sage">Konsultasi AI</span>
                        </div>
                        <h1 className="text-5xl font-light text-dark-slate tracking-tighter">
                            Asisten <span className="font-serif italic text-sage">Pribadi</span>
                        </h1>
                    </div>
                    <button
                        onClick={handleStartNew}
                        className="w-16 h-16 rounded-full bg-sage text-white shadow-2xl shadow-sage/40 flex items-center justify-center hover:scale-105 transition-all active:scale-95"
                    >
                        <Plus className="w-8 h-8" />
                    </button>
                </div>

                {/* Chat Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-10 md:px-24 py-10 space-y-12 scrollbar-none"
                >
                    {messages.length === 0 && !isTyping && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                            <img src="/logo.svg" alt="Logo" className="h-24 w-auto mb-8" />
                            <p className="text-2xl font-light text-dark-slate max-w-sm">Tanyakan apa saja seputar kesehatan Anda hari ini.</p>
                        </div>
                    )}

                    <AnimatePresence initial={false}>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"} items-end gap-6`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="w-14 h-14 rounded-3xl bg-white border border-sage/10 shadow-sm flex items-center justify-center shrink-0 mb-4">
                                        <Bot className="w-8 h-8 text-sage" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] p-10 rounded-[50px] text-2xl font-light leading-relaxed shadow-sm ${msg.role === "assistant"
                                            ? "bg-white text-dark-slate border border-sage/5 rounded-bl-none"
                                            : "bg-sage text-white rounded-br-none shadow-xl shadow-sage/10"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                                {msg.role === "user" && (
                                    <div className="w-14 h-14 rounded-3xl bg-white border border-sage/10 shadow-sm flex items-center justify-center shrink-0 mb-4">
                                        <User className="w-8 h-8 text-sage" />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start items-center gap-6"
                            >
                                <div className="w-14 h-14 rounded-3xl bg-white border border-sage/10 shadow-sm flex items-center justify-center">
                                    <Bot className="w-8 h-8 text-sage" />
                                </div>
                                <div className="bg-white p-10 rounded-[50px] border border-sage/5 rounded-bl-none shadow-sm">
                                    <div className="flex gap-3">
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-3 h-3 bg-sage rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-3 h-3 bg-sage rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-3 h-3 bg-sage rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Area - Pure & Minimal */}
                <div className="px-10 md:px-24 pb-12 pt-6 bg-gradient-to-t from-[#FDFDF5] via-[#FDFDF5] to-transparent shrink-0">
                    <div className="max-w-5xl mx-auto relative group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Tanyakan sesuatu..."
                            className="w-full bg-white border-none rounded-[100px] px-12 py-10 text-2xl font-light outline-none shadow-[0_20px_50px_rgba(0,0,0,0.03)] focus:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all pr-32 placeholder:text-dark-slate/20"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-20 h-20 bg-sage text-white rounded-full flex items-center justify-center shadow-xl shadow-sage/20 disabled:opacity-30 disabled:shadow-none transition-all active:scale-95 group-hover:scale-105"
                        >
                            <Send className="w-10 h-10" />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-dark-slate/20 mt-8 uppercase tracking-[0.4em] font-black">
                        Kearifan dalam setiap jawaban • Powered by Jaga Werdha AI
                    </p>
                </div>
            </div>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic&family=Inter:wght@100..900&display=swap');
        .font-serif { font-family: 'Instrument Serif', serif; }
      `}</style>
        </div>
    );
}
