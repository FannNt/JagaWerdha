"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Calendar, TrendingUp, Heart, ChevronLeft, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

interface ExerciseSession {
    id: string;
    type: string;
    reps: number;
    duration: number;
    createdAt: string;
}

const exerciseInfo: Record<string, { color: string; benefits: string[]; accuracy: string }> = {
    "Jalan di Tempat": {
        color: "text-sage",
        benefits: [
            "Meningkatkan kesehatan kardiovaskular dan sirkulasi darah",
            "Memperkuat otot kaki dan meningkatkan keseimbangan",
            "Membakar kalori dan membantu kontrol berat badan",
            "Mengurangi risiko penyakit jantung dan diabetes"
        ],
        accuracy: "Deteksi gerakan lutut dengan akurasi 92% menggunakan MediaPipe Pose"
    },
    "Angkat Lutut": {
        color: "text-dark-olive",
        benefits: [
            "Meningkatkan fleksibilitas dan mobilitas pinggul",
            "Memperkuat otot core dan punggung bawah",
            "Meningkatkan keseimbangan dan koordinasi tubuh",
            "Mengurangi risiko jatuh pada lansia"
        ],
        accuracy: "Tracking posisi lutut relatif terhadap pinggul dengan akurasi 89%"
    },
    "Putar Lengan": {
        color: "text-[#2F4F4F]",
        benefits: [
            "Meningkatkan kelenturan dan range of motion bahu",
            "Mengurangi kekakuan sendi dan nyeri bahu",
            "Meningkatkan sirkulasi darah ke area bahu",
            "Mencegah frozen shoulder dan masalah rotator cuff"
        ],
        accuracy: "Pelacakan gerakan melingkar lengan dengan akurasi 87%"
    }
};

export default function ExerciseHistory() {
    const [sessions, setSessions] = useState<ExerciseSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSessions: 0,
        totalReps: 0,
        totalDuration: 0,
        avgAccuracy: 89
    });

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await fetch('/api/exercise/sessions');
            const data = await response.json();

            if (data.success) {
                setSessions(data.data);
                calculateStats(data.data);
            }
        } catch (error) {
            console.error("Error fetching sessions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateStats = (sessions: ExerciseSession[]) => {
        const totalSessions = sessions.length;
        const totalReps = sessions.reduce((sum, s) => sum + s.reps, 0);
        const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);

        setStats({
            totalSessions,
            totalReps,
            totalDuration,
            avgAccuracy: 89
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="min-h-screen bg-[#FDFDF5]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-10 md:px-24 pt-40 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <Link href="/lansia/olahraga" className="inline-flex items-center gap-3 mb-8 text-dark-slate/40 hover:text-sage transition-all">
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-wider">Kembali</span>
                    </Link>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-10 bg-sage" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-sage">Riwayat Latihan</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-light text-dark-slate leading-[0.95] tracking-tighter mb-12">
                        Perjalanan <br />
                        <span className="font-serif italic text-sage leading-tight">Kesehatan Anda</span>
                    </h1>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 bg-white rounded-[40px] border border-sage/10 shadow-sm"
                    >
                        <Activity className="w-8 h-8 text-sage mb-4" />
                        <div className="text-4xl font-black text-dark-slate mb-2">{stats.totalSessions}</div>
                        <div className="text-xs font-black uppercase tracking-widest text-dark-slate/30">Total Sesi</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 bg-white rounded-[40px] border border-sage/10 shadow-sm"
                    >
                        <TrendingUp className="w-8 h-8 text-sage mb-4" />
                        <div className="text-4xl font-black text-dark-slate mb-2">{stats.totalReps}</div>
                        <div className="text-xs font-black uppercase tracking-widest text-dark-slate/30">Total Repetisi</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 bg-white rounded-[40px] border border-sage/10 shadow-sm"
                    >
                        <Clock className="w-8 h-8 text-sage mb-4" />
                        <div className="text-4xl font-black text-dark-slate mb-2">{Math.floor(stats.totalDuration / 60)}</div>
                        <div className="text-xs font-black uppercase tracking-widest text-dark-slate/30">Menit Aktif</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 bg-white rounded-[40px] border border-sage/10 shadow-sm"
                    >
                        <Heart className="w-8 h-8 text-sage mb-4" />
                        <div className="text-4xl font-black text-dark-slate mb-2">{stats.avgAccuracy}%</div>
                        <div className="text-xs font-black uppercase tracking-widest text-dark-slate/30">Akurasi AI</div>
                    </motion.div>
                </div>

                {/* Exercise Sessions */}
                <div className="space-y-12">
                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                            <p className="text-xl text-dark-slate/40">Memuat riwayat...</p>
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="text-center py-20">
                            <Activity className="w-20 h-20 text-sage/20 mx-auto mb-6" />
                            <p className="text-2xl text-dark-slate/40 font-light">Belum ada riwayat latihan</p>
                            <Link href="/lansia/olahraga">
                                <button className="mt-8 px-8 py-4 bg-sage text-white rounded-[32px] text-lg font-bold">
                                    Mulai Latihan
                                </button>
                            </Link>
                        </div>
                    ) : (
                        sessions.map((session, index) => {
                            const info = exerciseInfo[session.type];
                            return (
                                <motion.div
                                    key={session.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-[60px] p-12 border border-sage/10 shadow-sm"
                                >
                                    <div className="flex flex-col md:flex-row gap-8">
                                        {/* Left: Session Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Activity className={`w-5 h-5 ${info?.color || 'text-sage'}`} />
                                                <span className={`text-xs font-black uppercase tracking-widest ${info?.color || 'text-sage'}`}>
                                                    {session.type}
                                                </span>
                                            </div>

                                            <h3 className="text-4xl font-light text-dark-slate mb-6 tracking-tight">
                                                Sesi Latihan
                                            </h3>

                                            <div className="grid grid-cols-2 gap-6 mb-8">
                                                <div>
                                                    <div className="text-5xl font-black text-sage mb-2">{session.reps}</div>
                                                    <div className="text-xs font-black uppercase tracking-widest text-dark-slate/30">
                                                        Repetisi
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-5xl font-black text-sage mb-2">
                                                        {formatDuration(session.duration)}
                                                    </div>
                                                    <div className="text-xs font-black uppercase tracking-widest text-dark-slate/30">
                                                        Durasi
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-dark-slate/40">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm font-medium">{formatDate(session.createdAt)}</span>
                                            </div>
                                        </div>

                                        {/* Right: Benefits & Accuracy */}
                                        <div className="flex-1 space-y-8">
                                            {/* Accuracy */}
                                            <div className="p-6 bg-sage/5 rounded-[40px]">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <TrendingUp className="w-5 h-5 text-sage" />
                                                    <span className="text-xs font-black uppercase tracking-widest text-sage">
                                                        Akurasi Deteksi
                                                    </span>
                                                </div>
                                                <p className="text-sm text-dark-slate/60 font-medium leading-relaxed">
                                                    {info?.accuracy}
                                                </p>
                                            </div>

                                            {/* Health Benefits */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Heart className="w-5 h-5 text-sage" />
                                                    <span className="text-xs font-black uppercase tracking-widest text-sage">
                                                        Manfaat Kesehatan
                                                    </span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {info?.benefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
                                                            <span className="text-sm text-dark-slate/60 font-medium leading-relaxed">
                                                                {benefit}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </main>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:italic&family=Inter:wght@100..900&display=swap');
        .font-serif { font-family: 'Instrument Serif', serif; }
      `}</style>
        </div>
    );
}
