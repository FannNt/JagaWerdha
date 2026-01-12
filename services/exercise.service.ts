import { ExerciseDao } from "@/dao/exercise.dao";
import { ResponseUtil } from "@/lib/api-response";

export class ExerciseService {
    static async saveSession(params: {
        userId: number;
        type: string;
        reps: number;
        duration: number;
    }) {
        try {
            // Calculate calories (simplified formula)
            // MET values: Sit-to-stand ~ 3.0, Wall pushups ~ 3.5, Knee lifts ~ 3.0
            const met = 3.2;
            const weightKg = 65; // Average elderly weight if not provided
            const calories = (met * 3.5 * weightKg * (params.duration / 60)) / 200;

            const intensity = params.reps > 15 ? "High" : params.reps > 8 ? "Medium" : "Low";

            const session = await ExerciseDao.createSession({
                ...params,
                calories: parseFloat(calories.toFixed(2)),
                intensity,
            });

            return ResponseUtil.success("Sesi olahraga berhasil disimpan.", session);
        } catch (error) {
            return ResponseUtil.error("Gagal menyimpan sesi olahraga.", error);
        }
    }

    static async getHistory(userId: number) {
        try {
            const history = await ExerciseDao.getHistory(userId);
            return ResponseUtil.success("Berhasil mengambil riwayat olahraga.", history);
        } catch (error) {
            return ResponseUtil.error("Gagal mengambil riwayat olahraga.", error);
        }
    }
}
