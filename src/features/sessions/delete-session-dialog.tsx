"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteSession } from "./actions/delete-session-action"; // Đảm bảo path đúng
import { useTranslation } from "react-i18next";

export function DeleteSessionDialog({
    sessionId,
    userId,
    onSessionDeleted,
    open,
    onOpenChange
}: {
    sessionId: string;
    userId: string;
    onSessionDeleted?: () => void;
    open: boolean,
    onOpenChange: any;
}) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation()

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await deleteSession({ sessionId, userId });

            if (res?.success) {
                toast.success(t('chat_session.delete_dialog.toast_success'));
                onSessionDeleted?.();
            } else {
                toast.error(res?.error || t('chat_session.delete_dialog.toast_error'));
            }
        } catch (err) {
            // console.error("Error deleting session:", err);
            toast.error(t('chat_session.delete_dialog.toast_error_unexpect'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('chat_session.delete_dialog.dialog_title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('chat_session.delete_dialog.dialog_desc')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>{t('chat_session.delete_dialog.dialog_btn_cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        {loading ? t('chat_session.delete_dialog.dialog_btn_deleting') : t('chat_session.delete_dialog.dialog_btn_delete')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
