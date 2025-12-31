"use client";

import { useState, useEffect } from "react";
import { Heart, User, Home, Activity, Calendar, MessageSquare, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Olahraga", href: "#olahraga", icon: Activity },
  { label: "Event", href: "#event", icon: Calendar },
  { label: "Konsultasi", href: "#konsultasi", icon: MessageSquare },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
          scrolled ? "py-8" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-500 border ${
              scrolled
                ? "bg-white/70 backdrop-blur-xl border-sage/10 shadow-lg shadow-sage/5"
                : "bg-transparent border-transparent"
            }`}
          >
            {/* Logo pler */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-xl font-bold text-dark-slate tracking-tight">
                Lansat
              </span>
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-6 py-2 text-sm font-bold text-dark-slate/60 hover:text-sage transition-colors group"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-sage rounded-full group-hover:w-4 transition-all" />
                </Link>
              ))}
            </div>

            {/* Auth Button */}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <button className="text-sm font-bold text-dark-slate/60 hover:text-sage transition-colors px-4">
                  Masuk
                </button>
              </Link>
              <Link href="/register">
                <button className="btn-shiny px-6 py-2.5 bg-sage text-white rounded-xl text-sm font-bold shadow-lg shadow-sage/20">
                  Daftar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <div className="bg-[#2F4F4F] rounded-[2rem] p-4 flex items-center justify-around shadow-2xl shadow-black/20 border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1 group relative"
              >
                <div className="p-2 rounded-xl group-hover:bg-white/10 transition-colors">
                  <Icon className="w-6 h-6 text-white/70 group-hover:text-white" />
                </div>
                <span className="text-[10px] font-bold text-white/40 group-hover:text-white tracking-widest uppercase">
                  {item.label}
                </span>
                <div className="absolute -top-1 w-1 h-1 bg-sage rounded-full opacity-0 group-hover:opacity-100" />
              </Link>
            );
          })}
          <Link
            href="/login"
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center shadow-lg shadow-sage/20">
              <User className="w-5 h-5 text-white" />
            </div>
             <span className="text-[10px] font-bold text-white/40 group-hover:text-white tracking-widest uppercase">
                  Akun
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
