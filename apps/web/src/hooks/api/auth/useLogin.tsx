'use client';

import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginPayload {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post('/auth/login', payload);
      return data;
    },
    onSuccess: async (data: any) => {
      await signIn('credentials', { ...data, redirect: false });
      router.replace('/');
    },
    onError: (error: AxiosError<any>) => {
      console.error(error.response?.data);
    },
  });
};

export default useLogin;
