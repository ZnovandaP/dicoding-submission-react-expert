import * as React from 'react';
import FormPostThread from './ComponentSupport/FormPostThread';

export default function CreatePostViews() {
  return (
    <div className="center flex-col min-h-[80dvh] relative">
      <h2 className="font-kaushan text-center text-4xl  underline underline-offset-8  decoration-primary md:text-5xl">
        Membuat Postingan
      </h2>
      <FormPostThread />
    </div>
  );
}
