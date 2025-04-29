'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { translateTextGemini } from '@/features/translate/actions/translate-action'

export default function TranslatePage() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [resultTranslate, setResultTranslate] = useState<string>('')

    const onSubmit = async (data: any) => {
        const prompt = `Translate this to Vietnamese:\n\n${data.text}`
        // const result = await translateTextGemini(data.text)
        const result = await translateTextGemini(prompt)
        setResultTranslate(result)
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Translation App</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <textarea
                    {...register('text', { required: true })}
                    placeholder="Enter text to translate..."
                    className="border p-4 h-32"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                >
                    {isSubmitting ? 'Translating...' : 'Translate'}
                </button>
            </form>

            {resultTranslate && (
                <div className="mt-6 p-4 bg-gray-100 rounded">
                    <h2 className="font-semibold mb-2">Translation Result:</h2>
                    <p>{resultTranslate}</p>
                </div>
            )}
        </div>
    )
}
