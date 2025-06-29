'use client'

import React from 'react'
import { Editor } from '@tiptap/react'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Code2, Quote, Undo2, Redo2
} from 'lucide-react'

type Props = {
  editor: Editor | null; // Allow null to match the check in the component
};

// Restrict heading levels to Tiptap's expected values
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const TipTapMenuBar = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Headings */}
      {[1, 2, 3].map((level) => (
        <button
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level: level as HeadingLevel }).run()}
          disabled={!editor.can().chain().focus().toggleHeading({ level: level as HeadingLevel }).run()}
          className={`px-2 py-1 border rounded ${editor.isActive('heading', { level }) ? 'is-active' : ''}`}
        >
          H{level}
        </button>
      ))}

      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'is-active' : ''}`}
      >
        <Bold className="w-5 h-5" />
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'is-active' : ''}`}
      >
        <Italic className="w-5 h-5" />
      </button>

      {/* Underline */}
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'is-active' : ''}`}
      >
        <UnderlineIcon className="w-5 h-5" />
      </button>

      {/* Strikethrough */}
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('strike') ? 'is-active' : ''}`}
      >
        <Strikethrough className="w-5 h-5" />
      </button>

      {/* Bullet List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('bulletList') ? 'is-active' : ''}`}
      >
        <List className="w-5 h-5" />
      </button>

      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('orderedList') ? 'is-active' : ''}`}
      >
        <ListOrdered className="w-5 h-5" />
      </button>

      {/* Code */}
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('code') ? 'is-active' : ''}`}
      >
        <Code2 className="w-5 h-5" />
      </button>

      {/* Blockquote */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('blockquote') ? 'is-active' : ''}`}
      >
        <Quote className="w-5 h-5" />
      </button>

      {/* Undo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="px-2 py-1 border rounded"
      >
        <Undo2 className="w-5 h-5" />
      </button>

      {/* Redo */}
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="px-2 py-1 border rounded"
      >
        <Redo2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TipTapMenuBar;