"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, CheckCircle2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { saveExerciseSessionAction } from "@/actions/exercise";
import { useExerciseAI } from "@/hooks/useExerciseAI";

export default function MarchingExercise() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // UI State
    const [isDone, setIsDone] = useState(false);

    // Timer State
    const startTimeRef = useRef<number>(0);

    // AI Hook
    const { isStarted, count, feedback, start, stop } = useExerciseAI({
        exerciseType: 'marching',
        videoRef,
        canvasRef,
        onRepComplete: (c) => console.log("Step:", c)
    });

    // Handle session finish
    const handleFinish = async () => {
        stop();
        setIsDone(true);
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        await saveExerciseSessionAction({
            type: "Jalan di Tempat",
            reps: count,
            duration: duration,
        });
    };

    const handleStartSession = () => {
        startTimeRef.current = Date.now();
        start();
    };

    return (
        <div className="min-h-screen bg-[#FDFDF5] flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 md:p-10 z-50 flex justify-between items-center pointer-events-none">
                <Link href="/lansia/olahraga">
                    <button className="p-4 md:p-6 bg-white/20 backdrop-blur-xl rounded-[24px] md:rounded-[30px] text-dark-slate border border-white/40 pointer-events-auto hover:bg-white transition-all shadow-xl">
                        <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </Link>
                <div className="px-6 py-4 md:px-10 md:py-5 bg-white shadow-2xl rounded-[24px] md:rounded-[30px] text-sage font-black uppercase tracking-[0.3em] text-xs md:text-sm border border-sage/10">
                    Jalan di Tempat
                </div>
            </div>

            {/* Camera View */}
            <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover mirror"
                    style={{ filter: 'none' }}
                    playsInline
                    width={1280}
                    height={720}
                />
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover mirror pointer-events-none"
                    width={1280}
                    height={720}
                />

                {/* Rep Counter Overlay */}
                <AnimatePresence>
                    {isStarted && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        >
                            <div className="relative">
                                {/* Pulse Effect on Rep */}
                                <div key={count} className="absolute inset-[-40px] border-[2px] border-sage/10 rounded-full animate-ping" />
                                <div className="w-48 h-48 md:w-64 md:h-64 bg-white/90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-[0_40px_100px_rgba(0,0,0,0.08)] border-8 border-sage/5">
                                    <span className="text-[80px] md:text-[120px] font-black text-sage leading-none tracking-tighter">{count}</span>
                                    <span className="text-[10px] md:text-xs font-black text-dark-slate/30 uppercase tracking-[0.3em]">Langkah</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="bg-white px-6 md:px-10 py-8 md:py-12 border-t border-sage/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 z-50">
                <div className="flex-1 text-center md:text-left w-full">
                    <p className="text-2xl md:text-3xl font-light text-dark-slate italic animate-pulse">
                        "{feedback}"
                    </p>
                </div>

                <div className="flex gap-4 w-full md:w-auto justify-center">
                    {!isStarted ? (
                        <button
                            onClick={handleStartSession}
                            className="w-full md:w-auto min-w-[300px] py-6 md:py-8 bg-sage text-white rounded-[40px] text-xl md:text-2xl font-bold shadow-2xl shadow-sage/40 flex items-center justify-center gap-4 md:gap-6 hover:scale-105 transition-transform"
                        >
                            <Play className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                            Mulai Sesi
                        </button>
                    ) : (
                        <button
                            onClick={handleFinish}
                            className="w-full md:w-auto min-w-[300px] py-6 md:py-8 bg-dark-slate text-white rounded-[40px] text-xl md:text-2xl font-bold flex items-center justify-center gap-4 hover:scale-105 transition-transform"
                        >
                            Selesaikan Sesi
                        </button>
                    )}
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {isDone && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 bg-white/80 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-xl bg-white rounded-[60px] md:rounded-[80px] p-10 md:p-20 text-center shadow-2xl border border-sage/10"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-sage/10 text-sage rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10">
                                <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light text-dark-slate mb-4 tracking-tighter">Bapak/Ibu Hebat!</h2>
                            <p className="text-lg md:text-xl text-dark-slate/40 font-light mb-12 md:mb-16 italic">Jantung jadi lebih sehat!</p>

                            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16">
                                <div className="p-6 md:p-10 bg-[#F4F7EB] rounded-[40px] md:rounded-[50px] flex flex-col items-center">
                                    <span className="text-4xl md:text-5xl font-black text-sage">{count}</span>
                                    <span className="mt-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#556B2F]">Total Langkah</span>
                                </div>
                                <div className="p-6 md:p-10 bg-[#EDF2E4] rounded-[40px] md:rounded-[50px] flex flex-col items-center">
                                    <span className="text-4xl md:text-5xl font-black text-sage">100%</span>
                                    <span className="mt-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-dark-slate/40">Semangat</span>
                                </div>
                            </div>

                            <Link href="/lansia">
                                <button className="w-full py-6 md:py-8 bg-sage text-white rounded-[30px] md:rounded-[40px] text-xl md:text-2xl font-bold shadow-2xl shadow-sage/40">
                                    Kembali ke Beranda
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic&family=Inter:wght@100..900&display=swap');
                .font-serif { font-family: 'Instrument Serif', serif; }
                .mirror { transform: scaleX(-1); }
            `}</style>
        </div>
    );
}
