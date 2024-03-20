/**
 * - detaihTreadSlice reducer spec:
 *  - should handle initialState
 *  - should handle asyncDetailThread.pending
 *  - should handle asyncDetailThread.fullfilled
 *  - should handle asyncDetailThread.rejected
 */

import { describe, it, expect } from '@jest/globals';
import detailThreadSlice, { asyncDetailThread, InitialState } from '@/libs/redux/slices/detail-thread';
import {
  configureStore, EnhancedStore, ThunkDispatch, Tuple, StoreEnhancer, UnknownAction, createAction,
} from '@reduxjs/toolkit';
import { DetailThreadWithEmailOwner } from '@/types/response/threads';
import { fakeData } from '../thunks/AsyncDetailThread.test';

describe('detaihTreadSlice test reducer', () => {
  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ thread: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ thread: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        thread: detailThreadSlice.reducer,
      },
    });
  });

  it('should handle initial state', () => {
    const { thread } = store.getState();
    expect(thread).toEqual({
      data: null,
      message: null,
      status: 'idle',
    });
  });

  it('should handle asyncDetailThread.pending', () => {
    const pendingAction = createAction(asyncDetailThread.pending.type)();

    const { reducer } = detailThreadSlice;

    const newState = reducer(store.getState().thread, pendingAction);
    expect(newState.status).toEqual('loading');
    expect(newState.message).toEqual('Mohon tunggu...');
  });

  it('should handle asyncDetailThread.fulfilled', () => {
    const mockPayload = fakeData;

    const fulfilledAction = createAction<
    DetailThreadWithEmailOwner,
      typeof asyncDetailThread.fulfilled.type
    >(asyncDetailThread.fulfilled.type)(mockPayload);

    const { reducer } = detailThreadSlice;

    const newState = reducer(store.getState().thread, fulfilledAction);
    expect(newState.status).toEqual('success');
    expect(newState.message).toEqual('Data detail thread berhasil didapatkan!');
    expect(newState.data).toEqual(mockPayload);
  });

  it('should handle asyncDetailThread.rejected', () => {
    const rejectedAction = createAction(asyncDetailThread.rejected.type)();

    const { reducer } = detailThreadSlice;

    const newState = reducer(store.getState().thread, rejectedAction);
    expect(newState.status).toEqual('error');
    expect(newState.message).toEqual('Data detail thread gagal didapatkan!');
    expect(newState.data).toEqual(null);
  });
});
