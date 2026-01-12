"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { usePPGScan } from "@/hooks/usePPGScan";
import { analyzePpgAction } from "@/actions/ppg";

// Immersive Signal Graph (Transparent)
const ImmersiveGraph = ({ data, active }: { data: number[]; active: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let animId: number;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            if (!active) return;

            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(255,255,255,0.5)";

            ctx.beginPath();

            const windowSize = 150;
            const startIndex = Math.max(0, data.length - windowSize);
            const visibleData = data.slice(startIndex);

            let min = 0, max = 255;
            if (visibleData.length > 0) {
                min = Math.min(...visibleData);
                max = Math.max(...visibleData);
            }
            const range = max - min || 1;

            visibleData.forEach((val, i) => {
                const x = (i / (windowSize - 1)) * width;
                const normalized = (val - min) / range;
                // Invert y, smooth curve
                const y = height - (normalized * height * 0.6 + height * 0.2);

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });

            ctx.stroke();
            animId = requestAnimationFrame(draw);
        };

        if (active) {
            animId = requestAnimationFrame(draw);
        }

        return () => cancelAnimationFrame(animId);
    }, [active, data]);

    return <canvas ref={canvasRef} width={window.innerWidth} height={150} className="w-full h-32 md:h-40" />;
};


export default function PpgScanner() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const {
        isScanning,
        progress,
        isFingerDetected,
        isDone,
        startScan,
        signalData,
        error: cameraError,
        restart,
        bpm
    } = usePPGScan(videoRef, canvasRef);

    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    useEffect(() => {
        if (isDone && !result && !analyzing) {
            handleAnalysis();
        }
    }, [isDone]);

    const handleAnalysis = async () => {
        setAnalyzing(true);
        try {
            const res = await analyzePpgAction(signalData);
            if (res.success) {
                setResult(res.data);
            } else {
                setAnalysisError(res.message);
            }
        } catch (e) {
            setAnalysisError("Gagal menganalisis data.");
        } finally {
            setAnalyzing(false);
        }
    };

    const handleRetry = () => {
        setResult(null);
        setAnalysisError(null);
        setAnalyzing(false);
        restart();
    };

    return (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col font-sans text-white overflow-hidden">

            {/* --- LAYERS --- */}

            {/* 1. Camera Feed (Fullscreen Background) */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    muted
                    className="w-full h-full object-cover mirror opacity-80"
                    style={{ transform: 'scaleX(-1)' }}
                />
            </div>

            {/* 2. Light Source Overlay (Semi-transparent White) */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${isScanning ? 'opacity-80 bg-white' : 'opacity-0 bg-transparent'}`} />

            {/* 3. Gradient Overlay for Readability (Bottom Up) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

            {/* Hidden Canvas */}
            <canvas ref={canvasRef} className="hidden" />

            {/* --- UI --- */}

            {/* Header */}
            <header className="relative z-20 px-6 py-8 flex justify-between items-center">
                <Link href="/lansia">
                    <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:scale-95 transition-transform hover:bg-white/20">
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                </Link>
                <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-red-500/20 backdrop-blur-md rounded-full border border-red-500/30 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">Live Cam</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-20 flex-1 flex flex-col items-center justify-end pb-12 px-6 text-center">

                {/* A. RESULT STATE */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-full max-w-sm flex flex-col items-center mb-10"
                        >
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] mb-6">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>

                            <h2 className="text-3xl font-light text-white/80 mb-1">Gula Darah</h2>
                            <div className="flex items-baseline justify-center gap-2 mb-8">
                                <span className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
                                    {result.value}
                                </span>
                                <span className="text-xl font-medium text-white/50">mg/dL</span>
                            </div>

                            <div className="flex gap-4 w-full">
                                <Link href="/lansia" className="flex-1">
                                    <button className="w-full py-4 bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl font-bold text-white hover:bg-white/20">
                                        Selesai
                                    </button>
                                </Link>
                                <button onClick={handleRetry} className="flex-1 py-4 bg-white text-dark-slate rounded-2xl font-bold hover:bg-white/90 shadow-lg">
                                    Cek Lagi
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* B. ANALYZING STATE */}
                {analyzing && (
                    <div className="flex flex-col items-center mb-20 animate-pulse">
                        <Activity className="w-20 h-20 text-white mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">Menganalisis...</h2>
                        <p className="text-white/60">Sedang memproses sinyal PPG menggunakan AI</p>
                    </div>
                )}


                {/* C. SCANNING / IDLE STATE */}
                {!result && !analyzing && (
                    <div className="w-full max-w-md flex flex-col items-center gap-8">

                        {/* Signal Graph */}
                        {isScanning && (
                            <div className="w-full mb-4">
                                <ImmersiveGraph data={signalData} active={isScanning} />
                                <div className="flex justify-center items-center gap-2 mt-2">
                                    <Activity className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-mono text-white/80">{bpm} BPM</span>
                                </div>
                            </div>
                        )}

                        {/* Status Indications */}
                        <div className="min-h-[80px] flex items-center justify-center">
                            {isScanning ? (
                                isFingerDetected ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl font-black text-white mb-2 tracking-widest">
                                            {Math.round(progress)}%
                                        </span>
                                        <p className="text-white/70 font-medium">Jangan gerakkan jari...</p>
                                    </div>
                                ) : (
                                    <div className="text-center animate-bounce">
                                        <h3 className="text-2xl font-bold text-red-500 mb-1 drop-shadow-md">Tempelkan Jari!</h3>
                                        <p className="text-white/80">Pastikan layar menjadi <span className="text-red-400 font-bold">MERAH</span></p>
                                    </div>
                                )
                            ) : (
                                <div className="text-center">
                                    <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Cek Glukosa</h1>
                                    <p className="text-white/60 text-lg max-w-xs mx-auto leading-relaxed">
                                        Tempelkan jari telunjuk menutupi kamera depan untuk mulai.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Main Interaction Button */}
                        {!isScanning ? (
                            <button
                                onClick={startScan}
                                className="group relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-110 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-300"
                            >
                                <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
                                <Activity className="w-10 h-10 text-dark-slate" />
                            </button>
                        ) : (
                            <button
                                onClick={handleRetry}
                                className="px-8 py-3 rounded-full border border-white/30 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                Batalkan
                            </button>
                        )}

                        {cameraError && (
                            <div className="bg-red-500/90 text-white px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm shadow-lg">
                                {cameraError}
                            </div>
                        )}
                        {analysisError && (
                            <div className="bg-red-500/90 text-white px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm shadow-lg">
                                Error: {analysisError}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
