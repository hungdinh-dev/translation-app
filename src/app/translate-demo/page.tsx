'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { translateTextGemini } from '@/features/translate/actions/translate-action'
import { createChatMessage, createSessionIfNeeded, getChatMessages } from '@/features/translation2/api'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function TranslatePage() {
    const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm()
    const [messages, setMessages] = useState<any[]>([])
    const [sessionId, setSessionId] = useState<string>('')

    const targetLang = watch('targetLang', 'English')

    useEffect(() => {
        const initSession = async () => {
            const storedSessionId = sessionStorage.getItem('chatSessionId')
            if (storedSessionId) {
                setSessionId(storedSessionId)
                const existingMessages = await getChatMessages(storedSessionId)
                setMessages(existingMessages)
            } else {
                const session = await createSessionIfNeeded('68111838744848fd7c819782')
                setSessionId(session.id)
                sessionStorage.setItem('chatSessionId', session.id)
            }
        }
        initSession()
    }, [])

    const onSubmit = async (data: any) => {
        const prompt = `Translate this to ${targetLang}:\n\n${data.text}`

        // Save user message
        const userMessage = await createChatMessage({
            sessionId,
            role: 'user',
            content: data.text,
            targetLang
        })

        setMessages(prev => [...prev, userMessage])

        // Get translated message
        const translatedText = await translateTextGemini(prompt)

        const botMessage = await createChatMessage({
            sessionId,
            role: 'ai',
            content: translatedText,
            targetLang
        })

        setMessages(prev => [...prev, botMessage])
    }

    return (
        <div className="flex max-w-5xl mx-auto p-6 gap-6">
            <div className="w-1/4 border-r pr-4">
                <h2 className="text-lg font-semibold mb-2">Chat Sessions</h2>
                <p className="text-sm text-gray-500">Lịch sử sẽ hiển thị ở đây.</p>
            </div>

            <div className="w-3/4 flex flex-col gap-4">
                <Card className='px-10'>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`m-2 p-2 rounded ${msg.role === 'user' ? 'bg-gray-500 text-right' : 'text-left'
                                }`}
                        >
                            <p>{msg.role === 'user' ? '' : "Botchat: "}{msg.content}</p>
                            {msg.targetLang && (
                                <small className="block text-xs text-gray-500">→ {msg.targetLang}</small>
                            )}
                        </div>
                    ))}
                </Card>

                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-end">
                    <Textarea
                        {...register('text', { required: true })}
                        placeholder="Enter text to translate..."
                        className="border p-2 rounded w-full h-20"
                    />

                    <Select {...register('targetLang')}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Languages" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                            <SelectItem value="Japanese">Japanese</SelectItem>
                            <SelectItem value="Chinese">Chinese</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Translating...' : 'Send'}
                    </Button>
                </form>
            </div>
        </div>
    )
}
