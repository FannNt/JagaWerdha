'use client';
import React from 'react';
import { Utensils, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

// MASIH MOCKUP
export default function RecipeDashboard() {
    const recipes = [
        { id: 1, name: "Sup Sayuran Bening", cal: "120 kcal", time: "15m" },
        { id: 2, name: "Ikan Kukus Jahe", cal: "180 kcal", time: "25m" },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--sage-light)]/20 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif text-[var(--sage)]">Menu Rekomendasi</h3>
                <Link 
                    href="/pendamping/resep"
                    className="text-xs font-bold text-[var(--sage)] hover:text-[var(--dark-olive)] flex items-center gap-1 uppercase tracking-wider transition-colors"
                >
                    Lihat Semua <ArrowRight size={14} />
                </Link>
            </div>

            <div className="space-y-4 flex-1">
                {recipes.map((recipe) => (
                    <div 
                        key={recipe.id}
                        className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                        <div className="w-16 h-16 bg-[var(--sage)]/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--sage)]/10 transition-colors">
                            <Utensils size={24} className="text-[var(--sage)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 text-[10px] text-[var(--sage)] font-bold uppercase tracking-widest mb-1">
                                <Star size={10} fill="currentColor" /> Terpopuler
                            </div>
                            <h4 className="text-sm font-bold text-dark-slate truncate mb-1">{recipe.name}</h4>
                            <div className="flex items-center gap-3 text-xs text-dark-slate/40 font-medium">
                                <span>{recipe.cal}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span>{recipe.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 bg-gradient-to-t from-gray-50/30 to-transparent -mx-6 -mb-6 p-6 rounded-b-2xl">
                <p className="text-xs text-dark-slate/60 leading-relaxed">
                    Butuh ide baru? Gunakan <span className="font-bold text-[var(--sage)]">AI Generator</span> di halaman resep.
                </p>
            </div>
        </div>
    );
}
