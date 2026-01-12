'use client';
import React from 'react';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// MASIHMOCKUP
export default function ScheduleDashboard() {
    const activities = [
        { id: 1, title: "Sarapan & Obat Pagi", time: "07:00", completed: true },
        { id: 2, title: "Jalan Santai Taman", time: "08:30", completed: false },
        { id: 3, title: "Cek Gula Darah", time: "11:00", completed: false },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--sage-light)]/20 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif text-[var(--sage)]">Jadwal Hari Ini</h3>
                <Link 
                    href="/pendamping/jadwal"
                    className="text-xs font-bold text-[var(--sage)] hover:text-[var(--dark-olive)] flex items-center gap-1 uppercase tracking-wider transition-colors"
                >
                    Kelola <ArrowRight size={14} />
                </Link>
            </div>

            <div className="space-y-3 flex-1">
                {activities.map((activity) => (
                    <div 
                        key={activity.id}
                        className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                            activity.completed 
                                ? 'bg-gray-50/50 border-gray-100 opacity-60' 
                                : 'bg-[#FDFDF5]/50 border-[var(--sage-light)]/20 hover:border-[var(--sage)]/40 shadow-sm'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {activity.completed ? (
                                <CheckCircle2 size={18} className="text-[var(--sage)]" />
                            ) : (
                                <Clock size={18} className="text-dark-slate/40" />
                            )}
                            <div className="text-sm font-bold text-dark-slate">{activity.title}</div>
                        </div>
                        <div className="text-xs font-medium text-dark-slate/50">{activity.time}</div>
                    </div>
                ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-50 italic text-[10px] text-dark-slate/30 text-center">
                Buka halaman jadwal untuk menambah atau mengubah rutinitas.
            </div>
        </div>
    );
}
