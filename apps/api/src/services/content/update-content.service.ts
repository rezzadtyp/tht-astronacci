import { Content } from '@prisma/client';
import { join } from 'path';
import fs from 'fs';
import prisma from '@/prisma';

export const updateContentService = async (
  id: number,
  body: Partial<Content>,
  file?: Express.Multer.File,
) => {
  try {
    const { title } = body;
    const content = await prisma.content.findFirst({
      where: { id },
    });

    if (!content) {
      throw new Error('Content not found');
    }

    if (title) {
      const contentTitle = await prisma.content.findFirst({
        where: { title: { equals: title } },
      });
      if (contentTitle) {
        throw new Error('Title already in use');
      }
    }

    if (file) {
      body.thumbnail_url = `/images/${file.filename}`;
      const imagePath = join(
        __dirname,
        '../../../public' + content.thumbnail_url,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return await prisma.content.update({
      where: { id },
      data: { ...body },
    });
  } catch (error) {
    throw error;
  }
};
