import { ChatDao } from "@/dao/chat.dao";
import { ResponseUtil } from "@/lib/api-response";

// Note: In real implementation, import Gemini/Groq SDK
// Example: import { GoogleGenerativeAI } from "@google/generative-ai";

export class ChatService {
    static async startNewSession(userId: number, firstMessage?: string) {
        try {
            const title = firstMessage ? firstMessage.substring(0, 30) + "..." : "Konsultasi Baru";
            const session = await ChatDao.createSession(userId, title);
            return ResponseUtil.success("Sesi chat berhasil dimulai.", session);
        } catch (error) {
            return ResponseUtil.error("Gagal memulai sesi chat.", error);
        }
    }

    static async sendMessage(userId: number, sessionId: number, content: string) {
        try {
            // 1. Save User Message
            await ChatDao.addMessage(sessionId, "user", content);

            // 2. Mock AI Response (Would call Gemini API here)
            const aiResponse = await this.getAiResponse(content);

            // 3. Save Assistant Message
            const message = await ChatDao.addMessage(sessionId, "assistant", aiResponse);

            return ResponseUtil.success("Pesan berhasil dikirim.", message);
        } catch (error) {
            return ResponseUtil.error("Gagal mengirim pesan.", error);
        }
    }

    private static async getAiResponse(userContent: string): Promise<string> {
        // Simulation of AI processing
        // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // const result = await model.generateContent(userContent);
        // return result.response.text();

        const responses = [
            "Menjaga kesehatan di usia lanjut sangat penting. Anda sudah melakukan langkah yang tepat dengan berkonsultasi.",
            "Untuk kesehatan sendi, pastikan Anda mengonsumsi cukup kalsium dan vitamin D, serta tetap aktif bergerak ringan.",
            "Pola makan rendah gula sangat direkomendasikan untuk menjaga kadar glukosa dalam darah tetap stabil.",
            "Olahraga sit-to-stand sangat bagus untuk memperkuat otot kaki Anda agar tidak mudah jatuh.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    static async getSessionHistory(sessionId: number) {
        try {
            const session = await ChatDao.getSessionWithMessages(sessionId);
            if (!session) return ResponseUtil.error("Sesi tidak ditemukan.");
            return ResponseUtil.success("Berhasil mengambil riwayat chat.", session);
        } catch (error) {
            return ResponseUtil.error("Gagal mengambil riwayat chat.", error);
        }
    }

    static async getUserSessions(userId: number) {
        try {
            const sessions = await ChatDao.getUserSessions(userId);
            return ResponseUtil.success("Berhasil mengambil daftar sesi chat.", sessions);
        } catch (error) {
            return ResponseUtil.error("Gagal mengambil daftar sesi chat.", error);
        }
    }
}
