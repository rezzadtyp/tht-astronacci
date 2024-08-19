'use client';

import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const useGoogleSignIn = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async () => {
      // const { data } = await axiosInstance.post('/auth/google-login');
      // console.log(data);
      // return data;
      console.log('mutationfn running');
    },
    onSuccess: async (data: any) => {
      await signIn('google', {
        redirect: false,
        ...data,
      });
      router.replace('/');
    },
    onError: (error: AxiosError<any>) => {
      console.error('Google login error:', error.response?.data);
    },
  });
};

export default useGoogleSignIn;
