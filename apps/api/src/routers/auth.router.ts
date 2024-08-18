import { AuthController } from '@/controllers/auth.controller';
import { Router } from 'express';
import { verifyToken } from 'lib/verifyToken';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.registerController);
    this.router.post('/login', this.authController.loginController);
    this.router.post(
      '/forgot-password',
      this.authController.forgotPasswordController,
    );
    this.router.patch(
      '/reset-password',
      verifyToken,
      this.authController.resetPasswordController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
