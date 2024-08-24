'use client';

import dynamic from 'next/dynamic';
import { signIn } from 'next-auth/react';
import useFacebookLogin from '@/hooks/api/auth/useFacebookLogin';
import { Button } from './ui/button';
import { FaFacebook } from 'react-icons/fa';

const LoginSocialFacebook = dynamic(
  () => import('reactjs-social-login').then((mod) => mod.LoginSocialFacebook),
  { ssr: false },
);

const FbLogin = () => {
  const { mutateAsync: facebookLogin } = useFacebookLogin();

  return (
    <Button className="flex gap-3 w-full" variant="outline">
      <FaFacebook color="#1877F2" />
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
        Continue with Facebook
      </LoginSocialFacebook>
    </Button>
  );
};

export default FbLogin;
