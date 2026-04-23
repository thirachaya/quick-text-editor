'use client'

import { useState } from 'react'

const s = {
    toolbar: { display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: 4, padding: '12px', background: '#FAFAFA', borderBottom: '1.5px solid #E5E7EB' },
    grp: { display: 'flex', gap: 4, alignItems: 'center' },
    sep: { width: 1, height: 24, background: '#E5E7EB', margin: '0 8px', flexShrink: 0 },
    btn: (active = false): React.CSSProperties => ({
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '6px 10px', height: 32, minWidth: 32,
        borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
        fontFamily: "'Inter', sans-serif",
        background: active ? '#1F6F5F' : 'transparent',
        color: active ? '#FFFFFF' : '#4B5563',
        border: 'none',
        transition: 'all .2s ease', whiteSpace: 'nowrap' as const,
    }),
    urlBar: { width: '100%', display: 'flex', gap: 8, alignItems: 'center', paddingTop: 12, borderTop: '1px dashed #E5E7EB', marginTop: 8 },
    urlInput: { flex: 1, height: 36, padding: '0 12px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, fontFamily: "'Fira Code', monospace", color: '#1F2937', outline: 'none' },
    urlInsert: { height: 36, padding: '0 16px', background: '#2FA084', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background .2s' },
    urlCancel: { height: 36, padding: '0 12px', background: '#F3F4F6', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer', color: '#4B5563', fontWeight: 500 },
}

const Icon = ({ d, children, size = 16 }: { d?: string; children?: React.ReactNode; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        {children ?? <path d={d} />}
    </svg>
)

export default function Toolbar({ editor }: any) {
    if (!editor) return null

    const [showUrl, setShowUrl] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const insertUrl = () => {
        if (!imageUrl) return
        editor.chain().focus().setImage({ src: imageUrl }).createParagraphNear().run()
        setImageUrl('')
        setShowUrl(false)
    }

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => editor.chain().focus().setImage({ src: reader.result as string }).createParagraphNear().run()
        reader.readAsDataURL(file)
        e.target.value = ''
    }

    const Btn = ({ active = false, onClick, title, children }: { active?: boolean; onClick: () => void; title?: string; children: React.ReactNode }) => {
        const [hover, setHover] = useState(false)
        const base = s.btn(active)
        return (
            <button
                type="button" title={title} onClick={onClick}
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                style={!active && hover ? { ...base, background: '#E5E7EB', color: '#1F2937' } : base}
            >
                {children}
            </button>
        )
    }

    return (
        <div style={s.toolbar}>
            <div style={s.grp}>
                <Btn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
                    <Icon size={16}><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /></Icon>
                </Btn>
                <Btn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
                    <Icon size={16}><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></Icon>
                </Btn>
                <Btn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
                    <Icon size={16}><line x1="5" y1="12" x2="19" y2="12" /><path d="M16 6C16 6 14.5 4 12 4C9.5 4 7 5.5 7 8C7 10.5 9 11.5 12 12" /><path d="M8 18C8 18 9.5 20 12 20C14.5 20 17 18.5 17 16C17 14.2 16 13.2 14 12.5" /></Icon>
                </Btn>
            </div>

            <div style={s.sep} />

            <div style={s.grp}>
                {([1, 2, 3] as const).map(level => (
                    <Btn key={level} active={editor.isActive('heading', { level })} onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>H{level}</span>
                    </Btn>
                ))}
            </div>

            <div style={s.sep} />

            <div style={s.grp}>
                <Btn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
                    <Icon size={16}><line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" /><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" /></Icon>
                </Btn>
                <Btn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
                    <Icon size={16}><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M4 14h1.5a.5.5 0 0 1 0 1H4a.5.5 0 0 0 0 1h2" /></Icon>
                </Btn>
                <Btn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
                    <Icon size={16}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></Icon>
                </Btn>
            </div>

            <div style={s.sep} />

            <div style={s.grp}>
                <Btn onClick={() => document.getElementById('tb-img-upload')?.click()} title="Upload image">
                    <Icon size={16}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></Icon>
                </Btn>
                <input id="tb-img-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadFile} />

                <Btn active={showUrl} onClick={() => setShowUrl(v => !v)} title="Insert image URL">
                    <Icon size={16}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></Icon>
                </Btn>
            </div>

            {/* URL input row */}
            {showUrl && (
                <div style={s.urlBar}>
                    <input
                        autoFocus
                        style={s.urlInput}
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') insertUrl(); if (e.key === 'Escape') setShowUrl(false) }}
                    />
                    <button type="button" style={s.urlInsert} onClick={insertUrl}>Insert</button>
                    <button type="button" style={s.urlCancel} onClick={() => setShowUrl(false)}>Cancel</button>
                </div>
            )}
        </div>
    )
}