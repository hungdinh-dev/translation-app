// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcrypt'
// import { createToken } from '@/lib/auth'

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//     const { email, password } = await req.json()

//     const auth = await prisma.authProvider.findUnique({
//         where: {
//             provider_providerId: {
//                 provider: 'credentials',
//                 providerId: email,
//             },
//         },
//         include: { user: true },
//     })

//     if (!auth || !auth.passwordHash) {
//         return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
//     }

//     const isValid = await bcrypt.compare(password, auth.passwordHash)
//     if (!isValid) {
//         return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
//     }

//     const token = createToken(auth.user.id)
//     const res = NextResponse.json({ success: true })

//     res.cookies.set({
//         name: 'token',
//         value: token,
//         httpOnly: true,
//         path: '/',
//         sameSite: 'lax',
//         secure: process.env.NODE_ENV === 'production',
//     })

//     return res
// }
