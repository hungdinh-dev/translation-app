"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateSession } from "./actions/update-session-action";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function UpdateSessionDialog({
    sessionId,
    sessionTitle,
    userId,
    onSessionUpdated,
    open,
    onOpenChange
}: {
    sessionId: string;
    sessionTitle: string;
    userId: string;
    onSessionUpdated?: () => void;
    open: boolean,
    onOpenChange: any;
}) {
    const { t } = useTranslation()

    const form = useForm({
        defaultValues: {
            userId,
            title: sessionTitle,
        }
    })

    useEffect(() => {
        form.reset({
            userId,
            title: sessionTitle,
        });
    }, [sessionTitle, userId]);

    const onSubmit = async (data: any) => {

        if (data.title.trim() === sessionTitle.trim()) {
            onOpenChange(false)
            return;
        }

        try {
            const res = await updateSession({
                sessionId: sessionId,
                userId: userId,
                title: data.title
            })

            if (res?.success) {
                toast.success(t("chat_session.update_dialog.toast_success"));
                form.reset()
                onSessionUpdated?.();
            } else {
                // toast.error(res?.error || "Failed to update session.");
                toast.error(t("chat_session.update_dialog.toast_error_exits"));
            }
        } catch (err) {
            console.error("Error update session:", err);
            toast.error(t("chat_session.update_dialog.toast_error_unexpect"));
        } finally {
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("chat_session.update_dialog.dialog_title")}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("chat_session.update_dialog.dialog_input_title")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("chat_session.update_dialog.dialog_input_title")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>{t("chat_session.update_dialog.dialog_btn_cancel")}</Button>
                                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                    {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                                    {t("chat_session.update_dialog.dialog_btn_update")}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
