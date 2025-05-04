'use server'
import { PrismaClient } from "@prisma/client"
import { CreateSessionSchema } from "../schemas/create-session-schema"

const prisma = new PrismaClient()

export async function createSession(data: CreateSessionSchema) {

    const existing = await prisma.chatSession.findFirst({
        where: {
            userId: data.userId,
            title: data.title,
        },
    })

    if (existing) {
        return {
            success: false,
            message: 'This session title already exists.'
        }
    }

    const session = await prisma.chatSession.create({
        data: {
            userId: data.userId,
            title: data.title,
        },
    })

    return {
        success: true,
        session,
    }
}
