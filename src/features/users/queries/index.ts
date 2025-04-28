"use server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
    console.log('Danh sách người dùng:', users)
    return users
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error)
  } finally {
    await prisma.$disconnect()
  }
}
