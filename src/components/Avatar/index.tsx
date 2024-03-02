import * as React from 'react';
import Image from 'next/image';
import cn from '@/utils/cn';

type AvatarProps = {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export default function Avatar({
  size = 'sm', alt, src, className,
}: AvatarProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      loading="lazy"
      className={cn(
        'rounded-full',

        size === 'sm' && 'h-8 w-8',

        size === 'md' && 'h-12 w-12',

        size === 'md' && 'h-16 w-16',

        size === 'xl' && 'h-20 w-20',

        className ?? '',
      )}
    />
  );
}
