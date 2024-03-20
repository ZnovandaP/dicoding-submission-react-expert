/**
 * - asyncDetailThread thunk spec:
 *  - should dispatch action correctly when data fetching is success/fullfilled
 *  - should dispatch action correctly when data fetching is errpr/rejected
 */

import { describe, it, expect } from '@jest/globals';
import axios from 'axios';
import { baseUrl } from '@/service/common/fetch-with-auth';
import MockAdapter from 'axios-mock-adapter';
import { DetailThreadWithEmailOwner } from '@/types/response/threads';
import detailThreadSlice, { asyncDetailThread, InitialState } from '@/libs/redux/slices/detail-thread';
import {
  configureStore, EnhancedStore, ThunkDispatch, Tuple, StoreEnhancer, UnknownAction,
} from '@reduxjs/toolkit';
import { fakeDetailThreadResponse, fakeErrorResponse, fakeUsersResponse } from '../utils/fake-data-response';

// eslint-disable-next-line jest/no-export, import/prefer-default-export
export const fakeData: DetailThreadWithEmailOwner = {
  body: 'Ini adalah thread pertama',
  category: 'General',
  comments: [{
    content: 'Ini adalah komentar pertama',
    createdAt: '2021-06-21T07:00:00.000Z',
    downVotesBy: [],
    id: 'comment-1',
    owner: {
      avatar: 'https://generated-image-url.jpg',
      email: 'user@mail.com',
      id: 'users-1',
      name: 'John Doe',
    },
    upVotesBy: [],
  }],
  createdAt: '2021-06-21T07:00:00.000Z',
  downVotesBy: [],
  id: 'thread-1',
  owner: {
    avatar: 'https://generated-image-url.jpg',
    email: 'user@mail.com',
    id: 'users-1',
    name: 'John Doe',
  },
  title: 'Thread Pertama',
  totalComments: 1,
  upVotesBy: [],
};

describe('asyncDetailThread thunk', () => {
  let mock: MockAdapter;

  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ thread: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ thread: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = configureStore({
      reducer: {
        thread: detailThreadSlice.reducer,
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should dispatch action correctly when data fetching is success/fullfilled', async () => {
    mock.onGet(`${baseUrl}/threads/thread-1`).reply(200, fakeDetailThreadResponse);
    mock.onGet(`${baseUrl}/users`).reply(200, fakeUsersResponse);

    const dispatchFn = jest.fn();

    await asyncDetailThread('thread-1')(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(2);
    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncDetailThread.pending.type,
      payload: undefined,
    }));

    expect(dispatchFn).toHaveBeenNthCalledWith(2, expect.objectContaining({
      type: asyncDetailThread.fulfilled.type,
      payload: fakeData,
    }));
  });

  it('should dispatch action correctly when data fetching is errpr/rejected', async () => {
    mock.onGet(`${baseUrl}/threads/thread-1`).reply(404, fakeErrorResponse);
    mock.onGet(`${baseUrl}/users`).reply(404, fakeErrorResponse);

    const dispatchFn = jest.fn();

    await asyncDetailThread('thread-1')(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(2);
    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncDetailThread.pending.type,
      payload: undefined,
    }));
    expect(dispatchFn).toHaveBeenNthCalledWith(2, expect.objectContaining({
      type: asyncDetailThread.rejected.type,
      payload: undefined,
    }));
  });
});
