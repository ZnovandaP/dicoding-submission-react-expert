import * as React from 'react';

export default function ThreadSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:pr-4 ">
      <ThreadSkeleton.Head />
      <ThreadSkeleton.Body />
      <ThreadSkeleton.Footer />
    </div>
  );
}

function Head() {
  return (
    <div className="flex justify-between ">
      <div className="flex gap-4 items-center">
        <div
          className="w-9 h-9 bg-neutral-400 rounded-full animate-pulse"
        />
        <div className="flex flex-col gap-2">
          <div className="bg-neutral-400 w-36 h-3 rounded-md animate-pulse" />
          <div className="bg-neutral-400 w-44 h-3 rounded-md animate-pulse" />
        </div>
      </div>
      <div className=" bg-neutral-400 w-28 h-3 rounded-md animate-pulse" />
    </div>
  );
}

function Body() {
  return (
    <div className="ml-12 flex flex-col gap-3">
      <div className="bg-neutral-400 w-44 h-3 rounded-md animate-pulse" />

      {Array.from(new Array(4).keys()).map((key) => (
        <div key={key} className="bg-neutral-400 w-full h-3 rounded-md animate-pulse" />
      ))}

      <div className="bg-neutral-400 w-24 h-4 rounded-full animate-pulse mt-2 md:hidden" />
    </div>

  );
}

function Footer() {
  return (
    <div className="flex justify-center md:justify-between items-center mt-4 md:ml-12">
      <div className="flex items-center gap-3 ">
        <div className="bg-neutral-400 w-16 h-7 rounded-md animate-pulse" />
        <div className="bg-neutral-400 w-16 h-7 rounded-md animate-pulse" />
        <div className="bg-neutral-400 w-16 h-7 rounded-md animate-pulse" />
      </div>

      <div className="hidden gap-2 items-center md:flex">
        <div className="bg-neutral-400 w-24 h-4 rounded-full animate-pulse mt-2" />
      </div>
    </div>
  );
}

ThreadSkeleton.Head = Head;
ThreadSkeleton.Body = Body;
ThreadSkeleton.Footer = Footer;
