import prisma from '@/prisma';
import { Content } from '@prisma/client';

function convertToSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

interface CreateContentBody
  extends Omit<
    Content,
    'id' | 'deletedAt' | 'createdAt' | 'updatedAt' | 'slug'
  > {}

export const createContentService = async (
  body: CreateContentBody,
  file: Express.Multer.File,
) => {
  try {
    const { title, userId, video_url } = body;

    const existingTitle = await prisma.content.findFirst({ where: { title } });
    if (existingTitle) {
      throw new Error('Title already in use');
    }

    const user = await prisma.user.findFirst({ where: { id: Number(userId) } });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== 'TEACHER') {
      throw new Error('Only teachers can upload content');
    }

    const category = video_url ? 'VIDEO' : 'ARTICLE';

    const contentUpload = await prisma.content.create({
      data: {
        ...body,
        slug: convertToSlug(title),
        thumbnail_url: `/images/${file.filename}`,
        userId: Number(userId),
        category,
      },
    });

    return contentUpload;
  } catch (error) {
    throw error;
  }
};
