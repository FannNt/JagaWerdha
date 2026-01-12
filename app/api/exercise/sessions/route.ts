import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import {auth} from "@/auth";


export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                exerciseSessions: {
                    orderBy: { createdAt: 'desc' },
                    take: 50
                }
            }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: user.exerciseSessions
        });
    } catch (error) {
        console.error("Error fetching exercise sessions:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
