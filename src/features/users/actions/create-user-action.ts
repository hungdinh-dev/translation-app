"use server"
import { PrismaClient } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { CreateUserSchema } from '../schemas/create-user-schema'

const prisma = new PrismaClient()

export async function createUser(data: CreateUserSchema) {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                passwordHash: data.password,
            },
        })
        console.log('Người dùng đã được tạo:', newUser)

        return { success: true, user: newUser }
    } catch (error) {
        console.error('Lỗi khi thêm người dùng:', error)
        return { success: false }
        // revalidateTag(`${ctx.user.id}#tags`)
    } finally {
        await prisma.$disconnect()
    }
}
