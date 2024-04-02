/* eslint-disable newline-per-chained-call */
import * as React from 'react';
import { type Editor } from '@tiptap/react';
import {
  LuBold, LuHeading, LuItalic, LuList, LuListOrdered, LuUnderline,
} from 'react-icons/lu';
import { TbBlockquote } from 'react-icons/tb';
import TipTapActionButton from './TipTapActionButton';
import TipTapButtonImage from './TipTapButtonImage';

type ToolBarProps = {
  editor: Editor | null
};

export default function ToolBar({ editor }: ToolBarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="center flex-wrap gap-2">

      <TipTapActionButton
        icon={<LuHeading />}
        aria-label="Heading"
        isActive={editor.isActive('heading')}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <TipTapActionButton
        icon={<LuBold />}
        aria-label="bold"
        isActive={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      />

      <TipTapActionButton
        icon={<LuItalic />}
        aria-label="Italic"
        isActive={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      />

      <TipTapActionButton
        icon={<LuUnderline />}
        aria-label="underline"
        isActive={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
      />

      <TipTapActionButton
        icon={<LuList />}
        aria-label="Bullet List"
        isActive={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
      />

      <TipTapActionButton
        icon={<LuListOrdered />}
        aria-label="order list"
        isActive={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
      />

      <TipTapActionButton
        icon={<TbBlockquote />}
        aria-label="blockquote"
        isActive={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
      />

      <TipTapButtonImage editor={editor} />
    </div>
  );
}
