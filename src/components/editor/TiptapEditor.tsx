'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useEffect } from 'react'
import Toolbar from './Toolbar'

type Props = {
  value: string
  onChange: (val: string) => void
}

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="
          min-h-[300px]
          px-6 py-6
          text-[18px] leading-relaxed
          text-gray-800
          outline-none
          
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:focus:outline-none
          [&_.ProseMirror]:focus:ring-0

          /* Headings */
          [&_.ProseMirror_h1]:text-2xl
          [&_.ProseMirror_h1]:font-bold
          [&_.ProseMirror_h1]:text-emerald-700

          [&_.ProseMirror_h2]:text-xl
          [&_.ProseMirror_h2]:font-semibold
          [&_.ProseMirror_h2]:text-emerald-700

          /* Paragraph spacing */
          [&_.ProseMirror_p]:mb-4

          /* Blockquote */
          [&_.ProseMirror_blockquote]:border-l-4
          [&_.ProseMirror_blockquote]:border-emerald-500
          [&_.ProseMirror_blockquote]:pl-4
          [&_.ProseMirror_blockquote]:text-gray-500
          [&_.ProseMirror_blockquote]:italic

          /* Image */
          [&_.ProseMirror_img]:rounded-xl
          [&_.ProseMirror_img]:shadow-md
          [&_.ProseMirror_img]:border
          [&_.ProseMirror_img]:border-gray-200
          [&_.ProseMirror_img]:my-6

          /* Code */
          [&_.ProseMirror_code]:bg-gray-100
          [&_.ProseMirror_code]:px-1.5
          [&_.ProseMirror_code]:py-0.5
          [&_.ProseMirror_code]:rounded
          [&_.ProseMirror_code]:text-emerald-800

          /* Code block */
          [&_.ProseMirror_pre]:bg-gray-800
          [&_.ProseMirror_pre]:text-gray-100
          [&_.ProseMirror_pre]:p-4
          [&_.ProseMirror_pre]:rounded-lg
          [&_.ProseMirror_pre]:overflow-x-auto
        "
      />
    </div>
  )
}