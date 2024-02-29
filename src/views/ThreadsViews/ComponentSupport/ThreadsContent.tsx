import * as React from 'react';
import ButtonCategoryLists from './ButtonCategoryList';
import CategoryWrapper, { CategoryHead } from './CategoryWrapper';
import ThreadList from './ThreadList';

export default function ThreadsContent() {
  return (
    <div className="flex justify-between flex-col lg:flex-row-reverse lg:gap-8">
      <CategoryWrapper>
        <CategoryHead />
        <ButtonCategoryLists />
      </CategoryWrapper>

      <ThreadList />
    </div>
  );
}
