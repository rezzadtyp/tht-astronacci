import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET, BASE_URL_FE } from '@/config';
import { transporter } from '@/lib/nodemailer';

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    const token = sign({ id: user.id }, JWT_SECRET!, {
      expiresIn: '30m',
    });

    const link = BASE_URL_FE + `/reset-password?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: 'Link Reset Password',
      html: `<a href="${link}" target="_blank">Reset Password Here</a>`,
    });

    return {
      message: 'Email for reset password has been sent',
    };
  } catch (error) {
    throw error;
  }
};
