import prisma from '@/prisma';

export const deleteContentService = async (id: number, userId: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        role: 'TEACHER',
      },
    });

    if (!user) {
      throw new Error('You are not authorized');
    }

    const content = await prisma.content.findFirst({
      where: { id },
    });

    if (!content) {
      throw new Error('Content not found');
    }

    return await prisma.content.delete({
      where: {
        id: content.id,
        userId: user.id,
      },
    });
  } catch (error) {
    throw error;
  }
};
