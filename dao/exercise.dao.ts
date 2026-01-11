import prisma from "@/lib/db";

export class ExerciseDao {
    static async createSession(data: {
        userId: number;
        type: string;
        reps: number;
        duration: number;
        intensity?: string;
        calories?: number;
    }) {
        return prisma.exerciseSession.create({
            data,
        });
    }

    static async getHistory(userId: number) {
        return prisma.exerciseSession.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }
}
