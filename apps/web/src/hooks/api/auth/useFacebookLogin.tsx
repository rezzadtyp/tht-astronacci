'use client';

import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FacebookPayload {
  email: string;
  name: string;
}

const useFacebookLogin = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: FacebookPayload) => {
      const { data } = await axiosInstance.post('/auth/facebook', {
        email: payload.email,
        name: payload.name,
      });

      return data;
    },
    onSuccess: async () => {
      router.replace('/');
    },
    onError: (error: AxiosError<any>) => {
      console.error('Facebook login error:', error.response?.data);
    },
  });
};

export default useFacebookLogin;
