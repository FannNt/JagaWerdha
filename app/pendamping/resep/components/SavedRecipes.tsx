'use client';
import React, { useState } from 'react';
import { ChefHat, Sparkles, Wand2, Eye } from 'lucide-react';
//MASIHMOCKUP
interface Recipe {
    id: number;
    name: string;
    description: string;
    category: string;
    prepTime: string;
}

export default function SavedRecipes({ elderlyData }: { elderlyData?: any }) {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

    const [recipes] = useState<Recipe[]>([
        { id: 1, name: "Sup Sayuran Bening", description: "Sup kaya serat dengan kaldu ayam rendah lemak.", category: "Lunch", prepTime: "20 min" },
        { id: 2, name: "Bubur Havermut Buah", description: "Havermut lembut dengan potongan pepaya dan pisang.", category: "Breakfast", prepTime: "10 min" },
        { id: 3, name: "Ikan Kukus Jahe", description: "Ikan putih dikukus dengan bumbu jahe untuk pencernaan.", category: "Dinner", prepTime: "25 min" },
    ]);

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);
        setGeneratedRecipe(null);
        
        // mokup ai jawaban
        setTimeout(() => {
            setIsGenerating(false);
            setGeneratedRecipe({
                name: "Salad Buah Yogurt Madu",
                description: "Kombinasi buah segar dengan dressing yogurt rendah lemak dan madu murni.",
                ingredients: ["Pepaya", "Melon", "Yogurt Yunani", "Madu", "Biji Selasih"],
                benefit: "Kaya vitamin C dan probiotik untuk kesehatan pencernaan lansia."
            });
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--sage-light)]/20 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                    <Sparkles size={120} className="text-[var(--sage)]" />
                </div>
                
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <div className="w-12 h-12 bg-[var(--sage)]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Wand2 className={`text-[var(--sage)] ${isGenerating ? 'animate-pulse' : ''}`} size={24} />
                    </div>
                    <h2 className="text-2xl font-serif text-[var(--sage)] mb-2">Jaga Resep Sehat</h2>
                    <p className="text-dark-slate/60 mb-6 font-medium text-sm">
                        Tuliskan bahan yang tersedia atau kondisi kesehatan lansia untuk mendapatkan rekomendasi menu.
                    </p>
                    
                    <div className="space-y-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Contoh: Buatkan resep untuk lansia dengan darah tinggi"
                            className="w-full min-h-[120px] p-5 bg-[#FDFDF5] border-2 border-transparent border-dashed focus:border-[var(--sage-light)] rounded-2xl focus:ring-4 focus:ring-[var(--sage)]/5 outline-none transition-all resize-none text-dark-slate placeholder:text-dark-slate/30"
                        />
                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className="w-full md:mx-auto px-10 py-4 bg-[var(--sage)] text-white rounded-2xl font-bold hover:bg-[var(--dark-olive)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--sage)]/25 active:scale-95"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Meracik Resep...
                                </>
                            ) : (
                                <>
                                    <ChefHat size={20} />
                                    Generate Resep
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>

            {/* hasil ai masih mokup */}
            {(isGenerating || generatedRecipe) && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gradient-to-br from-[var(--sage)] to-[var(--dark-olive)] rounded-3xl p-1 shadow-xl shadow-[var(--sage)]/20">
                        <div className="bg-white rounded-[22px] p-8">
                            {isGenerating ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl animate-pulse" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
                                            <div className="h-3 w-32 bg-gray-50 rounded animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 w-full bg-gray-50 rounded animate-pulse" />
                                        <div className="h-3 w-5/6 bg-gray-50 rounded animate-pulse" />
                                        <div className="h-3 w-4/6 bg-gray-50 rounded animate-pulse" />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--sage)]/10 text-[var(--sage)] rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                <Sparkles size={12} /> Hasil AI Jaga
                                            </div>
                                            <h3 className="text-3xl font-serif text-dark-slate">{generatedRecipe.name}</h3>
                                        </div>
                                        <button className="p-3 bg-gray-50 rounded-xl text-dark-slate/40 hover:text-[var(--sage)] hover:bg-[var(--sage)]/10 transition-colors">
                                            <Eye size={20} />
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <p className="text-dark-slate/60 leading-relaxed italic border-l-4 border-[var(--sage)]/20 pl-4">
                                                "{generatedRecipe.description}"
                                            </p>
                                            <div className="bg-[#FDFDF5] p-5 rounded-2xl border border-[var(--sage-light)]/20">
                                                <h4 className="text-xs font-bold text-[var(--sage)] uppercase tracking-widest mb-3">Manfaat Lansia</h4>
                                                <p className="text-sm text-dark-slate/70 font-medium leading-relaxed">
                                                    {generatedRecipe.benefit}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-dark-slate/40 uppercase tracking-widest">Bahan Utama</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {generatedRecipe.ingredients.map((ing: string, i: number) => (
                                                    <span key={i} className="px-4 py-2 bg-gray-50 text-dark-slate/70 rounded-xl text-sm font-semibold border border-gray-100">
                                                        {ing}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="pt-4 flex gap-3">
                                                <button className="flex-1 py-3 bg-[var(--sage)] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                                                    Simpan Resep
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <section className="bg-white rounded-2xl shadow-sm border border-[var(--sage-light)]/20 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-serif text-[var(--sage)]">Rekomendasi Resep</h3>
                        <p className="text-sm text-dark-slate/60">Beberapa resep yang mungkin cocok untuk hari ini.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FDFDF5]">
                                <th className="px-6 py-4 text-xs font-bold text-[var(--sage)] uppercase tracking-wider">Nama Resep</th>
                                <th className="px-6 py-4 text-xs font-bold text-[var(--sage)] uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-xs font-bold text-[var(--sage)] uppercase tracking-wider">Waktu</th>
                                <th className="px-6 py-4 text-xs font-bold text-[var(--sage)] uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recipes.map((recipe) => (
                                <tr key={recipe.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-dark-slate">{recipe.name}</div>
                                        <div className="text-xs text-dark-slate/40 mt-0.5 line-clamp-1">{recipe.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-[var(--sage)]/5 text-[var(--sage)] text-xs rounded-md border border-[var(--sage-light)]/20">
                                            {recipe.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-dark-slate/60">{recipe.prepTime}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-[var(--sage)] hover:text-[var(--dark-olive)] text-sm font-medium">Detail</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-[#FDFDF5]/50 border-t border-gray-100 text-center">
                    <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-[var(--sage-light)]/30 text-[var(--sage)] rounded-xl text-sm font-semibold hover:bg-[var(--sage)] hover:text-white transition-all shadow-sm">
                        <Eye size={16} />
                        Cek Resep Lainnya
                    </button>
                </div>
            </section>
        </div>
    );
}
