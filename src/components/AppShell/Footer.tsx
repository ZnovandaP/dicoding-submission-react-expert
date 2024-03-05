import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../Container';

export default function Footer() {
  return (
    <Container className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] w-[85%] md:w-[60%] lg:w-[45%]">
        <h2 className="center flex-col gap-3 text-2xl md:text-3xl lg:text-4xl text-center text-pretty font-kaushan bg-neutral-50/10 backdrop-blur-xl p-6 px-8 rounded-lg shadow-xl shadow-primary">
          &copy; Sharing Sepuh -
          {' '}
          {new Date().getFullYear()}

          <Link
            className="text-base md:text-xl font-inter underline text-white"
            href="https://znovandap.com"
            target="_blank"
          >
            Author - Zidane Novanda Putra
          </Link>
        </h2>
      </div>

      <div className="absolute w-full h-full left-0 bottom-0 opacity-40">
        <Image
          src="/decoration-pattern.svg"
          alt=""
          width={600}
          height={600}
          loading="lazy"
          className="w-full h-full"
        />
      </div>
    </Container>
  );
}
