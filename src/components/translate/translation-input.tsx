'use client'

import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useTranslation } from 'react-i18next'

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

    const { t } = useTranslation()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-end">
                <FormField
                    control={form.control}
                    name="text"
                    rules={{ required: t('translate.placeholder')}}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Textarea
                                    placeholder={t('translate.placeholder')}
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
                    rules={{ required: t('translate.choose_target_language')}}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value || ''}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Languages" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">{t('translate.eng')}</SelectItem>
                                        <SelectItem value="Vietnamese">{t('translate.vi')}</SelectItem>
                                        <SelectItem value="Japanese">{t('translate.jp')}</SelectItem>
                                        <SelectItem value="Chinese">{t('translate.cn')}</SelectItem>
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
                    {isSubmitting ? t('translate.btn_translating') : t('translate.btn_send')}
                </Button>
            </form>
        </Form>
    );
};