"use server";

import { auth } from "@/auth";
import { ChatService } from "@/services/chat.service";
import { ResponseUtil } from "@/lib/api-response";

export async function startChatSessionAction(firstMessage?: string) {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return ChatService.startNewSession(parseInt(session.user.id), firstMessage);
}

export async function sendChatMessageAction(sessionId: number, content: string) {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return ChatService.sendMessage(parseInt(session.user.id), sessionId, content);
}

export async function getChatHistoryAction(sessionId: number) {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return ChatService.getSessionHistory(sessionId);
}

export async function getUserChatSessionsAction() {
    const session = await auth();
    if (!session?.user?.id) return ResponseUtil.error("Sesi tidak valid.");

    return ChatService.getUserSessions(parseInt(session.user.id));
}
