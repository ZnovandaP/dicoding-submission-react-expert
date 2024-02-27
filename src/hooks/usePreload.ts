import * as React from 'react';
import { useAppDispatch } from '@/libs/redux/store';

const usePreload = (asyncThunks: Function[]) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    asyncThunks.forEach((asyncThunk) => {
      dispatch(asyncThunk());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
};

export default usePreload;
