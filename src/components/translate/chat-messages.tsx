'use client'

import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessagesProps {
    messages: any[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
    return (
        <ScrollArea className="h-96 px-10">
            <div className='space-y-2'>
                {(messages || []).map((msg, index) => (
                    <div
                        key={index}
                        className={`m-2 p-2 rounded ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                    >
                        <p>{msg.role === 'user' ? '' : "Botchat: "}{msg.content}</p>
                        {msg.targetLang && (
                            <small className="block text-xs text-gray-500">→ {msg.targetLang}</small>
                        )}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};
