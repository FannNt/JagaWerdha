import prisma from "@/lib/db";

export class PpgDao {
    static async createMeasurement(userId: number, value: number, rawSignal?: string) {
        return prisma.glucoseMeasurement.create({
            data: {
                userId,
                value,
                rawSignal,
            },
        });
    }

    static async getHistory(userId: number) {
        return prisma.glucoseMeasurement.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }

    static async getLastMeasurements(userId: number, limit: number = 5) {
        return prisma.glucoseMeasurement.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: limit
        });
    }
}
