import { z } from "zod"

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu ít nhất 6 ký tự' }),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
