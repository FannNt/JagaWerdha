import { getUserProfile } from "@/services/profile.service";
import { auth } from "@/auth";
import { UserRole } from "@/app/generated/prisma/enums";
import { redirect } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import { logout } from "@/app/actions/auth";
import PendampingProfile from "./PendampingProfile";

export default async function ProfilePage() {
    const session = await auth();
    const userId = Number(session?.user?.id);

    if (!userId) {
        redirect("/api/auth/signin");
    }

    const profileData = await getUserProfile(userId);

    if (!profileData) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="text-xl text-[var(--sage)]">Profil tidak ditemukan</div>
            </div>
        );
    }

    // const isOrangTua = profileData.role === UserRole.ORANGTUA;
    // const isPendamping = profileData.role === UserRole.PENDAMPING;

    // DEV: Forced view for development
    const isOrangTua = false;
    const isPendamping = true;

    return (
        <div className="min-h-screen py-7 px-1 md:p-8 space-y-8">
            {/* Header with Back Button */}
            <header className="mb-6">
                <div className="relative flex items-center justify-center mt-10 lg:mt-0">
                    <div className="absolute left-0 mb-23 lg:mb-0 ml-2 lg:ml-0">
                        <BackButton />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--sage)]">Profil Saya</h1>
                </div>
            </header>

            {/* Profile Banner */}
            <div className="bg-[var(--cream)]/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mx-2 md:mx-8 shadow-lg border border-[var(--sage-light)]/20">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:justify-between">
                    {/* Left: Avatar and Info */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                        <div className="w-24 h-24 rounded-full bg-[var(--sage)] flex items-center justify-center text-white text-3xl font-bold shadow-md ring-4 ring-[var(--background)]">
                            {profileData.name ? profileData.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--sage)] mb-1">
                                {profileData.name || "Tanpa Nama"}
                            </h1>
                            <p className="text-[var(--dark-olive)] font-medium mb-3">
                                {profileData.email}
                            </p>
                            <div className="inline-block py-1.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--sage)]/10 text-[var(--sage)] border border-[var(--sage)]/20 shadow-sm">
                                {profileData.role === UserRole.ORANGTUA ? "Orang Tua" : "Pendamping"}
                            </div>
                        </div>
                    </div>

                    {/* Right: Logout Button */}
                    <form action={logout} className="hidden lg:block md:block">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 font-bold rounded-xl border border-red-500/20 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Content Grid */}
            {isOrangTua && (
                <div className="mx-2 md:mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Medical History for Orang Tua */}
                    {isOrangTua && profileData.orangTuaProfile && (
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
                    {isOrangTua && (
                        <div className="bg-[var(--sage)] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden group">
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
                    )}

                    {/* Events & Activities */}
                    <div className="relative w-full min-h-[500px] lg:min-h-0 lg:h-auto group-event">
                        <div className="bg-white rounded-2xl shadow-lg border border-[var(--sage-light)]/20 flex flex-col overflow-hidden lg:absolute lg:inset-0 h-full">
                            <div className="p-6 bg-[var(--sage)] text-white relative flex-shrink-0">
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

                            <div className="p-6 flex-1 bg-[var(--background)] relative flex flex-col overflow-hidden">
                                {/* Decorative blurred blob */}
                                <div className="absolute top-10 right-10 w-32 h-32 bg-[var(--sage)]/5 rounded-full blur-3xl"></div>

                                <div className="flex-1 overflow-y-auto space-y-4 relative z-10 pr-2 custom-scrollbar">
                                    {/* Dummy Event 1 */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all hover:-translate-y-1 group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-[var(--sage)] bg-[var(--background)] px-2 py-1 rounded-md border border-[var(--sage)]/10">12 Jan 2026</span>
                                            <span className="w-2 h-2 rounded-full bg-[var(--dark-olive)] animate-pulse"></span>
                                        </div>
                                        <h4 className="font-bold text-[var(--secondary)] group-hover:text-[var(--sage)] transition-colors">Senam Lansia Ceria</h4>
                                        <p className="text-xs text-[var(--dark-olive)] mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            08:00 - 09:30 WIB
                                        </p>
                                    </div>

                                    {/* Dummy Event 2 */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all hover:-translate-y-1 group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-[var(--sage)] bg-[var(--background)] px-2 py-1 rounded-md border border-[var(--sage)]/10">15 Jan 2026</span>
                                        </div>
                                        <h4 className="font-bold text-[var(--secondary)] group-hover:text-[var(--sage)] transition-colors">Pemeriksaan Kesehatan Rutin</h4>
                                        <p className="text-xs text-[var(--dark-olive)] mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            09:00 - 12:00 WIB
                                        </p>
                                    </div>

                                    {/* Dummy Event 3 */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all hover:-translate-y-1 group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-[var(--sage)] bg-[var(--background)] px-2 py-1 rounded-md border border-[var(--sage)]/10">20 Jan 2026</span>
                                        </div>
                                        <h4 className="font-bold text-[var(--secondary)] group-hover:text-[var(--sage)] transition-colors">Workshop Kerajinan Tangan</h4>
                                        <p className="text-xs text-[var(--dark-olive)] mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            13:00 - 15:00 WIB
                                        </p>
                                    </div>

                                    {/* Dummy Event 4 */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30 transition-all hover:-translate-y-1 group cursor-pointer">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-[var(--sage)] bg-[var(--background)] px-2 py-1 rounded-md border border-[var(--sage)]/10">22 Jan 2026</span>
                                        </div>
                                        <h4 className="font-bold text-[var(--secondary)] group-hover:text-[var(--sage)] transition-colors">Papan Catur Bersama</h4>
                                        <p className="text-xs text-[var(--dark-olive)] mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            15:00 - 17:00 WIB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isPendamping && (
                <PendampingProfile profileData={profileData} />
            )}

            {/* Logout Button Mobile */}
            <form action={logout} className="block lg:hidden md:hidden">
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-600 font-bold rounded-xl border border-red-500/20 transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                </button>
            </form>
        </div>
    );
}