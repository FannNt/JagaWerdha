import prisma from "@/lib/db";

export class ChatDao {
    static async createSession(userId: number, title?: string) {
        return prisma.chatSession.create({
            data: {
                userId,
                title,
            },
        });
    }

    static async addMessage(sessionId: number, role: "user" | "assistant", content: string) {
        return prisma.chatMessage.create({
            data: {
                sessionId,
                role,
                content,
            },
        });
    }

    static async getSessionWithMessages(sessionId: number) {
        return prisma.chatSession.findUnique({
            where: { id: sessionId },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });
    }

    static async getUserSessions(userId: number) {
        return prisma.chatSession.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
        });
    }
}
