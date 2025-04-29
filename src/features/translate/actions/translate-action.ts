// lib/gemini-api.ts

"use server"

export async function translateTextGemini(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY

    // const url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + apiKey
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey

    const payload = {
        contents: [
            {
                parts: [
                    {
                        text: prompt
                    }
                ]
            }
        ]
    }

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        console.log("BE return response: ", res)

        const data = await res.json()

        console.log("BE return data: ", data)

        if (res.ok) {
            const output = data.candidates?.[0]?.content?.parts?.[0]?.text
            return output || "Không nhận được phản hồi từ Gemini."
        } else {
            console.error("Gemini API Error:", data)
            return "Lỗi khi gọi Gemini API."
        }

    } catch (error) {
        console.error("Error calling Gemini:", error)
        return "Đã xảy ra lỗi hệ thống."
    }
}



// 'use server'

// export async function translateText(inputText: string) {
//     try {
//         const apiKey = process.env.OPENAI_API_KEY

//         const response = await fetch('https://api.openai.com/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${apiKey}`,
//             },
//             body: JSON.stringify({
//                 model: 'gpt-3.5-turbo',
//                 messages: [
//                     {
//                         role: 'system',
//                         content: 'You are a translation assistant. Translate the user input to English.',
//                     },
//                     {
//                         role: 'user',
//                         content: inputText,
//                     },
//                 ],
//                 temperature: 0.3,
//             }),
//         })

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error?.message || 'Failed to fetch translation')
//         }

//         console.log("ChatGPT return response", response)

//         const data = await response.json()

//         console.log("ChatGPT return data", data)

//         const translatedText = data?.choices?.[0]?.message?.content || ''

//         return translatedText
//     } catch (error: any) {
//         console.error('Translate error:', error.message)
//         return `Error: ${error.message}`
//     }
// }
