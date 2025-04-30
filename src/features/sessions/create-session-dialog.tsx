"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSession } from "./actions/create-session-action";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function CreateSessionDialog({ userId, onSessionCreated }: { userId: string, onSessionCreated?: () => void }) {
    const form = useForm({
        defaultValues: {
            userId,
            title: `New Chat `,
        }
    })

    const [open, setOpen] = useState(false);

    const onSubmit = async (data: any) => {
        console.log("Create Session Data?: ", data)

        const session = await createSession({
            userId: userId,
            title: data.title
        })

        sessionStorage.setItem('chatSessionId', session.id)

        if (onSessionCreated) {
            onSessionCreated()
        }

        toast.success("Creeat new session success !")
        setOpen(false)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new session</DialogTitle>
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
                                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                    {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                                    Add
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
