"use server"
import { PrismaClient } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { CreateUserSchema } from '../schemas/create-user-schema'
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient()

const createGoogleUserSchema = z.object({
    email: z.string().email().optional(),
    googleSub: z.string(),
    name: z.string().optional(),
});
type CreateGoogleUserSchema = z.infer<typeof createGoogleUserSchema>;

export async function createUserWithCredentials(data: CreateUserSchema) {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                logins: {
                    some: {
                        provider: 'credentials',
                        providerId: data.email,
                    },
                },
            },
        });

        if (existingUser) {
            return { success: false, error: 'Email đã được sử dụng.' };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                logins: {
                    create: {
                        provider: 'credentials',
                        providerId: data.email,
                        passwordHash: hashedPassword,
                    },
                },
                email: data.email,
                name: data.name,
            },
        });

        return { success: true, user: newUser };
    } catch (error) {
        console.error('Lỗi khi tạo người dùng bằng credentials:', error);
        return { success: false, error: 'Đã có lỗi xảy ra khi tạo người dùng.' };
    } finally {
        await prisma.$disconnect();
    }
}

export async function createUserWithGoogle(data: CreateGoogleUserSchema) {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                logins: {
                    some: {
                        provider: 'google',
                        providerId: data.googleSub,
                    },
                },
            },
        });

        if (existingUser) {
            return { success: true, user: existingUser }; // Người dùng đã tồn tại
        }

        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                logins: {
                    create: {
                        provider: 'google',
                        providerId: data.googleSub,
                    },
                },
            },
        });

        return { success: true, user: newUser };
    } catch (error) {
        console.error('Lỗi khi tạo người dùng bằng Google:', error);
        return { success: false, error: 'Đã có lỗi xảy ra khi tạo người dùng bằng Google.' };
    } finally {
        await prisma.$disconnect();
    }
}

// "use server"
// import { PrismaClient } from '@prisma/client'
// import { revalidateTag } from 'next/cache'
// import { CreateUserSchema } from '../schemas/create-user-schema'
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient()

// export async function createUser(data: CreateUserSchema) {
//     try {
//         // const newUser = await prisma.user.create({
//         //     data: {
//         //         email: data.email,
//         //         passwordHash: data.password,
//         //     },
//         // })
//         // console.log('Người dùng đã được tạo:', newUser)

//         if (data.email && data.password) {
//             // Trường hợp đăng ký/đăng nhập bằng email và password
//             const existingUser = await prisma.user.findFirst({
//                 where: {
//                     logins: {
//                         some: {
//                             provider: 'credentials',
//                             providerId: data.email,
//                         },
//                     },
//                 },
//             });

//             if (existingUser) {
//                 throw new Error('Email đã được sử dụng.');
//             }

//             const hashedPassword = await bcrypt.hash(data.password, 10);

//             const newUser = await prisma.user.create({
//                 data: {
//                     // name: name,
//                     logins: {
//                         create: {
//                             provider: 'credentials',
//                             providerId: data.email,
//                             passwordHash: hashedPassword,
//                         },
//                     },
//                 },
//             });

//             return newUser;
//         } else if (data.email && data.googleSub) {
//             // Trường hợp đăng ký/đăng nhập bằng Google
//             const existingUser = await prisma.user.findFirst({
//                 where: {
//                     logins: {
//                         some: {
//                             provider: 'google',
//                             providerId: data.googleSub,
//                         },
//                     },
//                 },
//             });

//             if (existingUser) {
//                 return existingUser; // Người dùng đã tồn tại
//             }

//             const newUser = await prisma.user.create({
//                 data: {
//                     // name: name,
//                     email: data.email, // Lưu email nếu có từ Google
//                     logins: {
//                         create: {
//                             provider: 'google',
//                             providerId: data.googleSub,
//                         },
//                     },
//                 },
//             });

//             return { success: true, user: newUser }
//         }
//     } catch (error) {
//         console.error('Lỗi khi thêm người dùng:', error)
//         return { success: false }
//         // revalidateTag(`${ctx.user.id}#tags`)
//     } finally {
//         await prisma.$disconnect()
//     }
// }
