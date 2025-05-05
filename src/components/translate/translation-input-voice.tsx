'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Mic } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

interface TranslationInputProps {
    onSubmit: (data: { text: string; targetLang: string }) => void;
    isSubmitting: boolean;
}

export const TranslationInputVoice: React.FC<TranslationInputProps> = ({ onSubmit, isSubmitting }) => {
    const form = useForm({
        defaultValues: {
            text: '',
            targetLang: 'English',
        }
    });

    const [isListening, setIsListening] = useState(false);
    const recognition = useRef<SpeechRecognition | null>(null);

    const handleSubmit = async (data: { text: string; targetLang: string }) => {
        form.reset();
        await onSubmit(data);
    };

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            recognition.current = (new (window as any).webkitSpeechRecognition()) as SpeechRecognition;
        } else if ('speechRecognition' in window) {
            recognition.current = (new (window as any).SpeechRecognition()) as SpeechRecognition;
        }

        if (recognition.current) {
            recognition.current.continuous = false;
            recognition.current.interimResults = true;

            recognition.current.onresult = (event: any) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                form.setValue('text', finalTranscript);
            };

            recognition.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognition.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const handleListen = () => {
        if (!recognition.current) {
            console.error('Speech recognition not supported in this browser.');
            return;
        }

        setIsListening(true);
        form.setValue('text', '');
        recognition.current.lang = form.getValues().targetLang === 'Vietnamese' ? 'vi-VN' : 'en-US';
        recognition.current.start();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2 items-end">
                <div className="flex-grow">
                    <FormField
                        control={form.control}
                        name="text"
                        rules={{ required: 'Vui lòng nhập nội dung cần dịch' }}
                        render={({ field }) => (
                            <FormItem className="w-full relative">
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter text to translate..."
                                        className="border p-2 rounded w-full h-20 pr-10"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                <button
                                    type="button"
                                    onClick={handleListen}
                                    className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
                                >
                                    <Mic className="h-4 w-4" color={isListening ? 'red' : 'black'} />
                                </button>
                            </FormItem>
                        )}
                    />
                </div>

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
                    disabled={isSubmitting || isListening}
                >
                    {isSubmitting ? 'Translating...' : 'Send'}
                </Button>
            </form>
        </Form>
    );
};