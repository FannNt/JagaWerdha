'use client';
import React from 'react';

interface ProfileData {
    name?: string | null;
    email?: string | null;
    orangTuaProfile?: {
        usia?: number | null;
        riwayatPenyakit?: string[] | null;
        frekuensiOlahraga?: string | null;
    } | null;
    pendamping?: {
        name?: string | null;
        email?: string | null;
    } | null;
    [key: string]: any;
}

interface OrangTuaProfileProps {
    profileData: ProfileData;
}

export default function OrangTuaProfile({ profileData }: OrangTuaProfileProps) {
    return (
        <div className="space-y-8">
            {/* Medical History Card - Elderly Friendly */}
            {profileData.orangTuaProfile && (
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-sage/10">
                    {/* Header */}
                    <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-serif italic text-sage mb-2">
                            Riwayat Kesehatan
                        </h3>
                        <div className="h-1 w-20 bg-sage/20 rounded-full"></div>
                    </div>

                    {/* Riwayat Penyakit */}
                    <div className="mb-10">
                        <label className="text-base font-bold text-dark-slate mb-4 block">
                            Riwayat Penyakit
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {profileData.orangTuaProfile.riwayatPenyakit && profileData.orangTuaProfile.riwayatPenyakit.length > 0 ? (
                                profileData.orangTuaProfile.riwayatPenyakit.map((disease, index) => (
                                    <span
                                        key={index}
                                        className="px-5 py-3 bg-sage/5 text-sage rounded-2xl text-base font-semibold border border-sage/10"
                                    >
                                        {disease}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-base italic">Tidak ada catatan penyakit</span>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid - Larger and More Readable */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Usia */}
                        <div className="bg-sage/5 p-6 rounded-2xl border border-sage/10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <label className="text-base font-bold text-dark-slate">
                                    Usia
                                </label>
                            </div>
                            <p className="text-3xl font-bold text-sage">
                                {profileData.orangTuaProfile.usia} <span className="text-lg font-medium text-dark-slate/60">Tahun</span>
                            </p>
                        </div>

                        {/* Berat */}
                        <div className="bg-sage/5 p-6 rounded-2xl border border-sage/10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </div>
                                <label className="text-base font-bold text-dark-slate">
                                    Berat Badan
                                </label>
                            </div>
                            <p className="text-3xl font-bold text-sage">
                                65 <span className="text-lg font-medium text-dark-slate/60">kg</span>
                            </p>
                        </div>

                        {/* Tinggi */}
                        <div className="bg-sage/5 p-6 rounded-2xl border border-sage/10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                                <label className="text-base font-bold text-dark-slate">
                                    Tinggi Badan
                                </label>
                            </div>
                            <p className="text-3xl font-bold text-sage">
                                170 <span className="text-lg font-medium text-dark-slate/60">cm</span>
                            </p>
                        </div>

                        {/* Aktivitas */}
                        <div className="bg-sage/5 p-6 rounded-2xl border border-sage/10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <label className="text-base font-bold text-dark-slate">
                                    Aktivitas Olahraga
                                </label>
                            </div>
                            <p className="text-xl font-bold text-sage" title={profileData.orangTuaProfile.frekuensiOlahraga || "-"}>
                                {profileData.orangTuaProfile.frekuensiOlahraga || "-"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Pendamping Card - Matching Style */}
            <div className="bg-sage rounded-[2rem] p-8 md:p-10 shadow-lg text-white relative overflow-hidden">
                {/* Subtle decoration */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-2">
                            Pendamping Anda
                        </h3>
                        <div className="h-1 w-20 bg-white/20 rounded-full"></div>
                    </div>

                    {profileData.pendamping ? (
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-serif shadow-lg border-4 border-white/20 shrink-0">
                                {profileData.pendamping.name?.charAt(0) || "P"}
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-2xl font-bold mb-2">{profileData.pendamping.name}</p>
                                <p className="text-white/80 text-base">{profileData.pendamping.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 bg-white/10 rounded-2xl text-center backdrop-blur-sm border border-white/10">
                            <p className="tet-xl font-semibold mb-2">Belum ada pendamping</p>
                            <p className="text-base text-white/70">Hubungi admin untuk menghubungkan dengan pendamping</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
