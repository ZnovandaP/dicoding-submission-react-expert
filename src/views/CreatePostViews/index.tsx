import * as React from 'react';
import Image from 'next/image';
import FormPostThread from './ComponentSupport/FormPostThread';

export default function CreatePostViews() {
  return (
    <div className="center flex-col h-[80dvh] relative">
      <Image
        src="/decoration-pattern.svg"
        alt="decoration-pattern"
        width={800}
        height={800}
        priority
        className="w-[120%] absolute top-[40%] -translate-y-[40%] -z-10 animate-bounce"
      />

      <h2 className="font-kaushan text-center text-4xl  underline underline-offset-8  decoration-primary md:text-5xl">
        Membuat Postingan
      </h2>
      <FormPostThread />
    </div>
  );
}
