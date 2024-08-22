'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const useGoogleSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signIn('google', {
        redirect: false,
      });
    },
    onSuccess: async () => {
      router.replace('/');
    },
    onError: (error: AxiosError<any>) => {
      console.error('Google login error:', error.response?.data);
    },
  });
};

export default useGoogleSignIn;
