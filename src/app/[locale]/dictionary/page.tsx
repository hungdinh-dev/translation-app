'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pagination } from '@/components/ui/pagination'
// import { getDictionary } from './actions'
import debounce from 'lodash.debounce'
import { getDictionary } from '@/features/dictionary/actions/get-dictionary-action'
import { useSession } from 'next-auth/react'

const LANGUAGES = ['English', 'Vietnamese', 'Japanese', 'Chinese']
const PAGE_SIZE = 10

export default function DictionaryPage() {
    const [targetLang, setTargetLang] = useState('English')
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [data, setData] = useState<{ user: string; ai: string }[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

        const { data: session } = useSession();

        console.log("Data???/", session?.user.id)

    const fetchData = useCallback(async () => {
        const res = await getDictionary(targetLang, page, PAGE_SIZE, debouncedSearch, session?.user.id)
        setData(res.data)
        setTotalCount(res.totalCount)
    }, [targetLang, page, debouncedSearch])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const debounceSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearch(value)
            setPage(1)
        }, 500),
        []
    )

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        debounceSearch(e.target.value)
    }

    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Dictionary</h1>

            <div className="flex gap-2 mb-4">
                {LANGUAGES.map((lang) => (
                    <Button
                        key={lang}
                        variant={lang === targetLang ? 'default' : 'outline'}
                        onClick={() => {
                            setTargetLang(lang)
                            setPage(1)
                        }}
                    >
                        {lang}
                    </Button>
                ))}
            </div>

            <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleSearchChange}
                className="mb-4"
            />

            <div className="space-y-4">
                {data.map((pair, index) => (
                    <Card key={index}>
                        <CardContent className="p-4 space-y-2">
                            <p>
                                <strong>User:</strong> {pair.user}
                            </p>
                            <p>
                                <strong>AI:</strong> {pair.ai}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {/* {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <Pagination
                        page={page}
                        onChange={(p) => setPage(p)}
                        totalPages={totalPages}
                    />
                </div>
            )} */}
        </div>
    )
}
