import { ContentController } from '@/controllers/content.controller';
import { Router } from 'express';
import { verifyToken } from '@/lib/verifyToken';
import { uploader } from '@/lib/uploader';

export class ContentRouter {
  private router: Router;
  private contentController: ContentController;

  constructor() {
    this.contentController = new ContentController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      this.contentController.getContentsByMembership,
    );
    this.router.get(
      '/teacher',
      verifyToken,
      this.contentController.getEventsByUserId,
    );
    this.router.get('/:slug', verifyToken, this.contentController.getContent);
    this.router.post(
      '/',
      verifyToken,
      uploader('IMG', '/images').array('thumbnail_url', 1),
      this.contentController.createContent,
    );
    this.router.patch(
      '/:id',
      verifyToken,
      this.contentController.updateContent,
    );
    this.router.delete(
      '/:id',
      verifyToken,
      this.contentController.deleteContent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
