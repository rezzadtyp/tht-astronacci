import { AuthController } from '@/controllers/auth.controller';
import { Router } from 'express';
import { verifyToken } from '@/lib/verifyToken';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.login);
    this.router.post('/google-login', this.authController.loginWithGoogle);
    this.router.post('/forgot-password', this.authController.forgotPassword);
    this.router.patch(
      '/reset-password',
      verifyToken,
      this.authController.resetPassword,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
