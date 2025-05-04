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

export function UpdateSessionDialog({
    sessionId,
    userId,
    onSessionUpdated,
    open,
    onOpenChange
}
    :
    {
        sessionId: string;
        userId: string;
        onSessionUpdated?: () => void;
        open: boolean,
        onOpenChange: any;
    }
) {
    const form = useForm({
        defaultValues: {
            userId,
            title: `Update Title `,
        }
    })

    // const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {

        try {
            // setLoading(true);
            const res = await updateSession({
                sessionId: sessionId,
                userId: userId,
                title: data.title
            })

            if (res?.success) {
                toast.success("Session updated successfully!");
                onSessionUpdated?.();
            } else {
                toast.error(res?.error || "Failed to update session.");
            }
        } catch (err) {
            console.error("Error update session:", err);
            toast.error("An unexpected error occurred.");
        } finally {
            onOpenChange(false)
            // setLoading(false);
        }
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update title</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Input Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'Input Title'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                    {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                                    Update
                                    {/* {t('common.confirm-btn')} */}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
