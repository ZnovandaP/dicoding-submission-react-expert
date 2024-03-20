/**
 *  asyncGetThreadsWithAuthor thunk spec:
 *  - should dispatch action correctly when data fetching is success/fullfilled
 *  - should dispatch action correctly when data fetching is error/rejected
 */

import { describe, it, expect } from '@jest/globals';
import axios from 'axios';
import { baseUrl } from '@/service/common/fetch-with-auth';
import MockAdapter from 'axios-mock-adapter';
import { ThreadWithOwner } from '@/types/response/threads';
import {
  configureStore, EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction,
} from '@reduxjs/toolkit';
import getThreadsSlice, { asyncGetThreadsWithAuthor, InitialState } from '@/libs/redux/slices/threads/get-threads';
import { fakeErrorResponse, fakeUsersResponse, fakeThreadsResponse } from '../utils/fake-data-response';

const fakeData: ThreadWithOwner[] = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    owner: {
      name: 'User Test 1',
      email: 'user@mail.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
];

describe('asyncGetThreadsWithAuthor thunk', () => {
  let mock: MockAdapter;

  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ threads: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ threads: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = configureStore({
      reducer: {
        threads: getThreadsSlice.reducer,
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should dispatch action correctly when data fetching is success/fullfilled', async () => {
    mock.onGet(`${baseUrl}/threads`).reply(200, fakeThreadsResponse);
    mock.onGet(`${baseUrl}/users`).reply(200, fakeUsersResponse);

    const dispatchFn = jest.fn();

    await asyncGetThreadsWithAuthor()(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(2);
    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncGetThreadsWithAuthor.pending.type,
      payload: undefined,
    }));

    expect(dispatchFn).toHaveBeenNthCalledWith(2, expect.objectContaining({
      type: asyncGetThreadsWithAuthor.fulfilled.type,
      payload: fakeData,
    }));
  });

  it('should dispatch action correctly when data fetching is error/rejected', async () => {
    mock.onGet(`${baseUrl}/threads`).reply(404, fakeErrorResponse);
    mock.onGet(`${baseUrl}/users`).reply(404, fakeErrorResponse);

    const dispatchFn = jest.fn();

    await asyncGetThreadsWithAuthor()(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(2);
    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncGetThreadsWithAuthor.pending.type,
      payload: undefined,
    }));
    expect(dispatchFn).toHaveBeenNthCalledWith(2, expect.objectContaining({
      type: asyncGetThreadsWithAuthor.rejected.type,
      payload: undefined,
    }));
  });
});
