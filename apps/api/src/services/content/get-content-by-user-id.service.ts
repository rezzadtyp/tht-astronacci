import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination';

interface GetContentQuery extends PaginationQueryParams {
  id: number;
}

export const getContentByUserIdService = async (query: GetContentQuery) => {
  try {
    const { id, page, take, sortBy, sortOrder } = query;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const content = await prisma.content.findMany({
      where: {
        userId: id,
      },
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const count = await prisma.content.count({
      where: { userId: id },
    });

    return {
      data: content,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
