"use server";

import { auth } from "@/auth";
import { ExerciseService } from "@/services/exercise.service";
import { ResponseUtil } from "@/lib/api-response";

export async function saveExerciseSessionAction(params: {
    type: string;
    reps: number;
    duration: number;
}) {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return ExerciseService.saveSession({
        ...params,
        userId: parseInt(session.user.id),
    });
}

export async function getExerciseHistoryAction() {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return ExerciseService.getHistory(parseInt(session.user.id));
}
