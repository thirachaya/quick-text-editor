'use client'

import Input from '@/components/form/Input'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { usePostForm } from '@/hooks/usePostForm'

export default function Page() {
    const {
        title,
        slug,
        content,
        loading,
        setSlug,
        setContent,
        handleTitleChange,
        submit,
    } = usePostForm()

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
            <h1>Create News</h1>

            <Input
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
            />

            <Input
                value={slug}
                onChange={setSlug}
                placeholder="Slug"
            />

            <TiptapEditor value={content} onChange={setContent} />

            <button
                onClick={submit}
                disabled={loading}
                style={{ marginTop: 20 }}
            >
                {loading ? 'Saving...' : 'Save Post'}
            </button>
        </div>
    )
}