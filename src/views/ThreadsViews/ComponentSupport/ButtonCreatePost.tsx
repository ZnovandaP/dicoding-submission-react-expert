import * as React from 'react';
import Link from 'next/link';
import { MdOutlinePostAdd } from 'react-icons/md';

export default function ButtonCreatePost() {
  return (
    <Link
      href="/create-post"
      className="group text-neutral-50 w-[72px] h-[72px] text-4xl rounded-full center  bg-primary hover:bg-primary/70 fixed bottom-12 right-8 md:right-12 xl:right-20 xl:bottom-16 shadow-md shadow-neutral-600 active:scale-100 transition-all duration-300 ease-in-out"
      title="Membuat Postingan"
    >
      <MdOutlinePostAdd className="group-hover:animate-bounce" />
    </Link>
  );
}
