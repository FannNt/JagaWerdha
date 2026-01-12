import { auth } from "@/auth";
import { getUserProfile } from "@/services/profile.service";
import { redirect } from "next/navigation";
import { UserRole } from "@/app/generated/prisma/enums";
import PendampingSidebar from "@/app/components/Profile/PendampingSidebar";
import SavedRecipes from "./components/SavedRecipes";

export default async function ResepPage() {
    const session = await auth();
    const userId = Number(session?.user?.id);

    if (!userId) {
        redirect("/login");
    }

    const profileData = await getUserProfile(userId);

    if (!profileData || profileData.role !== UserRole.PENDAMPING) {
        redirect("/");
    }

    const assignedElderly = profileData.orangTua || [];

    return (
        <div className="bg-[#FDFDF5] min-h-screen font-sans text-dark-slate flex flex-col md:flex-row">
            <PendampingSidebar profileData={profileData} />
            <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-x-hidden">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-serif italic text-[var(--sage)] mb-3">
                            Rekomendasi Makanan
                        </h1>
                        <p className="text-dark-slate/60 text-lg">
                            Temukan resep masakan sehat yang dirancang khusus untuk kebutuhan nutrisi lansia.
                        </p>
                    </header>    
                    <SavedRecipes elderlyData={assignedElderly[0]} />
                </div>
            </main>
        </div>
    );
}
