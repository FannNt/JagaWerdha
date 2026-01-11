import React from 'react';

export default function LansiaAsuhanList({ assignedElderly = [] }) {
    // Dummy data for development - max 2 lansia
    const dummyElderly = [
        {
            id: 1,
            name: "Siti Aminah",
            email: "siti.aminah@example.com",
            orangTuaProfile: {
                usia: 70,
                riwayatPenyakit: ["Diabetes", "Hipertensi"]
            }
        },
        {
            id: 2,
            name: "Budi Santoso",
            email: "budi.santoso@example.com",
            orangTuaProfile: {
                usia: 68,
                riwayatPenyakit: ["Stroke"]
            }
        }
    ];

    // Use dummy data if no real data is provided
    const elderlyList = assignedElderly.length > 0 ? assignedElderly : dummyElderly;

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--sage-light)]/20 overflow-hidden">
            <div className="p-4 bg-[var(--sage)] text-white relative">
                <h3 className="text-base font-bold flex items-center gap-2 relative z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Orang Tua
                </h3>
            </div>

            <div className="p-4 bg-[var(--background)] max-h-96 overflow-y-auto">
                {elderlyList.length > 0 ? (
                    <div className="space-y-3">
                        {elderlyList.slice(0, 2).map((orangTua) => (
                            <div key={orangTua.id} className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/50 transition-all group">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[var(--sage)]/10 flex items-center justify-center text-[var(--sage)] text-lg font-bold flex-shrink-0">
                                        {orangTua.name ? orangTua.name.charAt(0).toUpperCase() : "?"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-[var(--secondary)] text-sm truncate mb-1">
                                            {orangTua.name || "Tanpa Nama"}
                                        </h4>
                                        <p className="text-xs text-[var(--dark-olive)] mb-2 truncate flex items-center gap-1">
                                            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="truncate">{orangTua.email}</span>
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-1.5 text-xs">
                                            {orangTua.orangTuaProfile?.usia && (
                                                <span className="px-2 py-0.5 bg-[var(--sage)]/5 text-[var(--sage)] rounded-md font-medium border border-[var(--sage)]/10">
                                                    {orangTua.orangTuaProfile.usia} Tahun
                                                </span>
                                            )}
                                            {orangTua.orangTuaProfile?.riwayatPenyakit?.length > 0 && (
                                                <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-md font-medium border border-red-100">
                                                    {orangTua.orangTuaProfile.riwayatPenyakit[0]}
                                                    {orangTua.orangTuaProfile.riwayatPenyakit.length > 1 && ` +${orangTua.orangTuaProfile.riwayatPenyakit.length - 1}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-12 h-12 bg-[var(--sage)]/10 text-[var(--sage)] rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-[var(--secondary)] font-bold mb-1 text-sm">Belum Ada Lansia</h3>
                        <p className="text-[var(--dark-olive)] text-xs">Belum ada lansia yang ditugaskan</p>
                    </div>
                )}
            </div>
        </div>
    );
}
