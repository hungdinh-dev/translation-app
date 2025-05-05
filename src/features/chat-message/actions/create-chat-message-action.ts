'use server'
import { PrismaClient } from "@prisma/client"
import { CreateChatMessageSchema } from "../schemas/create-chat-message-schemas"

const prisma = new PrismaClient()

export async function createChatMessage(data: CreateChatMessageSchema) {

    const message = await prisma.chatMessage.create({
        data: {
            sessionId: data.sessionId,
            role: data.role,
            content: data.content,
            sourceLang: data.sourceLang,
            targetLang: data.targetLang,
        },
    })

    return message
}
