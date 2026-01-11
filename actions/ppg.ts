"use server";

import { auth } from "@/auth";
import { PpgService } from "@/services/ppg.service";
import { ResponseUtil } from "@/lib/api-response";

export async function analyzePpgAction(rawSignal: number[]) {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return PpgService.analyzePpg(parseInt(session.user.id), rawSignal);
}

export async function getPpgHistoryAction() {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return PpgService.getHistory(parseInt(session.user.id));
}
