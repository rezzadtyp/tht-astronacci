import Link from 'next/link';
import { FC } from 'react';
import {
  Card as UiCard,
  CardContent as UiCardContent,
  CardHeader as UiCardHeader,
} from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';

interface ICardContentProps {
  title: string;
  type: string;
  category: string;
  thumbnail_url: string;
  slug: string;
}

const ContentCard: FC<ICardContentProps> = ({
  category,
  thumbnail_url,
  title,
  type,
  slug,
}) => {
  return (
    <Link href={`/${slug}`}>
      <UiCard className="group overflow-hidden rounded-lg p-3 shadow-none hover:bg-neutral-100/60">
        <UiCardHeader className="relative h-[175px] w-full overflow-hidden rounded-lg">
          <Image
            src={thumbnail_url}
            alt="thumbnail"
            fill
            className="rounded-lg object-cover z-10 group-hover:rotate-2 group-hover:scale-110 group-hover:transition-all group-hover:duration-500"
          />
        </UiCardHeader>
        <Badge>{category}</Badge>
        <UiCardContent>
          <h1>{title}</h1>
          <Badge>{type}</Badge>
        </UiCardContent>
      </UiCard>
    </Link>
  );
};

export default ContentCard;
