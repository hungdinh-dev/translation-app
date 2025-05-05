export type CreateChatMessageSchema = {
    sessionId: string
    role: 'user' | 'ai'
    content: string
    sourceLang?: string
    targetLang?: string
}