import { getUserProfile } from "@/services/profile.service";
import { auth } from "@/auth";
import { UserRole } from "@/app/generated/prisma/enums";
import { redirect } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import { logout } from "@/app/actions/auth";

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

    const isOrangTua = profileData.role === UserRole.ORANGTUA;

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8">
            {/* Header with Back Button */}
            <header className="mb-4">
                <BackButton />
            </header>

            {/* Profile Banner */}
            <div className="bg-gradient-to-br from-[var(--cream)] to-white rounded-2xl p-6 md:p-8 shadow-lg mx-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:justify-between">
                    {/* Left: Avatar and Info */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--sage)] to-[var(--dark-olive)] flex items-center justify-center text-white text-3xl font-bold shadow-md ring-4 ring-white">
                            {profileData.name ? profileData.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--sage)] mb-1">
                                {profileData.name || "Tanpa Nama"}
                            </h1>
                            <p className="text-[var(--dark-olive)] font-medium mb-3">
                                {profileData.email}
                            </p>
                            <div className="inline-block py-1.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--sage)] text-white shadow-md">
                                {profileData.role === UserRole.ORANGTUA ? "Orang Tua" : "Pendamping"}
                            </div>
                        </div>
                    </div>

                    {/* Right: Logout Button */}
                    <form action={logout}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-colors"
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
            <div className="grid gap-6 md:grid-cols-2 mx-10">
                {/* Medical History for Orang Tua */}
                {isOrangTua && profileData.orangTuaProfile && (
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-[var(--sage-light)]/10">
                        <h3 className="text-lg font-bold text-[var(--sage)] mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
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
                                                className="px-3 py-1.5 bg-gradient-to-r from-[var(--background)] to-[var(--cream)] text-[var(--sage)] rounded-lg text-sm font-medium shadow-sm border border-[var(--sage-light)]/30"
                                            >
                                                {disease}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 italic text-sm">Tidak ada data riwayat penyakit</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-gradient-to-br from-[var(--background)] to-white p-4 rounded-xl shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-6 h-6 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                            Usia
                                        </label>
                                    </div>
                                    <p className="text-[var(--sage)] font-bold text-lg">
                                        {profileData.orangTuaProfile.usia} Tahun
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-[var(--background)] to-white p-4 rounded-xl shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-6 h-6 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                            Olahraga
                                        </label>
                                    </div>
                                    <p className="text-[var(--sage)] font-bold text-lg">
                                        {profileData.orangTuaProfile.frekuensiOlahraga || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Connected Companion for Orang Tua */}
                {isOrangTua && (
                    <div className="bg-gradient-to-br from-[var(--sage)] to-[var(--dark-olive)] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8 blur-xl"></div>

                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Pendamping Anda
                        </h3>

                        {profileData.pendamping ? (
                            <div className="flex items-center gap-4 relative z-10 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold shadow-md ring-2 ring-white/30">
                                    {profileData.pendamping.name?.charAt(0) || "P"}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{profileData.pendamping.name}</p>
                                    <p className="text-white/80 text-sm">{profileData.pendamping.email}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 p-5 bg-white/10 rounded-xl text-center backdrop-blur-sm">
                                <p className="mb-2 font-semibold">Belum ada pendamping</p>
                                <p className="text-sm text-white/70">Hubungi admin untuk menghubungkan dengan pendamping</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Details for Pendamping */}
                {!isOrangTua && profileData.pendampingProfile && (
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-[var(--sage-light)]/10 md:col-span-2">
                        <h3 className="text-lg font-bold text-[var(--sage)] mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Informasi Pendamping
                        </h3>
                        <div className="bg-gradient-to-br from-[var(--background)] to-white p-4 rounded-xl shadow-sm max-w-xs">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-6 h-6 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                    Usia
                                </label>
                            </div>
                            <p className="text-[var(--sage)] font-bold text-lg">
                                {profileData.pendampingProfile.usia} Tahun
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}