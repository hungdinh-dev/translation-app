"use server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUsers() {
  // try {
  //   const users = await prisma.user.findMany()
  //   console.log('Danh sách người dùng:', users)
  //   return users
  // } catch (error) {
  //   console.error('Lỗi khi lấy danh sách người dùng:', error)
  // } finally {
  //   await prisma.$disconnect()
  // }

  try {
    const users = await prisma.user.findMany({
      include: {
        logins: true, // Bao gồm thông tin đăng nhập (AuthProvider)
        sessions: true, // Bao gồm thông tin phiên (ChatSession) nếu có
      },
    });
    console.log('Danh sách người dùng:', users)
    return { success: true, data: users };
  } catch (error) {
    console.error('Lỗi khi tìm tất cả người dùng:', error);
    return { success: false, error: 'Đã có lỗi xảy ra khi tìm người dùng.' };
  } finally {
    await prisma.$disconnect();
  }
}
