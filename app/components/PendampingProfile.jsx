import React from 'react';
import MonitoringStats from './MonitoringStats';
import ScheduleGenerator from './ScheduleGenerator';
import SavedRecipes from './SavedRecipes';

export default function PendampingProfile({ profileData }) {
    const assignedElderly = profileData.orangTua || [];

    return (
        <>
            {/* Monitoring Dashboard Stats */}
            <MonitoringStats elderlyData={assignedElderly[0]} />

            {/* Tools Section - Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Schedule Generator */}
                <ScheduleGenerator elderlyData={assignedElderly[0]} />

                {/* Saved Recipes */}
                <SavedRecipes elderlyData={assignedElderly[0]} />
            </div>

            {/* Pendamping Info Card */}
            {profileData.pendampingProfile && (
                <div className="bg-[var(--cream)]/30 rounded-2xl p-6 shadow-md border border-[var(--sage-light)]/20 mt-6">
                    <h3 className="text-lg font-bold text-[var(--sage)] mb-4 flex items-center gap-2">
                        <div className="p-2 bg-[var(--sage)]/10 rounded-lg">
                            <svg className="w-5 h-5 text-[var(--sage)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        Data Diri
                    </h3>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--sage-light)]/20 group hover:border-[var(--sage)]/30 transition-all">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-[var(--sage)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <label className="text-xs font-bold text-[var(--dark-olive)] uppercase tracking-wide">
                                Usia
                            </label>
                        </div>
                        <p className="text-[var(--sage)] font-bold text-lg">
                            {profileData.pendampingProfile.usia} <span className="text-sm font-medium text-[var(--dark-olive)]">Tahun</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}