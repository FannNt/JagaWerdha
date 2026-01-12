'use client';
import React, { useState } from 'react';
import { Calendar, Clock, Wand2, Plus, CheckCircle2 } from 'lucide-react';
//masihmockpup
interface Activity {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    completed: boolean;
    color: string;
}

export default function ScheduleGenerator({ elderlyData }: { elderlyData?: any }) {
    const [prompt, setPrompt] = useState("");
    const [activities, setActivities] = useState<Activity[]>([
        { id: 1, title: "Sarapan & Obat Pagi", startTime: "07:00", endTime: "08:00", completed: true, color: "bg-blue-100 text-blue-700 border-blue-200" },
        { id: 2, title: "Jalan Santai Taman", startTime: "08:30", endTime: "09:30", completed: false, color: "bg-green-100 text-green-700 border-green-200" },
        { id: 3, title: "Istirahat Siang", startTime: "12:00", endTime: "13:30", completed: false, color: "bg-orange-100 text-orange-700 border-orange-200" },
        { id: 4, title: "Cek Gula Darah", startTime: "15:00", endTime: "15:30", completed: false, color: "bg-purple-100 text-purple-700 border-purple-200" },
    ]);

    const toggleComplete = (id: number) => {
        setActivities(activities.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* kiri aktivitas */}
            <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif text-[var(--sage)] flex items-center gap-2">
                        <Calendar size={20} />
                        Timeline Aktivitas
                    </h3>
                    <button className="p-2 bg-[var(--sage)]/10 text-[var(--sage)] rounded-lg hover:bg-[var(--sage)] hover:text-white transition-all">
                        <Plus size={20} />
                    </button>
                </div>

                <div className="relative pl-8 space-y-4 border-l-2 border-dashed border-[var(--sage-light)]/30 ml-3">
                    {activities.map((activity) => (
                        <div 
                            key={activity.id}
                            className={`relative p-5 rounded-2xl border transition-all hover:shadow-md cursor-pointer group ${activity.completed ? 'opacity-60 grayscale-[0.5]' : 'bg-white shadow-sm'}`}
                            onClick={() => toggleComplete(activity.id)}
                        >
                            
                            <div className="absolute -left-[45px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-[var(--sage)] z-10 flex items-center justify-center">
                                {activity.completed ? <CheckCircle2 size={12} className="text-[var(--sage)]" /> : <div className="w-2 h-2 rounded-full bg-[var(--sage-light)]" />}
                            </div>

                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${activity.color}`}>
                                        {activity.startTime} - {activity.endTime}
                                    </span>
                                    <h4 className={`text-lg font-bold ${activity.completed ? 'line-through text-dark-slate/50' : 'text-dark-slate'}`}>
                                        {activity.title}
                                    </h4>
                                </div>
                                <div className="text-[var(--sage)] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Clock size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* kanan ai Generator */}
            <div className="lg:col-span-5 sticky top-8">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-[var(--sage-light)]/10 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--sage)]/5 rounded-full blur-2xl" />
                    
                    <div className="relative z-10">                        
                        <h3 className="text-2xl font-serif text-[var(--sage)] mb-3">Jaga Scheduler</h3>
                        <p className="text-dark-slate/60 text-sm mb-6 leading-relaxed">
                            Masukkan pola rutinitas atau kebutuhan khusus lansia untuk membuat jadwal harian yang optimal.
                        </p>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-dark-slate/40 uppercase tracking-widest ml-1">Kebutuhan Jadwal</label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Contoh: Jadwal untuk hari Senin, prioritaskan istirahat siang dan olahraga ringan..."
                                    className="w-full min-h-[160px] p-5 bg-[#FDFDF5] border-2 border-transparent border-dashed focus:border-[var(--sage-light)] rounded-2xl focus:ring-4 focus:ring-[var(--sage)]/5 outline-none transition-all resize-none text-dark-slate placeholder:text-dark-slate/30"
                                />
                            </div>

                            <button className="w-full py-4 bg-[var(--sage)] text-white rounded-2xl font-bold hover:bg-[var(--dark-olive)] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[var(--sage)]/25 group">
                                <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />
                                Generate Jadwal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
