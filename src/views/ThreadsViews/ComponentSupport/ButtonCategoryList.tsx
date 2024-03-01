'use client';

import * as React from 'react';
import ButtonCategory from '@/components/Button/ButtonCategory';
import { useAppSelector } from '@/libs/redux/store';
import { CatgeoryLoading } from './UILoading';

export default function ButtonCategoryLists() {
  const [categories, setCategories] = React.useState(['']);
  const { status, data } = useAppSelector((state) => state.threads);

  React.useEffect(() => {
    if (status === 'success') {
      const dataCategories = data?.map((thread) => thread.category)!
        .filter((category, index, self) => self.indexOf(category) === index)!;

      setCategories(dataCategories);
    }
  }, [status, data]);

  return (
    <>
      {status === 'success' && (
      <div className="flex flex-wrap items-center gap-3">
        {data && categories?.map((category) => (
          <ButtonCategory category={category} key={category} />
        ))}
      </div>
      )}

      <CatgeoryLoading status={status as 'loading'} />
    </>
  );
}
