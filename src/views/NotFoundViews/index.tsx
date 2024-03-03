import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

type NotFoundViewsProps = {
  message: string;
  href: string;
  hrefLabel: string
};

export default function NotFoundViews({ message, href, hrefLabel }: NotFoundViewsProps) {
  return (
    <div
      className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="flex justify-center items-center flex-col relative"
      >
        <Image
          src="/_404.svg"
          alt="404"
          width={800}
          height={800}
          priority
          className="w-[40rem] h-[40rem] animate-fade"
        />
        <div className="center gap-2 absolute bottom-7 md:-bottom-12 w-full">
          <p className="text-center text-pretty text-xl italic">
            {message}
            {' '}
            <Link
              href={href}
              className="text-primary dark:text-dark-primary underline text-xl font-medium"
            >
              {hrefLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
