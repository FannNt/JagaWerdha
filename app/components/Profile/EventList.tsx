"use client";
import { Calendar, Clock } from 'lucide-react';

// MASIHMOCUP

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
}

const events: Event[] = [
    {
        id: 1,
        title: "Senam Pagi Lansia",
        date: "11 Jan 2026",
        time: "08:00 - 09:00 WIB",
    },
];

export default function EventColumn() {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--sage-light)]/20 overflow-hidden">
            <div className="p-6 bg-[var(--sage)] text-white relative">
                <h3 className="text-lg font-bold flex items-center gap-2 relative z-10">
                    <Calendar className="w-5 h-5 text-white" />
                    Kegiatan Akan Datang
                </h3>
                <p className="text-sm text-white/80 mt-1 relative z-10">Jadwal aktivitas dan event</p>
            </div>

            <div className="p-6 bg-[var(--background)] relative max-h-[600px] overflow-y-auto">
                <div className="space-y-4 relative z-10">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all hover:-translate-y-1 group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-[var(--sage)] bg-[var(--background)] px-2 py-1 rounded-md border border-[var(--sage)]/10">
                                    {event.date}
                                </span>
                            </div>
                            <h4 className="font-bold text-[var(--secondary)] group-hover:text-[var(--sage)] transition-colors">
                                {event.title}
                            </h4>
                            <p className="text-xs text-[var(--dark-olive)] mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.time}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
