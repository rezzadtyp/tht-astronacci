'use client';

import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post('/auth/register', payload);
      return data;
    },
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: AxiosError<any>) => {
      console.error(error.response?.data);
    },
  });
};

export default useRegister;
