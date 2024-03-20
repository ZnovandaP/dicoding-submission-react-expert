/**
 * - threadsSlice reducer spec:
 *  - should handle initialState
 *  - should handle asyncGetThreadsWithAuthor.pending
 *  - should handle asyncGetThreadsWithAuthor.fullfilled
 *  - should handle asyncGetThreadsWithAuthor.rejected
 */

import { describe, it, expect } from '@jest/globals';
import getThreadsSlice,
{ InitialState, asyncGetThreadsWithAuthor } from '@/libs/redux/slices/threads/get-threads';
import {
  configureStore, EnhancedStore, ThunkDispatch, Tuple, StoreEnhancer, UnknownAction, createAction,
} from '@reduxjs/toolkit';
import { ThreadWithOwner } from '@/types/response/threads';
import { fakeData } from '../thunks/AsyncGetThreadsWithAuthor.test';

describe('threadsSlice test reducer', () => {
  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ threads: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ threads: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: getThreadsSlice.reducer,
      },
    });
  });

  it('should handle initial state', () => {
    const { threads } = store.getState();
    expect(threads).toEqual({
      data: null,
      message: null,
      status: 'idle',
    });
  });

  it('should handle asyncGetThreadsWithAuthor.pending', () => {
    const pendingAction = createAction(asyncGetThreadsWithAuthor.pending.type)();

    const { reducer } = getThreadsSlice;

    const newState = reducer(store.getState().threads, pendingAction);
    expect(newState.status).toEqual('loading');
    expect(newState.message).toEqual('Mohon tunggu...');
  });

  it('should handle asyncGetThreadsWithAuthor.fulfilled', () => {
    const mockPayload = fakeData;

    const fulfilledAction = createAction<
    ThreadWithOwner[],
      typeof asyncGetThreadsWithAuthor.fulfilled.type
    >(asyncGetThreadsWithAuthor.fulfilled.type)(mockPayload);

    const { reducer } = getThreadsSlice;

    const newState = reducer(store.getState().threads, fulfilledAction);
    expect(newState.status).toEqual('success');
    expect(newState.message).toEqual('Data threads berhasil didapatkan!');
    expect(newState.data).toEqual(mockPayload);
  });

  it('should handle asyncGetThreadsWithAuthor.rejected', () => {
    const rejectedAction = createAction(asyncGetThreadsWithAuthor.rejected.type)();

    const { reducer } = getThreadsSlice;

    const newState = reducer(store.getState().threads, rejectedAction);
    expect(newState.status).toEqual('error');
    expect(newState.message).toEqual('Data threads gagal didapatkan!');
    expect(newState.data).toEqual(null);
  });
});
