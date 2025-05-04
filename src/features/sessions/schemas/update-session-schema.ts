import { z } from "zod"

export const updateSessionSchema = z.object({
    userId: z.string().min(1).max(255).trim(),
    sessionId: z.string().min(1).max(255).trim(),
    title: z.string().min(1).max(255).trim(),
})

export type UpdateSessionSchema = z.infer<typeof updateSessionSchema>