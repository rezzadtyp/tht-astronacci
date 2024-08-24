'use client';

import dynamic from 'next/dynamic';
import { signIn } from 'next-auth/react';
import useFacebookLogin from '@/hooks/api/auth/useFacebookLogin';
import { Button } from './ui/button';

const LoginSocialFacebook = dynamic(
  () => import('reactjs-social-login').then((mod) => mod.LoginSocialFacebook),
  { ssr: false },
);

const FbLogin = () => {
  const { mutateAsync: facebookLogin } = useFacebookLogin();

  return (
    <div>
      <LoginSocialFacebook
        appId="523855976819450"
        onResolve={async (response) => {
          console.log('facebook response', response);
          if (response.data) {
            const { email, name } = response.data;
            try {
              await facebookLogin({ email, name });

              await signIn('credentials', { name, redirect: false });
            } catch (error) {
              console.error('Error logging in with Facebook:', error);
            }
          }
        }}
        onReject={(error) => {
          console.error('Facebook login error', error);
        }}
      >
        <Button>Continue with Facebook</Button>
      </LoginSocialFacebook>
    </div>
  );
};

export default FbLogin;
