/* eslint-disable react/react-in-jsx-scope */

/*
Skenario test component RegisterViews:

* should render correctly component RegisterViews
* should handle name typing correctly
* should handle email typing correctly
* should handle password typing correctly

*/

import {
  describe, it, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterViews from '@/views/AuthViews/RegisterViews';
import StoreProvider from '@/libs/redux/store/StoreProvider';
import AppRouterContextProviderMock from '../utils/AppRouterContextMock';

describe('Test RegisterViews component', () => {
  it('should render correctly component RegisterViews', async () => {
    const view = render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <RegisterViews />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    );

    expect(view).toMatchSnapshot();
  });

  it('should handle name typing correctly', async () => {
    const user = userEvent.setup();

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <RegisterViews />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    );

    const getInputEmail = screen.getByLabelText('Nama') as HTMLInputElement;

    await user.type(getInputEmail, 'anonymous');

    expect(getInputEmail.value).toEqual('anonymous');
  });

  it('should handle email typing correctly', async () => {
    const user = userEvent.setup();

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <RegisterViews />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    );

    const getInputEmail = screen.getByLabelText('Email') as HTMLInputElement;

    await user.type(getInputEmail, 'testuser@gmail.com');

    expect(getInputEmail.value).toEqual('testuser@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    const user = userEvent.setup();

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <RegisterViews />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    );

    const getInputPassword = screen.getByLabelText('Password') as HTMLInputElement;

    await user.type(getInputPassword, '12345678');

    expect(getInputPassword.value).toEqual('12345678');
  });
});
