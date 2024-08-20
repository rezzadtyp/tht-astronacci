import prisma from '@/prisma';

export const getContentService = async (slug: string) => {
  try {
    const content = await prisma.content.findFirst({
      where: {
        slug: { equals: slug },
      },
      include: {
        user: true,
      },
    });

    if (!content) {
      throw new Error('Content not found');
    }

    return content;
  } catch (error) {
    throw error;
  }
};
