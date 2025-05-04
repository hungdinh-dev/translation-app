'use client'

import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

interface TranslationInputProps {
    onSubmit: (data: { text: string; targetLang: string }) => void;
    isSubmitting: boolean;
}

export const TranslationInput: React.FC<TranslationInputProps> = ({ onSubmit, isSubmitting }) => {
    const form = useForm({
        defaultValues: {
            text: '',
            targetLang: 'English',
        }
    });

    return (
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Translating...' : 'Send'}
                </Button>
            </form>
        </Form>
    );
};