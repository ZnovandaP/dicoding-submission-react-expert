'use client';

import * as React from 'react';
import Button from '@/components/Button';
import { showLoading } from 'react-redux-loading-bar';
import { useAppDispatch } from '@/libs/redux/store';
import AuthWrapper from '../ComponentSupport/AuthWrapper';
import AuthNote from '../ComponentSupport/AuthNote';
import FormLogin from '../ComponentSupport/FormLogin';
import AuthTitle from '../ComponentSupport/AuthTitle';

export default function LoginViews() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(showLoading());
  };

  return (
    <AuthWrapper position="left">
      <AuthTitle title="Login" />
      <FormLogin />
      <AuthNote
        message="Sudah punya akun? silahkan"
        messageLink="login disini"
        to="/register"
      />
      <Button type="button" variant="outline" onClick={handleClick}>
        loading bar
      </Button>
    </AuthWrapper>
  );
}
