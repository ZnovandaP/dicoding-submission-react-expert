import * as React from 'react';
import AuthWrapper from '../ComponentSupport/AuthWrapper';
import AuthNote from '../ComponentSupport/AuthNote';
import FormLogin from '../ComponentSupport/FormLogin';
import AuthTitle from '../ComponentSupport/AuthTitle';

export default function LoginViews() {
  return (
    <AuthWrapper position="left">
      <AuthTitle title="Login" />
      <FormLogin />
      <AuthNote
        message="Belum punya akun? silahkan"
        messageLink="registrasi disini"
        to="/register"
      />
    </AuthWrapper>
  );
}
