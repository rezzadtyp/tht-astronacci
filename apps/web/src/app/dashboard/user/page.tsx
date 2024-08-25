'use client';

import ContentCard from '@/components/ContentCard';
import Pagination from '@/components/Pagination';
import AuthGuardUser from '@/hoc/AuthGuardUser';
import useGetContents from '@/hooks/api/content/useGetContents';
import { appConfig } from '@/utils/config';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const DashboardUser = () => {
  const [page, setPage] = useState<number>(1);
  const { data: contents, isPending } = useGetContents({
    page,
    take: 30,
  });

  const onPageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!contents) {
    return <h1 className="text-center">Blog tidak ditemukan</h1>;
  }

  return (
    <div className="container px-0 space-y-4 pb-10">
      <h1 className="text-xl font-bold">Your course</h1>
      <section className="grid grid-cols-3 gap-4 w-full">
        {contents.data.map((content: any, index: any) => {
          return (
            <ContentCard
              key={index}
              category={content.category}
              slug={`dashboard/user/course/${content.slug}`}
              thumbnail_url={
                appConfig.baseUrl + `/assets${content.thumbnail_url}`
              }
              title={content.title}
              type={content.type}
            />
          );
        })}
      </section>
    </div>
  );
};

export default AuthGuardUser(DashboardUser);
