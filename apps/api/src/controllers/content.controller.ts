import { NextFunction, Request, Response } from 'express';
import { createContentService } from '@/services/content/create-content.service';

export class ContentController {
  async createContent(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files?.length) {
        throw new Error('no file uploaded');
      }

      const result = await createContentService(req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
