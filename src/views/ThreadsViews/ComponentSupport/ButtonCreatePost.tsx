import * as React from 'react';
import Link from 'next/link';
import { MdOutlinePostAdd } from 'react-icons/md';
import { createPortal } from 'react-dom';

export default function ButtonCreatePost() {
  return createPortal(
    <Link
      href="/create-post"
      className="group text-neutral-50 z-[5] w-[72px] h-[72px] md:w-20 md:h-20 text-4xl rounded-full center  bg-primary hover:bg-primary/80 fixed bottom-12 right-8 md:right-12 xl:right-20 xl:bottom-16 shadow-md shadow-neutral-600 active:scale-100 transition-all duration-300 ease-in-out"
      title="Membuat Postingan"
    >
      <MdOutlinePostAdd className="group-hover:animate-bounce" />
    </Link>,
    document.body,
  );
}
