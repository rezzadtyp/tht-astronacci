'use client';

import useAxios from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const useGetContent = (slug: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ['contents'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/content/${slug}`);

      return data;
    },
  });
};

export default useGetContent;
