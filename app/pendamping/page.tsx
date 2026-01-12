import { auth } from "@/auth";
import { getUserProfile } from "@/services/profile.service";
import { redirect } from "next/navigation";
import { UserRole } from "@/app/generated/prisma/enums";
import PendampingSidebar from "@/app/components/Profile/PendampingSidebar";
import MonitoringStats from "@/app/components/Profile/MonitoringStats";
import ScheduleDashboard from "@/app/components/Profile/ScheduleDashboard";
import RecipeDashboard from "@/app/components/Profile/RecipeDashboard";

export default async function PendampingDashboard() {
    const session = await auth();
    const userId = Number(session?.user?.id);

    if (!userId) {
        redirect("/login");
    }

    const profileData = await getUserProfile(userId);

    if (!profileData || profileData.role !== UserRole.PENDAMPING) {
        redirect("/"); // Redirect if not pendamping or no profile
    }

    const assignedElderly = profileData.orangTua || [];

    return (
        <div className="bg-[#FDFDF5] min-h-screen font-sans text-dark-slate flex flex-col md:flex-row">
            {/* sidebar */}
            <PendampingSidebar profileData={profileData} />
            
            {/* dynamic content */}
            <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden">
                <div className="max-w-6xl mx-auto space-y-10">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif italic text-[var(--sage)] mb-3">
                                Welcome, {profileData.name}
                            </h1>
                            <p className="text-dark-slate/60 text-lg">
                                Pantau kesehatan dan aktivitas lansia asuhan Anda hari ini.
                            </p>
                        </div>
                        <div className="hidden lg:block text-right">
                            <span className="text-xs font-bold text-[var(--sage)] uppercase tracking-[0.2em]">Dashboard Control</span>
                            <div className="h-1 w-24 bg-[var(--sage)]/20 mt-2 ml-auto" />
                        </div>
                    </header>

                    {/* stats */}
                    <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--sage)]/10 rounded-full hidden lg:block" />
                        <MonitoringStats elderlyData={assignedElderly[0]} />
                    </div>

                    {/* grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ScheduleDashboard />
                        <RecipeDashboard />
                    </div>
                </div>
            </main>
        </div>
    );
}
