import prisma from "@/lib/db";
import { UserAuthService } from "@/services/user-auth.service";
import { UserRole } from "@/app/generated/prisma/enums";

export const getUserProfile = async (userId: number) => {
    const isOrangtua = await UserAuthService.checkRole(UserRole.ORANGTUA)
    return prisma.user.findUnique({
        where: {
            id: userId,
        }, include: {
            orangTuaProfile: true,
            pendampingProfile: true,
            pendamping: true,
            orangTua: {
                include: {
                    orangTuaProfile: true
                }
            }
        }
    })

}