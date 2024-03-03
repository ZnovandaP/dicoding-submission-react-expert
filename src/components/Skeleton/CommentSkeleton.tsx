import * as React from 'react';
import ThreadSkeleton from './ThreadSkeleton';

export default function CommentSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-3 lg:pr-4 ">
        <ThreadSkeleton.Head />
        <CommentSkeleton.Body />
        <CommentSkeleton.Footer />
      </div>

      <hr className="my-6 border-t-1 border-primary" />
    </>
  );
}

function Body() {
  return (
    <div className="ml-12 flex flex-col gap-3">

      {Array.from(new Array(3).keys()).map((key) => (
        <div key={key} className="bg-neutral-400 w-full h-3 rounded-md animate-pulse" />
      ))}

      <div className="bg-neutral-400 w-24 h-4 rounded-full animate-pulse mt-2 md:hidden" />
    </div>
  );
}

function Footer() {
  return (
    <div className="flex justify-end md:justify-start items-center mt-4 md:ml-12">
      <div className="flex items-center gap-3 ">
        <div className="bg-neutral-400 w-16 h-7 rounded-md animate-pulse" />
        <div className="bg-neutral-400 w-16 h-7 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

CommentSkeleton.Body = Body;
CommentSkeleton.Footer = Footer;
