'use client'

import { useState } from 'react'
import { generateSlug } from '@/utils/slug'

export const usePostForm = () => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const handleTitleChange = (value: string) => {
        setTitle(value)
        setSlug(generateSlug(value))
    }

    const submit = async () => {
        if (!title || !slug || !content) {
            throw new Error('Missing required fields')
        }
    
        try {
            setLoading(true)
    
            const res = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, slug, content }),
            })
    
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message || 'Failed to create post')
            }
    
            setTitle('')
            setSlug('')
            setContent('')
    
        } catch (err) {
            console.error(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return {
        title,
        slug,
        content,
        loading,
        setSlug,
        setContent,
        handleTitleChange,
        submit,
    }
}