'use client';

import Markdown from '@/components/Markdown';
import { Badge } from '@/components/ui/badge';
import useGetContent from '@/hooks/api/content/useGetContent';
import { appConfig } from '@/utils/config';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

const ContentPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { data, isPending } = useGetContent(params.slug);

  if (isPending) {
    return <div className="container mx-auto px-4">Loading...</div>;
  }

  if (!data) {
    return notFound();
  }

  const getYoutubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const videoUrl = data.video_url ? getYoutubeEmbedUrl(data.video_url) : null;

  return (
    <main className="container mx-auto px-4 space-y-4">
      <section className="mb-4 w-full flex flex-col items-center space-y-4">
        <div className="mb-4 space-y-1.5 w-full">
          <Badge variant="outline" className="rounded-sm bg-green-100">
            {data.category}
          </Badge>
          <Badge variant="outline" className="rounded-sm bg-red-100">
            {data.type}
          </Badge>
          <h1 className="text-4xl font-semibold">{data.title}</h1>
        </div>

        {videoUrl ? (
          <iframe
            className="w-full aspect-video self-stretch md:min-h-96"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Product Overview Video"
          />
        ) : null}

        <div className="relative h-96 w-[800px]">
          <Image
            fill
            src={appConfig.baseUrl + `/assets${data.thumbnail_url}`}
            alt="thumbnail image"
            className="object-cover bg-slate-200"
          />
        </div>
      </section>

      <section>
        <Markdown content={data.description} />
      </section>
    </main>
  );
};

export default ContentPage;
