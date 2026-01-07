import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { OnboardingType, OnboardingData, OrangTuaOnboardingData, PendampingOnboardingData } from "@/types/onboarding";
import { RegisterUserData } from "@/types/auth";
import {auth} from "@/auth";

export const UserAuthService = {
    async createUser(data: RegisterUserData) {
        const { name, email, password, role } = data;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });
        return user;
    },
    async completeOnboarding(type: OnboardingType, data: OnboardingData, userId: number) {
        if (type === OnboardingType.ORANGTUA) {
            const { usia, riwayatPenyakit, frekuensiOlahraga, sesakNapas, tujuanOlahraga, code } = data as OrangTuaOnboardingData;

            const profile = await prisma.orangTuaProfile.create({
                data: {
                    userId,
                    usia: parseInt(usia),
                    frekuensiOlahraga,
                    riwayatPenyakit,
                    sesakNapas: sesakNapas === "Ya" || sesakNapas === "Ya, sering",
                    tujuanOlahraga,
                    uniqueCode: code
                }
            })
            return profile;
        } else if (type === OnboardingType.PENDAMPING) {
            const { usia, code } = data as PendampingOnboardingData;

            const parentProfile = await prisma.orangTuaProfile.findUnique({
                where: { uniqueCode: code },
                include: { user: true }
            });

            if (!parentProfile) {
                throw new Error("Invalid unique code");
            }

            await prisma.user.update({
                where: { id: parentProfile.userId },
                data: {
                    pendampingId: userId
                }
            });

            const profile = await prisma.pendampingProfile.create({
                data: {
                    userId,
                    usia: parseInt(usia),
                }
            })
            return profile;
        }
    },
    async findParentByCode(code: string) {
        const profile = await prisma.orangTuaProfile.findUnique({
            where: { uniqueCode: code },
            include: {
                user: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        if (!profile) return null;

        return {
            name: profile.user.name,
            age: profile.usia
        };
    },
    async checkRole(requiredRole: string) {
        const session = await auth()

        return session?.user?.role == requiredRole;

    },
}