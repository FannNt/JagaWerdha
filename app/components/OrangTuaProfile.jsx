import React from 'react';

export default function OrangTuaProfile({ profileData }) {
    return (
        <>
            {/* Medical History for Orang Tua */}
            {profileData.orangTuaProfile && (
                <div className="bg-[var(--cream)]/30 rounded-2xl p-6 shadow-md border border-[var(--sage-light)]/20 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-[var(--sage)] mb-4 flex items-center gap-2">
                        <div className="p-2 bg-[var(--sage)]/10 rounded-lg">
                            <svg className="w-5 h-5 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        Riwayat Kesehatan
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                Riwayat Penyakit
                            </label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {profileData.orangTuaProfile.riwayatPenyakit.length > 0 ? (
                                    profileData.orangTuaProfile.riwayatPenyakit.map((disease, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-[var(--background)] text-[var(--sage)] rounded-lg text-sm font-medium shadow-sm border border-[var(--sage-light)]/30"
                                        >
                                            {disease}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 italic text-sm">Tidak ada data riwayat penyakit</span>
                                )}
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Usia */}
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                            Usia
                                        </label>
                                    </div>
                                    <p className="text-[var(--sage)] font-bold text-lg">
                                        {profileData.orangTuaProfile.usia} <span className="text-sm font-medium text-[var(--dark-olive)]">Tahun</span>
                                    </p>
                                </div>

                                {/* Berat Badan (Hardcoded) */}
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                        <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                            Berat
                                        </label>
                                    </div>
                                    <p className="text-[var(--sage)] font-bold text-lg">
                                        65 <span className="text-sm font-medium text-[var(--dark-olive)]">kg</span>
                                    </p>
                                </div>

                                {/* Tinggi Badan (Hardcoded) */}
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                        <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                            Tinggi
                                        </label>
                                    </div>
                                    <p className="text-[var(--sage)] font-bold text-lg">
                                        170 <span className="text-sm font-medium text-[var(--dark-olive)]">cm</span>
                                    </p>
                                </div>

                                {/* Olahraga */}
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-colors group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                            Aktivitas
                                        </label>
                                    </div>
                                    <p className="text-[var(--sage)] font-bold text-lg truncate" title={profileData.orangTuaProfile.frekuensiOlahraga || "-"}>
                                        {profileData.orangTuaProfile.frekuensiOlahraga || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Connected Companion for Orang Tua */}
            <div className="bg-[var(--sage)] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden group mt-6">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/15 transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-xl group-hover:bg-white/15 transition-colors"></div>

                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    Pendamping Anda
                </h3>

                {profileData.pendamping ? (
                    <div className="flex items-center gap-4 relative z-10 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold shadow-md ring-2 ring-white/30">
                            {profileData.pendamping.name?.charAt(0) || "P"}
                        </div>
                        <div>
                            <p className="font-bold text-lg">{profileData.pendamping.name}</p>
                            <p className="text-white/80 text-sm">{profileData.pendamping.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 p-5 bg-white/10 rounded-xl text-center backdrop-blur-sm border border-white/10">
                        <p className="mb-2 font-semibold">Belum ada pendamping</p>
                        <p className="text-sm text-white/70">Hubungi admin untuk menghubungkan dengan pendamping</p>
                    </div>
                )}
            </div>
        </>
    );
}
