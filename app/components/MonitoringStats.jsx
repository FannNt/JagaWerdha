import React from 'react';

export default function MonitoringStats({ elderlyData }) {
    // Mock data - akan diganti dengan real data dari backend nanti
    const stats = {
        latestExercise: {
            type: "Senam Lansia",
            duration: 30,
            date: "2026-01-10",
            time: "08:00"
        },
        latestBloodSugar: {
            value: 120,
            unit: "mg/dL",
            status: "normal", // normal, high, low
            date: "2026-01-10",
            time: "07:00"
        },
        savedRecipesCount: 12,
        todayScheduleCount: 3,
        completedScheduleCount: 1
    };

    const getBloodSugarColor = (status) => {
        switch (status) {
            case 'normal': return 'text-green-600 bg-green-50 border-green-200';
            case 'high': return 'text-red-600 bg-red-50 border-red-200';
            case 'low': return 'text-orange-600 bg-orange-50 border-orange-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--sage-light)]/20">
            <h3 className="text-lg font-bold text-[var(--sage)] mb-4 flex items-center gap-2">
                <div className="p-2 bg-[var(--sage)]/10 rounded-lg">
                    <svg className="w-5 h-5 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                Monitoring Dashboard
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Latest Exercise */}
                <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">Olahraga Terakhir</span>
                        </div>
                    </div>
                    <p className="text-[var(--sage)] font-bold text-lg mb-1">{stats.latestExercise.type}</p>
                    <p className="text-sm text-[var(--dark-olive)]">{stats.latestExercise.duration} menit</p>
                    <p className="text-xs text-gray-500 mt-2">{stats.latestExercise.date} • {stats.latestExercise.time}</p>
                </div>

                {/* Latest Blood Sugar */}
                <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">Gula Darah</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                        <p className="text-[var(--sage)] font-bold text-lg">{stats.latestBloodSugar.value}</p>
                        <span className="text-sm text-[var(--dark-olive)]">{stats.latestBloodSugar.unit}</span>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium border ${getBloodSugarColor(stats.latestBloodSugar.status)}`}>
                        {stats.latestBloodSugar.status === 'normal' ? 'Normal' : stats.latestBloodSugar.status === 'high' ? 'Tinggi' : 'Rendah'}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">{stats.latestBloodSugar.date} • {stats.latestBloodSugar.time}</p>
                </div>

                {/* Saved Recipes Count */}
                <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">Resep Tersimpan</span>
                        </div>
                    </div>
                    <p className="text-[var(--sage)] font-bold text-3xl">{stats.savedRecipesCount}</p>
                    <p className="text-xs text-gray-500 mt-2">Resep masakan sehat</p>
                </div>

                {/* Today's Schedule */}
                <div className="bg-[var(--background)] p-4 rounded-xl border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">Jadwal Hari Ini</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                        <p className="text-[var(--sage)] font-bold text-3xl">{stats.completedScheduleCount}</p>
                        <span className="text-lg text-[var(--dark-olive)]">/ {stats.todayScheduleCount}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Aktivitas selesai</p>
                </div>
            </div>
        </div>
    );
}
