'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createSessionIfNeeded(userId: string) {
    const session = await prisma.chatSession.create({
        data: {
            userId,
            title: `New Chat `,
        },
    })

    return session
}

type ChatMessageInput = {
    sessionId: string
    role: 'user' | 'ai'
    content: string
    sourceLang?: string
    targetLang?: string
}

export async function createChatMessage(data: ChatMessageInput) {

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


export async function getChatMessages(sessionId: string) {

    // console.log("BE nhận sessionID: ", sessionId)

    const messages = await prisma.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'asc' },
    })

    // console.log("Data backend", messages)

    return messages
}

export async function getChatSession(userId: string) {

    if (userId === undefined) {
        
        return []
    } else {

        const sessions = await prisma.chatSession.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
        })
        return sessions
    }
}