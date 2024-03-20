/**
 * - loginSlice reducer spec:
 *  - should handle initialState
 *  - should handle asyncLogin.pending
 *  - should handle asyncLogin.fullfilled
 *  - should handle asyncLogin.rejected
 */

import { describe, it, expect } from '@jest/globals';
import loginSlice, { InitialState, asyncLogin } from '@/libs/redux/slices/auth/login';
import {
  configureStore, EnhancedStore, ThunkDispatch, Tuple, StoreEnhancer, UnknownAction, createAction,
} from '@reduxjs/toolkit';
import { fakeData } from '../thunks/AsyncLogin.test';

describe('loginSlice test reducer', () => {
  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ login: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ login: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        login: loginSlice.reducer,
      },
    });
  });

  it('should handle initial state', () => {
    const { login } = store.getState();
    expect(login).toEqual({
      data: null,
      message: null,
      status: 'idle',
    });
  });

  it('should handle asyncLogin.pending', () => {
    const pendingAction = createAction(asyncLogin.pending.type)();

    const { reducer } = loginSlice;

    const newState = reducer(store.getState().login, pendingAction);
    expect(newState.status).toEqual('loading');
    expect(newState.message).toEqual('Mohon tunggu...');
  });

  it('should handle asyncLogin.fulfilled', () => {
    const mockPayload = fakeData;

    const fulfilledAction = createAction<
    string,
      typeof asyncLogin.fulfilled.type
    >(asyncLogin.fulfilled.type)(mockPayload);

    const { reducer } = loginSlice;

    const newState = reducer(store.getState().login, fulfilledAction);
    expect(newState.status).toEqual('success');
    expect(newState.message).toEqual('Login sukses selamat datang');
    expect(newState.data).toEqual(mockPayload);
  });

  it('should handle asyncLogin.rejected', () => {
    const rejectedAction = createAction(asyncLogin.rejected.type)();

    const { reducer } = loginSlice;

    const newState = reducer(store.getState().login, rejectedAction);
    expect(newState.status).toEqual('error');
    expect(newState.message).toEqual('Login gagal, pastikan email dan password anda benar');
    expect(newState.data).toEqual(null);
  });
});
