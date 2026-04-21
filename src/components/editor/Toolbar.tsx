'use client'

export default function Toolbar({ editor }: any) {
    if (!editor) return null

    return (
        <div style={{ marginBottom: 10 }}>
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
                Bold
            </button>

            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                Italic
            </button>

            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                H2
            </button>

            <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
                List
            </button>
        </div>
    )
}