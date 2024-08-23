'use client';

import useAxios from '@/hooks/useAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface CreateBlogPayload {
  title: string;
  category: string;
  description: string;
  type: string;
  thumbnail_url: File | null;
  video_url: string;
}

const useCreateContent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBlogPayload) => {
      const createBlogForm = new FormData();

      createBlogForm.append('title', payload.title);
      createBlogForm.append('type', payload.type);
      createBlogForm.append('category', payload.category);
      createBlogForm.append('description', payload.description);
      createBlogForm.append('video_url', payload.video_url);
      createBlogForm.append('thumbnail_url', payload.thumbnail_url!);

      const { data } = await axiosInstance.post('/content', createBlogForm);
      return data;
    },
    onSuccess: async () => {
      console.log('Create content success');
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      router.push('/');
    },
    onError: (error: AxiosError<any>) => {
      console.error(error.response?.data);
    },
  });
};

export default useCreateContent;
