import { z } from "zod"

export const deleteSessionSchema = z.object({
    userId: z.string().min(1).max(255).trim(),
    sessionId: z.string().min(1).max(255).trim()
})

export type DeleteSessionSchema = z.infer<typeof deleteSessionSchema>
