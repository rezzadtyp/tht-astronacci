import { JWT_SECRET } from '@/config';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import { getUserInfo } from '@/lib/getUserInfo';
import { decrypt } from '@/lib/cryptoUtils';

export const loginWithGoogleService = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  try {
    const decryptedToken = decrypt(accessToken);
    if (!decryptedToken) {
      return {
        status: 400,
        message: 'Missing access token',
      };
    }

    const userInfo = await getUserInfo(decryptedToken);

    if (!userInfo) {
      return {
        status: 400,
        message: 'Failed to get user info from Google',
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
    console.error('Error during Google login:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  }
};
