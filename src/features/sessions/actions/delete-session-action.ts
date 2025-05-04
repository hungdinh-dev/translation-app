'use server'
import { PrismaClient } from "@prisma/client"
import { DeleteSessionSchema } from "../schemas/delete-session-schema";

const prisma = new PrismaClient()

export async function deleteSession(data: DeleteSessionSchema) {
    try {
        await prisma.chatMessage.deleteMany({
            where: {
                sessionId: data.sessionId,
            },
        });

        await prisma.chatSession.delete({
            where: {
                id: data.sessionId,
                userId: data.userId
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Delete session error:", error);
        return { success: false, error: "Failed to delete session." };
    }
}