import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination';
import { Prisma } from '@prisma/client';

interface GetContentQuery extends PaginationQueryParams {
  category?: string;
}

export const getContentsByMembershipService = async (
  query: GetContentQuery,
  userId: number,
) => {
  try {
    const {
      page = 1,
      sortBy = 'createdAt',
      sortOrder = 'asc',
      take,
      category,
    } = query;

    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        membership: true,
      },
    });

    if (!user || !user.membership) {
      throw new Error('You are not logged in or do not have a membership');
    }

    const { contentLimit } = user.membership;

    const typeLimit = Math.floor(contentLimit / 2);
    const effectiveTake = Math.min(typeLimit, take);

    let where: Prisma.ContentWhereInput = {};
    if (category) {
      where.category = category;
    }

    const articles = await prisma.content.findMany({
      where: {
        ...where,
        type: 'ARTICLE',
      },
      skip: (page - 1) * effectiveTake,
      take: effectiveTake,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const videos = await prisma.content.findMany({
      where: {
        ...where,
        type: 'VIDEO',
      },
      skip: (page - 1) * effectiveTake,
      take: effectiveTake,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return [...articles, ...videos];
  } catch (error) {
    throw error;
  }
};
