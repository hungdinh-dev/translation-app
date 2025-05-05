'use client'

import { useState, useEffect } from 'react'
import { getChatSession } from '@/features/translation2/api'
import { CreateSessionDialog } from '@/features/sessions/create-session-dialog'
import { useSession } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVertical, FolderPen, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { DeleteSessionDialog } from '@/features/sessions/delete-session-dialog'
import { UpdateSessionDialog } from '@/features/sessions/update-session-dialog'
import { useTranslation } from 'react-i18next'

interface ChatSessionsProps {
    onSessionSelect: (sessionId: string) => void;
    onSessionCreated: () => void;
    onSessionDeleted: () => void;
    onSessionUpdated: () => void;
    currentSessionId: string;
}

export const ChatSessions: React.FC<ChatSessionsProps> = ({ onSessionSelect, onSessionCreated, onSessionDeleted, onSessionUpdated, currentSessionId }) => {
    const { data: session } = useSession();
    const [sessions, setSessions] = useState<any[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState<string>('');
    const [selectedSessionTitle, setSelectedSessionTitle] = useState<string>('');

    const { t } = useTranslation();

    const getListSessions = async () => {
        const sessions = await getChatSession(session?.user?.id);
        setSessions(sessions);
    };

    useEffect(() => {
        getListSessions();
    }, [session?.user?.id]);

    const handleSessionClick = (sessionId: string) => {
        onSessionSelect(sessionId);
    };

    const handleDeleteClick = (sessionId: string) => {
        setSelectedSessionId(sessionId);
        setOpenDeleteDialog(true);
    };

    const handleRenameClick = (sessionId: string, sessionTitle: string) => {
        setSelectedSessionId(sessionId);
        setOpenUpdateDialog(true);
        setSelectedSessionTitle(sessionTitle)
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className="text-lg font-semibold mb-2">
                    {t('chat_session.title')}
                </div>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <CreateSessionDialog userId={session?.user?.id} onSessionCreated={getListSessions} />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit">
                        <div className="flex justify-between">
                            <h4 className="text-sm font-semibold">{t('chat_session.new_session')}</h4>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="flex flex-col gap-y-2 mt-2">
                {(sessions || []).map((session, index) => (
                    <div
                        className={`flex justify-between items-center hover:bg-gray-100 hover:text-black rounded-sm hover:cursor-pointer ${session.id === currentSessionId ? 'bg-gray-100 text-black' : ''}`}
                        key={index}
                        onClick={() => handleSessionClick(session.id)}
                    >
                        <div className='ml-4'>
                            {session.title}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><EllipsisVertical /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40">
                                <DropdownMenuLabel>{t('chat_session.action')}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => handleRenameClick(session.id, session.title)}>
                                        {t('chat_session.rename')}
                                        <DropdownMenuShortcut><FolderPen /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteClick(session.id)}>
                                        {t('chat_session.delete')}
                                        <DropdownMenuShortcut><Trash2 /></DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>

            <DeleteSessionDialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
                sessionId={selectedSessionId}
                userId={session?.user?.id}
                onSessionDeleted={getListSessions}
            />

            <UpdateSessionDialog
                open={openUpdateDialog}
                onOpenChange={setOpenUpdateDialog}
                sessionId={selectedSessionId}
                sessionTitle={selectedSessionTitle}
                userId={session?.user?.id}
                onSessionUpdated={getListSessions}
            />
        </div>
    );
};