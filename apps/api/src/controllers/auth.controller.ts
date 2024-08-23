import { NextFunction, Request, Response } from 'express';
import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { forgotPasswordService } from '@/services/auth/forgot-password.service';
import { resetPasswordService } from '@/services/auth/reset-password.service';
import { loginWithGoogleService } from '@/services/auth/google-login.service';
import { updateMembershipService } from '@/services/auth/update-membership.service';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forgotPasswordService(req.body.email);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await resetPasswordService(
        Number(res.locals.user.id),
        req.body.password,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginWithGoogleService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateMembership(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id;
      const membershipId = req.body.membershipId;

      const result = await updateMembershipService(
        Number(userId),
        Number(membershipId),
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
