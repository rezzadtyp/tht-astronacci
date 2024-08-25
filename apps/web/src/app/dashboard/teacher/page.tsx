'use client';

import ContentCard from '@/components/ContentCard';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import AuthGuardTeacher from '@/hoc/AuthGuardTeacher';
import useGetContentsByUserId from '@/hooks/api/content/useGetContentsByUserId';
import { appConfig } from '@/utils/config';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Teacher = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { data: contents, isPending } = useGetContentsByUserId({
    page,
    take: 9,
  });

  const onPageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!contents) {
    return <h1 className="text-center">Content tidak ditemukan</h1>;
  }

  return (
    <div>
      <Button onClick={() => router.push('/dashboard/teacher/create')}>
        Create Content
      </Button>
      <h1>Content List</h1>
      <section className="grid grid-cols-3 gap-4">
        {contents.data.map((content: any, index: any) => {
          return (
            <ContentCard
              key={index}
              category={content.category}
              slug={`dashboard/teacher/${content.slug}`}
              thumbnail_url={
                appConfig.baseUrl + `/assets${content.thumbnail_url}`
              }
              title={content.title}
              type={content.type}
            />
          );
        })}
      </section>
      <Pagination
        total={contents.meta.total}
        take={contents.meta.take}
        onPageChange={onPageChange}
        page={page}
      />
    </div>
  );
};

export default AuthGuardTeacher(Teacher);
