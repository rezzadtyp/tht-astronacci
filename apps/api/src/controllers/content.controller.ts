import { NextFunction, Request, Response } from 'express';
import { createContentService } from '@/services/content/create-content.service';
import { deleteContentService } from '@/services/content/delete-content.service';
import { updateContentService } from '@/services/content/update-content.service';
import { getContentsByMembershipService } from '@/services/content/get-contents-by-membership.service';
import { getContentService } from '@/services/content/get-content.service';
import { getContentByUserIdService } from '@/services/content/get-content-by-user-id.service';

export class ContentController {
  async createContent(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files?.length) {
        throw new Error('no file uploaded');
      }

      const userId = res.locals.user.id;

      const result = await createContentService(
        Number(userId),
        req.body,
        files[0],
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getContentsByMembership(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.user.id;
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'asc',
        category: req.query.category as string,
      };

      const result = await getContentsByMembershipService(
        query,
        Number(userId),
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteContent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id;
      const id = req.params.id;

      const result = await deleteContentService(Number(id), Number(userId));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateContent(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      const result = await updateContentService(
        Number(req.params.id),
        req.body,
        files[0],
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getContent(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;
      const result = await getContentService(slug);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getEventsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'createdAt',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
      };
      const userId = res.locals.user.id;
      const result = await getContentByUserIdService(Number(userId), query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
