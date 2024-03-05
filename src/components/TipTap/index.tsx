import * as React from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Underline } from '@tiptap/extension-underline';
import { ErrorMessage } from '@hookform/error-message';
import ToolBar from './ToolBar';

type TipTapProps = {
  label: string
  onChange: (richText: string) => void
  description: string
  id: string
  error: Object
  setHTML: React.Dispatch<React.SetStateAction<string>>
};

const TipTapEditor = React.forwardRef<HTMLDivElement, TipTapProps>(({
  onChange, description, id, error, setHTML, label, ...props
}, ref) => {
  const editors = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: 'text-2xl text-pink-500 font-medium my-2',
          },
          levels: [2],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-8 my-2',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-8 my-2',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-primary/60 ml-6 pl-4 my-2',
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          loading: 'lazy',
          class: 'rounded-lg object-cover object-center my-2',
        },
        allowBase64: true,
        inline: true,
      }),
      Underline.configure({
        HTMLAttributes: {
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: 'rounded-md bg-transparent p-3 ring-1 ring-primary/60 h-44 focus:outline-none focus:ring-2 focus:ring-primary overflow-auto',
      },
    },
    onUpdate: ({ editor }) => {
      const getHTML = editor.getHTML();
      const getTextContent = editor.getText();
      onChange(getTextContent);
      setHTML(getHTML);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="flex flex-col gap-1">
        {label}
        <span className="text-sm text-pink-500">
          *kirimkan gambar dengan ukuran lebih kecil
        </span>
      </p>
      <ToolBar editor={editors} />
      <EditorContent {...props} editor={editors} ref={ref} />
      <ErrorMessage
        name={id}
        errors={error}
        render={({ message }) => <p className="text-red-600 dark:text-red-500">{message}</p>}
      />
    </div>
  );
});

export default TipTapEditor;
