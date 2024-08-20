import prisma from '@/prisma';

export const updateMembershipService = async (
  userId: number,
  membershipId: number,
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        role: 'USER',
      },
    });

    if (!user) {
      throw new Error('Account not found');
    }

    const membership = await prisma.membership.findFirst({
      where: {
        id: membershipId,
      },
    });

    if (!membership) {
      throw new Error('Membership not found');
    }

    const updateMembership = await prisma.user.update({
      where: { id: userId },
      data: {
        membershipId: membershipId,
      },
      include: {
        membership: true,
      },
    });

    return updateMembership;
  } catch (error) {
    throw error;
  }
};
