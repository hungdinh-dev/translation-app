'use client'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { translateTextGemini } from '@/features/translate/actions/translate-action'
import { createChatMessage, getChatMessages, getChatSession } from '@/features/translation2/api'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { EllipsisVertical } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { CreateSessionDialog } from '@/features/sessions/create-session-dialog'

export default function TranslatePage() {
    const form = useForm({
        defaultValues: {
            text: '',
            targetLang: 'English',
        }
    })

    const [sessions, setSessions] = useState<any[]>([])
    const [messages, setMessages] = useState<any[]>([])
    const [sessionId, setSessionId] = useState<string>('')

    const getListSessions = async () => {
        const sessions = await getChatSession('68111838744848fd7c819782')
        console.log("List Sessions: ", sessions)
        setSessions(sessions)
    }

    useEffect(() => {
        const initSession = async () => {
            const storedSessionId = sessionStorage.getItem('chatSessionId')
            console.log("có lưu data không", storedSessionId)
            if (storedSessionId) {
                setSessionId(storedSessionId)
                const existingMessages = await getChatMessages(storedSessionId)
                setMessages(existingMessages)
            }
            // else {
            //     const session = await createSessionIfNeeded('68111838744848fd7c819782')
            //     setSessionId(session.id)
            //     sessionStorage.setItem('chatSessionId', session.id)
            // }
        }

        // const getListSessions = async () => {
        //     const sessions = await getChatSession('68111838744848fd7c819782')
        //     console.log("List Sessions: ", sessions)
        //     setSessions(sessions)
        // }

        // sessionStorage.clear();
        initSession()
        getListSessions()
    }, [])

    // useEffect(() => {
    //     const nowSession = sessionStorage.getItem('chatSessionId')
    //     sessionStorage.setItem('chatSessionId', nowSession)
    // }, [sessionStorage.getItem('chatSessionId')])

    const setNowMessage = async (sessionId: string) => {
        const existingMessages = await getChatMessages(sessionId)
        setMessages(existingMessages)
    }



    const onSubmit = async (data: any) => {
        const targetLang = data.targetLang
        const prompt = `Translate this to ${targetLang}:\n\n${data.text}`

        const userMessage = await createChatMessage({
            sessionId,
            role: 'user',
            content: data.text,
            targetLang
        })

        setMessages(prev => [...prev, userMessage])

        const translatedText = await translateTextGemini(prompt)

        const botMessage = await createChatMessage({
            sessionId,
            role: 'ai',
            content: translatedText,
            targetLang
        })

        setMessages(prev => [...prev, botMessage])
    }

    useEffect(() => {
        console.log("Xem thay đổi", form)
    }, [form])

    return (
        <div className="flex max-w-5xl mx-auto p-6 gap-6">
            <div className="w-1/4 border-r pr-4">
                <div className='flex items-center justify-between'>
                    <div className="text-lg font-semibold mb-2">
                        Chat Sessions
                    </div>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <CreateSessionDialog userId='68111838744848fd7c819782' onSessionCreated={getListSessions} />
                            {/* <Button><SquarePlus size={10} /></Button> */}
                        </HoverCardTrigger>
                        <HoverCardContent className="w-fit">
                            <div className="flex justify-between">
                                <h4 className="text-sm font-semibold">New Session</h4>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <div className="flex flex-col gap-y-2 mt-2">
                    {sessions.map((session, index) => {
                        return (
                            <Button key={index} onClick={() => setNowMessage(session.id)} className=''>
                                {session.title}
                                <div onClick={() => { alert('Hello') }}><EllipsisVertical /></div>
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div className="w-3/4 flex flex-col gap-4">
                <Card className='px-10 min-h-80'>
                    {(messages || []).map((msg, index) => (
                        <div
                            key={index}
                            className={`m-2 p-2 rounded ${msg.role === 'user' ? 'text-right' : 'text-left'
                                }`}
                        >
                            <p>{msg.role === 'user' ? '' : "Botchat: "}{msg.content}</p>
                            {msg.targetLang && (
                                <small className="block text-xs text-gray-500">→ {msg.targetLang}</small>
                            )}
                        </div>
                    ))}
                </Card>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-end">
                        <FormField
                            control={form.control}
                            name="text"
                            rules={{ required: 'Vui lòng nhập nội dung cần dịch' }}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter text to translate..."
                                            className="border p-2 rounded w-full h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="targetLang"
                            rules={{ required: 'Vui lòng chọn ngôn ngữ đích.' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? 'Translating...' : 'Send'}
                        </Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
