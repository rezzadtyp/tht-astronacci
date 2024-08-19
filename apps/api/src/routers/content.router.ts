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
    this.router.post(
      '/',
      verifyToken,
      uploader('IMG', 'images').array('thumbnail_url', 1),
      this.contentController.createContent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
