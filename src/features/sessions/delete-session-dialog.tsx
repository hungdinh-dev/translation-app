"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteSession } from "./actions/delete-session-action"; // Đảm bảo path đúng

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

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await deleteSession({ sessionId, userId });

            if (res?.success) {
                toast.success("Session deleted successfully!");
                onSessionDeleted?.();
            } else {
                toast.error(res?.error || "Failed to delete session.");
            }
        } catch (err) {
            console.error("Error deleting session:", err);
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the chat session and all its messages.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
