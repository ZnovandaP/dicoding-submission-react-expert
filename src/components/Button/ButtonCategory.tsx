'use client';

import * as React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import cn from '@/utils/cn';
import Button from '.';

type ButtonCategoryProps = {
  category: string;
};

export default function ButtonCategory({ category }: ButtonCategoryProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getAllCategories = searchParams.getAll('category');

  const handleSetCategories = (currentCategory: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!currentCategory) {
      current.delete('category');
    }

    if (getAllCategories.includes(currentCategory)) {
      current.delete('category', currentCategory);
    } else {
      current.append('category', currentCategory);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => handleSetCategories(category)}
      className={cn(
        'rounded-full dark:ring-dark-primary py-1',

        getAllCategories.includes(category) && 'bg-primary text-neutral-50',
      )}
    >
      <span>#</span>
      <span>{category}</span>
    </Button>
  );
}
