import { getUserProfile } from "@/services/profile.service";
import { auth } from "@/auth";
import { UserRole } from "@/app/generated/prisma/enums";
import { redirect } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import { logout } from "@/actions/logout";
import PendampingProfile from "../components/PendampingProfile";
import EventColumn from "../components/EventColumn";
import LansiaAsuhanList from "../components/LansiaAsuhanList";
import OrangTuaProfile from "../components/OrangTuaProfile";


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
    const isPendamping = profileData.role === UserRole.PENDAMPING;

    // DEV: Forced view for development
    // const isOrangTua = false;
    // const isPendamping = false;

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
            <div className="mx-2 md:mx-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Main Content (Medical/Companion or Pendamping Data) */}
                <div className="lg:col-span-2 space-y-6">
                    {isOrangTua && (
                        <OrangTuaProfile profileData={profileData} />
                    )}

                    {isPendamping && (
                        <PendampingProfile profileData={profileData} />
                    )}
                </div>

                {/* Right Column: Events & Activities + Lansia Asuhan (for Pendamping) */}
                <div className="lg:col-span-1 space-y-6">
                    {isPendamping && (
                        <LansiaAsuhanList assignedElderly={(profileData.orangTua || []) as any} />
                    )}
                    <EventColumn />
                </div>
            </div>

            {/* Logout Button Mobile */}
            <form action={logout} className="block lg:hidden md:hidden mx-2 md:mx-8">
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