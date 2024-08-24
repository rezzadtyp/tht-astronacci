import { JWT_SECRET } from '@/config';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';

interface FacebookPayload {
  email: string;
  name: string;
}

export const loginWithFacebookService = async (body: FacebookPayload) => {
  try {
    const { email, name } = body;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    let newUser;

    if (!user) {
      newUser = await prisma.user.create({
        data: {
          email: email,
          name: name,
          provider: 'FACEBOOK',
        },
      });
    }

    const token = sign({ id: newUser?.id || user?.id }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    return {
      message: `Hello ${name}`,
      data: newUser || user,
      token,
    };
  } catch (error) {
    console.error('Error during Facebook login:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  }
};
