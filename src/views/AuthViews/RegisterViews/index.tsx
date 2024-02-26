import * as React from 'react';
import AuthWrapper from '../ComponentSupport/AuthWrapper';
import AuthNote from '../ComponentSupport/AuthNote';
import FormRegister from '../ComponentSupport/FormRegister';
import AuthTitle from '../ComponentSupport/AuthTitle';

export default function RegisterViews() {
  return (
    <AuthWrapper position="right">
      <AuthTitle title="Register" />
      <FormRegister />
      <AuthNote
        message="Sudah punya akun? silahkan"
        messageLink="login disini"
        to="/login"
      />
    </AuthWrapper>
  );
}
