import { Editor } from '@tiptap/react';
import * as React from 'react';
import { IoIosImages } from 'react-icons/io';

type TipTapButtonImageProps = {
  editor: Editor | null
};

export default function TipTapButtonImage({ editor }: TipTapButtonImageProps) {
  if (!editor) {
    return null;
  }
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result as string }).run();
      };
    }
  };
  return (
    <label className="center ring-1 p-2 rounded-sm ring-primary text-xl hover:bg-primary/30 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" htmlFor="upload">
      <IoIosImages aria-label="image" />
      <input
        className="hidden"
        id="upload"
        type="file"
        onChange={(e) => handleImageUpload(e)}
      />
    </label>
  );
}
