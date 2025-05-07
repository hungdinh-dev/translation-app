'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export async function getDictionary(
    targetLang: string,
    page: number,
    pageSize: number,
    search: string,
    userId: string
) {

    const sessions = await prisma.chatSession.findMany({
        where: { userId },
        select: { id: true },
    })

    const sessionIds = sessions.map((s) => s.id)

    const messages = await prisma.chatMessage.findMany({
        where: { targetLang, sessionId: { in: sessionIds }, },
        orderBy: { createdAt: 'asc' },
    })

    const pairs: {
        user: string
        ai: string
        sessionId: string
        createdAt: string
    }[] = []

    for (let i = 0; i < messages.length - 1; i++) {
        const m1 = messages[i]
        const m2 = messages[i + 1]

        if (m1.role === 'user' && m2.role === 'ai' && m1.sessionId === m2.sessionId) {
            pairs.push({
                user: m1.content,
                ai: m2.content,
                sessionId: m1.sessionId,
                createdAt: m1.createdAt.toISOString(),
            })
            i++
        }
    }

    const filtered = search
        ? pairs.filter(
            (p) =>
                p.user.toLowerCase().includes(search.toLowerCase()) ||
                p.ai.toLowerCase().includes(search.toLowerCase())
        )
        : pairs

    const totalCount = filtered.length
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

    return {
        data: paginated,
        totalCount,
    }
}
