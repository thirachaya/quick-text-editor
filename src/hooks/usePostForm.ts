'use client'

import { useState } from 'react'
import { generateSlug } from '@/utils/slug'

export const usePostForm = () => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [fieldError, setFieldError] = useState<{
        title?: string
        slug?: string
        content?: string
    }>({})

    const isContentEmpty = (html: string) => {
        const text = html
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, '')
            .trim()
    
        return text.length === 0
    }

    const handleTitleChange = (value: string) => {
        setTitle(value)
        setSlug(generateSlug(value))
    }

    const submit = async () => {
        const errors: typeof fieldError = {}
    
        if (!title.trim()) {
            errors.title = 'Please enter a title'
        }
    
        if (!slug.trim()) {
            errors.slug = 'Slug is required'
        } else if (slug.includes(' ')) {
            errors.slug = 'Slug must not contain spaces'
        }
    
        if (isContentEmpty(content)) {
            errors.content = 'Content cannot be empty'
        }
    
        if (Object.keys(errors).length > 0) {
            setFieldError(errors)
            throw new Error('Validation error')
        }
    
        setFieldError({})
    
        try {
            setLoading(true)
    
            const res = await fetch('/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, slug, content }),
            })
    
            if (!res.ok) {
                const data = await res.json()
    
                if (data.message?.includes('duplicate')) {
                    setFieldError({ slug: 'This slug already exists' })
                    throw new Error('Slug already exists')
                }
    
                throw new Error(data.message || 'Failed to create post')
            }
    
            setTitle('')
            setSlug('')
            setContent('')
    
        } catch (err) {
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
        fieldError,
        setSlug,
        setContent,
        handleTitleChange,
        submit,
    }
}