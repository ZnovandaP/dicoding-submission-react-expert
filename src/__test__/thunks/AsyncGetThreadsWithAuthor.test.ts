/* eslint-disable jest/no-conditional-expect */
/**
 * - asyncGetThreadsWithAuthor thunk spec:
 *  - should response api server getAllUsers and getAllThreads is success/fullfilled
 *  - should response api server getAllUsers and getAllThreads is failed/rejected
 *  - should dispatch action correctly when thunk is pending
 *  - should dispatch action correctly when thunk is fullfilled
 *  - should dispatch action correctly when thunk is rejected
 */

import {
  describe, it, expect,
} from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { asyncGetThreadsWithAuthor } from '@/libs/redux/slices/threads/get-threads';
import { getAllThreads } from '@/service/threads';
import { getAllUsers } from '@/service/users';
import { baseUrl } from '@/service/common/fetch-with-auth';
import { ThreadWithOwner } from '@/types/response/threads';

const fakeThreadsResponse = {
  status: 'success',
  message: 'ok',
  data: [
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
    },
  ],
};

const fakeUsersResponse = {
  status: 'success',
  message: 'ok',
  data: [
    {
      id: 'user-1',
      name: 'User Test 1',
      email: 'user@mail.com',
      avatar: 'https://generated-image-url.jpg',
    },
  ],
};

const fakeErrorResponse = {
  status: 'error',
  message: 'Not Found',
  data: {},
};

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

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should response api server getAllUsers and getAllThreads is success/fullfilled', async () => {
    mock.onGet(`${baseUrl}/threads`).reply(200, fakeThreadsResponse);
    mock.onGet(`${baseUrl}/users`).reply(200, fakeUsersResponse);

    const dataUsers = await getAllUsers();
    const dataThreads = await getAllThreads();

    expect(dataThreads).toEqual(fakeThreadsResponse);
    expect(dataUsers).toEqual(fakeUsersResponse);
  });

  it('should response api server getAllUsers and getAllThreads is failed/rejected', async () => {
    mock.onGet(`${baseUrl}/threads`).reply(404, fakeErrorResponse);
    mock.onGet(`${baseUrl}/users`).reply(404, fakeErrorResponse);

    try {
      const dataUsers = await getAllUsers();
      const dataThreads = await getAllThreads();

      expect(dataThreads).toEqual(fakeErrorResponse);
      expect(dataUsers).toEqual(fakeErrorResponse);
    } catch (error: any) {
      expect(error instanceof Error).toBeTruthy();
    }
  });

  it('should dispatch action correctly when thunk is pending', async () => {
    const result = await asyncGetThreadsWithAuthor.pending('loading');

    expect(result.type).toEqual('thread/getThreadsWithAuthor/pending');
    expect(result.meta.requestStatus).toEqual('pending');
  });

  it('should dispatch action correctly when thunk is fullfilled', async () => {
    const result = await asyncGetThreadsWithAuthor.fulfilled(fakeData, '');

    expect(result.type).toEqual('thread/getThreadsWithAuthor/fulfilled');
    expect(result.payload).toEqual(fakeData);
    expect(result.meta.requestStatus).toEqual('fulfilled');
  });

  it('should dispatch action correctly when thunk is rejected', async () => {
    const result = await asyncGetThreadsWithAuthor.rejected(null, '');

    expect(result.type).toEqual('thread/getThreadsWithAuthor/rejected');
    expect(result.payload).toBeUndefined();
    expect(result.meta.requestStatus).toEqual('rejected');
  });
});
