import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination';

interface GetContentQuery extends PaginationQueryParams {}

export const getContentByUserIdService = async (
  userId: number,
  query: GetContentQuery,
) => {
  try {
    const { page, take, sortBy, sortOrder } = query;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const content = await prisma.content.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const count = await prisma.content.count({
      where: { userId },
    });

    return {
      data: content,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
