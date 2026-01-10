import React from 'react';

export default function PendampingProfile({ profileData }) {
    const assignedElderly = profileData.orangTua || [];

    return (
        <div className="mx-2 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pendamping Info Card */}
            {profileData.pendampingProfile && (
                <div className="bg-[var(--cream)]/30 rounded-2xl p-6 shadow-md border border-[var(--sage-light)]/20">
                    <h3 className="text-lg font-bold text-[var(--sage)] mb-4 flex items-center gap-2">
                        <div className="p-2 bg-[var(--sage)]/10 rounded-lg">
                            <svg className="w-5 h-5 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        Data Diri
                    </h3>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 group hover:border-[var(--sage)]/30 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                Usia
                            </label>
                        </div>
                        <p className="text-[var(--sage)] font-bold text-lg">
                            {profileData.pendampingProfile.usia} <span className="text-sm font-medium text-[var(--dark-olive)]">Tahun</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Assigned Elderly List (Lansia Asuhan) */}
            <div className={`md:col-span-2 ${!profileData.pendampingProfile ? 'md:col-span-3' : ''}`}>
                <div className="bg-white rounded-2xl shadow-lg border border-[var(--sage-light)]/20 overflow-hidden">
                    <div className="p-6 bg-[var(--sage)] text-white relative">
                        {/* Header pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <h3 className="text-lg font-bold flex items-center gap-2 relative z-10">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Lansia Asuhan
                        </h3>
                        <p className="text-sm text-white/80 mt-1 relative z-10">Daftar lansia yang Anda dampingi</p>
                    </div>

                    <div className="p-6 bg-[var(--background)]">
                        {assignedElderly.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                {assignedElderly.map((orangTua) => (
                                    <div key={orangTua.id} className="bg-white p-5 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/50 transition-all hover:-translate-y-1 group">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[var(--sage)]/10 flex items-center justify-center text-[var(--sage)] text-xl font-bold flex-shrink-0">
                                                {orangTua.name ? orangTua.name.charAt(0).toUpperCase() : "?"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-[var(--secondary)] text-lg truncate mb-1">
                                                    {orangTua.name || "Tanpa Nama"}
                                                </h4>
                                                <p className="text-sm text-[var(--dark-olive)] mb-3 flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                    {orangTua.email}
                                                </p>

                                                {/* Meta Info */}
                                                <div className="flex flex-wrap gap-2 text-xs">
                                                    {orangTua.orangTuaProfile?.usia && (
                                                        <span className="px-2 py-1 bg-[var(--sage)]/5 text-[var(--sage)] rounded-md font-medium border border-[var(--sage)]/10">
                                                            {orangTua.orangTuaProfile.usia} Tahun
                                                        </span>
                                                    )}
                                                    {/* Show active diseases count or first disease */}
                                                    {orangTua.orangTuaProfile?.riwayatPenyakit?.length > 0 && (
                                                        <span className="px-2 py-1 bg-red-50 text-red-600 rounded-md font-medium border border-red-100">
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
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-[var(--sage)]/10 text-[var(--sage)] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-[var(--secondary)] font-bold mb-1">Belum Ada Lansia</h3>
                                <p className="text-[var(--dark-olive)] text-sm max-w-xs mx-auto">Anda belum memiliki lansia yang ditugaskan untuk didampingi saat ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}