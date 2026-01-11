'use client';
import React, { useState } from 'react';

export default function SavedRecipes({ elderlyData }) {
    // Mock data - resep yang sudah di-generate AI dan disimpan
    const [recipes] = useState([
        {
            id: 1,
            name: "Sup Sayuran dengan Tahu",
            ingredients: ["Wortel", "Brokoli", "Tahu", "Kaldu ayam", "Bawang putih"],
            instructions: [
                "Rebus kaldu ayam hingga mendidih",
                "Masukkan wortel yang sudah dipotong dadu",
                "Tambahkan brokoli dan tahu",
                "Masak hingga sayuran empuk"
            ],
            nutrition: {
                kalori: "150 kal",
                protein: "8g",
                serat: "5g"
            },
            reason: "Menu ini cocok karena rendah gula, tinggi serat, dan mudah dicerna. Sayuran yang dimasak empuk memudahkan lansia untuk mengunyah.",
            savedDate: "2026-01-08"
        },
        {
            id: 2,
            name: "Ikan Kukus Saus Lemon",
            ingredients: ["Ikan kakap", "Lemon", "Jahe", "Bawang putih", "Kecap asin"],
            instructions: [
                "Bersihkan ikan dan lumuri dengan perasan lemon",
                "Iris jahe dan bawang putih, letakkan di atas ikan",
                "Kukus selama 15-20 menit",
                "Siram dengan saus kecap asin hangat"
            ],
            nutrition: {
                kalori: "180 kal",
                protein: "25g",
                lemak: "6g"
            },
            reason: "Tinggi protein dan omega-3 yang baik untuk jantung. Cara memasak kukus menjaga nutrisi dan mudah dicerna.",
            savedDate: "2026-01-07"
        },
        {
            id: 3,
            name: "Tumis Brokoli Jamur",
            ingredients: ["Brokoli", "Jamur kancing", "Bawang putih", "Saus tiram", "Minyak zaitun"],
            instructions: [
                "Panaskan minyak zaitun, tumis bawang putih",
                "Masukkan brokoli dan jamur",
                "Tambahkan saus tiram dan sedikit air",
                "Masak hingga sayuran empuk tapi masih renyah"
            ],
            nutrition: {
                kalori: "120 kal",
                protein: "6g",
                serat: "7g"
            },
            reason: "Rendah kalori, tinggi serat, dan kaya antioksidan. Baik untuk pencernaan dan menjaga berat badan ideal.",
            savedDate: "2026-01-05"
        }
    ]);

    const [expandedRecipe, setExpandedRecipe] = useState(null);

    const toggleRecipe = (id) => {
        setExpandedRecipe(expandedRecipe === id ? null : id);
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--sage-light)]/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[var(--sage)] flex items-center gap-2">
                    <div className="p-2 bg-[var(--sage)]/10 rounded-lg">
                        <svg className="w-5 h-5 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    Resep Tersimpan
                </h3>
                <span className="px-3 py-1 bg-[var(--sage)]/10 text-[var(--sage)] rounded-full text-sm font-bold">
                    {recipes.length} Resep
                </span>
            </div>

            <p className="text-sm text-[var(--dark-olive)] mb-4">
                Kumpulan resep masakan sehat yang sudah di-generate AI berdasarkan profil kesehatan lansia
            </p>

            {/* Recipe List */}
            <div className="space-y-3">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-[var(--background)] rounded-xl border border-[var(--sage-light)]/20 overflow-hidden transition-all hover:border-[var(--sage)]/30"
                    >
                        {/* Recipe Header */}
                        <div
                            onClick={() => toggleRecipe(recipe.id)}
                            className="p-4 cursor-pointer hover:bg-white/50 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-bold text-[var(--secondary)] mb-1">{recipe.name}</h4>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                                            {recipe.nutrition.kalori}
                                        </span>
                                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md border border-green-100">
                                            Protein {recipe.nutrition.protein}
                                        </span>
                                        {recipe.nutrition.serat && (
                                            <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-md border border-orange-100">
                                                Serat {recipe.nutrition.serat}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Disimpan: {recipe.savedDate}</p>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-[var(--sage)] transition-transform ${expandedRecipe === recipe.id ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Recipe Details (Expanded) */}
                        {expandedRecipe === recipe.id && (
                            <div className="px-4 pb-4 border-t border-[var(--sage-light)]/20 pt-4">
                                {/* Reason */}
                                <div className="mb-4 p-3 bg-[var(--sage)]/5 rounded-lg border border-[var(--sage)]/10">
                                    <p className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide mb-1">
                                        Kenapa Cocok?
                                    </p>
                                    <p className="text-sm text-[var(--dark-olive)]">{recipe.reason}</p>
                                </div>

                                {/* Ingredients */}
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide mb-2">
                                        Bahan-bahan
                                    </p>
                                    <ul className="space-y-1">
                                        {recipe.ingredients.map((ingredient, idx) => (
                                            <li key={idx} className="text-sm text-[var(--dark-olive)] flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--sage)]"></span>
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <p className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide mb-2">
                                        Cara Memasak
                                    </p>
                                    <ol className="space-y-2">
                                        {recipe.instructions.map((step, idx) => (
                                            <li key={idx} className="text-sm text-[var(--dark-olive)] flex gap-2">
                                                <span className="font-bold text-[var(--sage)] min-w-[20px]">{idx + 1}.</span>
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
