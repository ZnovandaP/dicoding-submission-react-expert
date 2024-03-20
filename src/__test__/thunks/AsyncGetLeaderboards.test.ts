/* eslint-disable jest/no-conditional-expect */
/**
 * - asyncGetLeaderboards thunk spec:
 *  - should dispatch action correctly when data fetching is success/fullfilled
 *  - should dispatch action correctly when data fetching is erro/rejected
 */

import {
  describe, it, expect,
} from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { baseUrl } from '@/service/common/fetch-with-auth';
import { UserLeaderboards } from '@/types/response/users';
import getLeaderboardsSlice, { asyncGetLeaderboards, InitialState } from '@/libs/redux/slices/leaderboards';
import {
  configureStore, EnhancedStore, Tuple, ThunkDispatch, StoreEnhancer, UnknownAction,
} from '@reduxjs/toolkit';
import { fakeErrorResponse, fakeLeaderboardsResponse } from '../utils/fake-data-response';

const fakeData: UserLeaderboards = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
];

describe('asyncGetLeaderboards thunk', () => {
  let mock: MockAdapter;

  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ leaderboards: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ leaderboards: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = configureStore({
      reducer: {
        leaderboards: getLeaderboardsSlice.reducer,
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should dispatch action correctly when data fetching is success/fullfilled', async () => {
    mock.onGet(`${baseUrl}/leaderboards`).reply(200, fakeLeaderboardsResponse);

    const dispatchFn = jest.fn();

    await asyncGetLeaderboards()(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(2);
    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncGetLeaderboards.pending.type,
      payload: undefined,
    }));

    expect(dispatchFn).toHaveBeenNthCalledWith(2, expect.objectContaining({
      type: asyncGetLeaderboards.fulfilled.type,
      payload: fakeData,
    }));
  });

  it('should dispatch action correctly when data fetching is error/rejected', async () => {
    mock.onGet(`${baseUrl}/leaderboards`).reply(404, fakeErrorResponse);

    const dispatchFn = jest.fn();

    await asyncGetLeaderboards()(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(2);
    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncGetLeaderboards.pending.type,
      payload: undefined,
    }));
    expect(dispatchFn).toHaveBeenNthCalledWith(2, expect.objectContaining({
      type: asyncGetLeaderboards.rejected.type,
      payload: undefined,
    }));
  });
});
