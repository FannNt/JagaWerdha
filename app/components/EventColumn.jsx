import React from 'react';

export default function EventColumn() {
    // Mock events data
    const events = [
        {
            id: 1,
            title: "Senam Lansia Ceria",
            date: "12 Jan 2026",
            time: "08:00 - 09:30 WIB"
        },
        {
            id: 2,
            title: "Pemeriksaan Kesehatan Rutin",
            date: "15 Jan 2026",
            time: "09:00 - 12:00 WIB"
        },
        {
            id: 3,
            title: "Workshop Kerajinan Tangan",
            date: "20 Jan 2026",
            time: "13:00 - 15:00 WIB"
        },
        {
            id: 4,
            title: "Papan Catur Bersama",
            date: "22 Jan 2026",
            time: "15:00 - 17:00 WIB"
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--sage-light)]/20 overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-[var(--sage)] text-white relative">
                {/* Header pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <h3 className="text-lg font-bold flex items-center gap-2 relative z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Kegiatan Akan Datang
                </h3>
                <p className="text-sm text-white/80 mt-1 relative z-10">Jadwal aktivitas dan event</p>
            </div>

            {/* Events List */}
            <div className="p-6 bg-[var(--background)] relative max-h-[600px] overflow-y-auto">
                {/* Decorative blurred blob */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-[var(--sage)]/5 rounded-full blur-3xl"></div>

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
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {event.time}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

