'use client';

import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from 'react-dropzone';

interface CreateContentPayload {
  title: string;
  category: string;
  description: string;
  type: string;
  thumbnail_url: FileList | null;
  video_url: string;
}

const useCreateContent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateContentPayload) => {
      const createContentForm = new FormData();
      const { thumbnail_url, video_url } = payload;

      createContentForm.append('title', payload.title);
      createContentForm.append('category', payload.category);
      createContentForm.append('description', payload.description);
      createContentForm.append('video_url', payload.video_url);
      createContentForm.append('type', payload.type);
      if (thumbnail_url) {
        Array.from(thumbnail_url).forEach((file: FileWithPath) => {
          createContentForm.append('thumbnail_url', file);
        });
      }

      const { data } = await axiosInstance.post('/content', createContentForm);
      return data;
    },
    onSuccess: async () => {
      console.log('Create content success');
      router.push('/dashboard/teacher');
    },
    onError: (error: AxiosError<any>) => {
      console.error(error.response?.data);
    },
  });
};

export default useCreateContent;
