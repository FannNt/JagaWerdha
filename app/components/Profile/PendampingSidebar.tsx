'use client';
import { Calendar, CloudSun, LogOut, Mail, Utensils, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/logout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PendampingSidebarProps {
    profileData: any;
}

export default function PendampingSidebar({ profileData }: PendampingSidebarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { label: "Dashboard", href: "/pendamping", icon: CloudSun },
        { label: "Jadwal", href: "/pendamping/jadwal", icon: Calendar },
        { label: "Resep", href: "/pendamping/resep", icon: Utensils },
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* judul */}
            <div className="hidden md:flex items-center gap-3 mb-8">
                <span className="text-2xl font-serif italic text-sage tracking-tighter">
                    Jaga Werdha.
                </span>
            </div>

            {/* card profile kiri */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-sage/10 mb-8">
                {/* avatra */}
                <div className="w-24 h-24 rounded-full bg-sage flex items-center justify-center text-white text-3xl font-serif shadow-xl shadow-sage/20 border-4 border-white mb-4">
                    {profileData.name ? profileData.name.charAt(0).toUpperCase() : "?"}
                </div>

                <h2 className="text-xl font-bold text-sage mb-1">
                    {profileData.name}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-dark-slate/60 mb-4">
                    <Mail className="w-3 h-3" />
                    <span>{profileData.email}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-sage/5 border border-sage/10 text-xs font-bold text-sage uppercase tracking-wider">
                        Pendamping
                    </div>
                    {profileData.pendampingProfile?.usia && (
                        <div className="px-3 py-1 rounded-full bg-sage/5 border border-sage/10 text-xs font-bold text-sage flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {profileData.pendampingProfile.usia} Thn
                        </div>
                    )}
                </div>
            </div>

            {/* menu */}
            <nav className="flex-1 space-y-3">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${isActive
                                ? 'bg-sage text-white shadow-lg shadow-sage/20'
                                : 'text-sage/60 hover:text-sage hover:bg-sage/5'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* logout */}
            <form action={logout} className="mt-8">
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm font-bold border border-red-100"
                >
                    <LogOut className="w-4 h-4" />
                    Keluar
                </button>
            </form>
        </div>
    );

    return (
        <>
            {/* desktop Sideba */}
            <aside className="hidden md:flex w-[320px] bg-white/50 backdrop-blur-xl border-r border-sage/10 p-8 flex-col h-screen sticky top-0 shrink-0">
                {sidebarContent}
            </aside>

            {/* mobile judul */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-sage/10 px-6 py-4 flex items-center justify-between">
                <span className="text-xl font-serif italic text-sage tracking-tighter">
                    Jaga Werdha.
                </span>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-sage hover:bg-sage/10 rounded-full transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* mobile drawer overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        
                        {/* mobile drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 z-[61] w-[85%] max-w-[320px] h-full bg-[#FDFDF5] p-6 shadow-2xl overflow-y-auto md:hidden"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-serif italic text-sage tracking-tighter">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-gray-400 hover:text-dark-slate hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            {/* mobile sidebar */}
                            {sidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

