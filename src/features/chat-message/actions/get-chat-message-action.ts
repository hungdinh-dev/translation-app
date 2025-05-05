'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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