import prisma from '@/prisma';
import { User } from '@prisma/client';
import { hashPassword } from '@/lib/bcrypt';

export const registerService = async (body: User) => {
  try {
    const { name, email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exist');
    }

    const hashedPassword = await hashPassword(password!);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      message: 'Register Success',
    };
  } catch (error) {
    throw error;
  }
};
