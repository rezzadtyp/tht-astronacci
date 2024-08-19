import { JWT_SECRET } from '@/config';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import { getTokens } from '@/lib/getTokens';
import { getUserInfo } from '@/lib/getUserInfo';

export const loginWithGoogleService = async (code: string) => {
  try {
    const tokens = await getTokens(code);

    if (!tokens) {
      return {
        status: 400,
        message: 'Failed to get tokens from google',
      };
    }

    const userInfo = await getUserInfo(tokens.access_token!);

    if (!userInfo) {
      return {
        status: 400,
        message: 'Failed to get user info from google',
      };
    }

    const user = await prisma.user.findFirst({
      where: { email: userInfo.email },
    });

    let newUser;

    if (!user) {
      newUser = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          provider: 'GOOGLE',
        },
      });
    }

    const token = sign({ id: newUser?.id || user?.id }, JWT_SECRET!, {
      expiresIn: '2h',
    });

    return {
      message: `Hello ${userInfo.name}`,
      data: newUser || user,
      token,
    };
  } catch (error) {
    throw error;
  }
};
