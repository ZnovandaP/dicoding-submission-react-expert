/**
 * - leaderboardsSlice reducer spec:
 *  - should handle initialState
 *  - should handle asyncGetLeaderboards.pending
 *  - should handle asyncGetLeaderboards.fullfilled
 *  - should handle asyncGetLeaderboards.rejected
 */

import { describe, it, expect } from '@jest/globals';
import getLeaderboardsSlice, { asyncGetLeaderboards, InitialState } from '@/libs/redux/slices/leaderboards';
import {
  configureStore, EnhancedStore, ThunkDispatch, Tuple, StoreEnhancer, UnknownAction, createAction,
} from '@reduxjs/toolkit';
import { UserLeaderboards } from '@/types/response/users';
import { fakeData } from '../thunks/AsyncGetLeaderboards.test';

describe('leaderboardsSlice test reducer', () => {
  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ leaderboards: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ leaderboards: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        leaderboards: getLeaderboardsSlice.reducer,
      },
    });
  });

  it('should handle initial state', () => {
    const { leaderboards } = store.getState();
    expect(leaderboards).toEqual({
      data: null,
      message: null,
      status: 'idle',
    });
  });

  it('should handle asyncGetLeaderboards.pending', () => {
    const pendingAction = createAction(asyncGetLeaderboards.pending.type)();

    const { reducer } = getLeaderboardsSlice;

    const newState = reducer(store.getState().leaderboards, pendingAction);
    expect(newState.status).toEqual('loading');
    expect(newState.message).toEqual('Mohon tunggu...');
  });

  it('should handle asyncGetLeaderboards.fulfilled', () => {
    const mockPayload = fakeData;

    const fulfilledAction = createAction<
    UserLeaderboards,
      typeof asyncGetLeaderboards.fulfilled.type
    >(asyncGetLeaderboards.fulfilled.type)(mockPayload);

    const { reducer } = getLeaderboardsSlice;

    const newState = reducer(store.getState().leaderboards, fulfilledAction);
    expect(newState.status).toEqual('success');
    expect(newState.message).toEqual('Data seluruh pengguna didapatkan!');
    expect(newState.data).toEqual(mockPayload);
  });

  it('should handle asyncGetLeaderboards.rejected', () => {
    const rejectedAction = createAction(asyncGetLeaderboards.rejected.type)();

    const { reducer } = getLeaderboardsSlice;

    const newState = reducer(store.getState().leaderboards, rejectedAction);
    expect(newState.status).toEqual('error');
    expect(newState.message).toEqual('Data pengguna gagal didapatkan!');
    expect(newState.data).toEqual(null);
  });
});
