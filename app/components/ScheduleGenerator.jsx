'use client';
import React, { useState } from 'react';

export default function ScheduleGenerator({ elderlyData }) {
    const [schedules, setSchedules] = useState([
        { id: 1, time: "08:00", activity: "Senam Pagi", completed: true, date: "2026-01-10" },
        { id: 2, time: "12:00", activity: "Makan Siang", completed: false, date: "2026-01-10" },
        { id: 3, time: "15:00", activity: "Cek Gula Darah", completed: false, date: "2026-01-10" },
        { id: 4, time: "18:00", activity: "Jalan Sore", completed: false, date: "2026-01-10" }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ time: '', activity: '', date: '' });

    const handleToggleComplete = (id) => {
        setSchedules(schedules.map(schedule =>
            schedule.id === id ? { ...schedule, completed: !schedule.completed } : schedule
        ));
    };

    const handleDelete = (id) => {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSchedule = {
            id: Date.now(),
            ...formData,
            completed: false
        };
        setSchedules([...schedules, newSchedule]);
        setFormData({ time: '', activity: '', date: '' });
        setShowForm(false);
    };

    const todaySchedules = schedules.filter(s => s.date === "2026-01-10");

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--sage-light)]/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[var(--sage)] flex items-center gap-2">
                    <div className="p-2 bg-[var(--sage)]/10 rounded-lg">
                        <svg className="w-5 h-5 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    Generator Jadwal
                </h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-[var(--sage)] text-white rounded-lg text-sm font-medium hover:bg-[var(--dark-olive)] transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Jadwal
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-[var(--background)] p-4 rounded-xl mb-4 border border-[var(--sage-light)]/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div>
                            <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide block mb-1">Tanggal</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2 border border-[var(--sage-light)]/30 rounded-lg text-sm focus:outline-none focus:border-[var(--sage)]"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide block mb-1">Waktu</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-3 py-2 border border-[var(--sage-light)]/30 rounded-lg text-sm focus:outline-none focus:border-[var(--sage)]"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide block mb-1">Aktivitas</label>
                            <input
                                type="text"
                                value={formData.activity}
                                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                                placeholder="Contoh: Senam Pagi"
                                className="w-full px-3 py-2 border border-[var(--sage-light)]/30 rounded-lg text-sm focus:outline-none focus:border-[var(--sage)]"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[var(--sage)] text-white rounded-lg text-sm font-medium hover:bg-[var(--dark-olive)] transition-colors"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            )}

            {/* Schedule List */}
            <div className="space-y-3">
                <p className="text-sm font-medium text-[var(--dark-olive)]">Jadwal Hari Ini</p>
                {todaySchedules.length > 0 ? (
                    todaySchedules.map((schedule) => (
                        <div
                            key={schedule.id}
                            className={`bg-[var(--background)] p-4 rounded-xl border transition-all ${schedule.completed
                                ? 'border-green-200 bg-green-50/30'
                                : 'border-[var(--sage-light)]/20 hover:border-[var(--sage)]/30'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <button
                                        onClick={() => handleToggleComplete(schedule.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${schedule.completed
                                            ? 'bg-green-500 border-green-500'
                                            : 'border-[var(--sage)] hover:border-[var(--dark-olive)]'
                                            }`}
                                    >
                                        {schedule.completed && (
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    <div className="flex-1">
                                        <p className={`font-bold ${schedule.completed ? 'text-gray-500 line-through' : 'text-[var(--secondary)]'}`}>
                                            {schedule.activity}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {schedule.time}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(schedule.id)}
                                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 bg-[var(--background)] rounded-xl border border-[var(--sage-light)]/20">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500">Belum ada jadwal untuk hari ini</p>
                    </div>
                )}
            </div>
        </div>
    );
}
