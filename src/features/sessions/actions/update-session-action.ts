'use server'
import { PrismaClient } from "@prisma/client"
import { UpdateSessionSchema } from "../schemas/update-session-schema";

const prisma = new PrismaClient()

export async function updateSession(data: UpdateSessionSchema) {

    try {
        const existingTitle = await prisma.chatSession.findFirst({
            where: {
                title: data.title,
                id: data.sessionId,
            },
        });

        if (existingTitle) {
            throw new Error(`Tag with the name "${data.title}" already exists.`);
        }

        await prisma.chatSession.update({
            where: {
                id: data.sessionId,
                userId: data.userId
            },
            data: {
                title: data.title,
            },
        });

        return { success: true };
    } catch (error) {
        console.log("Update session error: ", error)
        return { success: false, error: "Failed to update session. " }
    }

}