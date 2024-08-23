'use client';

import useAxios from '@/hooks/useAxios';
import { PaginationQueries } from '@/types/pagination.type';
import { useQuery } from '@tanstack/react-query';

interface GetContentQueries extends PaginationQueries {}

const useGetContentsByUserId = (queries: GetContentQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ['contents', queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/content/teacher', {
        params: queries,
      });

      return data;
    },
  });
};

export default useGetContentsByUserId;
