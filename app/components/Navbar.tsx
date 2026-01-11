"use client";

import { useState, useEffect } from "react";
import { Heart, User, Home, Activity, Calendar, MessageSquare, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Beranda", href: "/lansia", icon: Home },
  { label: "Glukosa", href: "/lansia/glukosa", icon: Activity },
  { label: "Olahraga", href: "/lansia/olahraga", icon: Heart },
  { label: "Konsultasi", href: "/lansia/konsultasi", icon: MessageSquare },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLansiaRoute = pathname.startsWith("/lansia");

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 hidden md:block ${scrolled ? "py-6" : "py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-10">
          <div
            className={`flex items-center justify-between px-10 py-5 rounded-[2.5rem] transition-all duration-500 border ${scrolled
                ? "bg-white/80 backdrop-blur-2xl border-sage/20 shadow-xl shadow-sage/5"
                : "bg-white/40 backdrop-blur-md border-sage/10"
              }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-3xl font-serif italic text-sage tracking-tighter">
                Lansat.
              </span>
            </Link>

            {/* Navigation items */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-8 py-3 text-lg font-bold transition-all group flex items-center gap-2 ${pathname === item.href
                      ? "text-sage"
                      : "text-dark-slate/60 hover:text-sage"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-sage rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Auth/Profile */}
            <div className="flex items-center gap-6">
              <Link href="/profile">
                <button className="flex items-center gap-3 py-3 px-6 bg-sage/5 hover:bg-sage/10 rounded-2xl transition-all text-sage font-bold">
                  <User className="w-6 h-6" />
                  <span>Akun Saya</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar / Bottom Navigation (Optimized for Seniors) */}
      <div className="md:hidden">
        {/* Simple Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-sage/10 px-4 py-4 flex justify-around items-center z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-2 p-3 transition-all ${isActive ? "text-sage" : "text-dark-slate/40"
                  }`}
              >
                <div className={`p-4 rounded-3xl transition-all ${isActive ? "bg-sage/10 shadow-lg shadow-sage/5" : ""}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-40"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
