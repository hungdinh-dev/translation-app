'use client'

import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessagesProps {
    messages: any[];
}

export const ChatMessagesVoice: React.FC<ChatMessagesProps> = ({ messages }) => {
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

// 'use client'

// import { useEffect, useState } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface ChatMessagesProps {
//     messages: {
//         role: string;
//         content: string;
//         targetLang?: string;
//     }[];
// }

// const TypewriterText: React.FC<{ text: string; speed?: number; onDone?: () => void }> = ({ text, speed = 30, onDone }) => {
//     const [displayedText, setDisplayedText] = useState("");

//     useEffect(() => {
//         let i = 0;
//         setDisplayedText("");
//         const interval = setInterval(() => {
//             setDisplayedText(prev => prev + text[i]);
//             i++;
//             if (i >= text.length) {
//                 clearInterval(interval);
//                 onDone && onDone();
//             }
//         }, speed);

//         return () => clearInterval(interval);
//     }, [text, speed]);

//     return <span>{displayedText}</span>;
// };


// export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {

//     const [typingDone, setTypingDone] = useState(false);

//     const lastMessageIndex = messages.length - 1;
//     const lastMessage = messages[lastMessageIndex];

//     return (
//         <ScrollArea className="h-96 px-10">
//             <div className="space-y-2">
//                 {(messages || []).map((msg, index) => {
//                     const isLastBotMessage =
//                         index === lastMessageIndex &&
//                         msg.role === "bot" &&
//                         !typingDone;

//                     return (
//                         <div
//                             key={index}
//                             className={`m-2 p-2 rounded ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
//                         >
//                             <p>
//                                 {msg.role === 'user' ? (
//                                     msg.content
//                                 ) : (
//                                     <>
//                                         Botchat:{" "}
//                                         {isLastBotMessage ? (
//                                             <TypewriterText
//                                                 text={msg.content}
//                                                 onDone={() => setTypingDone(true)}
//                                             />
//                                         ) : (
//                                             msg.content
//                                         )}
//                                     </>
//                                 )}
//                             </p>
//                             {msg.targetLang && (
//                                 <small className="block text-xs text-gray-500">→ {msg.targetLang}</small>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </ScrollArea>
//     );
// };
