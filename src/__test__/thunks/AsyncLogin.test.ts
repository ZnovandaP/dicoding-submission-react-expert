/* eslint-disable jest/no-conditional-expect */
/**
 * - asyncLogin thunk spec:
 *  - should dispatch action correctly when data fetching is success/fullfilled
 *  - should dispatch action correctly when data fetching is erro/rejected
 */

import {
  describe, it, expect,
} from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { baseUrl } from '@/service/common/fetch-with-auth';
import loginSlice, { asyncLogin, InitialState } from '@/libs/redux/slices/auth/login';
import {
  configureStore, EnhancedStore, Tuple, ThunkDispatch, StoreEnhancer, UnknownAction,
} from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { fakeErrorResponse, fakeLoginResponse } from '../utils/fake-data-response';

const fakeData: string = 'token-12345678';

const arg = {
  email: 'john@example.com',
  password: '12345678',
};

describe('asyncLogin thunk', () => {
  let mock: MockAdapter;

  // eslint-disable-next-line max-len
  let store: EnhancedStore<{ login: InitialState }, UnknownAction, Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<{ login: InitialState }, undefined, UnknownAction> }>, StoreEnhancer]>>;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = configureStore({
      reducer: {
        login: loginSlice.reducer,
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should dispatch action correctly when data fetching is success/fullfilled', async () => {
    mock.onPost(`${baseUrl}/login`).reply(200, fakeLoginResponse);

    const dispatchFn = jest.fn();

    await asyncLogin(arg)(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(4);

    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncLogin.pending.type,
      payload: undefined,
    }));

    expect(dispatchFn).toHaveBeenNthCalledWith(2, showLoading());

    expect(dispatchFn).toHaveBeenNthCalledWith(3, hideLoading());

    expect(dispatchFn).toHaveBeenNthCalledWith(4, expect.objectContaining({
      type: asyncLogin.fulfilled.type,
      payload: fakeData,
    }));
  });

  it('should dispatch action correctly when data fetching is error/rejected', async () => {
    mock.onGet(`${baseUrl}/leaderboards`).reply(404, fakeErrorResponse);

    const dispatchFn = jest.fn();

    await asyncLogin(arg)(dispatchFn, store.getState, null);

    expect(dispatchFn).toHaveBeenCalledTimes(4);

    expect(dispatchFn).toHaveBeenNthCalledWith(1, expect.objectContaining({
      type: asyncLogin.pending.type,
      payload: undefined,
    }));

    expect(dispatchFn).toHaveBeenNthCalledWith(2, showLoading());

    expect(dispatchFn).toHaveBeenNthCalledWith(3, hideLoading());

    expect(dispatchFn).toHaveBeenNthCalledWith(4, expect.objectContaining({
      type: asyncLogin.rejected.type,
      payload: undefined,
    }));
  });
});
