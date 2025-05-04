import { z } from "zod"

export const createSessionSchema = z.object({
    userId: z.string().min(1).max(255).trim(),
    title: z.string().min(1).max(255).trim()
})

export type CreateSessionSchema = z.infer<typeof createSessionSchema>