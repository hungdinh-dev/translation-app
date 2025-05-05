'use client'

import { useState, useEffect } from 'react'
import { translateTextGemini } from '@/features/translate/actions/translate-action'
import { createChatMessage, getChatMessages } from '@/features/translation2/api'
import { Card } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { ChatSessions } from '@/components/translate/chat-sessions'
import { ChatMessages } from '@/components/translate/chat-messages'
import { TranslationInputVoice } from '@/components/translate/translation-input-voice'
import { speakWithElevenLabs } from '@/utils/elevenlabs'

export default function TranslatePage() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<any[]>([]);
    const [sessionId, setSessionId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const initSession = async () => {
            const storedSessionId = sessionStorage.getItem('chatSessionId');
            if (storedSessionId) {
                setSessionId(storedSessionId);
                const existingMessages = await getChatMessages(storedSessionId);
                setMessages(existingMessages);
            }
        };
        initSession();
    }, []);

    const handleSessionSelect = async (newSessionId: string) => {
        setSessionId(newSessionId);
        sessionStorage.setItem('chatSessionId', newSessionId);
        const existingMessages = await getChatMessages(newSessionId);
        setMessages(existingMessages);
    };

    const handleSendMessage = async (data: { text: string; targetLang: string }) => {
        if (!sessionId) {
            // Optionally handle the case where there's no session selected
            console.warn("No chat session selected.");
            return;
        }

        setIsSubmitting(true);
        const { text, targetLang } = data;
        const prompt = `Translate this to ${targetLang}:\n\n${text}`;

        const userMessage = await createChatMessage({
            sessionId,
            role: 'user',
            content: text,
            targetLang
        });

        setMessages(prev => [...prev, userMessage]);

        const translatedText = await translateTextGemini(prompt);

        const botMessage = await createChatMessage({
            sessionId,
            role: 'ai',
            content: translatedText,
            targetLang
        });

        setMessages(prev => [...prev, botMessage]);

        await speakWithElevenLabs(translatedText)
        setIsSubmitting(false);
    };

    return (
        <div className="flex max-w-5xl mx-auto p-6 gap-6">
            <div className="w-1/4 border-r pr-4">
                <ChatSessions
                    onSessionSelect={handleSessionSelect}
                    onSessionCreated={() => { /* Re-fetch sessions in parent if needed */ }}
                    onSessionDeleted={() => { /* Re-fetch sessions in parent if needed */ }}
                    onSessionUpdated={() => { /* Re-fetch sessions in parent if needed */ }}
                    currentSessionId={sessionId}
                />
            </div>

            {/* w-3/4 flex flex-col gap-4 */}
            <div className="w-3/4 flex flex-col gap-4">
                <Card className='overflow-y-auto'>
                    <ChatMessages messages={messages} />
                    {/* <ChatMessagesVoice messages={messages} /> */}
                </Card>

                <TranslationInputVoice onSubmit={handleSendMessage} isSubmitting={isSubmitting} />

                {/* <TranslationInput onSubmit={handleSendMessage} isSubmitting={isSubmitting} /> */}
            </div>
        </div>
    );
}