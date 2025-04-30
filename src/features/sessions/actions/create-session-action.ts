'use server'
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

const createSessionSchema = z.object({
    userId: z.string().min(1).max(255).trim(),
    title: z.string().min(1).max(255).trim()
})

type CreateSessionSchema = z.infer<typeof createSessionSchema>

export async function createSession(data: CreateSessionSchema) {

    const session = await prisma.chatSession.create({
        data: {
            userId: data.userId,
            title: data.title,
        },
    })

    return session
}
